# Home Services Knowledge Platform

**Status:** Foundation specification (documentation only)
**Scope:** ConsumersSupportHelp.com — Home Services vertical
**Phase:** 5 — Knowledge Platform Infrastructure
**Owner:** Editorial + Web
**Do not use this document to redesign existing pages, add articles, or build tools.** It defines the reusable foundation that every future Home Services category will follow.

---

## 0. Purpose & Operating Principles

ConsumersSupportHelp's Home Services section is moving from a collection of standalone pages into a **scalable knowledge platform**. The objective is to let any new category (e.g., Plumbing, Electrical, Solar) launch by following one documented blueprint — reusing the existing design system, schema, linking model, and editorial standards — **without bespoke redesign**.

This platform must support these 18 verticals at maturity:

HVAC, Plumbing, Electrical, Roofing, Windows, Gutters, Water Damage, Pest Control, Home Security, Flooring, Solar, Kitchen Remodeling, Bathroom Remodeling, Garage Doors, Insulation, Foundation Repair, Appliance Repair.

Operating principles:

1. **Reuse over rebuild.** New categories compose existing components; they do not introduce new visual systems.
2. **Education first.** Content informs homeowners; it never diagnoses, guarantees outcomes, or manufactures urgency.
3. **Authority over short-term revenue.** Prioritize depth, helpfulness, and topical completeness that compound over time.
4. **Conservative by default.** When a choice is ambiguous, choose the more conservative, compliant implementation.
5. **Consistency is the product.** Every page in a vertical should feel like part of one coherent, trustworthy library.

---
## Task 1 — Knowledge Architecture

Every Home Services category follows the **same content model**. A "category" is a self-contained knowledge unit. The architecture is intentionally identical across verticals so a new category is a content exercise, not an engineering one.

### 1.1 Category content model

Each category supports the following content types:

- **Flagship guide (Pillar).** One comprehensive Help Center page that explains how the system/service works, key decisions, and when to call a pro. Modeled on the existing HVAC Help Center. URL: \`/{category}.html\` (clean URL \`/{category}\`).
- **Supporting guides.** Focused articles that each answer one job-to-be-done (e.g., "AC Repair Guide", "Furnace Replacement Guide"). They link up to the pillar and across to siblings.
- **FAQs.** Structured Q&A, surfaced both in-page and as \`FAQPage\` schema. May live inside the pillar and/or supporting guides.
- **Interactive tools.** Educational calculators/estimators/checklists (e.g., Repair vs Replace, Lifespan, Filter Reminder). Designed in Phase 4; not built here.
- **Cost guides.** "What does {service} cost?" pages using the cost-card and comparison-table components.
- **Maintenance guides.** Recurring-care content, optionally paired with a maintenance-calendar component.
- **Troubleshooting.** Symptom-to-likely-cause educational content (never a diagnosis), routing the reader to a pro.
- **Seasonal advice.** Time-of-year checklists (spring/summer/fall/winter readiness).
- **Related services.** A standardized cross-category block (built in Phase 4) recommending 3–5 sibling services.
- **State pages (future).** \`/{category}/{state}/\` — already an established pattern in the repo (e.g., pest-control and home-security each have ~12–34 state directories).
- **City pages (future).** \`/{category}/{state}/{city}/\` — nested beneath state pages, reusing the same templates.

### 1.2 Standard category file/URL layout

\`\`\`
/{category}.html                      Flagship pillar (Help Center)
/{category}/{topic}.html              Supporting guide (cost, repair, maintenance, troubleshooting, seasonal)
/{category}/{state}/                  State hub (future)
/{category}/{state}/{city}/           City page (future)
\`\`\`

This mirrors the directory pattern already present for \`pest-control/\`, \`home-security/\`, and \`home-insurance/\`, so no new routing convention is introduced. Clean-URL rewriting is already active (a request for \`/hvac\` serves \`/hvac.html\`).

### 1.3 Maturity tiers (how a category grows)

A category does not need every content type on day one. It graduates through tiers:

- **Tier 0 — Stub:** hub tile + short description + Related Services block. (All 18 verticals reach at least here.)
- **Tier 1 — Pillar:** full flagship Help Center with FAQ + schema (HVAC is the reference implementation).
- **Tier 2 — Cluster:** pillar + 3–6 supporting guides (cost, maintenance, troubleshooting) interlinked.
- **Tier 3 — Interactive:** add one or more educational tools tied to the cluster.
- **Tier 4 — Local:** state pages, then city pages, for high-intent geographies.

The roadmap (Task 6) assigns target tiers per category over 12 months.

---
## Task 2 — Shared Components

These are the reusable building blocks for every Home Services page. They map to the **existing design system** (global \`assets/style.css\` plus the inline \`fe-*\` / \`hs-*\` patterns used on the HVAC Help Center and the Phase-4 Related Services sections). **Create reusable patterns; do not duplicate or fork HTML.**

### 2.1 Design-system reference (existing, do not redefine)

**CSS custom properties (tokens) already defined in \`assets/style.css\`:**
\`--teal-900\`, \`--teal-800\`, \`--teal-700\`, \`--teal-500\`, \`--teal-400\`, \`--gold\`, \`--green-700\`, \`--green-600\`, \`--ink\`, \`--body\`, \`--muted\`, \`--line\`, \`--bg\`, \`--bg-soft\`, \`--bg-cool\`, \`--radius\`, \`--radius-lg\`, \`--shadow-md\`, \`--shadow-sm\`, \`--container\`.

**Typography:** Lora (serif) for headings/kickers; Source Sans 3 for body. Do not introduce new font families.

**Core layout/utility classes (global):** \`.container\`, \`.kicker\`, \`.lede\`, \`.hero\`, \`.grid\`, \`.cards-2\`, \`.cards-3\`, \`.card\`, \`.btn\`, \`.btn-primary\`, \`.btn-outline\`, \`.btn-ink\`, \`.category-card\`, \`.guide-card\`, \`.icon-card\`, \`.faq\`.

**Help Center / editorial classes (inline pattern):** \`.fe-hero\`, \`.fe-info\`, \`.fe-info-grid\`, \`.fe-info-card\`, \`.fe-deepdive\`, \`.fe-fallback-grid\`, \`.fe-fallback-card\`, \`.fe-disclaimer\`, the \`.hs-*\` hub/section family, and \`.sticky-call\` (mobile click-to-call).

### 2.2 Component catalog

Each component below is a documented pattern. The "Built from" column lists the existing classes to compose — no new CSS should be required for a standard page.

| Component | Purpose | Built from (existing) | Notes |
|---|---|---|---|
| **Comparison table** | Side-by-side options (e.g., system types, materials) | semantic \`<table>\` + \`.fe-info\` wrapper; tokens for borders (\`--line\`) | Must be readable on mobile; allow horizontal scroll container, no fixed widths. |
| **Repair vs Replace block** | Educational decision framing | \`.cards-2\` + \`.fe-info-card\` | Present factors, never a verdict. Pair with a tool later, not a guarantee. |
| **Cost card** | "Typical cost range" presentation | \`.fe-info-card\` / \`.card\` + \`.kicker\` label | Always show ranges + "varies by" caveats; never "free"/"guaranteed savings". |
| **Checklist block** | Maintenance / seasonal / prep lists | \`<ul>\` inside \`.fe-info\` or \`.fe-deepdive\` | Plain semantic list; checkbox styling optional and decorative only. |
| **FAQ layout** | Q&A with schema | \`.faq\` + \`FAQPage\` JSON-LD | Question text === schema text. Educational answers only. |
| **Warning callout** | Safety / "call a pro" notices | \`.fe-info\` variant (left rule using \`--gold\` or \`--teal-700\`) | For safety guidance, not fear/urgency. |
| **Educational note** | Context, definitions, "how it works" | \`.fe-info\` / \`.fe-deepdive\` | Default content tone for the platform. |
| **Maintenance calendar** | Month/season cadence | grid (\`.cards-3\`) of \`.fe-info-card\` | Static editorial version; interactive version is a future tool. |
| **Trust box** | EEAT signals (reviewed-by, sources, updated date) | \`.fe-info\` + \`.kicker\` | See Editorial Standards §EEAT. No fake credentials/testimonials. |
| **CTA module** | Click-to-call action | \`.btn-primary\` + \`[data-call]\` bound to single phone config | One config per category. No lead form. Fallback to in-page diagnostic/anchor when number is placeholder. |
| **Related Services block** | Cross-category navigation | \`.fe-fallback-grid\` editorial sibling (Phase-4 pattern) + \`.fe-fallback-card\` | 3–5 siblings; the flagship/most-relevant sibling leads. |
| **Hero** | Page intro | \`.fe-hero\` (pillar) / \`.hero\` (hub) + \`.kicker\` + \`.lede\` | Consistent kicker → H1 → lede rhythm. |
| **Disclaimer** | Compliance footer | \`.fe-disclaimer\` / \`.hs-disclaimer\` | Required on every Home Services page. |

### 2.3 Component governance

- **Single source of truth.** When a component needs a real CSS change, change it in \`assets/style.css\` (or the shared inline block), not per-page.
- **No visual forks.** A "new" component must justify why an existing one cannot be composed.
- **Mobile-first invariants.** Sticky click-to-call (\`.sticky-call\`) appears ≤720px and is hidden on desktop; tables scroll rather than overflow; tap targets ≥44px.
- **Accessibility baked in.** Components ship with correct heading order, alt text, labels, and focus states (see Editorial Standards §Accessibility).

---
## Task 3 — Topic Cluster Framework

Every service follows the same SEO topic-cluster shape. This is the reusable framework; specific articles are NOT created here.

\`\`\`
                 PILLAR (flagship Help Center: /{category})
                          |
        ----------------------------------------------
        |              |               |             |
   SUPPORTING     SUPPORTING       SUPPORTING     SUPPORTING
   (Cost Guide)  (Maintenance)  (Troubleshooting) (Seasonal)
        |              |               |             |
        ----------------------------------------------
                          |
              INTERACTIVE TOOL (educational; e.g., Repair vs Replace)
                          |
              LOCAL PAGES  /{category}/{state}/  ->  /{category}/{state}/{city}/
                          |
                     CONVERSION (click-to-call CTA module)
\`\`\`

### 3.1 Layer definitions

- **Pillar.** Broadest, most authoritative page. Targets the head term ("HVAC", "Roofing"). Links down to every supporting guide and out to the tool. Owns the category's primary schema (\`Article\` + \`FAQPage\` + \`BreadcrumbList\`).
- **Supporting articles.** Each targets one specific intent (cost, repair, maintenance, troubleshooting, seasonal, buying decisions). Each links **up** to the pillar and **laterally** to 1–3 sibling supporting articles. Minimum cluster = pillar + 3 supporting; healthy cluster = pillar + 5–8.
- **Interactive tool.** A single educational tool per cluster (calculator/estimator/checklist). It links back to the pillar and the most relevant supporting guide. Tools are designed in Phase 4 and built in a later phase.
- **Local pages.** State pages roll up city pages; both reuse the same templates and inherit the cluster's internal links. They target "{service} in {state/city}" intent.
- **Conversion.** Every layer ends in the standardized CTA module (click-to-call), never a lead form. Conversion is a component, not a separate page.

### 3.2 Cluster linking rules

1. Every supporting article links up to its pillar with descriptive anchor text (the service name, not "click here").
2. The pillar links down to **all** supporting articles in a dedicated "In this guide / Related guides" block.
3. Supporting articles link laterally to the most topically adjacent siblings (2–3 max) to distribute authority.
4. Tools and local pages always link back into the cluster; they are never dead ends.
5. Orphan check: no cluster page may exist without at least one inbound internal link from within its own cluster.

---

## Task 4 — Internal Linking Engine

Cross-service linking is **standardized, not ad hoc**. Links exist only where they genuinely help the homeowner, and they use descriptive anchor text.

### 4.1 Relationship map (canonical sibling pairs)

These pairs represent natural, high-relevance relationships. When a page in the left column has relevant context, it should link to the right column (and vice versa):

| Service | Strongly related | Editorial reason (the "why" for the link) |
|---|---|---|
| HVAC | Windows, Home Security, Insulation | Energy efficiency, smart thermostats, envelope/load |
| Windows | HVAC, Insulation, Solar | Heat loss/gain, efficiency, energy savings |
| Roofing | Gutters, Insulation, Water Damage | Drainage, attic ventilation/heat retention, leaks |
| Gutters | Roofing, Water Damage, Foundation Repair | Moisture management, foundation/indoor humidity |
| Water Damage | Plumbing, HVAC, Foundation Repair | Pipe leaks, HVAC condensate, structural moisture |
| Plumbing | Water Damage, Appliance Repair, Bathroom Remodeling | Leaks, fixture install, remodel scope |
| Electrical | Home Security, Solar, Appliance Repair | Wiring, panels, smart devices |
| Home Security | HVAC, Electrical, Garage Doors | Smart home integration, wiring, entry points |
| Pest Control | Insulation, Roofing, Water Damage | Rodents in ductwork/insulation, entry, moisture |
| Insulation | HVAC, Windows, Roofing | Thermal envelope, efficiency, attic |
| Solar | Electrical, Windows, Roofing | Panels/wiring, efficiency, mounting surface |
| Flooring | Water Damage, Bathroom Remodeling, Kitchen Remodeling | Moisture, remodel pairing |
| Kitchen Remodeling | Plumbing, Electrical, Appliance Repair, Flooring | Trades involved in a remodel |
| Bathroom Remodeling | Plumbing, Flooring, Water Damage | Trades + moisture |
| Garage Doors | Home Security, Electrical, Insulation | Access, openers, thermal gaps |
| Foundation Repair | Gutters, Water Damage, Basement/Insulation | Drainage, moisture |
| Appliance Repair | Plumbing, Electrical, Kitchen Remodeling | Hookups, power, scope |

### 4.2 Linking standards

- **Placement.** Inline contextual links within body copy where the topic is genuinely referenced, PLUS the standardized **Related Services** block (3–5 siblings) near the page end (before the disclaimer).
- **Anchor text.** Descriptive and human ("attic ventilation guide", "Heating & Cooling Help Center") — never "click here" or exact-match spam.
- **Volume.** Aim for 2–4 contextual cross-service links per page beyond the Related block; do not over-optimize.
- **Reciprocity.** If A meaningfully links to B in body copy, B should reference A where natural — but reciprocity is encouraged, not forced on every page.
- **Flagship bias.** Where multiple siblings qualify, the platform's flagship/most-developed category (currently HVAC) is listed first in Related blocks when relevant.
- **No JS-only links.** Cross-service editorial links are real \`<a href>\` anchors in markup (not injected solely by chat-widget JS), so they are crawlable.

---
## Task 5 — Editorial Standards (Home Services Editorial Guide)

Every future Home Services page must follow this standard. It exists to keep the library trustworthy, helpful, accessible, and compliant.

### 5.1 Tone & voice

- Calm, plain-spoken, and helpful — like a knowledgeable neighbor, not a salesperson.
- Educational and neutral. Explain how things work and how to decide; do not pressure.
- No hype words: avoid "free", "guaranteed", "best", "#1", "instant", "act now", and similar.
- Never manufacture urgency or fear. Seasonal timing is fine; scare tactics are not.
- Address the homeowner directly ("you"), define jargon on first use.

### 5.2 Formatting

- One clear H1 per page; logical H2/H3 nesting (no skipped levels).
- Kicker → H1 → lede rhythm at the top of every page.
- Short paragraphs (2–4 sentences). Use lists for steps and checklists.
- Use the shared components (Task 2) rather than novel layouts.
- Tables for comparisons; never use tables for layout.
- "Last updated" date visible on substantive guides.

### 5.3 EEAT (Experience, Expertise, Authoritativeness, Trust)

- **Experience/Expertise:** ground content in how systems actually work; cite reputable, non-promotional sources where claims are non-obvious.
- **Authoritativeness:** interlink within the cluster so the pillar accrues topical authority.
- **Trust:** show a "Reviewed for accuracy" / sourcing note (Trust box) where appropriate; keep claims conservative and verifiable. **No fabricated credentials, reviewers, testimonials, ratings, or partner branding.**
- Maintain a clear separation between editorial content and any advertiser relationship.

### 5.4 Helpful Content compliance

- Write for people first; every page must satisfy a real homeowner question.
- No thin or duplicative pages; if a topic doesn't warrant its own page, make it a section.
- No auto-generated filler. Local pages must add genuine local value, not template-swapped boilerplate.
- Demonstrate first-hand-style usefulness (what to check, what to expect, when to call a pro).

### 5.5 Accessibility

- Semantic HTML and correct heading order.
- All meaningful images have descriptive \`alt\`; decorative images use empty \`alt\`.
- Color contrast meets WCAG AA; never rely on color alone to convey meaning.
- Visible focus states; keyboard operability for all interactive elements.
- Tap targets ≥44px; sticky call button must not obscure content or trap focus.
- Form-like controls (future tools) have associated labels.

### 5.6 Image standards

- Format: WebP, with responsive sizes (e.g., 1600 / 960 widths) and explicit width/height to avoid layout shift.
- **Licensed assets only — no hotlinking and no unlicensed stock.** Placeholders must be clearly marked and swappable without markup changes.
- Descriptive, keyword-natural filenames; descriptive alt text.
- Lazy-load below-the-fold imagery.

### 5.7 Schema standards

- Pillar pages: \`Article\` + \`BreadcrumbList\` + \`FAQPage\` (when FAQs present) + \`Organization\`/\`WebPage\` as already implemented on HVAC.
- Supporting guides: \`Article\` + \`BreadcrumbList\`; add \`FAQPage\` only if real FAQs exist.
- \`ImageObject\` for primary images. \`HowTo\` only for genuine step-by-step instructional content.
- Schema text must match visible on-page text. No fake \`Review\`/\`AggregateRating\` markup.

### 5.8 FAQ standards

- 4–8 genuine questions per page max; concise, educational answers.
- Visible question text must equal the schema question text.
- Answers never diagnose, guarantee, or pressure; route to a professional where appropriate.

### 5.9 CTA placement

- One standardized click-to-call CTA module per category, bound to a **single phone config** via \`[data-call]\`; no hardcoded numbers anywhere.
- Placement: after the hero/intro context, at natural decision points, and a mobile sticky call button (\`.sticky-call\`).
- **No lead-capture forms** in Home Services; click-to-call only.
- Until an approved campaign number is installed, CTAs use the placeholder config and fall back to an in-page educational anchor (e.g., the diagnostic).

### 5.10 Compliance considerations

- No medical/legal/financial advice; Home Services is home-maintenance education.
- No advertiser/partner branding, logos, or testimonials unless explicitly approved.
- Honor cost claims as ranges with caveats; avoid absolute savings/guarantee language.
- Respect privacy: no collection of sensitive personal data; click-to-call only.
- New categories/pages should pass an editorial + compliance review before promotion.

---
## Task 6 — 12-Month Rollout Roadmap

Prioritized for **long-term topical authority**, not short-term affiliate revenue. Sequencing favors (a) categories with the strongest internal-link gravity toward existing pillars, (b) high homeowner search demand, and (c) reuse of patterns already proven on HVAC.

### 6.1 Prioritization logic

- **Authority anchors first:** deepen HVAC's cluster and build the categories most linked to it (Insulation, Windows, Plumbing, Electrical), so internal-link equity compounds.
- **Leverage existing local infrastructure:** Pest Control and Home Security already have state directories — extend those into true clusters next.
- **Defer low-synergy or seasonal-only categories** until the shared components and editorial pipeline are proven.

### 6.2 Quarter-by-quarter plan

**Q1 — Foundation & flagship depth (authority anchor)**
- Stand up shared components and editorial pipeline (this Phase 5 spec) as the operating standard.
- Deepen HVAC to Tier 2: cost guide, maintenance checklist, troubleshooting, seasonal — fully interlinked (content build = later phase).
- Launch the first cross-cluster magnet: **Insulation** pillar (Tier 1), heavily linked to HVAC, Windows, Roofing.
- Local: extend HVAC into 2–3 highest-demand states using the existing \`/{category}/{state}/\` pattern.

**Q2 — Envelope & energy cluster**
- **Windows** → Tier 2 (cost, repair-vs-replace, energy-efficiency, buying guide).
- **Roofing** → Tier 2 (materials comparison, cost, repair-vs-replace, ventilation) + tighten Roofing↔Gutters↔Water Damage links.
- First **interactive tool** (educational): HVAC Repair-vs-Replace calculator tied into the HVAC cluster.

**Q3 — Wet trades & systems**
- **Plumbing** pillar (Tier 1→2): cost, common repairs, water-heater, leak troubleshooting; link to Water Damage, Appliance Repair, Bathroom Remodeling.
- **Electrical** pillar (Tier 1): panels, wiring basics, safety; link to Home Security, Solar, Appliance Repair.
- Extend Pest Control & Home Security from existing state pages into full clusters (Tier 2 + local depth).

**Q4 — Remodel & specialty, plus local scale**
- **Bathroom Remodeling** and **Kitchen Remodeling** → Tier 2 (cost, planning, trades-involved), linking to Plumbing/Electrical/Flooring.
- **Solar** pillar (Tier 1): how it works, cost/payback (ranges only), is-it-right-for-me; link Electrical/Windows/Roofing.
- Stubs/Tier-0 for remaining verticals: Flooring, Garage Doors, Foundation Repair, Appliance Repair (hub tile + Related Services).
- Local scale: roll the proven state→city template to the 2–3 best-performing clusters.

### 6.3 Highest-value categories (ranked, authority-first)

1. **HVAC** (existing flagship — deepen, don't rebuild)
2. **Insulation** (maximal internal-link synergy with HVAC/Windows/Roofing)
3. **Windows** (energy-efficiency bridge to HVAC)
4. **Plumbing** (anchors Water Damage + remodels; high evergreen demand)
5. **Roofing** (anchors Gutters/Water Damage; high value)
6. **Electrical** (anchors Home Security/Solar)
7. **Pest Control** / **Home Security** (existing local footprint to exploit)
8. **Solar**, **Bathroom/Kitchen Remodeling** (high value, more compliance care)
9. **Flooring, Garage Doors, Foundation Repair, Appliance Repair** (Tier-0 → grow on demand)

### 6.4 Supporting-article targets

- Per active cluster, aim for pillar + 4–6 supporting guides within its launch quarter.
- Standard supporting set per category: Cost Guide, Maintenance/Checklist, Troubleshooting, Repair-vs-Replace (or Buying Guide), Seasonal (where relevant).

### 6.5 Interactive tools (designed, built later)

Priority order for the educational tool backlog: HVAC Repair-vs-Replace → HVAC Lifespan → Energy Savings Estimator → Filter Replacement Reminder → Maintenance Calendar → SEER2 Comparison. One tool per cluster before adding a second to any category.

### 6.6 Local expansion opportunities

- Reuse the **existing** \`/{category}/{state}/\` directories (Pest Control ~34 states, Home Security ~12 states, Home Insurance ~9) as the template for HVAC/Plumbing/Roofing local rollout.
- Add city pages only beneath states that show real demand; each must add genuine local value (climate, codes, typical issues) — never boilerplate swaps.
- Sequence local expansion behind a mature cluster (Tier 2+) so local pages link into real depth.

---

## Appendix A — Definition of Done (every new page)

A Home Services page is ready for review when it: uses only shared components; has correct heading order and schema matching visible text; includes a Related Services block (3–5 siblings) + 2–4 contextual cross-links; carries the required disclaimer; uses click-to-call only (single config, no hardcoded numbers, no lead form); uses licensed WebP images (or clearly-marked swappable placeholders); avoids hype/urgency/guarantees; and passes editorial + compliance review before promotion.

## Appendix B — What this document is NOT

This is documentation only. It does **not** redesign existing pages, add articles, or build tools. It does not modify the HVAC Help Center. It defines the reusable foundation that every future Home Services vertical will follow.
