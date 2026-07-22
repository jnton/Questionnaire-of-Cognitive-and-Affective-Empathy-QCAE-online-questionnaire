import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { listVariants, normalizeResponses, scoreResponseDocument, validateResponseDocument } from "../src/qcae-api.js";

const instrument = JSON.parse(await readFile(new URL("../data/qcae.v1.json", import.meta.url), "utf8"));

test("agent API lists every configured variant", () => {
  const variants = listVariants(instrument);
  assert.deepEqual(variants.map((variant) => variant.locale), Object.keys(instrument.variants));
  assert.equal(variants.find((variant) => variant.locale === "tr").itemCount, 31);
  assert.equal(variants.find((variant) => variant.locale === "pt-PT").itemCount, 30);
});

test("response normalization accepts objects, arrays, and maps", () => {
  assert.equal(normalizeResponses({ "1": 2 }).get(1), 2);
  assert.equal(normalizeResponses([{ itemId: 1, response: 3 }]).get(1), 3);
  assert.equal(normalizeResponses(new Map([[1, 4]])).get(1), 4);
});

test("API emits a schema-conformant deterministic result document", () => {
  const responses = Object.fromEntries(instrument.items.map((item) => [item.id, item.reverseScored ? 1 : 4]));
  const document = { instrument: "qcae", locale: "tr", completedAt: "2026-07-22T00:00:00.000Z", responses };
  const validation = validateResponseDocument(instrument, document);
  assert.equal(validation.valid, true);
  const result = scoreResponseDocument(instrument, document);
  assert.equal(result.total, undefined);
  assert.equal(result.scores.total, 124);
  assert.equal(result.locale, "tr");
  assert.deepEqual(result.provenance.referenceIds, ["gica-2021", "gica-2024-correction"]);
  assert.equal(result.completedAt, document.completedAt);
});

test("Portuguese extra item 17 is reported but not scored", () => {
  const responses = Object.fromEntries(instrument.items.map((item) => [item.id, 2]));
  const validation = validateResponseDocument(instrument, { locale: "pt-PT", responses });
  assert.equal(validation.valid, true);
  assert.match(validation.warnings.join(" "), /17/);
  const result = scoreResponseDocument(instrument, { locale: "pt-PT", responses });
  assert.equal(result.responses.length, 30);
});

test("CLI scores the synthetic fixture without dependencies", () => {
  const run = spawnSync(process.execPath, [fileURLToPath(new URL("../bin/qcae-score.mjs", import.meta.url)), fileURLToPath(new URL("../examples/responses.en.synthetic.json", import.meta.url))], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const result = JSON.parse(run.stdout);
  assert.equal(result.instrument, "qcae");
  assert.equal(result.locale, "en");
  assert.equal(result.responses.length, 31);
});
