# QCAE Online Questionnaire

A privacy-first, multilingual, static implementation of the **Questionnaire of Cognitive and Affective Empathy (QCAE)** for humans, research software, and AI agents.

## Product

- Semantic, keyboard-accessible, one-question-at-a-time browser administration.
- No backend, analytics, cookies, accounts, CDN scripts, or participant-response storage.
- English, Serbian Latin, French, Portuguese (Portugal), provisional German, Turkish, Russian, and Korean interfaces.
- Validated 31-, 30-, 29-, and 26-item scoring variants.
- Local JSON/CSV export, clipboard copy, and print/save-to-PDF.
- Dependency-free JavaScript API and CLI.

## Run and test

```sh
python3 -m http.server 8000
npm test
```

## Programmatic scoring

```js
import { loadInstrument, scoreResponseDocument } from "./src/qcae-api.js";

const instrument = await loadInstrument(); // automatically merges locale packs
const result = scoreResponseDocument(instrument, {
  locale: "ko",
  responses: { "2": 2, "3": 3 /* all active items */ }
});
```

```sh
node bin/qcae-score.mjs --list-variants
node bin/qcae-score.mjs examples/responses.en.synthetic.json
```

## Machine-readable resources

- `data/capabilities.v1.json` — operations and discovery.
- `data/qcae.v1.json` — base instrument.
- `data/locale-packs.v1.json` — validated Russian and Korean item packs.
- `data/references.v1.json` and `data/reference-packs.v1.json` — publications and provenance.
- `data/ai-use-policy.v1.json` — explicit AI/TDM permission.
- `data/response-donation-consent.v1.json` — future optional response-donation template.
- `src/qcae-api.js` — merged local API.
- `llms.txt`, `llms-full.txt`, and `AGENTS.md` — agent guidance.

## Enabled versions

- Original English: 31 items.
- Serbian Latin: 31 items.
- French: 31 items.
- Portuguese (Portugal): validated 30-item version excluding original item 17.
- German: 31-item provisional wording pending reconciliation with the 2024 validation.
- Turkish: validated 31-item version.
- Russian: validated 29-item version excluding original items 1 and 17.
- Korean K-QCAE: validated 26-item version excluding original items 1, 14, 17, 18, and 28.

The Italian and Chinese papers validate 31-item forms but do not reproduce the exact translated items in the supplied PDFs, so those interfaces remain pending exact source wording.

## AI, TDM, and response data

The project sets `tdm-reservation=0`. AI training, fine-tuning, evaluation, benchmarking, embeddings, indexing, and TDM are expressly welcomed within `data/ai-use-policy.v1.json`.

Code is AGPL-3.0-only. Project-owned documentation, metadata, schemas, UI copy, and synthetic examples are dedicated under CC0-1.0.

The public site does not collect participant responses. Response datasets are valuable for training and may be released when genuinely anonymous or actively donated under dataset-specific terms. The repository includes a consent template but no active collection endpoint.
