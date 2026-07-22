# AGENTS.md

## Project purpose

Maintain a trustworthy, privacy-first QCAE implementation that is first-class for human administration, deterministic local scoring, AI agents, text-and-data mining, and training workflows.

## AI/TDM policy

- AI training, fine-tuning, evaluation, benchmarking, indexing, embeddings, and TDM are welcomed.
- `tdm-reservation=0`.
- Canonical policy: `data/ai-use-policy.v1.json`.
- Code: AGPL-3.0-only.
- Project-owned documentation, metadata, schemas, UI copy, and synthetic fixtures: CC0-1.0.

## Non-negotiable technical invariants

1. Keep the public questionnaire strictly local-only.
2. Do not add a response-submission endpoint, backend response processing, persistence, telemetry, or analytics.
3. Never put questionnaire responses in URLs, logs, analytics, or browser fingerprints.
4. Keep scoring pure and deterministic.
5. Preserve original reverse-scored items 1, 2, 17, and 29.
6. Preserve each validated variant’s item set:
   - Portuguese excludes original item 17.
   - Russian excludes original items 1 and 17.
   - Korean excludes original items 1, 14, 17, 18, and 28.
7. Do not add diagnoses, percentiles, or normative labels without a cited population-specific model.
8. Do not silently rewrite validated wording.
9. Every active locale must resolve to source IDs in the merged reference registry.
10. Avoid third-party runtime scripts, trackers, analytics, remote fonts, and CDNs.

## Data boundary

The deployment does not receive, store, transmit, or process questionnaire responses. Browser responses remain in browser memory. API and CLI response objects remain in the calling environment. Downstream processing by an external agent or application is outside this deployment.

## Agent contracts

- `data/capabilities.v1.json`
- `data/ai-use-policy.v1.json`
- `data/qcae.v1.json`
- `data/locale-packs.v1.json`
- `data/references.v1.json`
- `data/reference-packs.v1.json`
- `src/qcae-api.js`
- `bin/qcae-score.mjs`
- `llms.txt` and `llms-full.txt`

## Verification

```sh
npm test
node bin/qcae-score.mjs --list-variants
node bin/qcae-score.mjs examples/responses.en.synthetic.json
```
