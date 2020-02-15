/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';

import * as Types from './types';

import { Base } from './base';

/**
 * Diff text class.
 */
@Class.Describe()
export class Text extends Base<string> {
  /**
   * Get all character tokens based on the specified text.
   * @param text Text input.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getCharTokens(text: string): string[] {
    return text.split('');
  }

  /**
   * Get all word tokens based on the specified text.
   * @param text Text input.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getWordTokens(text: string): string[] {
    return text.split(/(\b|\s+)/);
  }

  /**
   * Get all line tokens based on the specified text.
   * @param text Text input.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private getLineTokens(text: string): string[] {
    return text.split(/^/m);
  }

  /**
   * Compute all patch entries based on the text characters from the specified LHS and RHS text.
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
   * Compute all patch entries based on the text words from the specified LHS and RHS text.
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
   * Compute all patch entries based on the text lines from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @param group Determines whether or not similar results should be grouped.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromLines(lhsText: string, rhsText: string, group?: boolean): Types.Patch<string>[] {
    return this.buildDiff(this.getLineTokens(lhsText), this.getLineTokens(rhsText), group ?? true);
  }
}
