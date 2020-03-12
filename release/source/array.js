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
 * Diff array, helper class.
 */
let Array = class Array extends base_1.Base {
    /**
     * Compute all patch entries based on the specified LHS and RHS arrays.
     * @param lhsArray Left-hand-side array.
     * @param rhsArray Right-hand-side array.
     * @returns Returns all patch entries.
     */
    fromItems(lhsArray, rhsArray) {
        return this.difference(lhsArray, rhsArray);
    }
};
__decorate([
    Class.Public()
], Array.prototype, "fromItems", null);
Array = __decorate([
    Class.Describe()
], Array);
exports.Array = Array;
//# sourceMappingURL=array.js.map