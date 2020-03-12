/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Action } from '../action';

/**
 * Level interface.
 */
interface Level {
  /**
   * Parent level.
   */
  parent?: Level;
  /**
   * Level action.
   */
  action: Action;
}
