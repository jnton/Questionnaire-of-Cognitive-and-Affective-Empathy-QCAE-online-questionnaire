/**
 * Pure QCAE scoring functions.
 * No DOM access, storage, analytics, or network calls.
 */

export function scoreItem(response, reverseScored) {
  const value = Number(response);
  if (!Number.isInteger(value) || value < 1 || value > 4) {
    throw new RangeError("QCAE responses must be integers from 1 to 4.");
  }
  return reverseScored ? 5 - value : value;
}

export function activeItemIds(instrument, locale) {
  const variant = instrument.variants[locale] ?? instrument.variants.en;
  return [...variant.items];
}

export function calculateRanges(instrument, locale) {
  const active = new Set(activeItemIds(instrument, locale));
  const ranges = {};
  for (const subscale of instrument.subscales) {
    const count = subscale.items.filter((id) => active.has(id)).length;
    ranges[subscale.id] = { min: count, max: count * 4, itemCount: count };
  }
  const cognitiveIds = instrument.domains.find((d) => d.id === "cognitiveEmpathy").subscales;
  const affectiveIds = instrument.domains.find((d) => d.id === "affectiveEmpathy").subscales;
  const sumRange = (ids) => ids.reduce(
    (acc, id) => ({ min: acc.min + ranges[id].min, max: acc.max + ranges[id].max }),
    { min: 0, max: 0 }
  );
  ranges.cognitiveEmpathy = sumRange(cognitiveIds);
  ranges.affectiveEmpathy = sumRange(affectiveIds);
  ranges.total = {
    min: ranges.cognitiveEmpathy.min + ranges.affectiveEmpathy.min,
    max: ranges.cognitiveEmpathy.max + ranges.affectiveEmpathy.max
  };
  return ranges;
}

export function scoreQcae(instrument, locale, responses) {
  const ids = activeItemIds(instrument, locale);
  const responseMap = responses instanceof Map ? responses : new Map(Object.entries(responses).map(([k, v]) => [Number(k), v]));
  const missing = ids.filter((id) => !responseMap.has(id));
  if (missing.length) {
    throw new Error(`Missing required QCAE responses: ${missing.join(", ")}`);
  }

  const itemById = new Map(instrument.items.map((item) => [item.id, item]));
  const itemScores = [];
  const subscaleScores = Object.fromEntries(instrument.subscales.map((s) => [s.id, 0]));

  for (const id of ids) {
    const item = itemById.get(id);
    if (!item) throw new Error(`Unknown QCAE item: ${id}`);
    const response = Number(responseMap.get(id));
    const scoredValue = scoreItem(response, item.reverseScored);
    itemScores.push({ itemId: id, response, scoredValue, reverseScored: item.reverseScored, subscale: item.subscale });
    subscaleScores[item.subscale] += scoredValue;
  }

  const cognitiveEmpathy = subscaleScores.perspectiveTaking + subscaleScores.onlineSimulation;
  const affectiveEmpathy = subscaleScores.emotionContagion + subscaleScores.proximalResponsivity + subscaleScores.peripheralResponsivity;
  const total = cognitiveEmpathy + affectiveEmpathy;

  return {
    scoreModel: instrument.variants[locale]?.scoreModel ?? instrument.variants.en.scoreModel,
    subscales: subscaleScores,
    domains: { cognitiveEmpathy, affectiveEmpathy },
    total,
    ranges: calculateRanges(instrument, locale),
    items: itemScores
  };
}
