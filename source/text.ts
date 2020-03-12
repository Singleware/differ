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
  private static getCharTokens(text: string): string[] {
    return text.split('');
  }

  /**
   * Get all word tokens based on the specified text.
   * @param text Text input.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private static getWordTokens(text: string): string[] {
    return text.split(/([\b\s]+)/);
  }

  /**
   * Get all line tokens based on the specified text.
   * @param text Text input.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private static getLineTokens(text: string): string[] {
    return text.split(/^/m);
  }

  /**
   * Compute all patch entries based on the text characters from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromChars(lhsText: string, rhsText: string): Types.Patch<string>[] {
    return this.difference(Text.getCharTokens(lhsText), Text.getCharTokens(rhsText));
  }

  /**
   * Compute all patch entries based on the text words from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromWords(lhsText: string, rhsText: string): Types.Patch<string>[] {
    return this.difference(Text.getWordTokens(lhsText), Text.getWordTokens(rhsText));
  }

  /**
   * Compute all patch entries based on the text lines from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromLines(lhsText: string, rhsText: string): Types.Patch<string>[] {
    return this.difference(Text.getLineTokens(lhsText), Text.getLineTokens(rhsText));
  }
}
