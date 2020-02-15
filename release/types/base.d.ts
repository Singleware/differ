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
    protected buildTable(lhsItems: T[], rhsItems: T[]): Uint32Array[];
    /**
     * Build all patch entries based on the specified comparison table, LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @param table Comparison table.
     * @param group Determines whether or not the similar results should be grouped.
     * @returns Returns the patch entries.
     */
    protected buildPatches(lhsItems: T[], rhsItems: T[], table: Uint32Array[], group: boolean): Types.Patch<T>[];
    /**
     * Build the first patch entry based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @returns Returns the first patch entry or undefined.
     */
    private buildFirstPatch;
    /**
     * Build the diff based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @param group Determines whether or not the results should be grouped.
     * @returns Returns all patch entries.
     */
    protected buildDiff(lhsItems: T[], rhsItems: T[], group: boolean): Types.Patch<T>[];
    /**
     * Optimize the specified patch entries into a fragment list.
     * @param patches Patch entries.
     * @returns Returns the fragment list.
     */
    optimize(patches: Types.Patch<T>[]): Types.Fragment<T>[];
}
