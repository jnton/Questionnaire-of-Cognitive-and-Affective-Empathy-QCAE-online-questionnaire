import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("human navigation does not send visitors to raw policy Markdown", async () => {
  const index = await read("../index.html");
  assert.match(index, /privacy\.html/);
  assert.match(index, /rights\.html/);
  assert.match(index, /references\.html/);
  assert.doesNotMatch(index, /href="\.\/PRIVACY\.md"/);
  assert.doesNotMatch(index, /href="\.\/CONTENT-LICENSE\.md"/);
});

test("agent and reference documents expose stable machine-readable paths", async () => {
  const agents = await read("../agents.html");
  const llms = await read("../llms.txt");
  assert.match(agents, /capabilities\.v1\.json/);
  assert.match(agents, /qcae-api\.js/);
  assert.match(llms, /responses\.schema\.json/);
  assert.match(llms, /rights\.html/);
});

test("static deployment documents no response collection or donation workflow", async () => {
  const files = [
    "../README.md",
    "../AGENTS.md",
    "../llms.txt",
    "../llms-full.txt",
    "../agents.html",
    "../rights.html",
    "../CONTENT-LICENSE.md",
    "../data/README.md",
    "../data/capabilities.v1.json",
    "../data/ai-use-policy.v1.json"
  ];
  for (const file of files) {
    const text = await read(file);
    assert.doesNotMatch(text, /response-donation|donation endpoint|donation workflow/i, file);
  }
  await assert.rejects(access(new URL("../data/response-donation-consent.v1.json", import.meta.url)));
});
