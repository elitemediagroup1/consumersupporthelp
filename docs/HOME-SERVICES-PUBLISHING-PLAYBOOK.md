# Home Services AI Publishing Engine

**Status:** Official publishing playbook (documentation only)
**Scope:** ConsumersSupportHelp.com — Home Services vertical
**Phase:** 6 — AI-Assisted Publishing Engine
**Companion document:** \`docs/HOME-SERVICES-KNOWLEDGE-PLATFORM.md\` (Phase 5). This playbook *operationalizes* that spec; the spec remains the source of truth for architecture, components, linking, and editorial standards.
**This is internal infrastructure only.** It does not create pages, change code, or redesign anything. Every page produced by this engine must conform to the Phase 5 standards.

---

## 0. How to use this playbook

This document is the step-by-step system for turning a topic into a production-ready Home Services page that already complies with the Knowledge Platform spec. Read it as: **Workflow (Task 1)** = the assembly line; **Templates (Task 2)** = the blueprints fed into the line; **Prompts (Task 3)** = the AI instructions for each station; **QA Checklist (Task 4)** = the final gate; **Production Queue (Task 5)** = what to build and in what order; **Automation Map (Task 6)** = what AI may do alone vs. what always needs a human.

Two non-negotiables carried from earlier phases:
- **AI drafts; humans approve.** No AI output is published without the human-review gates defined in Task 6.
- **Conservative by default.** Click-to-call only (single phone config, no hardcoded numbers, no lead forms), licensed WebP images only, no advertiser branding/testimonials, and no "free"/guarantee/urgency language — ever.

---

## Task 1 — Publishing Workflow

The pipeline has 11 sequential stages. Each stage lists its **input**, **action**, **AI role**, **human gate**, and **exit criteria** (Definition of Done for that stage). A page may not advance until the prior stage's exit criteria are met.

### Stage 1 — Research
- **Input:** target topic + category + chosen template (Task 2).
- **Action:** gather what a homeowner actually needs to know; identify subtopics, common questions, typical cost ranges, safety notes, and reputable non-promotional sources.
- **AI role:** assemble a research brief (key points, candidate FAQs, source list, terminology to define).
- **Human gate:** SME/editor confirms facts and source quality; flags anything requiring caution (safety, cost claims).
- **Exit:** approved research brief with cited sources.

### Stage 2 — Outline
- **Input:** approved research brief + template heading structure.
- **Action:** produce the H1/H2/H3 skeleton mapped to the template, noting where each component (Task 2 of the spec) will appear.
- **AI role:** draft the outline; map subtopics to headings; mark internal-link and image slots.
- **Human gate:** editor approves scope and heading order (no skipped levels, one H1).
- **Exit:** locked outline.

### Stage 3 — SEO Planning
- **Input:** locked outline.
- **Action:** define primary intent, head/secondary terms (natural, no stuffing), title + meta description, slug, breadcrumb, and the page's place in its topic cluster (pillar/supporting/local).
- **AI role:** propose metadata + cluster placement + target intent.
- **Human gate:** SEO/editor approves intent match and metadata (length, no hype words).
- **Exit:** SEO plan with title, meta, slug, cluster role.

### Stage 4 — Content Draft
- **Input:** approved outline + SEO plan.
- **Action:** write the body using the platform voice (plain, educational, neutral) and the shared components.
- **AI role:** draft prose, lists, tables, callouts to the template spec.
- **Human gate:** editor edits for accuracy, tone, and helpfulness.
- **Exit:** complete first draft using only approved components.

### Stage 5 — EEAT Review
- **Input:** first draft.
- **Action:** verify Experience/Expertise/Authoritativeness/Trust signals — sourcing, "reviewed/updated" note, conservative and verifiable claims, no fabricated credentials/testimonials/ratings.
- **AI role:** run the EEAT-review prompt and produce a findings list.
- **Human gate:** editor resolves every finding; adds reviewer/updated metadata.
- **Exit:** EEAT findings closed.

### Stage 6 — Compliance Review
- **Input:** EEAT-cleared draft.
- **Action:** check no medical/legal/financial advice, no advertiser branding/testimonials unless approved, cost claims framed as ranges with caveats, no "free"/guarantee/urgency/fear, click-to-call only (no lead form), privacy respected.
- **AI role:** run the compliance-audit prompt; flag risky phrasing.
- **Human gate:** **compliance owner sign-off is mandatory** (this gate can never be automated away).
- **Exit:** compliance approved and logged.

### Stage 7 — Internal Linking
- **Input:** compliance-approved draft.
- **Action:** add up-links to pillar, lateral links to 2–3 siblings, 2–4 contextual cross-service links, and the standardized Related Services block (3–5 siblings, flagship-first) per the spec's relationship map.
- **AI role:** suggest links + descriptive anchor text from the canonical map.
- **Human gate:** editor confirms links are genuinely helpful and crawlable (real anchors, not JS-only).
- **Exit:** no orphan; links verified.

### Stage 8 — Schema Generation
- **Input:** linked draft.
- **Action:** generate JSON-LD matching visible text (\`Article\` + \`BreadcrumbList\`; \`FAQPage\` only if real FAQs; \`ImageObject\` for primary image; \`HowTo\` only for genuine steps). No \`Review\`/\`AggregateRating\`.
- **AI role:** emit schema from on-page content.
- **Human gate:** editor validates schema text === on-page text.
- **Exit:** valid schema attached.

### Stage 9 — Image Requirements
- **Input:** near-final page.
- **Action:** produce an image brief — required slots, subjects, responsive WebP sizes (e.g., 1600/960), filenames, and alt text. **Licensed assets only**; clearly-marked swappable placeholders until licensed images land.
- **AI role:** write the image brief + alt text.
- **Human gate:** editor confirms licensing and that placeholders swap without markup changes.
- **Exit:** image brief approved; no hotlinking.

### Stage 10 — QA
- **Input:** assembled page.
- **Action:** run the full Editorial QA Checklist (Task 4): Helpful Content, EEAT, accessibility, mobile readability, internal links, related services, CTA compliance, images, schema, metadata, compliance, readability.
- **AI role:** pre-screen against the checklist and report failures.
- **Human gate:** QA owner signs the checklist.
- **Exit:** all checklist items pass.

### Stage 11 — Ready for Publishing
- **Input:** QA-signed page.
- **Action:** stage for publish; record cluster placement and update internal links on sibling/pillar pages that should point to it.
- **AI role:** none beyond producing the publish summary.
- **Human gate:** publisher gives final go; CTA phone config + licensed images confirmed present (or page held).
- **Exit:** published or explicitly held with reason.

---
## Task 2 — Content Templates

Nine reusable templates. Each maps directly to a content type in the Knowledge Platform spec and composes only existing components (\`fe-*\`/\`hs-*\`, global classes). Word counts are targets, not hard limits; depth should match the topic.

### 2.1 Pillar page (flagship Help Center)
- **Heading structure:** H1 (category) → H2 How it works → H2 Key decisions / Repair vs Replace → H2 Costs (overview) → H2 Maintenance basics → H2 When to call a pro → H2 Related guides → H2 FAQ.
- **Word count:** 1,800–3,000.
- **Schema:** \`Article\` + \`BreadcrumbList\` + \`FAQPage\` + \`Organization\`/\`WebPage\` (matches HVAC reference).
- **Images:** hero (1600/960) + 2–3 supporting (diagrams/components), all WebP, descriptive alt.
- **CTA:** click-to-call module after intro + at decision points + mobile sticky (\`.sticky-call\`).
- **Internal linking:** down to every supporting guide; out to the cluster tool; Related Services block (flagship-first).
- **FAQ:** 5–8 genuine Q&A, schema-matched.

### 2.2 Supporting guide
- **Headings:** H1 (specific job) → H2 overview → H2 main subtopics (3–5) → H2 when to call a pro → H2 FAQ (optional) → H2 related guides.
- **Word count:** 1,000–1,800.
- **Schema:** \`Article\` + \`BreadcrumbList\` (+ \`FAQPage\` only if real FAQs).
- **Images:** 1 hero + 1 contextual.
- **CTA:** click-to-call after intro + sticky on mobile.
- **Linking:** up to pillar; lateral to 2–3 siblings; Related block.
- **FAQ:** 3–5 if present.

### 2.3 Cost guide
- **Headings:** H1 ("What does {service} cost?") → H2 typical range → H2 cost factors → H2 cost-by-type/scope (table) → H2 ways to budget/save responsibly → H2 FAQ.
- **Word count:** 1,200–2,000.
- **Schema:** \`Article\` + \`BreadcrumbList\` (+ \`FAQPage\`).
- **Images:** hero + cost-card visuals (no fabricated charts).
- **CTA:** click-to-call; never "free"/guaranteed-savings.
- **Linking:** up to pillar; to maintenance + repair siblings; Related block.
- **Components:** cost card + comparison table; ranges with "varies by" caveats.
- **FAQ:** 4–6.

### 2.4 Maintenance guide
- **Headings:** H1 → H2 why it matters → H2 routine tasks (checklist) → H2 seasonal cadence → H2 DIY vs pro → H2 FAQ.
- **Word count:** 900–1,600.
- **Schema:** \`Article\` + \`BreadcrumbList\` (\`HowTo\` only for genuine steps).
- **Images:** hero + checklist/calendar visual.
- **CTA:** click-to-call for pro service.
- **Linking:** up to pillar; to seasonal + troubleshooting siblings.
- **Components:** checklist block + maintenance calendar (static).
- **FAQ:** 3–5.

### 2.5 Troubleshooting guide
- **Headings:** H1 → H2 common symptoms → H2 likely causes (educational, not a diagnosis) → H2 what you can safely check → H2 when to stop and call a pro → H2 FAQ.
- **Word count:** 1,000–1,800.
- **Schema:** \`Article\` + \`BreadcrumbList\` (+ \`FAQPage\`).
- **Images:** hero + symptom illustrations.
- **CTA:** strong "call a pro" routing; warning callouts for safety.
- **Linking:** up to pillar; to repair/cost siblings.
- **FAQ:** 4–6. **Never diagnose, guarantee, or create urgency.**

### 2.6 Seasonal guide
- **Headings:** H1 ("{Season} {service} checklist") → H2 why this season → H2 checklist → H2 what to schedule with a pro → H2 FAQ.
- **Word count:** 700–1,300.
- **Schema:** \`Article\` + \`BreadcrumbList\`.
- **Images:** seasonal hero + checklist visual.
- **CTA:** click-to-call; seasonal timing is fine, scare tactics are not.
- **Linking:** up to pillar; to maintenance sibling; Related block.
- **FAQ:** 3–4 optional.

### 2.7 FAQ page (standalone, when warranted)
- **Headings:** H1 ("{service} FAQ") → grouped H2 themes → Q (H3) / A pattern.
- **Word count:** driven by Q count; 8–20 genuine questions.
- **Schema:** \`FAQPage\` + \`BreadcrumbList\`; visible text === schema text.
- **Images:** optional hero only.
- **CTA:** click-to-call after the FAQ.
- **Linking:** up to pillar; to most-relevant supporting guides.

### 2.8 Local page (state / city)
- **Headings:** H1 ("{service} in {location}") → H2 local context (climate/codes/common issues) → H2 typical local cost range → H2 how to choose a local pro → H2 FAQ.
- **Word count:** 700–1,400 with **genuine local value** (no boilerplate swaps).
- **Schema:** \`Article\` + \`BreadcrumbList\` (\`LocalBusiness\` ONLY if a real verified entity — otherwise omit).
- **Images:** local-relevant hero (licensed).
- **CTA:** click-to-call.
- **Linking:** up to category pillar; to state hub (for city pages); sibling local pages; Related block.
- **FAQ:** 3–5 localized.
- **Rule:** lives under \`/{category}/{state}/\` or \`/{category}/{state}/{city}/\`; only beneath a Tier-2+ cluster.

### 2.9 Interactive tool landing page
- **Headings:** H1 (tool name) → H2 what it does / how to read results → H2 the tool slot → H2 how this is calculated (transparency) → H2 related guides → H2 FAQ.
- **Word count:** 500–1,000 of supporting copy (the tool itself is built in a later phase; this is the landing page).
- **Schema:** \`Article\`/\`WebPage\` + \`BreadcrumbList\` (+ \`FAQPage\`). No fabricated results markup.
- **Images:** hero + explanatory diagram.
- **CTA:** click-to-call as secondary; the tool is the primary action; **educational only — no guarantees.**
- **Linking:** to pillar + the supporting guide it serves.
- **FAQ:** 3–5 about the tool's assumptions/limits.

---
## Task 3 — Prompt Library

Reusable, topic-agnostic prompts. Each prompt assumes the operator supplies \`{category}\`, \`{topic}\`, and the relevant template from Task 2, and that the model has access to the Phase 5 spec. Every prompt ends with the same guardrail clause (see 3.0). Outputs are drafts requiring the human gates in Task 1.

### 3.0 Shared guardrail clause (append to every prompt)
> Follow HOME-SERVICES-KNOWLEDGE-PLATFORM.md exactly. Educational and neutral tone; never diagnose, guarantee outcomes, or create urgency. No "free", "guaranteed", "best", "#1", "instant", or fear language. Click-to-call only — no lead forms, no hardcoded phone numbers (reference the single category phone config). Costs as ranges with caveats. No advertiser branding, testimonials, fabricated credentials, reviews, or ratings. Use only existing design-system components. Output must be ready for human review, not auto-publish.

### 3.1 Generate a Pillar Guide
> Using the Pillar template (Task 2.1), write a flagship Help Center page for {category}. Cover how the system/service works, key decisions including repair-vs-replace framing, a cost overview (ranges), maintenance basics, and when to call a pro. Produce H1/H2/H3, body copy, a comparison table where useful, and 5–8 genuine FAQs. Mark image slots and internal-link slots. [guardrail clause]

### 3.2 Generate a Supporting Guide
> Using the Supporting-guide template (Task 2.2), write a focused guide answering the single job-to-be-done: "{topic}" within {category}. Link up to the {category} pillar and laterally to 2–3 siblings. [guardrail clause]

### 3.3 Generate a Cost Guide
> Using the Cost-guide template (Task 2.3), write "What does {topic} cost?" Present typical ranges, the factors that move cost, a cost-by-type/scope comparison table, and responsible budgeting tips. Always frame costs as ranges with "varies by" caveats; never promise savings. [guardrail clause]

### 3.4 Generate a Maintenance / Seasonal / Troubleshooting Guide
> Using the matching template (Task 2.4 / 2.6 / 2.5), write a {maintenance|seasonal|troubleshooting} guide for {topic} in {category}. For troubleshooting, present symptoms → likely causes as education only, what a homeowner can safely check, and a clear "stop and call a pro" boundary — no diagnosis. [guardrail clause]

### 3.5 Generate FAQs
> Generate {n} genuine homeowner FAQs for {topic} in {category}. Concise, educational answers; route to a professional where appropriate. The visible question text must be reusable verbatim as schema. [guardrail clause]

### 3.6 Generate Related Services
> For a {category} page, produce a Related Services block of 3–5 siblings drawn from the canonical relationship map in the spec (§4.1). Lead with the platform flagship (HVAC) when relevant. For each, give a one-line, genuinely-helpful reason and descriptive anchor text. [guardrail clause]

### 3.7 Generate Internal Linking Suggestions
> Given this draft for {topic} in {category}, suggest 2–4 contextual cross-service links plus up-link to pillar and 2–3 lateral sibling links, using the spec's relationship map (§4). Provide exact anchor text and the sentence each link belongs in. Flag any orphan risk. Real crawlable anchors only. [guardrail clause]

### 3.8 Generate Schema
> From this final on-page content, emit JSON-LD: \`Article\` + \`BreadcrumbList\`; add \`FAQPage\` only if real FAQs exist; \`ImageObject\` for the primary image; \`HowTo\` only for genuine step instructions. All schema text must match visible text verbatim. Do NOT output \`Review\` or \`AggregateRating\`. [guardrail clause]

### 3.9 Generate Metadata
> Produce a title (≤60 chars), meta description (≤155 chars), slug, and breadcrumb for this {category} {page-type}. Match search intent, no hype words, no clickbait. [guardrail clause]

### 3.10 Generate an Image Brief
> For this page, list each image slot with subject, composition, responsive WebP sizes (1600/960), descriptive filename, and alt text. Specify licensed-asset requirement; mark any placeholder as clearly swappable without markup changes. No hotlinking. [guardrail clause]

### 3.11 Generate an EEAT Review
> Audit this draft for Experience, Expertise, Authoritativeness, Trust. List specific weaknesses: unsourced claims, missing reviewer/updated note, overconfident or unverifiable statements, any fabricated credentials/testimonials/ratings (must be removed). Return a numbered findings list with fixes. Do not rewrite — review only. [guardrail clause]

### 3.12 Generate a Helpful Content Audit
> Audit this draft against Google Helpful Content principles: written for people first, satisfies the real homeowner question, no thin/duplicative/filler content, demonstrates first-hand usefulness. Identify thin sections and recommend merges or cuts. Return findings only. [guardrail clause]

### 3.13 Generate a Compliance Audit
> Audit this draft for compliance: no medical/legal/financial advice; no advertiser branding/testimonials unless flagged-approved; costs as ranges with caveats; no "free"/guarantee/urgency/fear; click-to-call only (no lead form, no hardcoded number); privacy respected. Return every risky phrase with a compliant rewrite suggestion. Final human compliance sign-off is still required. [guardrail clause]

### 3.14 Generate a QA Pre-Screen
> Run this page against the Editorial QA Checklist (Task 4) and return a pass/fail line per item with evidence. Do not pass the page; only report. [guardrail clause]

---
## Task 4 — Editorial QA Checklist

The final gate before a page can be marked Ready for Publishing (Stage 11). Every item must pass; any fail returns the page to the relevant stage. A human QA owner signs this list — AI may pre-screen (3.14) but cannot sign.

**Helpful Content**
- [ ] Answers a real homeowner question end-to-end; no thin or filler sections.
- [ ] People-first; demonstrates first-hand usefulness (what to check, expect, when to call a pro).
- [ ] Not duplicative of an existing page (or is intentionally the canonical version).

**EEAT**
- [ ] Non-obvious claims are sourced to reputable, non-promotional references.
- [ ] "Reviewed/Last updated" note present on substantive guides.
- [ ] No fabricated credentials, reviewers, testimonials, reviews, or ratings.
- [ ] Claims are conservative and verifiable.

**Accessibility**
- [ ] One H1; logical H2/H3 order with no skipped levels.
- [ ] All meaningful images have descriptive alt; decorative images have empty alt.
- [ ] Contrast meets WCAG AA; meaning never conveyed by color alone.
- [ ] Visible focus states; full keyboard operability; tap targets ≥44px.

**Mobile readability**
- [ ] Tables scroll rather than overflow; no fixed widths break layout.
- [ ] Sticky call button shows ≤720px, hidden on desktop, doesn't trap focus or obscure content.
- [ ] Short paragraphs; comfortable line length and spacing.

**Internal links**
- [ ] Up-link to pillar present (descriptive anchor).
- [ ] 2–3 lateral sibling links; 2–4 contextual cross-service links from the §4 map.
- [ ] No orphan; all links are real crawlable anchors (not JS-only).

**Related services**
- [ ] Standardized Related Services block present (3–5 siblings), flagship-first where relevant.
- [ ] Reasons are genuinely helpful, not filler.

**CTA compliance**
- [ ] Click-to-call only; single category phone config via \`[data-call]\`.
- [ ] No hardcoded numbers anywhere; placeholder falls back to an in-page educational anchor.
- [ ] No lead-capture form.

**Image requirements**
- [ ] WebP, responsive sizes, explicit width/height (no layout shift).
- [ ] Licensed assets only; placeholders clearly marked and swappable without markup change.
- [ ] Descriptive filenames + alt; below-the-fold images lazy-loaded.

**Schema**
- [ ] Correct types for page type; schema text === visible text.
- [ ] No \`Review\`/\`AggregateRating\`; \`HowTo\` only for genuine steps.
- [ ] Validates (Rich Results Test) without errors.

**Metadata**
- [ ] Title ≤60 chars, meta ≤155 chars, accurate slug + breadcrumb.
- [ ] No hype/clickbait; matches intent.

**Compliance**
- [ ] No medical/legal/financial advice; no unapproved branding/testimonials.
- [ ] Costs as ranges with caveats; no "free"/guarantee/urgency/fear language.
- [ ] Privacy respected; compliance owner has signed off (Stage 6).

**Readability**
- [ ] Plain, neutral, helpful voice; jargon defined on first use.
- [ ] Logical flow; lists for steps; comparison tables for options.
- [ ] Proofread; consistent terminology.

---
## Task 5 — Content Production Queue

A prioritized backlog seeded from the Phase 5 roadmap (authority-first, not short-term revenue). Each item lists Category, Page Type, Priority, Estimated Value, Dependencies, Internal Links, Target Search Intent, and Difficulty. Items are grouped **Immediate / Next / Future**. This is a starting backlog; the editor re-scores as data arrives.

Legend — Priority: P1 (highest) → P3. Value/Difficulty: H/M/L.

### Immediate (Q1 — start now)

| # | Category | Page Type | Priority | Est. Value | Dependencies | Internal Links | Target Intent | Difficulty |
|---|---|---|---|---|---|---|---|---|
| 1 | HVAC | Cost Guide | P1 | H | Pillar exists (live) | ↑HVAC pillar; →maintenance, troubleshooting | "hvac / ac / furnace cost" (commercial-investigation) | M |
| 2 | HVAC | Maintenance Guide | P1 | H | Pillar exists | ↑pillar; →seasonal, cost | "hvac maintenance / tune-up" (informational) | L |
| 3 | HVAC | Troubleshooting Guide | P1 | H | Pillar exists | ↑pillar; →cost, repair | "ac not cooling / furnace not working" (problem) | M |
| 4 | HVAC | Seasonal Guide | P2 | M | Maintenance guide | ↑pillar; →maintenance | "hvac fall/spring checklist" (seasonal) | L |
| 5 | Insulation | Pillar | P1 | H | — | ↔HVAC, Windows, Roofing | "home insulation guide" (informational) | M |

### Next (Q2 — queued after Immediate)

| # | Category | Page Type | Priority | Est. Value | Dependencies | Internal Links | Target Intent | Difficulty |
|---|---|---|---|---|---|---|---|---|
| 6 | Windows | Cost Guide | P1 | H | Pillar (live) | ↑Windows; →HVAC efficiency, Insulation | "replacement window cost" (commercial) | M |
| 7 | Windows | Repair-vs-Replace Guide | P2 | M | Pillar | ↑pillar; →cost | "repair or replace windows" (decision) | M |
| 8 | Roofing | Materials/Comparison Guide | P1 | H | Pillar (live) | ↔Gutters, Water Damage; ↑Roofing | "roof material types / comparison" (investigation) | M |
| 9 | Roofing | Cost Guide | P1 | H | Pillar | ↑pillar; →materials | "new roof cost" (commercial) | M |
| 10 | HVAC | Tool Landing — Repair vs Replace | P2 | H | Tool build (later phase) | ↑pillar; →cost | "should I replace my hvac" (decision) | H |
| 11 | Insulation | Cost + Maintenance | P2 | M | Insulation pillar (#5) | ↑pillar; ↔HVAC | "insulation cost / r-value" (investigation) | M |

### Future (Q3–Q4 — sequence behind mature clusters)

| # | Category | Page Type | Priority | Est. Value | Dependencies | Internal Links | Target Intent | Difficulty |
|---|---|---|---|---|---|---|---|---|
| 12 | Plumbing | Pillar + Cost + Troubleshooting | P1 | H | — | ↔Water Damage, Appliance Repair, Bath Remodel | "plumbing repair / water heater cost" | M |
| 13 | Electrical | Pillar | P1 | H | — | ↔Home Security, Solar, Appliance Repair | "electrical panel / wiring basics" | M |
| 14 | Pest Control | Cluster + Local depth | P2 | M | Existing state pages | ↔Insulation, Roofing, Water Damage | "pest control {state}/{pest}" (local) | M |
| 15 | Home Security | Cluster + Local depth | P2 | M | Existing state pages | ↔HVAC (smart home), Electrical | "home security systems {state}" (local) | M |
| 16 | Bathroom Remodel | Cost + Planning | P2 | H | — | ↔Plumbing, Flooring, Water Damage | "bathroom remodel cost" (commercial) | M |
| 17 | Kitchen Remodel | Cost + Planning | P2 | H | — | ↔Plumbing, Electrical, Appliance, Flooring | "kitchen remodel cost" (commercial) | H |
| 18 | Solar | Pillar | P2 | H | Compliance care | ↔Electrical, Windows, Roofing | "is solar worth it / payback" (decision) | H |
| 19 | Flooring / Garage Doors / Foundation / Appliance | Tier-0 stub + Related block | P3 | M | — | ↔ per §4.1 map | "{service} guide" (informational) | L |
| 20 | HVAC / Plumbing / Roofing | Local (state→city) | P3 | M | Cluster Tier-2+ | ↑pillar; sibling local | "{service} in {state/city}" (local) | M |

### Queue rules
- Never start a supporting guide before its pillar exists.
- Never start local pages before the cluster reaches Tier 2.
- Re-prioritize by realized authority/search performance, not affiliate payout.
- Each Immediate item must clear all 11 workflow stages before its slot is considered done.

---
## Task 6 — Automation Opportunities

Where AI can safely accelerate work, and where a human gate is **mandatory and non-removable**. The principle: AI may research, draft, suggest, and generate; humans must verify facts, claims, compliance, schema accuracy, licensing, and the final publish decision.

### 6.1 Automation map

| Workflow step | AI may do (draft/assist) | Human review required? | Why the human gate exists |
|---|---|---|---|
| Research | Assemble brief, candidate sources, terminology | **Yes — verify** | Sources/facts must be confirmed; hallucination risk. |
| Outlines | Generate H1–H3 skeleton mapped to template | Yes — light approval | Scope and intent fit. |
| Drafting | Write body, lists, tables, callouts | Yes — substantive edit | Accuracy, tone, helpfulness. |
| Internal links | Suggest links + anchors from §4 map | Yes — confirm | Relevance + genuine helpfulness; avoid over-optimization. |
| Schema | Generate JSON-LD from on-page text | Yes — validate match | Schema must equal visible text; no fake markup. |
| Metadata | Draft title/meta/slug/breadcrumb | Yes — approve | Length, intent, no hype. |
| FAQs | Draft genuine Q&A | Yes — fact-check | Answers must be accurate, non-diagnostic. |
| Related services | Assemble 3–5 sibling block | Yes — light approval | Confirm relevance + flagship-first. |
| Image briefs | Write slots, alt text, sizes, filenames | Yes — confirm licensing | **Licensing/authorization cannot be auto-verified.** |
| QA pre-screen | Report pass/fail per checklist item | **Yes — QA owner signs** | AI cannot certify its own output. |
| EEAT review | Produce findings list | Yes — resolve | Editor must fix and own trust signals. |
| Helpful Content audit | Flag thin/duplicative sections | Yes — decide | Merge/cut judgment is editorial. |

### 6.2 Steps that ALWAYS require a human (never automate the decision)

1. **Compliance sign-off** (Stage 6) — legal/advice/branding/claims risk.
2. **Factual & cost-claim verification** — all numbers and safety statements.
3. **Image licensing confirmation** — proof of authorization to use each asset.
4. **Schema-to-content match validation** — prevents structured-data violations.
5. **Final publish decision** (Stage 11) — including confirming the approved phone config and licensed images are present, or holding the page.
6. **Any change touching the HVAC Help Center** — out of scope for this engine; requires explicit owner approval.

### 6.3 Safe-automation guardrails
- AI never publishes, never changes site code, and never modifies the phone config or schema in production without a human applying the change.
- AI output is always labeled draft and routed through the Task 1 gates.
- Prompts always carry the §3.0 guardrail clause.
- When confidence is low or sources conflict, AI must surface uncertainty rather than assert.

---

## Appendix A — Roles & ownership

- **Researcher/SME:** validates facts, sources, safety, cost ranges (Stages 1, drafting support).
- **Editor:** owns outline, draft quality, EEAT/Helpful-Content resolution, linking, metadata, readability.
- **Compliance owner:** mandatory sign-off (Stage 6); cannot be delegated to AI.
- **QA owner:** signs the Task 4 checklist (Stage 10).
- **Publisher:** final go/hold (Stage 11); confirms phone config + licensed images.

## Appendix B — Definition of Done (page-level, mirrors the spec)

A page is publishable only when it: passed all 11 workflow stages; uses only shared components; has correct heading order and schema matching visible text; includes the Related Services block + required contextual links with no orphan; carries the required disclaimer; uses click-to-call only (single config, no hardcoded numbers, no lead form); uses licensed WebP images (or clearly-marked swappable placeholders); avoids hype/urgency/guarantees; and has signed compliance + QA gates.

## Appendix C — What this playbook is NOT

This is documentation only. It does not create pages, write production code, or redesign anything, and it does not modify the HVAC Help Center. It is the official, repeatable publishing playbook that every future Home Services page must follow, in conformance with \`docs/HOME-SERVICES-KNOWLEDGE-PLATFORM.md\`.
