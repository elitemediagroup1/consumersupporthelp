# ConsumersSupportHelp — Master Project Dashboard

**The single source of truth and operating manual for the ConsumersSupportHelp platform.**
Documentation only. No code, no production changes. Update this file as status changes.
_Last updated: 2025 (Phase 9). Status values are maintained by the editorial/web owners._

---

## 1. Executive Summary

**Current project status:** Infrastructure phase complete. The Home Services platform has a full operating system — standards, publishing workflow, decision engine, and developer tooling — plus eight live flagship pillar pages. The program is now positioned to shift from *building infrastructure* to *producing content at scale*.

**Overall completion %**

| Workstream | Completion | Note |
|---|---|---|
| Platform infrastructure (Phases 5–8) | **100%** | Standards, playbook, opportunity engine, content factory all committed. |
| Home Services pillars (8 of 16 categories) | **~50%** | 8 live; 8 categories not yet started. |
| Supporting content (guides/tools/local) | **~5%** | No supporting guides, tools, or new local pages built yet. |
| Monetization activation | **~10%** | Click-to-call wired (placeholder); no path fully live. |
| **Overall platform** | **~40%** | Strong foundation; content + monetization are the open frontier. |

**Current priorities (in order)**
1. Install the approved HVAC click-to-call number + licensed images, then launch-confirm HVAC.
2. Deepen the HVAC cluster (Cost, Maintenance, Troubleshooting guides) using the Content Factory.
3. Build the two highest-opportunity new pillars: Plumbing and Insulation.
4. Ship the first interactive tool (HVAC Repair-vs-Replace) and stand up newsletter capture.

**Launch blockers (platform-wide)**
- [ ] Approved HVAC click-to-call number not yet installed (still \`REPLACE_WITH_APPROVED_NUMBER\`).
- [ ] Licensed HVAC WebP images not yet added (placeholders in place).
- [ ] PX/ARS creative/content approval pending before HVAC promotion.

**Recently completed work**
- Phase 5 — Knowledge Platform spec (architecture, components, clusters, linking, editorial standards, roadmap).
- Phase 6 — Publishing Playbook (11-stage workflow, templates, prompt library, QA checklist, queue, automation map).
- Phase 7 — Opportunity Intelligence Engine (scoring, category ranking, affiliate + content-gap matrices, dashboard design, 90-day plan).
- Phase 8 — Content Factory (6 internal dev tools + config + README).
- Phase 4 — Ecosystem & internal SEO (Related Services sections across all live pages; HVAC flagship hub tile).
- Phase 3 — HVAC production-prep + QA (commit \`cb1518e\`).

---

## 2. Home Services — Category Status

Status key: **Planned** (no page) · **In Progress** · **Live** (pillar published) · **Monetized** (a revenue path active).
"Tier" per the Knowledge Platform maturity ladder (0 Stub → 1 Pillar → 2 Cluster → 3 Interactive → 4 Local).

| Category | Status | Tier | Opportunity Score | Notes |
|---|---|---|---|---|
| HVAC | Live | 1 | 86 | Flagship; held on phone + images; cluster build is next. |
| Roofing | Live | 1 | 80 | Pillar + Related Services live. |
| Windows | Live | 1 | 79 | Pillar live. |
| Gutters | Live | 1 | — | Pillar live (links to Roofing/Water Damage). |
| Water Damage | Live | 1 | 73 | Pillar live. |
| Pest Control | Live | 1 | 70 | Pillar live; **33 state dirs** exist (cluster not yet deepened). |
| Home Security | Live | 1 | 72 | Pillar live; **12 state dirs** exist. |
| Bathroom Remodeling | Live | 1 | 67 | Pillar live. |
| Plumbing | Planned | 0 | 84 | **Top new-build priority.** |
| Insulation | Planned | 0 | 80 | High internal-link synergy with HVAC. |
| Solar | Planned | 0 | 79 | Compliance care needed. |
| Electrical | Planned | 0 | 74 | — |
| Foundation Repair | Planned | 0 | 72 | — |
| Kitchen Remodeling | Planned | 0 | 72 | — |
| Garage Doors | Planned | 0 | 68 | — |
| Flooring | Planned | 0 | 68 | — |
| Appliance Repair | Planned | 0 | 70 | — |

**Summary:** 8 Live · 0 In Progress · 8 Planned · 0 fully Monetized (click-to-call wired but placeholder).

---
## 3. Content Status

Counts reflect current repo state. "—" = not started.

| Category | Pillar | Supporting guides | Interactive tools | FAQs | Local pages | Schema | Images |
|---|---|---|---|---|---|---|---|
| HVAC | ✅ | 0 / ~5 planned | 0 / 1 planned | ✅ on pillar | 0 (state→city planned) | ✅ Article+FAQ+Breadcrumb | Placeholders (licensed pending) |
| Roofing | ✅ | 0 | 0 | partial | 0 | ✅ | placeholders |
| Windows | ✅ | 0 | 0 | partial | 0 | ✅ | placeholders |
| Gutters | ✅ | 0 | 0 | partial | 0 | ✅ | placeholders |
| Water Damage | ✅ | 0 | 0 | partial | 0 | ✅ | placeholders |
| Pest Control | ✅ | 0 | 0 | partial | **33 states** | ✅ | placeholders |
| Home Security | ✅ | 0 | 0 | partial | **12 states** | ✅ | placeholders |
| Bathroom Remodeling | ✅ | 0 | 0 | partial | 0 | ✅ | placeholders |
| Plumbing → Appliance Repair (8 planned) | — | — | — | — | — | — | — |

**Content totals:** 8 pillars live · 0 supporting guides · 0 interactive tools · 45 state pages (Pest 33 + Home Security 12, pre-existing) · 0 net-new local pages built this program.
**Image note:** every page uses clearly-marked, swappable placeholders; licensed WebP assets are an outstanding input across the platform.

---

## 4. Monetization Status

All paths must follow platform rules: click-to-call only (no lead forms), no advertiser branding/testimonials unless approved, no hype/guarantee language, human compliance sign-off before going live.

| Path | Status | Detail / next step |
|---|---|---|
| Affiliate partners | **Not started** | Strongest fit: Home Security, Solar, Flooring, Pest, Appliance, remodels. Editorial-first, disclosed. |
| Click-to-call campaigns | **Wired, not live** | Single config per category via \`[data-call]\`; placeholder \`REPLACE_WITH_APPROVED_NUMBER\`; falls back to in-page anchor. Activate on HVAC first. |
| Display ads | **Not started** | Layer in once clusters have traffic. |
| Newsletter | **Not started** | Highest fit in recurring-need categories (HVAC, Pest, Home Security, remodels). Stand up on mature HVAC cluster. |
| Digital products | **Not started** | Checklists/guides once authority is established. |
| Sponsorships | **Not started** | After authority; no pay-to-play editorial. |

**Monetization rule:** revenue never overrides the authority-first content sequence. A category is built to earn trust, then monetized responsibly.

---

## 5. Technical Status

| Area | Status | Notes |
|---|---|---|
| Navigation | ✅ Good | Home Services nav + hub; HVAC is flagship tile; footer links present. |
| Schema | ✅ Good | Pillars carry Article/FAQPage/BreadcrumbList; standards in Knowledge Platform §5.7; generator in tools/. |
| Performance | ⚠️ Monitor | Static HTML on Netlify (fast baseline). Run PageSpeed/Lighthouse per page before promotion; ensure WebP + sized images. |
| Accessibility | ⚠️ Verify | Standards defined (§5.5); validator checks H1/alt/hierarchy. Per-page human a11y review still required. |
| Internal linking | ✅ Good | Related Services on all live pages; canonical relationship map in §4.1; assistant in tools/. |
| QA | ✅ Process ready | Phase 6 checklist + tools/qa-validator.js (static pre-screen). Human QA sign-off mandatory. |
| Clean URLs | ✅ Good | \`/hvac\` serves \`/hvac.html\` (Netlify rewrite). All sitemap entries clean. |

**Outstanding bugs / risks**
- None tracked as code defects. Open *items* (not bugs): placeholder phone config + placeholder images across all pages; no automated CI yet for the validator (runs manually/locally).
- Watch: Netlify \`publish\` dir is repo root, so \`docs/\` and \`tools/\` files are reachable as raw static files — acceptable (non-HTML, unlinked, not in sitemap), but never add \`.html\` under \`tools/\`.

---
## 6. Launch Checklist (per category)

Each category must clear these before promotion. ✅ done · ☐ pending · — n/a.
Universal gates (apply to every page): approved phone number installed · licensed WebP images · compliance sign-off · QA sign-off · schema validates · accessibility pass.

### HVAC (flagship — closest to launch)
- [x] Pillar published, structure + QA approved (commit cb1518e)
- [x] Schema (Article + FAQ + Breadcrumb)
- [x] Related Services + internal links
- [x] Mobile sticky click-to-call wired
- [ ] Approved phone number installed
- [ ] Licensed WebP images added
- [ ] PX/ARS creative/content approval
- [ ] Final publish confirmation

### Plumbing (top new build)
- [ ] Pillar built (Content Factory) · [ ] Schema · [ ] Links · [ ] CTA · [ ] Images · [ ] Compliance · [ ] QA · [ ] Publish

### Electrical
- [ ] Pillar · [ ] Schema · [ ] Links · [ ] CTA · [ ] Images · [ ] Compliance · [ ] QA · [ ] Publish

### Roofing / Windows / Gutters / Water Damage / Pest Control / Home Security / Bathroom Remodeling (live pillars)
- [x] Pillar published · [x] Schema · [x] Related Services
- [ ] Approved phone number · [ ] Licensed images · [ ] Compliance sign-off · [ ] Final publish confirmation
- [ ] (Pest, Home Security) activate existing state pages once cluster reaches Tier 2

### Insulation / Solar / Foundation Repair / Kitchen Remodeling / Garage Doors / Flooring / Appliance Repair (planned)
- [ ] Pillar · [ ] Schema · [ ] Links · [ ] CTA · [ ] Images · [ ] Compliance · [ ] QA · [ ] Publish

---

## 7. KPI Dashboard

Targets/values are populated from analytics once live. \`TBD\` = not yet measured (no metric is invented here).

| KPI | Current | Target (90-day) | Source |
|---|---|---|---|
| Pages (Home Services) | 8 pillars + 45 state pages | +5 pillars, +12 supporting | Content inventory |
| Indexed pages | TBD | ≥ 90% of published | Search Console |
| Calls (click-to-call) | 0 (placeholder) | live after number install | Call tracking |
| Revenue (total) | TBD | first attributable revenue | Finance |
| CTR (organic) | TBD | baseline + improve | Search Console |
| RPM | TBD | establish baseline | Ad/affiliate platform |
| Affiliate revenue | $0 | first affiliate conversions | Affiliate dashboards |
| Lead / call revenue | $0 | first call-driven revenue | Call tracking |
| Organic traffic | TBD | establish + grow | Analytics |
| Top landing pages | TBD (expect HVAC pillar) | track top 10 | Analytics |

**Note:** the live dashboard design (data sources, layout, refresh) is specified in the Opportunity Engine (Task 5); this table is the manual interim tracker until that is built.

---

## 8. Roadmap

### Now (0–30 days)
- Install HVAC phone number + licensed images; final HVAC launch confirmation.
- Build HVAC supporting cluster: Cost, Maintenance, Troubleshooting (Content Factory → human review).
- Build Plumbing pillar (Tier 1).

### Next (30–90 days)
- Insulation pillar; Roofing Materials + Cost guides.
- Ship HVAC Repair-vs-Replace interactive tool (first calculator).
- Stand up newsletter capture on the HVAC cluster.
- Windows + Water Damage supporting guides; HVAC local pilot (2–3 states).

### Later (90+ days)
- Electrical, Solar, Kitchen/Bathroom remodel deep-builds.
- Deepen Pest Control / Home Security clusters to activate existing state pages; expand local (state→city) on mature clusters.
- Tier-0 stubs → growth for Garage Doors, Flooring, Foundation, Appliance.
- Build the live editorial dashboard (per Opportunity Engine Task 5).

### Completed
- Phases 3–8 (production-prep, ecosystem/SEO, knowledge platform, publishing playbook, opportunity engine, content factory). See Repository Index.

---

## 9. Repository Index

**Documentation (\`docs/\`)**
- Knowledge Platform — standards: \`docs/HOME-SERVICES-KNOWLEDGE-PLATFORM.md\`
- Publishing Playbook — how to publish: \`docs/HOME-SERVICES-PUBLISHING-PLAYBOOK.md\`
- Opportunity Engine — what to build next: \`docs/HOME-SERVICES-OPPORTUNITY-ENGINE.md\`
- Master Dashboard — this file: \`docs/DASHBOARD.md\`
- _Future docs: add here as created._

**Developer tooling (\`tools/\` — internal, non-production)**
- \`tools/README.md\` — Content Factory overview + workflow integration
- \`tools/config.js\` — categories, design-system classes, page types, relationship map, prohibited words, placeholder phone
- \`tools/page-generator.js\` (Tool 1) · \`tools/schema-generator.js\` (Tool 2) · \`tools/metadata-generator.js\` (Tool 3)
- \`tools/internal-linking-assistant.js\` (Tool 4) · \`tools/qa-validator.js\` (Tool 5) · \`tools/build-checklist-generator.js\` (Tool 6)

**Live Home Services pages**
- Hub: \`/home-services\` · Pillars: \`/hvac\`, \`/roofing\`, \`/windows\`, \`/gutters\`, \`/water-damage\`, \`/pest-control\`, \`/home-security\`, \`/bathroom-remodeling\`
- Existing local: \`/pest-control/{state}\` (33) · \`/home-security/{state}\` (12)

---

## 10. How to use this dashboard
1. **Decide** what to build using the Opportunity Engine; reflect the choice in §2/§8.
2. **Build** it via the Content Factory following the Publishing Playbook's 11 stages.
3. **Verify** against the Launch Checklist (§6) and the Knowledge Platform standards.
4. **Update** §1–§7 status and §7 KPIs here after each change. This file is the operating manual — keep it current.

_This dashboard is documentation only. It does not modify the HVAC Help Center or any production page._
