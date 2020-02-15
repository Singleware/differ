/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from './types';

import { Base } from './base';

/**
 * Diff html class.
 */
@Class.Describe()
export class Html extends Base<string> {
  /**
   * Get all tokens based on the specified HTML text and the splitter.
   * @param text HTML text.
   * @param splitter Text splitter.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getSplittedTokens(text: string, splitter: string | RegExp): string[] {
    const list = [];
    for (const token of text.split(/(<[^>]+>)/)) {
      if (token.length > 0) {
        if (!token.startsWith('<') || !token.endsWith('>')) {
          list.push(...token.split(splitter));
        } else {
          list.push(token);
        }
      }
    }
    return list;
  }

  /**
   * Get all character tokens based on the specified HTML text.
   * @param text HTML text.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getCharTokens(text: string): string[] {
    return this.getSplittedTokens(text, '');
  }

  /**
   * Get all word tokens based on the specified HTML text.
   * @param text HTML text.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getWordTokens(text: string): string[] {
    return this.getSplittedTokens(text, /(\s+)/);
  }

  /**
   * Get all block tokens based on the specified HTML text.
   * @param text HTML text.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getBlockTokens(text: string): string[] {
    return text.split(/(<[^>]+>)/).filter(token => token.length > 0);
  }

  /**
   * Compute the patch entries based on the HTML characters from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @param group Determines whether or not similar results should be grouped.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromChars(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[] {
    return this.buildDiff(this.getCharTokens(lhsText), this.getCharTokens(rhsText), group ?? true);
  }

  /**
   * Compute the patch entries based on the HTML words from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @param group Determines whether or not similar results should be grouped.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromWords(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[] {
    return this.buildDiff(this.getWordTokens(lhsText), this.getWordTokens(rhsText), group ?? true);
  }

  /**
   * Compute all patch entries based on the HTML blocks from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @param group Determines whether or not similar results should be grouped.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromBlocks(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[] {
    return this.buildDiff(this.getBlockTokens(lhsText), this.getBlockTokens(rhsText), group ?? true);
  }
}
