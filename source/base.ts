/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from './types';

/**
 * Diff base class.
 */
@Class.Describe()
export class Base<T> extends Class.Null {
  /**
   * Build the comparison table based on the specified LHS and RHS items.
   * @param lhsItems Left-hand-side items.
   * @param rhsItems Right-hand-side items.
   * @returns Returns the comparison table.
   */
  @Class.Protected()
  protected buildTable(lhsItems: T[], rhsItems: T[]): Uint32Array[] {
    const table = [];
    let rows = new Uint32Array(rhsItems.length);
    for (let lhsIndex = 0; lhsIndex < lhsItems.length; lhsIndex++) {
      let diagonal = 0;
      table[lhsIndex] = rows = rows.slice();
      for (let rhsIndex = 0; rhsIndex < rhsItems.length; rhsIndex++) {
        const latch = rows[rhsIndex];
        if (lhsItems[lhsIndex] === rhsItems[rhsIndex]) {
          rows[rhsIndex] = diagonal + 1;
        } else {
          const previous = rows[rhsIndex - 1] ?? 0;
          if (previous > rows[rhsIndex]) {
            rows[rhsIndex] = previous;
          }
        }
        diagonal = latch;
      }
    }
    return table;
  }

  /**
   * Build all patch entries based on the specified comparison table, LHS and RHS items.
   * @param lhsItems Left-hand-side items.
   * @param rhsItems Right-hand-side items.
   * @param table Comparison table.
   * @param group Determines whether or not the similar results should be grouped.
   * @returns Returns the patch entries.
   */
  @Class.Protected()
  protected buildPatches(lhsItems: T[], rhsItems: T[], table: Uint32Array[], group: boolean): Types.Patch<T>[] {
    const list = [];
    let currentPatch: Types.Patch<T> | undefined;
    let currentAction: Types.Action;
    let currentValue: T;
    for (let lhsIndex = lhsItems.length - 1, rhsIndex = rhsItems.length - 1; lhsIndex > -1 || rhsIndex > -1; ) {
      if (lhsIndex < 0) {
        currentAction = Types.Action.Insert;
        currentValue = rhsItems[rhsIndex--];
      } else if (rhsIndex < 0) {
        currentAction = Types.Action.Remove;
        currentValue = lhsItems[lhsIndex--];
      } else if (lhsItems[lhsIndex] === rhsItems[rhsIndex]) {
        currentAction = Types.Action.None;
        currentValue = lhsItems[lhsIndex--];
        rhsIndex--;
      } else {
        const lhsResult = lhsIndex > 0 ? table[lhsIndex - 1][rhsIndex] : -1;
        const rhsResult = rhsIndex > 0 ? table[lhsIndex][rhsIndex - 1] : -1;
        if (lhsResult < rhsResult) {
          currentAction = Types.Action.Insert;
          currentValue = rhsItems[rhsIndex--];
        } else {
          currentAction = Types.Action.Remove;
          currentValue = lhsItems[lhsIndex--];
        }
      }
      if (!group || currentPatch === void 0 || currentPatch.action !== currentAction) {
        currentPatch = { values: [currentValue], action: currentAction };
        list.push(currentPatch);
      } else {
        currentPatch.values.unshift(currentValue);
      }
    }
    return list.reverse();
  }

  /**
   * Build the first patch entry based on the specified LHS and RHS items.
   * @param lhsItems Left-hand-side items.
   * @param rhsItems Right-hand-side items.
   * @returns Returns the first patch entry or undefined.
   */
  @Class.Private()
  private buildFirstPatch(lhsItems: T[], rhsItems: T[]): Types.Patch<T> | undefined {
    let offset = 0;
    while (offset < lhsItems.length && offset < rhsItems.length && lhsItems[offset] === rhsItems[offset]) {
      offset++;
    }
    if (offset > 0) {
      return { values: lhsItems.slice(0, offset), action: Types.Action.None };
    }
    return void 0;
  }

  /**
   * Build the diff based on the specified LHS and RHS items.
   * @param lhsItems Left-hand-side items.
   * @param rhsItems Right-hand-side items.
   * @param group Determines whether or not the results should be grouped.
   * @returns Returns all patch entries.
   */
  @Class.Protected()
  protected buildDiff(lhsItems: T[], rhsItems: T[], group: boolean): Types.Patch<T>[] {
    const first = this.buildFirstPatch(lhsItems, rhsItems);
    if (first !== void 0) {
      const lhsPart = lhsItems.slice(first.values.length);
      const rhsPart = rhsItems.slice(first.values.length);
      return [first, ...this.buildPatches(lhsPart, rhsPart, this.buildTable(lhsPart, rhsPart), group)];
    }
    return this.buildPatches(lhsItems, rhsItems, this.buildTable(lhsItems, rhsItems), group);
  }

  /**
   * Optimize the specified patch entries into a fragment list.
   * @param patches Patch entries.
   * @returns Returns the fragment list.
   */
  @Class.Public()
  public optimize(patches: Types.Patch<T>[]): Types.Fragment<T>[] {
    const list = [];
    let previous: Types.Fragment<T> | undefined;
    let index = 0;
    for (const patch of patches) {
      switch (patch.action) {
        case Types.Action.None:
          list.push((previous = { index: index, selection: patch.values.slice(), action: patch.action }));
          break;
        case Types.Action.Insert:
          if (previous === void 0 || previous.action !== Types.Action.Change) {
            list.push((previous = { index: index, selection: patch.values.slice(), action: patch.action }));
          } else {
            previous.replacement!.push(...patch.values);
          }
          break;
        case Types.Action.Remove:
          if (previous === void 0 || previous.action === Types.Action.None) {
            list.push((previous = { index: index, selection: patch.values.slice(), action: patch.action }));
          } else if (previous.action === Types.Action.Change) {
            previous.selection!.push(...patch.values);
          } else if (previous.action === Types.Action.Insert) {
            previous.replacement = previous.selection;
            previous.selection = patch.values;
            previous.action = Types.Action.Change;
          }
          index--;
          break;
      }
      index++;
    }
    return list;
  }
}
