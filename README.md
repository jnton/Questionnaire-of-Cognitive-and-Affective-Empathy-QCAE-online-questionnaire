# QCAE Online Questionnaire

A privacy-first, multilingual, static implementation of the **Questionnaire of Cognitive and Affective Empathy (QCAE)**.

## Why this rebuild exists

The previous application depended on an obsolete SurveyJS/jQuery setup, contained a broken PDF path, had no selectable locale, no scoring tests, and mixed software licensing with questionnaire-content rights.

This version:

- has no runtime dependencies or CDN scripts;
- sends no responses anywhere;
- uses semantic, keyboard-accessible HTML;
- keeps scoring in a pure tested module;
- supports the original 31-item model;
- supports the validated 30-item Portuguese variant, which excludes item 17;
- exports JSON and CSV locally;
- provides machine-readable instrument and result schemas;
- documents source and rights status per translation; and
- deploys as a static GitHub Pages site.

## Run locally

A local web server is required because browsers restrict `fetch()` from `file://` URLs.

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Test

Requires Node.js 20 or newer.

```sh
npm test
```

The test suite verifies reverse scoring, all score ranges, the Portuguese 30-item variant, maximum/minimum score vectors, missing-answer rejection, translation completeness, and one-to-one item/subscale assignment.

## Machine-readable resources

- `data/qcae.v1.json` — canonical instrument, variants, provenance, scoring metadata, and translations.
- `data/qcae.schema.json` — instrument schema.
- `data/results.schema.json` — export schema.
- `data/ui.json` — interface localization.
- `llms.txt` and `AGENTS.md` — guidance for AI agents and maintainers.

## Scoring

Original reverse-scored items: **1, 2, 17, and 29**.

Original 31-item ranges:

| Measure | Range |
|---|---:|
| Perspective taking | 10–40 |
| Online simulation | 9–36 |
| Emotion contagion | 4–16 |
| Proximal responsivity | 4–16 |
| Peripheral responsivity | 4–16 |
| Cognitive empathy | 19–76 |
| Affective empathy | 12–48 |
| Total | 31–124 |

The Portuguese validated variant excludes item 17; its total range is 30–120.

This application reports raw scores only. It does not diagnose, provide percentiles, or assign low/average/high labels.

## Deployment

GitHub Pages is a good fit because the product is deliberately static: no participant data needs a server. The included workflow validates the data and scoring before deploying the exact repository contents.

A custom domain can be added later without changing the application architecture.

## Rights and attribution

**Code:** AGPL-3.0-only.

**Questionnaire text:** not relicensed by AGPL. The original article states that the QCAE is copyrighted by its authors. See [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md) before reuse or deployment.

Primary source: Reniers et al. (2011), https://doi.org/10.1080/00223891.2010.528484
