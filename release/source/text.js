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
 * Diff text class.
 */
let Text = class Text extends base_1.Base {
    /**
     * Get all character tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    getCharTokens(text) {
        return text.split('');
    }
    /**
     * Get all word tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    getWordTokens(text) {
        return text.split(/(\b|\s+)/);
    }
    /**
     * Get all line tokens based on the specified text.
     * @param text Text input.
     * @returns Returns an array containing all tokens.
     */
    getLineTokens(text) {
        return text.split(/^/m);
    }
    /**
     * Compute all patch entries based on the text characters from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromChars(lhsText, rhsText, group) {
        return this.buildDiff(this.getCharTokens(lhsText), this.getCharTokens(rhsText), (group !== null && group !== void 0 ? group : true));
    }
    /**
     * Compute all patch entries based on the text words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText, rhsText, group) {
        return this.buildDiff(this.getWordTokens(lhsText), this.getWordTokens(rhsText), (group !== null && group !== void 0 ? group : true));
    }
    /**
     * Compute all patch entries based on the text lines from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @param group Determines whether or not similar results should be grouped.
     * @returns Returns all patch entries.
     */
    fromLines(lhsText, rhsText, group) {
        return this.buildDiff(this.getLineTokens(lhsText), this.getLineTokens(rhsText), (group !== null && group !== void 0 ? group : true));
    }
};
__decorate([
    Class.Private()
], Text.prototype, "getCharTokens", null);
__decorate([
    Class.Private()
], Text.prototype, "getWordTokens", null);
__decorate([
    Class.Private()
], Text.prototype, "getLineTokens", null);
__decorate([
    Class.Public()
], Text.prototype, "fromChars", null);
__decorate([
    Class.Public()
], Text.prototype, "fromWords", null);
__decorate([
    Class.Public()
], Text.prototype, "fromLines", null);
Text = __decorate([
    Class.Describe()
], Text);
exports.Text = Text;
//# sourceMappingURL=text.js.map