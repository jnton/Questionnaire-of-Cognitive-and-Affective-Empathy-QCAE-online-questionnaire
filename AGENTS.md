# AGENTS.md

## Project purpose
Maintain a trustworthy, privacy-first, static QCAE questionnaire that supports both semantic browser interaction and deterministic local programmatic scoring.

## Non-negotiable invariants
1. Never transmit, persist, log, or embed participant responses in URLs.
2. Keep scoring in pure functions and keep `src/qcae-api.js` free of telemetry and persistence.
3. Preserve reverse-scored items 1, 2, 17, and 29 for the original 31-item model.
4. Preserve each validated variant's item set, including Portuguese exclusion of item 17.
5. Do not add normative labels, diagnoses, or percentiles without a cited population-specific dataset and explicit maintainer review.
6. Do not silently rewrite validated item translations, even when wording appears stylistically unusual.
7. Every enabled locale must list its source/reference IDs in `data/qcae.v1.json` and those IDs must resolve in `data/references.v1.json`.
8. Do not claim questionnaire wording, translations, or participant responses are licensed under AGPL.
9. Avoid third-party runtime dependencies, trackers, analytics, fonts, CDNs, and response-submission endpoints.
10. Keep human-facing policy links on rendered `.html` pages; retain Markdown files for repository and machine use.

## Agent contracts
- `data/capabilities.v1.json`: discovery and operations.
- `data/responses.schema.json`: input.
- `data/results.schema.json`: output.
- `src/qcae-api.js`: local API.
- `bin/qcae-score.mjs`: local CLI.
- `llms.txt` and `llms-full.txt`: discovery and full instructions.

## Verification
Run:

```sh
npm test
node bin/qcae-score.mjs --list-variants
node bin/qcae-score.mjs examples/responses.en.synthetic.json > /tmp/qcae-result.json
```

Before changing item text, update source/provenance metadata and document the change in `CHANGELOG.md`.
