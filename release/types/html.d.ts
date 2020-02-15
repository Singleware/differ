import * as Types from './types';
import { Base } from './base';
/**
 * Diff html class.
 */
export declare class Html extends Base<string> {
    /**
     * Get all tokens based on the specified HTML text and the splitter.
     * @param text HTML text.
     * @param splitter Text splitter.
     * @returns Returns an array containing all tokens.
     */
    private getSplittedTokens;
    /**
     * Get all character tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    private getCharTokens;
    /**
     * Get all word tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    private getWordTokens;
    /**
     * Get all block tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    private getBlockTokens;
    /**
     * Compute the patch entries based on the HTML characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[];
    /**
     * Compute the patch entries based on the HTML words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the HTML blocks from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromBlocks(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[];
}
