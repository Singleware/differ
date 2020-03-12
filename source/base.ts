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
  @Class.Private()
  private buildTable(lhsItems: T[], rhsItems: T[]): Uint32Array[] {
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
   * Get all the different patch entries based on the specified LHS and RHS items.
   * @param lhsItems Left-hand-side items.
   * @param rhsItems Right-hand-side items.
   * @returns Returns all patch entries.
   */
  @Class.Protected()
  protected difference(lhsItems: T[], rhsItems: T[]): Types.Patch<T>[] {
    const list = [];
    const table = this.buildTable(lhsItems, rhsItems);
    let patch: Types.Patch<T> | undefined;
    let action: Types.Action;
    let value: T;
    for (let lhsIndex = lhsItems.length - 1, rhsIndex = rhsItems.length - 1; lhsIndex > -1 || rhsIndex > -1; ) {
      if (lhsIndex < 0) {
        action = Types.Action.Insert;
        value = rhsItems[rhsIndex--];
      } else if (rhsIndex < 0) {
        action = Types.Action.Remove;
        value = lhsItems[lhsIndex--];
      } else if (lhsItems[lhsIndex] === rhsItems[rhsIndex]) {
        action = Types.Action.None;
        value = lhsItems[lhsIndex--];
        rhsIndex--;
      } else {
        const lhsResult = lhsIndex > 0 ? table[lhsIndex - 1][rhsIndex] : -1;
        const rhsResult = rhsIndex > 0 ? table[lhsIndex][rhsIndex - 1] : -1;
        if (lhsResult < rhsResult) {
          action = Types.Action.Insert;
          value = rhsItems[rhsIndex--];
        } else {
          action = Types.Action.Remove;
          value = lhsItems[lhsIndex--];
        }
      }
      if (patch === void 0 || patch.action !== action) {
        patch = { values: [value], action: action };
        list.push(patch);
      } else {
        patch.values.unshift(value);
      }
    }
    return list.reverse();
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
          if (previous === void 0 || previous.action !== Types.Action.None) {
            list.push((previous = { index: index++, selection: [...patch.values], action: patch.action }));
          } else {
            previous.selection.push(...patch.values);
          }
          break;
        case Types.Action.Insert:
          if (previous === void 0 || previous.action === Types.Action.None) {
            list.push((previous = { index: index++, selection: [...patch.values], action: patch.action }));
          } else if (previous.action === Types.Action.Remove) {
            previous.replacement = patch.values;
            previous.action = Types.Action.Change;
          } else if (previous.action === Types.Action.Change) {
            previous.replacement!.push(...patch.values);
          } else {
            previous.selection.push(...patch.values);
          }
          break;
        case Types.Action.Remove:
          if (previous === void 0 || previous.action === Types.Action.None) {
            list.push((previous = { index: index++, selection: [...patch.values], action: patch.action }));
          } else if (previous.action === Types.Action.Insert) {
            previous.replacement = previous.selection;
            previous.selection = patch.values;
            previous.action = Types.Action.Change;
          } else {
            previous.selection.push(...patch.values);
          }
          break;
      }
    }
    return list;
  }
}
