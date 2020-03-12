/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Types from './types';
/**
 * Diff base class.
 */
export declare class Base<T> extends Class.Null {
    /**
     * Build the comparison table based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @returns Returns the comparison table.
     */
    private buildTable;
    /**
     * Get all the different patch entries based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @returns Returns all patch entries.
     */
    protected difference(lhsItems: T[], rhsItems: T[]): Types.Patch<T>[];
    /**
     * Optimize the specified patch entries into a fragment list.
     * @param patches Patch entries.
     * @returns Returns the fragment list.
     */
    optimize(patches: Types.Patch<T>[]): Types.Fragment<T>[];
}
