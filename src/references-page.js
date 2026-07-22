const target = document.querySelector("#reference-content");
const languageNames = { en: "English", "sr-Latn": "Serbian Latin", fr: "French", "pt-PT": "Portuguese (Portugal)", de: "German", tr: "Turkish" };

function h(tag, attributes = {}, ...children) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
  for (const child of children.flat()) node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  return node;
}

function referenceCard(reference) {
  const citation = `${reference.authors?.join(", ") ?? ""} (${reference.year}). ${reference.title}. ${reference.journal ?? reference.repository ?? reference.publisher ?? ""}`;
  return h("li", { class: "reference-entry" },
    h("p", {}, citation, " ", h("a", { href: reference.url, rel: "external noopener" }, reference.doi ?? "Open source record")),
    reference.note ? h("p", { class: "note" }, reference.note) : null
  );
}

try {
  const response = await fetch("./data/references.v1.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Reference registry unavailable");
  const registry = await response.json();
  const byId = new Map(registry.references.map((reference) => [reference.id, reference]));
  target.replaceChildren();
  for (const [locale, mapping] of Object.entries(registry.activeVariants)) {
    target.append(h("section", {}, h("h2", {}, languageNames[locale] ?? locale), h("ul", { class: "reference-list" }, mapping.referenceIds.map((id) => referenceCard(byId.get(id))))));
  }
  target.append(h("section", {},
    h("h2", {}, "Additional versions identified"),
    h("p", {}, "These versions are not enabled until the validated item file and redistribution terms are sufficiently verified."),
    h("div", { class: "candidate-grid" }, registry.integrationCandidates.map((candidate) =>
      h("article", { class: "candidate-card" }, h("h3", {}, candidate.language), h("p", {}, h("span", { class: "status-badge" }, candidate.status)), h("ul", { class: "reference-list" }, candidate.referenceIds.map((id) => referenceCard(byId.get(id)))))
    ))
  ));
} catch (error) {
  console.error(error);
  target.replaceChildren(h("p", { class: "fatal-error", role: "alert" }, "The reference registry could not be loaded. Use the machine-readable JSON link above."));
}
