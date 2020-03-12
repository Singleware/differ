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
   * Voided element names.
   */
  @Class.Private()
  private static voidedNames = new Set([
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]);

  /**
   * Get the node entity based on the specified input token.
   * @param token Input token.
   * @returns Returns the node entity.
   */
  @Class.Private()
  private static getNode(token: string): Types.Html.Node | undefined {
    if (token.startsWith('<') && token.endsWith('>')) {
      token = token.substr(1, token.length - 2).trim();
      if (token.startsWith('/')) {
        return {
          normal: false,
          ending: true
        };
      } else if (token.endsWith('/')) {
        return {
          normal: true,
          ending: false
        };
      } else {
        const index = token.indexOf(' ');
        const name = index !== -1 ? token.substr(0, index) : token;
        return {
          normal: !this.voidedNames.has(name.toLowerCase()),
          ending: false
        };
      }
    }
    return void 0;
  }

  /**
   * Get all tokens based on the specified HTML text and the splitter.
   * @param text HTML text.
   * @param splitter Text splitter.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private static getTokens(text: string, splitter?: string | RegExp): string[] {
    const list = [];
    for (const token of text.replace(/[\r\n]+/g, '').split(/(<[^>]+>)/)) {
      if (token.length > 0) {
        if (splitter !== void 0 && (!token.startsWith('<') || !token.endsWith('>'))) {
          list.push(...token.split(splitter).filter(token => token.length > 0));
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
  private static getCharTokens(text: string): string[] {
    return this.getTokens(text, '');
  }

  /**
   * Get all word tokens based on the specified HTML text.
   * @param text HTML text.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private static getWordTokens(text: string): string[] {
    return this.getTokens(text, /([\b\s]+)/);
  }

  /**
   * Get all block tokens based on the specified HTML text.
   * @param text HTML text.
   * @returns Returns an array containing all tokens.
   */
  @Class.Private()
  private static getBlockTokens(text: string): string[] {
    return this.getTokens(text);
  }

  /**
   * Get a new merged patches list from the specified input patches.
   * @param patches Input patches.
   * @returns Returns a new patch list.
   * @throws Throws an error when the HTML syntax is invalid.
   */
  @Class.Private()
  private static getMergedPatches(patches: Types.Patch<string>[]): Types.Patch<string>[] {
    const list = [];
    let level: Types.Html.Level | undefined;
    let previous;
    for (const patch of patches) {
      for (let index = 0; index < patch.values.length; ++index) {
        const value = patch.values[index];
        const node = this.getNode(value);
        if (node !== void 0) {
          if (node.normal) {
            level = { parent: level, action: patch.action };
          } else if (node.ending) {
            if (level === void 0) {
              throw new TypeError(`Invalid HTML syntax.`);
            } else {
              const values = patch.values.splice(0, index + 1);
              if (level.action !== patch.action) {
                if (previous !== void 0 && previous.action === level.action) {
                  previous.values.push(...values);
                } else {
                  list.push({ values: values, action: level.action });
                }
              } else {
                list.push({ values: values, action: level.action });
              }
              index = -1;
              level = level.parent;
            }
          }
        } else if (level !== void 0) {
          if (patch.action === Types.Action.None && patch.action !== level.action) {
            patch.action = level.action;
          }
        }
      }
      if (patch.values.length > 0) {
        previous = patch;
        list.push(patch);
      }
    }
    return list;
  }

  /**
   * Compute all patch entries based on the HTML characters from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromChars(lhsText: string, rhsText: string): Types.Patch<string>[] {
    return Html.getMergedPatches(this.difference(Html.getCharTokens(lhsText), Html.getCharTokens(rhsText)));
  }

  /**
   * Compute all patch entries based on the HTML words from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromWords(lhsText: string, rhsText: string): Types.Patch<string>[] {
    return Html.getMergedPatches(this.difference(Html.getWordTokens(lhsText), Html.getWordTokens(rhsText)));
  }

  /**
   * Compute all patch entries based on the HTML blocks from the specified LHS and RHS text.
   * @param lhsText Left-hand-side text.
   * @param rhsText Right-hand-side text.
   * @returns Returns all patch entries.
   */
  @Class.Public()
  public fromBlocks(lhsText: string, rhsText: string): Types.Patch<string>[] {
    return Html.getMergedPatches(this.difference(Html.getBlockTokens(lhsText), Html.getBlockTokens(rhsText)));
  }
}
