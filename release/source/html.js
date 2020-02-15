"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const base_1 = require("./base");
/**
 * Diff html class.
 */
let Html = class Html extends base_1.Base {
    /**
     * Get all tokens based on the specified HTML text and the splitter.
     * @param text HTML text.
     * @param splitter Text splitter.
     * @returns Returns an array containing all tokens.
     */
    getSplittedTokens(text, splitter) {
        const list = [];
        for (const token of text.split(/(<[^>]+>)/)) {
            if (token.length > 0) {
                if (!token.startsWith('<') || !token.endsWith('>')) {
                    list.push(...token.split(splitter));
                }
                else {
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
    getCharTokens(text) {
        return this.getSplittedTokens(text, '');
    }
    /**
     * Get all word tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    getWordTokens(text) {
        return this.getSplittedTokens(text, /(\s+)/);
    }
    /**
     * Get all block tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    getBlockTokens(text) {
        return text.split(/(<[^>]+>)/).filter(token => token.length > 0);
    }
    /**
     * Compute the patch entries based on the HTML characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText, rhsText, group) {
        return this.buildDiff(this.getCharTokens(lhsText), this.getCharTokens(rhsText), (group !== null && group !== void 0 ? group : true));
    }
    /**
     * Compute the patch entries based on the HTML words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText, rhsText, group) {
        return this.buildDiff(this.getWordTokens(lhsText), this.getWordTokens(rhsText), (group !== null && group !== void 0 ? group : true));
    }
    /**
     * Compute all patch entries based on the HTML blocks from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromBlocks(lhsText, rhsText, group) {
        return this.buildDiff(this.getBlockTokens(lhsText), this.getBlockTokens(rhsText), (group !== null && group !== void 0 ? group : true));
    }
};
__decorate([
    Class.Private()
], Html.prototype, "getSplittedTokens", null);
__decorate([
    Class.Private()
], Html.prototype, "getCharTokens", null);
__decorate([
    Class.Private()
], Html.prototype, "getWordTokens", null);
__decorate([
    Class.Private()
], Html.prototype, "getBlockTokens", null);
__decorate([
    Class.Public()
], Html.prototype, "fromChars", null);
__decorate([
    Class.Public()
], Html.prototype, "fromWords", null);
__decorate([
    Class.Public()
], Html.prototype, "fromBlocks", null);
Html = __decorate([
    Class.Describe()
], Html);
exports.Html = Html;
//# sourceMappingURL=html.js.map