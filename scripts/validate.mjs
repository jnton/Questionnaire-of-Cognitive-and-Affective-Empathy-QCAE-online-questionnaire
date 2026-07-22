import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const instrument = await readJson("../data/qcae.v1.json");
const compact = await readJson("../data/qcae.v1.min.json");
const ui = await readJson("../data/ui.json");
const references = await readJson("../data/references.v1.json");
const referenceIds = new Set(references.references.map((reference) => reference.id));
const locales = Object.keys(instrument.variants);

assert.equal(instrument.items.length, 31);
assert.deepEqual(instrument.items.map((item) => item.id), Array.from({ length: 31 }, (_, i) => i + 1));
assert.deepEqual(instrument.reverseScoredItems, [1, 2, 17, 29]);
assert.deepEqual(compact, instrument, "Compact and readable instrument files differ");
assert.equal(referenceIds.size, references.references.length, "Duplicate reference IDs");

const requiredUiKeys = Object.keys(ui.en).sort();
for (const locale of locales) {
  assert(ui[locale], `Missing UI locale ${locale}`);
  assert.deepEqual(Object.keys(ui[locale]).sort(), requiredUiKeys, `UI key mismatch for ${locale}`);
  const variant = instrument.variants[locale];
  assert.equal(new Set(variant.items).size, variant.items.length, `Duplicate active item in ${locale}`);
  assert(variant.sources?.length, `Missing sources for ${locale}`);
  for (const id of variant.sources) assert(referenceIds.has(id), `Unknown reference '${id}' in ${locale}`);
  for (const item of instrument.items) assert(item.text[locale], `Missing ${locale} item ${item.id}`);
  assert.equal(instrument.responseScale.labels[locale].length, 4);
}

for (const [locale, mapping] of Object.entries(references.activeVariants)) {
  assert(instrument.variants[locale], `References list inactive locale ${locale}`);
  assert.deepEqual(mapping.referenceIds, instrument.variants[locale].sources, `Reference mapping mismatch for ${locale}`);
}

const assigned = new Map();
for (const subscale of instrument.subscales) {
  for (const item of subscale.items) {
    assert(!assigned.has(item), `Item ${item} appears in multiple subscales`);
    assigned.set(item, subscale.id);
  }
}
assert.equal(assigned.size, 31);
console.log("Instrument, translations, variants, references, UI, and scoring metadata are internally consistent.");
