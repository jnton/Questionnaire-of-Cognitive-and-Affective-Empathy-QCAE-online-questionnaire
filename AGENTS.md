# AGENTS.md

## Project purpose
Maintain a trustworthy, privacy-first, static QCAE questionnaire.

## Non-negotiable invariants
1. Never transmit, persist, log, or embed participant responses in URLs.
2. Keep scoring in `src/scoring.js` as pure functions.
3. Preserve reverse-scored items 1, 2, 17, and 29 for the original 31-item model.
4. Preserve the Portuguese validated variant's exclusion of item 17.
5. Do not add normative labels, diagnoses, or percentiles without a cited population-specific dataset and explicit maintainer review.
6. Do not silently rewrite validated item translations.
7. Do not claim questionnaire wording is licensed under AGPL.
8. Avoid third-party runtime dependencies, trackers, analytics, fonts, or CDNs.

## Verification
Run:

```sh
npm test
```

Before changing item text, update source/provenance metadata in `data/qcae.v1.json` and document the change in `CHANGELOG.md`.

## Architecture
- `index.html`: semantic shell.
- `src/app.js`: browser UI.
- `src/scoring.js`: pure scoring.
- `data/qcae.v1.json`: canonical instrument definition.
- `data/*.schema.json`: machine-readable contracts.
- `tests/`: scoring and integrity checks.
