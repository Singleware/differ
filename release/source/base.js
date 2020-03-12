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
const Types = require("./types");
/**
 * Diff base class.
 */
let Base = class Base extends Class.Null {
    /**
     * Build the comparison table based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @returns Returns the comparison table.
     */
    buildTable(lhsItems, rhsItems) {
        var _a;
        const table = [];
        let rows = new Uint32Array(rhsItems.length);
        for (let lhsIndex = 0; lhsIndex < lhsItems.length; lhsIndex++) {
            let diagonal = 0;
            table[lhsIndex] = rows = rows.slice();
            for (let rhsIndex = 0; rhsIndex < rhsItems.length; rhsIndex++) {
                const latch = rows[rhsIndex];
                if (lhsItems[lhsIndex] === rhsItems[rhsIndex]) {
                    rows[rhsIndex] = diagonal + 1;
                }
                else {
                    const previous = (_a = rows[rhsIndex - 1]) !== null && _a !== void 0 ? _a : 0;
                    if (previous > rows[rhsIndex]) {
                        rows[rhsIndex] = previous;
                    }
                }
                diagonal = latch;
            }
        }
        return table;
    }
    /**
     * Get all the different patch entries based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @returns Returns all patch entries.
     */
    difference(lhsItems, rhsItems) {
        const list = [];
        const table = this.buildTable(lhsItems, rhsItems);
        let patch;
        let action;
        let value;
        for (let lhsIndex = lhsItems.length - 1, rhsIndex = rhsItems.length - 1; lhsIndex > -1 || rhsIndex > -1;) {
            if (lhsIndex < 0) {
                action = 1 /* Insert */;
                value = rhsItems[rhsIndex--];
            }
            else if (rhsIndex < 0) {
                action = 2 /* Remove */;
                value = lhsItems[lhsIndex--];
            }
            else if (lhsItems[lhsIndex] === rhsItems[rhsIndex]) {
                action = 0 /* None */;
                value = lhsItems[lhsIndex--];
                rhsIndex--;
            }
            else {
                const lhsResult = lhsIndex > 0 ? table[lhsIndex - 1][rhsIndex] : -1;
                const rhsResult = rhsIndex > 0 ? table[lhsIndex][rhsIndex - 1] : -1;
                if (lhsResult < rhsResult) {
                    action = 1 /* Insert */;
                    value = rhsItems[rhsIndex--];
                }
                else {
                    action = 2 /* Remove */;
                    value = lhsItems[lhsIndex--];
                }
            }
            if (patch === void 0 || patch.action !== action) {
                patch = { values: [value], action: action };
                list.push(patch);
            }
            else {
                patch.values.unshift(value);
            }
        }
        return list.reverse();
    }
    /**
     * Optimize the specified patch entries into a fragment list.
     * @param patches Patch entries.
     * @returns Returns the fragment list.
     */
    optimize(patches) {
        const list = [];
        let previous;
        let index = 0;
        for (const patch of patches) {
            switch (patch.action) {
                case 0 /* None */:
                    if (previous === void 0 || previous.action !== 0 /* None */) {
                        list.push((previous = { index: index++, selection: [...patch.values], action: patch.action }));
                    }
                    else {
                        previous.selection.push(...patch.values);
                    }
                    break;
                case 1 /* Insert */:
                    if (previous === void 0 || previous.action === 0 /* None */) {
                        list.push((previous = { index: index++, selection: [...patch.values], action: patch.action }));
                    }
                    else if (previous.action === 2 /* Remove */) {
                        previous.replacement = patch.values;
                        previous.action = 3 /* Change */;
                    }
                    else if (previous.action === 3 /* Change */) {
                        previous.replacement.push(...patch.values);
                    }
                    else {
                        previous.selection.push(...patch.values);
                    }
                    break;
                case 2 /* Remove */:
                    if (previous === void 0 || previous.action === 0 /* None */) {
                        list.push((previous = { index: index++, selection: [...patch.values], action: patch.action }));
                    }
                    else if (previous.action === 1 /* Insert */) {
                        previous.replacement = previous.selection;
                        previous.selection = patch.values;
                        previous.action = 3 /* Change */;
                    }
                    else {
                        previous.selection.push(...patch.values);
                    }
                    break;
            }
        }
        return list;
    }
};
__decorate([
    Class.Private()
], Base.prototype, "buildTable", null);
__decorate([
    Class.Protected()
], Base.prototype, "difference", null);
__decorate([
    Class.Public()
], Base.prototype, "optimize", null);
Base = __decorate([
    Class.Describe()
], Base);
exports.Base = Base;
//# sourceMappingURL=base.js.map