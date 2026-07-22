import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { loadInstrument, loadReferenceRegistry } from "../src/qcae-api.js";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const instrument = await loadInstrument();
const baseInstrument = await readJson("../data/qcae.v1.json");
const compact = await readJson("../data/qcae.v1.min.json");
const baseUi = await readJson("../data/ui.json");
const uiPacks = await readJson("../data/ui-packs.v1.json");
const ui = structuredClone(baseUi);
for (const [locale, values] of Object.entries(uiPacks.locales ?? {})) {
  ui[locale] = { ...baseUi.en, ...(baseUi[locale] ?? {}), ...values };
}
const references = await loadReferenceRegistry();
const referenceIds = new Set(references.references.map((reference) => [reference.id, reference]));
const locales = Object.keys(instrument.variants);
const itemById = new Map(instrument.items.map((item) => [item.id, item]));

assert.equal(instrument.items.length, 31);
assert.deepEqual(instrument.items.map((item) => item.id), Array.from({ length: 31 }, (_, i) => i + 1));
assert.deepEqual(instrument.reverseScoredItems, [1, 2, 17, 29]);
assert.deepEqual(compact, baseInstrument, "Compact and readable base instrument files differ");
assert.equal(referenceIds.size, references.references.length, "Duplicate reference IDs");

const requiredUiKeys = Object.keys(ui.en).sort();
for (const locale of locales) {
  assert(ui[locale], `Missing UI locale ${locale}`);
  assert.deepEqual(Object.keys(ui[locale]).sort(), requiredUiKeys, `UI key mismatch for ${locale}`);
  assert.equal(ui[locale].rightsTitle.length > 0, true, `Missing source title for ${locale}`);
  assert.equal(ui[locale].rightsBody.length > 0, true, `Missing source body for ${locale}`);
  const variant = instrument.variants[locale];
  assert.equal(new Set(variant.items).size, variant.items.length, `Duplicate active item in ${locale}`);
  assert(variant.sources?.length, `Missing sources for ${locale}`);
  for (const id of variant.sources) assert(referenceIds.has(id), `Unknown reference '${id}' in ${locale}`);
  for (const id of variant.items) assert(itemById.get(id)?.text[locale], `Missing ${locale} text for active item ${id}`);
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
console.log("Instrument, locale packs, translations, variants, references, UI, and scoring metadata are internally consistent.");
