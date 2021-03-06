/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from './types';

import { Base } from './base';

/**
 * Diff array, helper class.
 */
@Class.Describe()
export class Array<T> extends Base<T> {
  /**
   * Compute all patch entries based on the specified LHS and RHS arrays.
   * @param lhsArray Left-hand-side array.
   * @param rhsArray Right-hand-side array.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromItems(lhsArray: T[], rhsArray: T[]): Types.Patch<T>[] {
    return this.difference(lhsArray, rhsArray);
  }
}
