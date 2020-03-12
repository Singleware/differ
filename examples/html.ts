/*!
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Diff from '../source';

const textA = '<p>Hello <b>original</b></p>' + '<p>example</p>' + '<p>of a cool</p>' + '<p>diff algorithm!</p>';
const textB = '<p>Hello <b>example</b></p>' + '<p>of an</p>' + '<p>amazing</p>' + '<p>diff</p>' + '<p><b>algorithm!</b></p>';

/*
const textA =
  `<p>first paragraph of unchanged things</p>` +
  `<p>second paragraph of unchanged things</p>` +
  `<p>third paragraph of unchanged things</p>`;

const textB =
  `<p>first paragraph of unchanged things</p>` +
  `<p><br></p>` +
  `<p>second paragraph of unchanged things</p>` +
  `<p>third paragraph of unchanged things</p>`;
*/

const diff = new Diff.Html();
const patches = diff.fromWords(textA, textB);
const fragments = diff.optimize(patches);
const parts = [];

for (const fragment of fragments) {
  switch (fragment.action) {
    case Diff.Types.Action.Insert:
      parts.push(`+"${fragment.selection.join('')}"`);
      break;
    case Diff.Types.Action.Remove:
      parts.push(`-"${fragment.selection.join('')}"`);
      break;
    case Diff.Types.Action.Change:
      parts.push(`*"${fragment.replacement!.join('')}"/"${fragment.selection.join('')}"`);
      break;
    default:
      parts.push(` "${fragment.selection.join('')}"`);
  }
}

console.log('Parts');
console.dir(parts);
