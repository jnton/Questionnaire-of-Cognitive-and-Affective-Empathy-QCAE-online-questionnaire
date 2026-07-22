import test from "node:test";
import assert from "node:assert/strict";
import { scoreItem, scoreQcae, calculateRanges } from "../src/scoring.js";
import { loadInstrument } from "../src/qcae-api.js";

const instrument = await loadInstrument();

test("item scoring validates and reverses correctly", () => {
  assert.equal(scoreItem(1, false), 1);
  assert.equal(scoreItem(4, false), 4);
  assert.equal(scoreItem(1, true), 4);
  assert.equal(scoreItem(4, true), 1);
  assert.throws(() => scoreItem(0, false), RangeError);
  assert.throws(() => scoreItem(5, false), RangeError);
});

test("original 31-item ranges are correct", () => {
  const ranges = calculateRanges(instrument, "en");
  assert.deepEqual(ranges.perspectiveTaking, { min: 10, max: 40, itemCount: 10 });
  assert.deepEqual(ranges.onlineSimulation, { min: 9, max: 36, itemCount: 9 });
  assert.deepEqual(ranges.emotionContagion, { min: 4, max: 16, itemCount: 4 });
  assert.deepEqual(ranges.proximalResponsivity, { min: 4, max: 16, itemCount: 4 });
  assert.deepEqual(ranges.peripheralResponsivity, { min: 4, max: 16, itemCount: 4 });
  assert.deepEqual(ranges.cognitiveEmpathy, { min: 19, max: 76 });
  assert.deepEqual(ranges.affectiveEmpathy, { min: 12, max: 48 });
  assert.deepEqual(ranges.total, { min: 31, max: 124 });
});

test("Portuguese validated 30-item ranges exclude item 17", () => {
  const ranges = calculateRanges(instrument, "pt-PT");
  assert.deepEqual(ranges.peripheralResponsivity, { min: 3, max: 12, itemCount: 3 });
  assert.deepEqual(ranges.affectiveEmpathy, { min: 11, max: 44 });
  assert.deepEqual(ranges.total, { min: 30, max: 120 });
});

test("Turkish validated 31-item ranges use the original item set", () => {
  const ranges = calculateRanges(instrument, "tr");
  assert.deepEqual(ranges.total, { min: 31, max: 124 });
  assert.deepEqual(ranges.cognitiveEmpathy, { min: 19, max: 76 });
  assert.deepEqual(ranges.affectiveEmpathy, { min: 12, max: 48 });
});

test("Russian validated 29-item ranges exclude original items 1 and 17", () => {
  const ranges = calculateRanges(instrument, "ru");
  assert.deepEqual(ranges.perspectiveTaking, { min: 10, max: 40, itemCount: 10 });
  assert.deepEqual(ranges.onlineSimulation, { min: 8, max: 32, itemCount: 8 });
  assert.deepEqual(ranges.peripheralResponsivity, { min: 3, max: 12, itemCount: 3 });
  assert.deepEqual(ranges.cognitiveEmpathy, { min: 18, max: 72 });
  assert.deepEqual(ranges.affectiveEmpathy, { min: 11, max: 44 });
  assert.deepEqual(ranges.total, { min: 29, max: 116 });
});

test("Korean validated 26-item ranges preserve its published item set", () => {
  const ranges = calculateRanges(instrument, "ko");
  assert.deepEqual(ranges.perspectiveTaking, { min: 10, max: 40, itemCount: 10 });
  assert.deepEqual(ranges.onlineSimulation, { min: 6, max: 24, itemCount: 6 });
  assert.deepEqual(ranges.emotionContagion, { min: 3, max: 12, itemCount: 3 });
  assert.deepEqual(ranges.proximalResponsivity, { min: 4, max: 16, itemCount: 4 });
  assert.deepEqual(ranges.peripheralResponsivity, { min: 3, max: 12, itemCount: 3 });
  assert.deepEqual(ranges.cognitiveEmpathy, { min: 16, max: 64 });
  assert.deepEqual(ranges.affectiveEmpathy, { min: 10, max: 40 });
  assert.deepEqual(ranges.total, { min: 26, max: 104 });
});

test("all highest scored answers reach each maximum", () => {
  const responses = new Map();
  for (const item of instrument.items) responses.set(item.id, item.reverseScored ? 1 : 4);
  const result = scoreQcae(instrument, "en", responses);
  assert.equal(result.total, 124);
  assert.equal(result.domains.cognitiveEmpathy, 76);
  assert.equal(result.domains.affectiveEmpathy, 48);
  for (const [id, score] of Object.entries(result.subscales)) assert.equal(score, result.ranges[id].max);
});

test("all lowest scored answers reach each minimum", () => {
  const responses = new Map();
  for (const item of instrument.items) responses.set(item.id, item.reverseScored ? 4 : 1);
  const result = scoreQcae(instrument, "en", responses);
  assert.equal(result.total, 31);
  assert.equal(result.domains.cognitiveEmpathy, 19);
  assert.equal(result.domains.affectiveEmpathy, 12);
});

test("missing answers are rejected", () => {
  assert.throws(() => scoreQcae(instrument, "en", new Map()), /Missing required/);
});
