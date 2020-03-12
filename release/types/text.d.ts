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
    private static getCharTokens;
    /**
     * Get all word tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    private static getWordTokens;
    /**
     * Get all line tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    private static getLineTokens;
    /**
     * Compute all patch entries based on the text characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText: string, rhsText: string): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the text words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText: string, rhsText: string): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the text lines from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromLines(lhsText: string, rhsText: string): Types.Patch<string>[];
}
