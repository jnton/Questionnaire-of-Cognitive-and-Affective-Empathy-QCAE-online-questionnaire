#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import process from "node:process";
import { listVariants, loadInstrument, scoreResponseDocument } from "../src/qcae-api.js";

const instrument = await loadInstrument();
const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

if (args.includes("--help") || args.includes("-h")) {
  process.stdout.write(`QCAE local scorer\n\nUsage:\n  qcae-score [--locale en] [--compact] [file|-]\n  qcae-score --list-variants\n\nInput may be a response document or an object mapping item ids to responses 1-4.\nIf no file is supplied, JSON is read from standard input.\n`);
  process.exit(0);
}

if (args.includes("--list-variants")) {
  process.stdout.write(JSON.stringify(listVariants(instrument), null, 2) + "\n");
  process.exit(0);
}

const locale = valueAfter("--locale") ?? "en";
const positional = args.filter((arg, index) => {
  if (["--locale"].includes(args[index - 1])) return false;
  return !arg.startsWith("-") || arg === "-";
});
const inputPath = positional[0] ?? "-";
const inputText = inputPath === "-"
  ? await new Promise((resolve, reject) => {
      let data = "";
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (chunk) => { data += chunk; });
      process.stdin.on("end", () => resolve(data));
      process.stdin.on("error", reject);
    })
  : await readFile(inputPath, "utf8");

try {
  const parsed = JSON.parse(inputText);
  const document = parsed.responses ? { ...parsed, locale: parsed.locale ?? locale } : { locale, responses: parsed };
  const result = scoreResponseDocument(instrument, document);
  process.stdout.write(JSON.stringify(result, null, args.includes("--compact") ? 0 : 2) + "\n");
} catch (error) {
  process.stderr.write(`qcae-score: ${error.message}\n`);
  process.exitCode = 1;
}
