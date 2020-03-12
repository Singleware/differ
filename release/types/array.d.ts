import * as Types from './types';
import { Base } from './base';
/**
 * Diff array, helper class.
 */
export declare class Array<T> extends Base<T> {
    /**
     * Compute all patch entries based on the specified LHS and RHS arrays.
     * @param lhsArray Left-hand-side array.
     * @param rhsArray Right-hand-side array.
     * @returns Returns all patch entries.
     */
    fromItems(lhsArray: T[], rhsArray: T[]): Types.Patch<T>[];
}
