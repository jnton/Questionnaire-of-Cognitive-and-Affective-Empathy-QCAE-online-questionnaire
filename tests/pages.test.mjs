import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const locales = ["en", "fr", "pt", "de", "tr", "ru", "ko", "sr"];

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
    "../README.md", "../AGENTS.md", "../llms.txt", "../llms-full.txt", "../agents.html",
    "../rights.html", "../CONTENT-LICENSE.md", "../data/README.md",
    "../data/capabilities.v1.json", "../data/ai-use-policy.v1.json"
  ];
  for (const file of files) {
    const text = await read(file);
    assert.doesNotMatch(text, /response-donation|donation endpoint|donation workflow/i, file);
  }
  await assert.rejects(access(new URL("../data/response-donation-consent.v1.json", import.meta.url)));
});

test("homepage exposes crawlable content, social metadata, structured data, and alternates", async () => {
  const index = await read("../index.html");
  assert.match(index, /<h1>Questionnaire of Cognitive and Affective Empathy<\/h1>/);
  assert.match(index, /application\/ld\+json/);
  assert.match(index, /"@type": "WebApplication"/);
  assert.match(index, /property="og:image"/);
  assert.match(index, /name="twitter:card"/);
  assert.match(index, /hreflang="x-default"/);
  for (const locale of ["en", "fr", "pt", "de", "tr", "ru", "ko", "sr-Latn"]) {
    assert.match(index, new RegExp(`hreflang="${locale}"`));
  }
});

test("every supported language has a static indexable landing page", async () => {
  for (const locale of locales) {
    const page = await read(`../${locale}/index.html`);
    assert.match(page, /<h1>/, locale);
    assert.match(page, /rel="canonical"/, locale);
    assert.match(page, /hreflang="x-default"/, locale);
    assert.match(page, /property="og:title"/, locale);
    assert.match(page, /\.\.\/\?lang=/, locale);
  }
});

test("sitemap prioritizes canonical human pages", async () => {
  const sitemap = await read("../sitemap.xml");
  for (const locale of locales) assert.match(sitemap, new RegExp(`/${locale}/`));
  assert.match(sitemap, /xhtml:link/);
  assert.match(sitemap, /<lastmod>/);
  assert.doesNotMatch(sitemap, /llms\.txt|\.json<\/loc>/);
});

test("manifest and discoverability assets are complete", async () => {
  const manifest = JSON.parse(await read("../manifest.webmanifest"));
  assert.equal(manifest.name, "QCAE Online Questionnaire");
  assert(manifest.icons?.length > 0);
  assert(manifest.shortcuts?.length > 0);
  await access(new URL("../assets/favicon.svg", import.meta.url));
  await access(new URL("../assets/qcae-social-card.svg", import.meta.url));
  const notFound = await read("../404.html");
  assert.match(notFound, /noindex,follow/);
});
