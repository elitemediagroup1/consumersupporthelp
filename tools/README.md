# Home Services Content Factory (internal developer toolkit)

**Phase:** 8 — Content Factory
**Type:** Internal developer tooling. **Not production pages. Not part of the rendered site.**
**Companions:** \`docs/HOME-SERVICES-KNOWLEDGE-PLATFORM.md\` (standards), \`docs/HOME-SERVICES-PUBLISHING-PLAYBOOK.md\` (workflow), \`docs/HOME-SERVICES-OPPORTUNITY-ENGINE.md\` (what to build next).

This toolkit automates the **repetitive** parts of building a Home Services page so a new page goes from structured inputs to a *draft* in minutes, while **preserving every human editorial/compliance gate** from the publishing playbook. The tools generate drafts and reports; they never publish, never commit, and never change production pages.

---

## Important: why these are safe / non-production

- The Netlify \`publish\` directory is the repo root, so files here are technically reachable as **raw static files** — but they are plain \`.js\`/\`.md\` developer utilities. They are **not HTML pages**, are **not linked from the site**, are **not in \`sitemap.xml\`**, and render no design-system UI. They behave exactly like the existing \`docs/*.md\` files committed in Phases 5–7.
- **Do not place \`.html\` files in \`tools/\`.** Generated page HTML must be reviewed by a human and saved to its real production path through the normal workflow — the generator returns an HTML **string**, it does not write a servable page.
- These utilities are plain Node-style modules with **no dependencies and no network calls**. They are meant to run locally (Node) or be pasted into a scratch build script. They never execute in the visitor's browser.
- Nothing here modifies the HVAC Help Center.

---

## Contents

| File | Tool | Purpose |
|---|---|---|
| \`config.js\` | Shared config | Categories, design-system class names, placeholder phone config, prohibited words, relationship map. |
| \`schema-generator.js\` | Tool 2 | Build BreadcrumbList / FAQPage / Article / HowTo / Service JSON-LD by page type. |
| \`metadata-generator.js\` | Tool 3 | Title, description, Open Graph, Twitter, canonical, image metadata. |
| \`internal-linking-assistant.js\` | Tool 4 | Recommend incoming/outgoing links, related services, breadcrumb position. |
| \`page-generator.js\` | Tool 1 | Compose a production-ready HTML **string** from structured inputs (uses the above). |
| \`qa-validator.js\` | Tool 5 | Validate an HTML string against the publishing checklist. |
| \`build-checklist-generator.js\` | Tool 6 | Produce the post-build implementation report. |

---

## The six tools

### Tool 1 — Page Generator (\`page-generator.js\`)
**Inputs:** \`{ category, pageType, title, metaDescription, targetKeyword, supportingKeywords[], relatedServices[], cta, schema }\`.
**Output:** a production-ready HTML **string** using the existing design system (\`fe-hero\`, \`fe-info\`, \`fe-info-grid\`, \`fe-info-card\`, \`fe-deepdive\`, \`fe-fallback-grid\`, \`fe-fallback-card\`, \`fe-disclaimer\`, \`.container\`, \`.kicker\`, \`.lede\`, \`.sticky-call\`, etc.). It assembles per-page-type section skeletons (from Playbook Task 2), injects metadata (Tool 3), schema (Tool 2), and the Related Services block + links (Tool 4). CTAs reference the single placeholder phone config — **never a hardcoded number.** Body copy is left as clearly-marked \`<!-- TODO: editorial draft -->\` slots; the generator builds *structure*, humans write *prose*.

### Tool 2 — Schema Generator (\`schema-generator.js\`)
Emits JSON-LD by page type: \`BreadcrumbList\` (always), \`Article\` (pillar/supporting/cost/etc.), \`FAQPage\` (only when real FAQs are supplied), \`HowTo\` (only for genuine step lists), \`Service\` (category/landing pages). Schema text is derived from the provided content so it **matches visible text**. Never emits \`Review\`/\`AggregateRating\`.

### Tool 3 — Metadata Generator (\`metadata-generator.js\`)
Produces title (≤60), description (≤155), canonical, Open Graph, Twitter card, and image metadata following publishing standards. Strips/flags hype words. Returns both an object and a ready-to-inject \`<head>\` fragment string.

### Tool 4 — Internal Linking Assistant (\`internal-linking-assistant.js\`)
Given \`category\` + \`pageType\`, returns recommended **incoming** links (which existing pages should point here), **outgoing** links (pillar up-link + sibling laterals), **related services** (3–5, flagship-first), and **breadcrumb position**, all derived from the canonical relationship map (Spec §4.1). Output is a recommendation object for human confirmation.

### Tool 5 — QA Validator (\`qa-validator.js\`)
Static checks on an HTML string: exactly one \`<h1>\`; schema present; images missing \`alt\`; CTA present + uses placeholder config (no hardcoded number); FAQ count in range; heading hierarchy (no skipped levels); required sections per page type; placeholder phone config intact; prohibited words; image filename/format (WebP, responsive); internal-link presence (pillar up-link + related block). Returns \`{ pass, errors[], warnings[] }\`. **A clean validator run is necessary but not sufficient — human QA still signs (Playbook Task 4).**

### Tool 6 — Build Checklist Generator (\`build-checklist-generator.js\`)
After a build, produces the standard implementation report: files changed, commit placeholders, QA validator summary, remaining human-review tasks, and launch blockers (e.g., "approved phone number not yet installed", "licensed images pending"). Mirrors the report format used in Phases 3–7.

---

## How the toolkit integrates with the publishing workflow

Maps onto the 11-stage workflow in \`HOME-SERVICES-PUBLISHING-PLAYBOOK.md\` (Task 1):

| Workflow stage | Tool | Automated? | Human gate still required |
|---|---|---|---|
| Research | — | No (AI-assisted, separate) | Yes |
| Outline | page-generator (skeleton) | Partial | Yes — approve scope |
| SEO Planning | metadata-generator | Partial | Yes — approve metadata/intent |
| Content Draft | page-generator (structure only) | Structure yes / prose no | Yes — humans write prose |
| EEAT Review | — | No | Yes |
| Compliance Review | qa-validator (prohibited words pre-screen) | Pre-screen only | **Yes — mandatory sign-off** |
| Internal Linking | internal-linking-assistant | Suggestions | Yes — confirm relevance |
| Schema Generation | schema-generator | Yes (draft) | Yes — validate match |
| Image Requirements | metadata/page-generator (slots+alt) | Briefs | Yes — confirm licensing |
| QA | qa-validator | Pre-screen | Yes — QA owner signs |
| Ready for Publishing | build-checklist-generator | Report | Yes — publisher go/hold |

**Golden rule:** tools accelerate; humans decide. No tool output reaches production without the gates above.

---

## Usage sketch (local, non-production)

\`\`\`js
const { generatePage } = require('./page-generator');
const draft = generatePage({
  category: 'plumbing',
  pageType: 'cost-guide',
  title: 'What Does Plumbing Repair Cost? (2025 Ranges)',
  metaDescription: 'Typical plumbing repair cost ranges and the factors that affect them.',
  targetKeyword: 'plumbing repair cost',
  supportingKeywords: ['water heater cost', 'leak repair cost'],
  relatedServices: ['water-damage', 'appliance-repair', 'bathroom-remodeling'],
  cta: { type: 'click-to-call' },          // uses placeholder config
  schema: { article: true, faq: true, breadcrumb: true }
});
// draft.html is a STRING for human review — NOT written to a served path here.
const { validate } = require('./qa-validator');
console.log(validate(draft.html, { pageType: 'cost-guide' }));
\`\`\`
