# Changelog

## 1.0.0 - 2026-07-22

- Replaced the SurveyJS/jQuery prototype with a dependency-free static application.
- Added accessible one-question-at-a-time navigation.
- Added English, Serbian Latin, French, Portuguese (Portugal), and German interfaces.
- Added locale provenance and confidence/status metadata.
- Added the validated 30-item Portuguese variant excluding item 17.
- Added pure scoring functions and automated tests.
- Added local JSON and CSV export and print-to-PDF support.
- Added machine-readable JSON schemas, `llms.txt`, and `AGENTS.md`.
- Added privacy, security, and questionnaire-content rights documentation.
- Corrected corrupt Unicode characters in French, Portuguese, and German source data.
- Corrected clear typographical errors in Serbian items 6 and 30 and Portuguese item 8.
- Corrected the French item 2 rendering of “play” to refer to a theatrical play.
- Corrected additional legacy spacing and clear transcription errors found during the final migration audit.
- Stabilized the completion timestamp across JSON, CSV, and clipboard exports.
