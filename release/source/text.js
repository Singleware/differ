"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Text_1;
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const base_1 = require("./base");
/**
 * Diff text class.
 */
let Text = Text_1 = class Text extends base_1.Base {
    /**
     * Get all character tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    static getCharTokens(text) {
        return text.split('');
    }
    /**
     * Get all word tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    static getWordTokens(text) {
        return text.split(/([\b\s]+)/);
    }
    /**
     * Get all line tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    static getLineTokens(text) {
        return text.split(/^/m);
    }
    /**
     * Compute all patch entries based on the text characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText, rhsText) {
        return this.difference(Text_1.getCharTokens(lhsText), Text_1.getCharTokens(rhsText));
    }
    /**
     * Compute all patch entries based on the text words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText, rhsText) {
        return this.difference(Text_1.getWordTokens(lhsText), Text_1.getWordTokens(rhsText));
    }
    /**
     * Compute all patch entries based on the text lines from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromLines(lhsText, rhsText) {
        return this.difference(Text_1.getLineTokens(lhsText), Text_1.getLineTokens(rhsText));
    }
};
__decorate([
    Class.Public()
], Text.prototype, "fromChars", null);
__decorate([
    Class.Public()
], Text.prototype, "fromWords", null);
__decorate([
    Class.Public()
], Text.prototype, "fromLines", null);
__decorate([
    Class.Private()
], Text, "getCharTokens", null);
__decorate([
    Class.Private()
], Text, "getWordTokens", null);
__decorate([
    Class.Private()
], Text, "getLineTokens", null);
Text = Text_1 = __decorate([
    Class.Describe()
], Text);
exports.Text = Text;
//# sourceMappingURL=text.js.map