import { activeItemIds, calculateRanges, scoreQcae } from "./scoring.js";

export const DEFAULT_INSTRUMENT_URL = new URL("../data/qcae.v1.json", import.meta.url);
export const DEFAULT_LOCALE_PACKS_URL = new URL("../data/locale-packs.v1.json", import.meta.url);
export const DEFAULT_REFERENCES_URL = new URL("../data/references.v1.json", import.meta.url);
export const DEFAULT_REFERENCE_PACKS_URL = new URL("../data/reference-packs.v1.json", import.meta.url);

async function loadJson(url) {
  const target = url instanceof URL ? url : new URL(url, import.meta.url);
  if (target.protocol === "file:") {
    const { readFile } = await import("node:fs/promises");
    return JSON.parse(await readFile(target, "utf8"));
  }
  const response = await fetch(target, { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load QCAE resource (${response.status}): ${target}`);
  return response.json();
}

export function applyLocalePacks(instrument, packs) {
  const merged = structuredClone(instrument);
  merged.variants ??= {};
  merged.responseScale.labels ??= {};
  const itemById = new Map(merged.items.map((item) => [item.id, item]));

  for (const [locale, pack] of Object.entries(packs?.locales ?? {})) {
    merged.variants[locale] = structuredClone(pack.variant);
    merged.responseScale.labels[locale] = [...pack.responseLabels];
    for (const [rawId, text] of Object.entries(pack.itemText ?? {})) {
      const item = itemById.get(Number(rawId));
      if (!item) throw new Error(`Locale pack '${locale}' references unknown item ${rawId}.`);
      item.text[locale] = text;
    }
  }
  if (packs?.instrumentVersion) merged.version = packs.instrumentVersion;
  merged.localePacks = {
    id: packs?.id ?? null,
    version: packs?.version ?? null,
    source: "./data/locale-packs.v1.json"
  };
  return merged;
}

export function applyReferencePacks(registry, packs) {
  const merged = structuredClone(registry);
  const referenceById = new Map(merged.references.map((reference) => [reference.id, reference]));

  for (const [id, update] of Object.entries(packs?.referenceUpdates ?? {})) {
    if (!referenceById.has(id)) throw new Error(`Reference pack updates unknown reference '${id}'.`);
    Object.assign(referenceById.get(id), structuredClone(update));
  }
  for (const [locale, mapping] of Object.entries(packs?.activeVariants ?? {})) {
    merged.activeVariants[locale] = structuredClone(mapping);
  }
  const remove = new Set(packs?.removeCandidateLocales ?? []);
  merged.integrationCandidates = merged.integrationCandidates.filter((candidate) => !remove.has(candidate.locale));
  merged.version = "1.1.0";
  merged.referencePacks = {
    id: packs?.id ?? null,
    version: packs?.version ?? null,
    source: "./data/reference-packs.v1.json"
  };
  return merged;
}

export async function loadInstrument(
  url = DEFAULT_INSTRUMENT_URL,
  localePacksUrl = DEFAULT_LOCALE_PACKS_URL
) {
  const [instrument, packs] = await Promise.all([loadJson(url), loadJson(localePacksUrl)]);
  return applyLocalePacks(instrument, packs);
}

export async function loadReferenceRegistry(
  url = DEFAULT_REFERENCES_URL,
  referencePacksUrl = DEFAULT_REFERENCE_PACKS_URL
) {
  const [registry, packs] = await Promise.all([loadJson(url), loadJson(referencePacksUrl)]);
  return applyReferencePacks(registry, packs);
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
