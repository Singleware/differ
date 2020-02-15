"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Diff = require("../source");
const textA = 'Hello original diff algorithm!';
const textB = 'Hello modified example of algorithm for diff!';
const diff = new Diff.Text();
const patches = diff.fromWords(textA, textB);
const fragments = diff.optimize(patches);
const parts = [];
for (const fragment of fragments) {
    switch (fragment.action) {
        case 1 /* Insert */:
            parts.push(`+"${fragment.selection.join('')}"`);
            break;
        case 2 /* Remove */:
            parts.push(`-"${fragment.selection.join('')}"`);
            break;
        case 3 /* Change */:
            parts.push(`*"${fragment.replacement.join('')}"/"${fragment.selection.join('')}"`);
            break;
        default:
            parts.push(` "${fragment.selection.join('')}"`);
    }
}
console.log('Parts');
console.dir(parts);
//# sourceMappingURL=text.js.map