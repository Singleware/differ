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
                    const previous = (_a = rows[rhsIndex - 1], (_a !== null && _a !== void 0 ? _a : 0));
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
     * Build all patch entries based on the specified comparison table, LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @param table Comparison table.
     * @param group Determines whether or not the similar results should be grouped.
     * @returns Returns the patch entries.
     */
    buildPatches(lhsItems, rhsItems, table, group) {
        const list = [];
        let currentPatch;
        let currentAction;
        let currentValue;
        for (let lhsIndex = lhsItems.length - 1, rhsIndex = rhsItems.length - 1; lhsIndex > -1 || rhsIndex > -1;) {
            if (lhsIndex < 0) {
                currentAction = 1 /* Insert */;
                currentValue = rhsItems[rhsIndex--];
            }
            else if (rhsIndex < 0) {
                currentAction = 2 /* Remove */;
                currentValue = lhsItems[lhsIndex--];
            }
            else if (lhsItems[lhsIndex] === rhsItems[rhsIndex]) {
                currentAction = 0 /* None */;
                currentValue = lhsItems[lhsIndex--];
                rhsIndex--;
            }
            else {
                const lhsResult = lhsIndex > 0 ? table[lhsIndex - 1][rhsIndex] : -1;
                const rhsResult = rhsIndex > 0 ? table[lhsIndex][rhsIndex - 1] : -1;
                if (lhsResult < rhsResult) {
                    currentAction = 1 /* Insert */;
                    currentValue = rhsItems[rhsIndex--];
                }
                else {
                    currentAction = 2 /* Remove */;
                    currentValue = lhsItems[lhsIndex--];
                }
            }
            if (!group || currentPatch === void 0 || currentPatch.action !== currentAction) {
                currentPatch = { values: [currentValue], action: currentAction };
                list.push(currentPatch);
            }
            else {
                currentPatch.values.unshift(currentValue);
            }
        }
        return list.reverse();
    }
    /**
     * Build the first patch entry based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @returns Returns the first patch entry or undefined.
     */
    buildFirstPatch(lhsItems, rhsItems) {
        let offset = 0;
        while (offset < lhsItems.length && offset < rhsItems.length && lhsItems[offset] === rhsItems[offset]) {
            offset++;
        }
        if (offset > 0) {
            return { values: lhsItems.slice(0, offset), action: 0 /* None */ };
        }
        return void 0;
    }
    /**
     * Build the diff based on the specified LHS and RHS items.
     * @param lhsItems Left-hand-side items.
     * @param rhsItems Right-hand-side items.
     * @param group Determines whether or not the results should be grouped.
     * @returns Returns all patch entries.
     */
    buildDiff(lhsItems, rhsItems, group) {
        const first = this.buildFirstPatch(lhsItems, rhsItems);
        if (first !== void 0) {
            const lhsPart = lhsItems.slice(first.values.length);
            const rhsPart = rhsItems.slice(first.values.length);
            return [first, ...this.buildPatches(lhsPart, rhsPart, this.buildTable(lhsPart, rhsPart), group)];
        }
        return this.buildPatches(lhsItems, rhsItems, this.buildTable(lhsItems, rhsItems), group);
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
                    list.push((previous = { index: index, selection: patch.values.slice(), action: patch.action }));
                    break;
                case 1 /* Insert */:
                    if (previous === void 0 || previous.action !== 3 /* Change */) {
                        list.push((previous = { index: index, selection: patch.values.slice(), action: patch.action }));
                    }
                    else {
                        previous.replacement.push(...patch.values);
                    }
                    break;
                case 2 /* Remove */:
                    if (previous === void 0 || previous.action === 0 /* None */) {
                        list.push((previous = { index: index, selection: patch.values.slice(), action: patch.action }));
                    }
                    else if (previous.action === 3 /* Change */) {
                        previous.selection.push(...patch.values);
                    }
                    else if (previous.action === 1 /* Insert */) {
                        previous.replacement = previous.selection;
                        previous.selection = patch.values;
                        previous.action = 3 /* Change */;
                    }
                    index--;
                    break;
            }
            index++;
        }
        return list;
    }
};
__decorate([
    Class.Protected()
], Base.prototype, "buildTable", null);
__decorate([
    Class.Protected()
], Base.prototype, "buildPatches", null);
__decorate([
    Class.Private()
], Base.prototype, "buildFirstPatch", null);
__decorate([
    Class.Protected()
], Base.prototype, "buildDiff", null);
__decorate([
    Class.Public()
], Base.prototype, "optimize", null);
Base = __decorate([
    Class.Describe()
], Base);
exports.Base = Base;
//# sourceMappingURL=base.js.map