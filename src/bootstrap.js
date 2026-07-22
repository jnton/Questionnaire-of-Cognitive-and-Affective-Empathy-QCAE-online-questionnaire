import { applyLocalePacks, applyReferencePacks } from "./qcae-api.js";

const nativeFetch = globalThis.fetch.bind(globalThis);
const basePath = new URL("../", import.meta.url);
let instrumentPromise;
let uiPromise;
let referencesPromise;

async function json(path) {
  const response = await nativeFetch(new URL(path, basePath), { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load ${path} (${response.status}).`);
  return response.json();
}

function jsonResponse(value) {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

async function mergedInstrument() {
  instrumentPromise ??= Promise.all([
    json("data/qcae.v1.json"),
    json("data/locale-packs.v1.json")
  ]).then(([instrument, packs]) => applyLocalePacks(instrument, packs));
  return instrumentPromise;
}

async function mergedUi() {
  uiPromise ??= Promise.all([
    json("data/ui.json"),
    json("data/ui-packs.v1.json")
  ]).then(([ui, packs]) => {
    const merged = { ...ui };
    for (const [locale, values] of Object.entries(packs.locales ?? {})) {
      merged[locale] = { ...ui.en, ...values };
    }
    return merged;
  });
  return uiPromise;
}

async function mergedReferences() {
  referencesPromise ??= Promise.all([
    json("data/references.v1.json"),
    json("data/reference-packs.v1.json")
  ]).then(([registry, packs]) => applyReferencePacks(registry, packs));
  return referencesPromise;
}

globalThis.fetch = async (input, init) => {
  const requestUrl = new URL(input instanceof Request ? input.url : input, location.href);
  if (requestUrl.pathname.endsWith("/data/qcae.v1.json")) return jsonResponse(await mergedInstrument());
  if (requestUrl.pathname.endsWith("/data/ui.json")) return jsonResponse(await mergedUi());
  if (requestUrl.pathname.endsWith("/data/references.v1.json")) return jsonResponse(await mergedReferences());
  return nativeFetch(input, init);
};

await import("./app.js");
