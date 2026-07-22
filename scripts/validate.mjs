import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const instrument = JSON.parse(await readFile(new URL("../data/qcae.v1.json", import.meta.url)));
const ui = JSON.parse(await readFile(new URL("../data/ui.json", import.meta.url)));
const locales = Object.keys(instrument.variants);
assert.equal(instrument.items.length, 31);
assert.deepEqual(instrument.items.map((item) => item.id), Array.from({ length: 31 }, (_, i) => i + 1));
assert.deepEqual(instrument.reverseScoredItems, [1, 2, 17, 29]);
for (const locale of locales) {
  assert(ui[locale], `Missing UI locale ${locale}`);
  assert.equal(new Set(instrument.variants[locale].items).size, instrument.variants[locale].items.length);
  for (const item of instrument.items) assert(item.text[locale], `Missing ${locale} item ${item.id}`);
  assert.equal(instrument.responseScale.labels[locale].length, 4);
}
const assigned = new Map();
for (const subscale of instrument.subscales) {
  for (const item of subscale.items) {
    assert(!assigned.has(item), `Item ${item} appears in multiple subscales`);
    assigned.set(item, subscale.id);
  }
}
assert.equal(assigned.size, 31);
console.log("Instrument, translations, variants, and scoring metadata are internally consistent.");
