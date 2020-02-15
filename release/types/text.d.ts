import * as Types from './types';
import { Base } from './base';
/**
 * Diff text class.
 */
export declare class Text extends Base<string> {
    /**
     * Get all character tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    private getCharTokens;
    /**
     * Get all word tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    private getWordTokens;
    /**
     * Get all line tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    private getLineTokens;
    /**
     * Compute all patch entries based on the text characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the text words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the text lines from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromLines(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[];
}
