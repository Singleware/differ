/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Action } from './action';

/**
 * Patch type.
 */
export type Patch<T> = {
  /**
   * Patch action.
   */
  action: Action;
  /**
   * Patch values.
   */
  values: T[];
};
