/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Action } from './action';

/**
 * Fragment type.
 */
export interface Fragment<T> {
  /**
   * Fragment action.
   */
  action: Action;
  /**
   * Fragment index.
   */
  index: number;
  /**
   * Fragment selection.
   */
  selection: T[];
  /**
   * Fragment replacement.
   */
  replacement?: T[];
}
