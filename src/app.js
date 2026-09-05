import { activeItemIds, scoreQcae } from "./scoring.js";
import { scoreResponseDocument } from "./qcae-api.js";

const state = {
  instrument: null,
  uiAll: null,
  references: null,
  locale: "en",
  screen: "intro",
  index: 0,
  responses: new Map(),
  result: null,
  completedAt: null
};

const els = {
  app: document.querySelector("#app"),
  language: document.querySelector("#language-select"),
  status: document.querySelector("#status")
};

function showFatalError() {
  if (!els.app) return;
  const message = "The questionnaire data could not be loaded. Please reload the page.";
  const status = els.status ?? h("p", { id: "status" });
  status.textContent = message;
  status.className = "fatal-error";
  status.setAttribute("role", "alert");
  if (!status.isConnected) els.app.prepend(status);
  els.app.setAttribute("aria-busy", "false");
}

function supportedLocales() {
  return Object.keys(state.instrument?.variants ?? {});
}

function preferredLocale() {
  const params = new URLSearchParams(location.search);
  const requested = params.get("lang");
  if (supportedLocales().includes(requested)) return requested;
  const candidates = navigator.languages ?? [navigator.language];
  for (const candidate of candidates) {
    if (candidate.toLowerCase().startsWith("sr")) return "sr-Latn";
    if (candidate.toLowerCase().startsWith("pt")) return "pt-PT";
    const short = candidate.split("-")[0];
    if (supportedLocales().includes(short)) return short;
  }
  return "en";
}

function t(key) {
  return state.uiAll?.[state.locale]?.[key] ?? state.uiAll?.en?.[key] ?? key;
}

function itemText(item) {
  return item.text[state.locale] ?? item.text.en;
}

function setDocumentLanguage() {
  document.documentElement.lang = state.locale;
  document.title = `${t("appTitle")} — QCAE`;
}

function setLanguageOptions() {
  els.language.replaceChildren();
  for (const locale of supportedLocales()) {
    const option = document.createElement("option");
    option.value = locale;
    option.textContent = state.uiAll[locale].languageName;
    els.language.append(option);
  }
  els.language.value = state.locale;
  els.language.setAttribute("aria-label", t("selectLanguage"));
}

function h(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, String(value));
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

function variantNotice() {
  const variant = state.instrument.variants[state.locale];
  if (variant.noticeKey) return t(variant.noticeKey);
  if (variant.status.includes("provisional")) return t("provisionalWarning");
  return "";
}

function renderIntro() {
  const notice = variantNotice();
  const noticeElement = notice
    ? h("aside", { class: "notice", role: "note" },
      h("strong", {}, t("languageStatus")),
      h("p", {}, notice)
    )
    : document.createDocumentFragment();
  const consent = h("input", { type: "checkbox", id: "consent" });
  const start = h("button", { id: "start-questionnaire", class: "button button-primary", type: "button", disabled: true, onClick: () => {
    state.screen = "question";
    state.index = 0;
    render();
  }}, t("start"));
  consent.addEventListener("change", () => { start.disabled = !consent.checked; });

  els.app.replaceChildren(
    h("section", { class: "hero" },
      h("p", { class: "eyebrow" }, "QCAE · 2011"),
      h("h1", {}, t("appTitle")),
      h("p", { class: "lead" }, t("appSubtitle"))
    ),
    h("section", { class: "info-grid", "aria-label": t("introTitle") },
      infoCard("✓", t("introTitle"), t("introBody")),
      infoCard("○", t("privacyTitle"), t("privacyBody")),
      infoCard("§", t("rightsTitle"), t("rightsBody"))
    ),
    noticeElement,
    h("label", { class: "consent-row", for: "consent" }, consent, h("span", {}, t("consent"))),
    h("div", { class: "actions" }, start),
    sourceDetails()
  );
}

function infoCard(icon, title, body) {
  return h("article", { class: "info-card" },
    h("span", { class: "info-icon", "aria-hidden": "true" }, icon),
    h("h2", {}, title),
    h("p", {}, body)
  );
}

function sourceDetails() {
  const variant = state.instrument.variants[state.locale];
  const referenceById = new Map(state.references.references.map((reference) => [reference.id, reference]));
  const sourceItems = (variant.sources ?? ["reniers-2011"]).map((id) => referenceById.get(id)).filter(Boolean);
  const details = h("details", { class: "details", id: "sources-methodology" },
    h("summary", {}, t("source")),
    h("p", {}, t("method")),
    h("p", {}, t("variantSourcesIntro")),
    h("ul", { class: "source-list" }, sourceItems.map((reference) =>
      h("li", {}, h("a", { href: reference.url, rel: "external noopener" }, `${reference.title} (${reference.year})`))
    )),
    h("p", { class: "resource-links" },
      h("a", { href: "./references.html" }, t("referencesLabel")),
      " · ",
      h("a", { href: "./data/qcae.v1.json", type: "application/json" }, "Instrument JSON"),
      " · ",
      h("a", { href: "./agents.html" }, t("agentsLabel")),
      " · ",
      h("a", { href: "./rights.html" }, t("rightsLabel")),
      " · ",
      h("a", { href: "./privacy.html" }, t("privacyLabel"))
    )
  );
  return details;
}

function activeItems() {
  const ids = new Set(activeItemIds(state.instrument, state.locale));
  return state.instrument.items.filter((item) => ids.has(item.id));
}

function renderQuestion() {
  const items = activeItems();
  const item = items[state.index];
  const current = state.responses.get(item.id);
  const form = h("form", { id: "qcae-question-form", class: "question-card", "data-qcae-item-id": item.id, "data-qcae-locale": state.locale });
  const fieldset = h("fieldset", {});
  fieldset.append(
    h("legend", {},
      h("span", { class: "question-number" }, `${t("question")} ${state.index + 1} ${t("of")} ${items.length}`),
      h("span", { class: "question-text" }, itemText(item))
    )
  );
  const labels = state.instrument.responseScale.labels[state.locale] ?? state.instrument.responseScale.labels.en;
  const options = h("div", { class: "response-list" });
  labels.forEach((label, idx) => {
    const value = idx + 1;
    const input = h("input", { type: "radio", name: "response", id: `response-${value}`, value, required: true, "data-qcae-response": value });
    input.checked = current === value;
    options.append(h("label", { class: "response-option", for: `response-${value}` },
      input,
      h("span", { class: "response-value", "aria-hidden": "true" }, value),
      h("span", {}, label)
    ));
  });
  fieldset.append(options);
  const error = h("p", { class: "form-error", role: "alert", hidden: true }, t("required"));
  const back = h("button", { id: "previous-question", type: "button", class: "button button-secondary", onClick: () => {
    if (state.index === 0) state.screen = "intro";
    else state.index -= 1;
    render();
  }}, t("back"));
  const next = h("button", { id: "next-question", type: "submit", class: "button button-primary" }, state.index === items.length - 1 ? t("finish") : t("continue"));
  form.append(fieldset, error, h("div", { class: "actions actions-between" }, back, next));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const response = data.get("response");
    if (!response) {
      error.hidden = false;
      return;
    }
    state.responses.set(item.id, Number(response));
    if (state.index < items.length - 1) {
      state.index += 1;
      render();
      document.querySelector("legend")?.focus?.();
    } else {
      state.result = scoreQcae(state.instrument, state.locale, state.responses);
      state.completedAt = new Date().toISOString();
      state.screen = "results";
      render();
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  });

  const progress = Math.round(((state.index + 1) / items.length) * 100);
  els.app.replaceChildren(
    h("div", { class: "progress-wrap" },
      h("div", { class: "progress-meta" }, h("span", {}, t("progress")), h("span", {}, `${progress}%`)),
      h("progress", { max: 100, value: progress }, `${progress}%`)
    ),
    form
  );
}

function scoreRow(label, value, range, kind) {
  return h("tr", {},
    h("th", { scope: "row" }, label),
    h("td", {}, String(value)),
    h("td", {}, `${range.min}–${range.max}`),
    h("td", {}, kind)
  );
}

function resultExport() {
  return scoreResponseDocument(state.instrument, {
    instrument: state.instrument.id,
    instrumentVersion: state.instrument.version,
    locale: state.locale,
    completedAt: state.completedAt,
    responses: state.responses
  }, { completedAt: state.completedAt });
}

function download(name, type, text) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = h("a", { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function resultsCsv(data) {
  const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
  const rows = [["item_id","response","scored_value","reverse_scored","subscale","text"]];
  data.responses.forEach((r) => rows.push([r.itemId,r.response,r.scoredValue,r.reverseScored,r.subscale,r.text]));
  return rows.map((row) => row.map(quote).join(",")).join("\n") + "\n";
}

function renderResults() {
  const r = state.result;
  const ranges = r.ranges;
  const table = h("table", { class: "scores-table" },
    h("caption", {}, t("resultsTitle")),
    h("thead", {}, h("tr", {}, h("th", { scope: "col" }, t("subscale")), h("th", { scope: "col" }, t("score")), h("th", { scope: "col" }, t("possibleRange")), h("th", { scope: "col" }, t("domain")))),
    h("tbody", {},
      scoreRow(t("perspectiveTaking"), r.subscales.perspectiveTaking, ranges.perspectiveTaking, t("cognitiveEmpathy")),
      scoreRow(t("onlineSimulation"), r.subscales.onlineSimulation, ranges.onlineSimulation, t("cognitiveEmpathy")),
      scoreRow(t("emotionContagion"), r.subscales.emotionContagion, ranges.emotionContagion, t("affectiveEmpathy")),
      scoreRow(t("proximalResponsivity"), r.subscales.proximalResponsivity, ranges.proximalResponsivity, t("affectiveEmpathy")),
      scoreRow(t("peripheralResponsivity"), r.subscales.peripheralResponsivity, ranges.peripheralResponsivity, t("affectiveEmpathy"))
    )
  );
  const data = resultExport();
  const details = h("details", { class: "details response-details" },
    h("summary", {}, t("answerSummary")),
    h("div", { class: "table-scroll" },
      h("table", { class: "answers-table" },
        h("thead", {}, h("tr", {}, h("th", {}, "#"), h("th", {}, t("question")), h("th", {}, t("response")), h("th", {}, t("scoredValue")))),
        h("tbody", {}, data.responses.map((entry) => h("tr", {},
          h("td", {}, entry.itemId),
          h("td", {}, entry.text),
          h("td", {}, entry.response),
          h("td", {}, entry.scoredValue)
        )))
      )
    )
  );

  const copyButton = h("button", { type: "button", class: "button button-secondary", onClick: async (event) => {
    await navigator.clipboard.writeText(JSON.stringify(resultExport(), null, 2));
    event.currentTarget.textContent = t("copied");
  }}, t("copy"));

  els.app.replaceChildren(
    h("section", { class: "results-header", id: "qcae-results", "data-qcae-score-model": r.scoreModel },
      h("p", { class: "eyebrow" }, "QCAE"),
      h("h1", {}, t("resultsTitle")),
      h("p", { class: "lead" }, t("resultsNote"))
    ),
    h("div", { class: "domain-cards" },
      resultCard(t("cognitiveEmpathy"), r.domains.cognitiveEmpathy, ranges.cognitiveEmpathy),
      resultCard(t("affectiveEmpathy"), r.domains.affectiveEmpathy, ranges.affectiveEmpathy),
      resultCard(t("total"), r.total, ranges.total)
    ),
    h("div", { class: "table-scroll" }, table),
    h("div", { class: "actions result-actions" },
      h("button", { type: "button", class: "button button-secondary", onClick: () => {
        const exportData = resultExport();
        download("qcae-results.json", "application/json", JSON.stringify(exportData, null, 2) + "\n");
      }}, t("downloadJson")),
      h("button", { type: "button", class: "button button-secondary", onClick: () => {
        const exportData = resultExport();
        download("qcae-responses.csv", "text/csv;charset=utf-8", resultsCsv(exportData));
      }}, t("downloadCsv")),
      copyButton,
      h("button", { type: "button", class: "button button-secondary", onClick: () => window.print() }, t("print"))
    ),
    details,
    sourceDetails(),
    h("div", { class: "actions" },
      h("button", { type: "button", class: "button button-primary", onClick: () => {
        state.responses.clear();
        state.result = null;
        state.completedAt = null;
        state.index = 0;
        state.screen = "intro";
        render();
      }}, t("restart"))
    )
  );
}

function resultCard(label, value, range) {
  return h("article", { class: "result-card" },
    h("h2", {}, label),
    h("p", { class: "result-value" }, String(value)),
    h("p", { class: "result-range" }, `${t("possibleRange")}: ${range.min}–${range.max}`)
  );
}

function render() {
  setDocumentLanguage();
  setLanguageOptions();
  if (state.screen === "intro") renderIntro();
  else if (state.screen === "question") renderQuestion();
  else renderResults();
}

async function init() {
  try {
    if (!els.app || !els.language) throw new Error("The questionnaire application shell is unavailable.");
    const [instrumentResponse, uiResponse, referencesResponse] = await Promise.all([
      fetch("./data/qcae.v1.json", { cache: "no-store" }),
      fetch("./data/ui.json", { cache: "no-store" }),
      fetch("./data/references.v1.json", { cache: "no-store" })
    ]);
    if (!instrumentResponse.ok || !uiResponse.ok || !referencesResponse.ok) throw new Error("Failed to load data");
    state.instrument = await instrumentResponse.json();
    state.uiAll = await uiResponse.json();
    state.references = await referencesResponse.json();
    state.locale = preferredLocale();
    els.language.addEventListener("change", () => {
      state.locale = els.language.value;
      state.responses.clear();
      state.index = 0;
      state.result = null;
      state.completedAt = null;
      state.screen = "intro";
      const url = new URL(location.href);
      url.searchParams.set("lang", state.locale);
      history.replaceState(null, "", url);
      render();
    });
    els.status?.remove();
    els.app.setAttribute("aria-busy", "false");
    globalThis.QCAE_APP = Object.freeze({
      version: state.instrument.version,
      capabilitiesUrl: new URL("./data/capabilities.v1.json", location.href).href,
      getLocale: () => state.locale,
      getVariant: () => structuredClone(state.instrument.variants[state.locale]),
      getProgress: () => ({ screen: state.screen, current: state.index + 1, answered: state.responses.size, total: activeItems().length }),
      getResult: () => state.result ? structuredClone(resultExport()) : null
    });
    render();
  } catch (error) {
    console.error(error);
    showFatalError();
  }
}

init();
