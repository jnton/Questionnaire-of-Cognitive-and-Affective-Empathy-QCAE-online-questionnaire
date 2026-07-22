# QCAE Online Questionnaire

A privacy-first, multilingual, static implementation of the **Questionnaire of Cognitive and Affective Empathy (QCAE)**.

## Product

- Semantic, keyboard-accessible, one-question-at-a-time browser administration.
- No backend, analytics, cookies, accounts, remote fonts, CDN scripts, or participant-response storage.
- English, Serbian Latin, French, Portuguese (Portugal), provisional German, and validated Turkish interfaces.
- Original 31-item scoring plus language-specific validated variants.
- Local JSON/CSV export, clipboard copy, and print/save-to-PDF.
- Raw scores only: no diagnosis or uncited normative classification.

Human-readable project pages:

- `about.html`
- `privacy.html`
- `rights.html`
- `references.html`
- `agents.html`

## Run locally

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Test

Requires Node.js 20 or newer.

```sh
npm test
```

## Programmatic scoring

```js
import { loadInstrument, scoreResponseDocument } from "./src/qcae-api.js";

const instrument = await loadInstrument();
const result = scoreResponseDocument(instrument, {
  locale: "en",
  responses: { "1": 2, "2": 3 /* all active items */ }
});
```

Command line:

```sh
node bin/qcae-score.mjs --list-variants
node bin/qcae-score.mjs examples/responses.en.synthetic.json
```

## Machine-readable resources

- `data/capabilities.v1.json` — versioned agent/developer discovery contract.
- `data/qcae.v1.json` and `.min.json` — canonical instrument and translations.
- `data/references.v1.json` — papers, provenance, and integration candidates.
- `data/qcae.schema.json` — instrument schema.
- `data/responses.schema.json` — scoring-input schema.
- `data/results.schema.json` — scoring-output schema.
- `src/qcae-api.js` — dependency-free local API.
- `llms.txt`, `llms-full.txt`, and `AGENTS.md` — agent guidance.

## Enabled versions and papers

Every enabled language maps to source IDs in `data/qcae.v1.json`; complete citations and DOI links are maintained in `data/references.v1.json` and rendered in `references.html`.

The Turkish form is sourced from Gıca et al. (2021), DOI `10.29399/npa.27248`, together with its 2024 correction, DOI `10.29399/npa.28743`. The current German wording remains provisional until reconciled against the validated 2024 German publication.

## Additional versions

Italian, Chinese, Russian, Korean, and validated German sources have been identified. They remain disabled where exact validated items or redistribution permissions are missing. Do not machine-translate questionnaire items as a substitute for a validated adaptation.

## Deployment

GitHub Pages is appropriate because the application deliberately has no response backend. GitHub Actions runs validation and tests before deploying `main`.

## Rights

**Code:** AGPL-3.0-only.

**Questionnaire text and translations:** language-specific third-party rights; not relicensed by AGPL.

**Participant responses:** controlled by the participant or data controller and not collected by this site. Training or redistribution requires appropriate consent, a lawful basis, and content permissions. See `rights.html` and `CONTENT-LICENSE.md`.
