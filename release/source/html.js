"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Html_1;
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Types = require("./types");
const base_1 = require("./base");
/**
 * Diff html class.
 */
let Html = Html_1 = class Html extends base_1.Base {
    /**
     * Get the node entity based on the specified input token.
     * @param token Input token.
     * @returns Returns the node entity.
     */
    static getNode(token) {
        if (token.startsWith('<') && token.endsWith('>')) {
            token = token.substr(1, token.length - 2).trim();
            if (token.startsWith('/')) {
                return {
                    normal: false,
                    ending: true
                };
            }
            else if (token.endsWith('/')) {
                return {
                    normal: true,
                    ending: false
                };
            }
            else {
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
    static getTokens(text, splitter) {
        const list = [];
        for (const token of text.replace(/[\r\n]+/g, '').split(/(<[^>]+>)/)) {
            if (token.length > 0) {
                if (splitter !== void 0 && (!token.startsWith('<') || !token.endsWith('>'))) {
                    list.push(...token.split(splitter).filter(token => token.length > 0));
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
    static getCharTokens(text) {
        return this.getTokens(text, '');
    }
    /**
     * Get all word tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    static getWordTokens(text) {
        return this.getTokens(text, /([\b\s]+)/);
    }
    /**
     * Get all block tokens based on the specified HTML text.
     * @param text HTML text.
     * @returns Returns an array containing all tokens.
     */
    static getBlockTokens(text) {
        return this.getTokens(text);
    }
    /**
     * Get a new merged patches list from the specified input patches.
     * @param patches Input patches.
     * @returns Returns a new patch list.
     * @throws Throws an error when the HTML syntax is invalid.
     */
    static getMergedPatches(patches) {
        const list = [];
        let level;
        let previous;
        for (const patch of patches) {
            for (let index = 0; index < patch.values.length; ++index) {
                const value = patch.values[index];
                const node = this.getNode(value);
                if (node !== void 0) {
                    if (node.normal) {
                        level = { parent: level, action: patch.action };
                    }
                    else if (node.ending) {
                        if (level === void 0) {
                            throw new TypeError(`Invalid HTML syntax.`);
                        }
                        else {
                            const values = patch.values.splice(0, index + 1);
                            if (level.action !== patch.action) {
                                if (previous !== void 0 && previous.action === level.action) {
                                    previous.values.push(...values);
                                }
                                else {
                                    list.push({ values: values, action: level.action });
                                }
                            }
                            else {
                                list.push({ values: values, action: level.action });
                            }
                            index = -1;
                            level = level.parent;
                        }
                    }
                }
                else if (level !== void 0) {
                    if (patch.action === 0 /* None */ && patch.action !== level.action) {
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
    fromChars(lhsText, rhsText) {
        return Html_1.getMergedPatches(this.difference(Html_1.getCharTokens(lhsText), Html_1.getCharTokens(rhsText)));
    }
    /**
     * Compute all patch entries based on the HTML words from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromWords(lhsText, rhsText) {
        return Html_1.getMergedPatches(this.difference(Html_1.getWordTokens(lhsText), Html_1.getWordTokens(rhsText)));
    }
    /**
     * Compute all patch entries based on the HTML blocks from the specified LHS and RHS text.
     * @param lhsText Left-hand-side text.
     * @param rhsText Right-hand-side text.
     * @returns Returns all patch entries.
     */
    fromBlocks(lhsText, rhsText) {
        return Html_1.getMergedPatches(this.difference(Html_1.getBlockTokens(lhsText), Html_1.getBlockTokens(rhsText)));
    }
};
/**
 * Voided element names.
 */
Html.voidedNames = new Set([
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
__decorate([
    Class.Public()
], Html.prototype, "fromChars", null);
__decorate([
    Class.Public()
], Html.prototype, "fromWords", null);
__decorate([
    Class.Public()
], Html.prototype, "fromBlocks", null);
__decorate([
    Class.Private()
], Html, "voidedNames", void 0);
__decorate([
    Class.Private()
], Html, "getNode", null);
__decorate([
    Class.Private()
], Html, "getTokens", null);
__decorate([
    Class.Private()
], Html, "getCharTokens", null);
__decorate([
    Class.Private()
], Html, "getWordTokens", null);
__decorate([
    Class.Private()
], Html, "getBlockTokens", null);
__decorate([
    Class.Private()
], Html, "getMergedPatches", null);
Html = Html_1 = __decorate([
    Class.Describe()
], Html);
exports.Html = Html;
//# sourceMappingURL=html.js.map