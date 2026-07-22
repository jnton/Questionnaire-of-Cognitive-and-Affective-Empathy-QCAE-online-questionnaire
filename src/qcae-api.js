import { activeItemIds, calculateRanges, scoreQcae } from "./scoring.js";

export const DEFAULT_INSTRUMENT_URL = new URL("../data/qcae.v1.json", import.meta.url);

export async function loadInstrument(url = DEFAULT_INSTRUMENT_URL) {
  const target = url instanceof URL ? url : new URL(url, DEFAULT_INSTRUMENT_URL);
  if (target.protocol === "file:") {
    const { readFile } = await import("node:fs/promises");
    return JSON.parse(await readFile(target, "utf8"));
  }
  const response = await fetch(target, { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load QCAE instrument (${response.status}).`);
  return response.json();
}

export function listVariants(instrument) {
  return Object.entries(instrument.variants).map(([locale, variant]) => ({
    locale,
    status: variant.status,
    scoreModel: variant.scoreModel,
    itemCount: variant.items.length,
    referenceIds: [...(variant.sources ?? [])],
    note: variant.note ?? null
  }));
}

export function getVariant(instrument, locale = "en") {
  const variant = instrument.variants[locale];
  if (!variant) throw new RangeError(`Unsupported QCAE locale: ${locale}`);
  return {
    locale,
    ...variant,
    itemCount: variant.items.length,
    ranges: calculateRanges(instrument, locale)
  };
}

export function normalizeResponses(value) {
  const source = value?.responses ?? value;
  if (source instanceof Map) return new Map(source);
  if (Array.isArray(source)) {
    return new Map(source.map((entry) => {
      if (Array.isArray(entry)) return [Number(entry[0]), Number(entry[1])];
      return [Number(entry.itemId ?? entry.id), Number(entry.response ?? entry.value)];
    }));
  }
  if (source && typeof source === "object") {
    return new Map(Object.entries(source).map(([id, response]) => [Number(id), Number(response)]));
  }
  throw new TypeError("Responses must be an object, an array, or a document with a responses field.");
}

export function validateResponseDocument(instrument, document) {
  const errors = [];
  const warnings = [];
  const locale = document?.locale ?? "en";
  if (document?.instrument && document.instrument !== instrument.id) {
    errors.push(`Expected instrument '${instrument.id}', received '${document.instrument}'.`);
  }
  if (!instrument.variants[locale]) errors.push(`Unsupported locale '${locale}'.`);
  let responses;
  try {
    responses = normalizeResponses(document);
  } catch (error) {
    errors.push(error.message);
    return { valid: false, errors, warnings, locale, responses: new Map() };
  }
  if (instrument.variants[locale]) {
    const expected = new Set(activeItemIds(instrument, locale));
    const missing = [...expected].filter((id) => !responses.has(id));
    const extra = [...responses.keys()].filter((id) => !expected.has(id));
    if (missing.length) errors.push(`Missing required responses: ${missing.join(", ")}.`);
    if (extra.length) warnings.push(`Responses not used by the '${locale}' variant: ${extra.join(", ")}.`);
    for (const [id, response] of responses) {
      if (!Number.isInteger(id) || id < 1 || id > 31) errors.push(`Invalid item id '${id}'.`);
      if (!Number.isInteger(response) || response < 1 || response > 4) {
        errors.push(`Item ${id} must have an integer response from 1 to 4.`);
      }
    }
  }
  return { valid: errors.length === 0, errors, warnings, locale, responses };
}

export function scoreResponseDocument(instrument, document, options = {}) {
  const validation = validateResponseDocument(instrument, document);
  if (!validation.valid) throw new Error(validation.errors.join(" "));
  const locale = validation.locale;
  const result = scoreQcae(instrument, locale, validation.responses);
  const itemById = new Map(instrument.items.map((item) => [item.id, item]));
  const completedAt = options.completedAt ?? document.completedAt ?? new Date().toISOString();
  return {
    $schema: options.schema ?? "./data/results.schema.json",
    instrument: instrument.id,
    instrumentVersion: instrument.version,
    scoreModel: result.scoreModel,
    locale,
    completedAt,
    privacy: "Generated locally; the scoring library does not transmit or persist responses.",
    provenance: {
      variantStatus: instrument.variants[locale].status,
      referenceIds: [...(instrument.variants[locale].sources ?? [])],
      implementation: "qcae-online-questionnaire",
      implementationVersion: instrument.version
    },
    scores: {
      subscales: result.subscales,
      domains: result.domains,
      total: result.total,
      ranges: result.ranges
    },
    responses: result.items.map((entry) => ({
      ...entry,
      text: itemById.get(entry.itemId).text[locale] ?? itemById.get(entry.itemId).text.en
    })),
    warnings: validation.warnings
  };
}
