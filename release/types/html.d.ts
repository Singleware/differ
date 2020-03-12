import * as Types from './types';
import { Base } from './base';
/**
 * Diff html class.
 */
export declare class Html extends Base<string> {
    /**
     * Voided element names.
     */
    private static voidedNames;
    /**
     * Get the node entity based on the specified input token.
     * @param token Input token.
     * @returns Returns the node entity.
     */
    private static getNode;
    /**
     * Get all tokens based on the specified HTML text and the splitter.
     * @param text HTML text.
     * @param splitter Text splitter.
     * @returns Returns an array containing all tokens.
     */
    private static getTokens;
    /**
     * Get all character tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    private static getCharTokens;
    /**
     * Get all word tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    private static getWordTokens;
    /**
     * Get all block tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    private static getBlockTokens;
    /**
     * Get a new merged patches list from the specified input patches.
     * @param patches Input patches.
     * @returns Returns a new patch list.
     * @throws Throws an error when the HTML syntax is invalid.
     */
    private static getMergedPatches;
    /**
     * Compute all patch entries based on the HTML characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText: string, rhsText: string): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the HTML words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText: string, rhsText: string): Types.Patch<string>[];
    /**
     * Compute all patch entries based on the HTML blocks from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromBlocks(lhsText: string, rhsText: string): Types.Patch<string>[];
}
