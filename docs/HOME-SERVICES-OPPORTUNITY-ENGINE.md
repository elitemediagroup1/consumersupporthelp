# Home Services Opportunity Intelligence Engine

**Status:** Editorial decision engine (documentation + tooling architecture only)
**Scope:** ConsumersSupportHelp.com — Home Services vertical
**Phase:** 7 — Opportunity Intelligence Engine
**Companion documents:** \`docs/HOME-SERVICES-KNOWLEDGE-PLATFORM.md\` (Phase 5 — standards) and \`docs/HOME-SERVICES-PUBLISHING-PLAYBOOK.md\` (Phase 6 — how to publish). This document decides **WHAT to publish next**.
**This is documentation only.** No code, no redesign, no page creation, no dashboard build. The HVAC Help Center is not modified.

---

## 0. Purpose & how this fits

Phase 5 defined the standards, Phase 6 defined the assembly line — this phase is the **editorial brain** that feeds the line. It continuously scores opportunities so the team builds the highest-leverage content next, prioritizing **long-term authority** over short-term affiliate payout.

Current ground truth (audited from the repo at time of writing):
- **Live flagship pillars (8):** HVAC, Roofing, Windows, Gutters, Water Damage, Pest Control, Home Security, Bathroom Remodeling — plus the Home Services hub.
- **HVAC** is the reference/flagship pillar (Tier 1, production-prep done; held on phone + licensed images).
- **No supporting guides, cost guides, calculators, or interactive tools exist yet** for any category (only flagship pillars + Phase-4 Related Services sections).
- **Existing local/state infrastructure:** \`pest-control/\` (33 state dirs) and \`home-security/\` (12 state dirs). No HVAC/Roofing/etc. local pages yet.
- **No pages yet** for: Plumbing, Electrical, Solar, Insulation, Garage Doors, Flooring, Kitchen Remodeling, Foundation Repair, Appliance Repair.

The engine outputs three things the team acts on: a ranked **category list** (Task 2), a **gap matrix** of specific missing pages (Task 4), and a **90-day plan** (Task 6) — all derived from one transparent **Opportunity Score** (Task 1).

---

## Task 1 — Opportunity Scoring Framework

Every potential opportunity (a category, or a specific page/tool within it) receives one **Opportunity Score (0–100)**, computed from ten weighted factors. Weights reflect the platform's authority-first mandate: demand, intent, gap, and authority-leverage outrank raw affiliate potential.

### 1.1 Factors, scales, and weights

Each factor is scored **0–5** (0 = none, 5 = exceptional), then multiplied by its weight. Weights sum to 100.

| # | Factor | Weight | What a 5 looks like | What a 1 looks like |
|---|---|---|---|---|
| 1 | Search demand | 16 | Large, stable, year-round query volume | Niche, rare queries |
| 2 | Commercial intent | 12 | Buyers comparing/hiring now | Pure curiosity, no action |
| 3 | Content gap (our absence) | 14 | We have nothing; clear opening | Already well covered by us |
| 4 | Existing authority leverage | 12 | Strong internal links from live pillars (e.g., HVAC) | Isolated, no internal support |
| 5 | Internal linking opportunity | 8 | Connects many siblings per §4 map | Few natural links |
| 6 | Competition (inverse) | 10 | Beatable SERP, thin incumbents | Entrenched, high-authority incumbents |
| 7 | Affiliate / monetization potential | 8 | Multiple revenue paths available | Hard to monetize responsibly |
| 8 | Local expansion potential | 8 | Strong state/city demand + template ready | No meaningful local angle |
| 9 | Interactive tool potential | 7 | Natural calculator/estimator fit | No tool rationale |
| 10 | Seasonal relevance | 5 | Predictable seasonal spikes to capture | Flat / no timing leverage |

### 1.2 Formula

\`\`\`
RawScore   = Σ (factor_score[0–5] × weight)
Opportunity Score = RawScore / 5          // normalize 0–500 → 0–100
\`\`\`

(Max raw = 5 × 100 = 500 → /5 = 100.)

### 1.3 Score bands → action

- **80–100 — Build now:** enter the Immediate queue (Phase 6, Task 5).
- **60–79 — Build next:** queue after current Immediate items clear.
- **40–59 — Watch:** keep a stub/Tier-0 presence; revisit with data.
- **<40 — Defer:** no investment until conditions change.

### 1.4 Scoring rules

- Score **categories** for portfolio sequencing (Task 2) and **individual pages/tools** for backlog ordering (Task 4 / Phase 6 queue).
- **Authority-first override:** never let factor 7 (affiliate) alone push an item above an item with higher demand + gap + authority leverage.
- Re-score quarterly, or when real traffic/performance data arrives (the dashboard, Task 5, automates this).
- Ties break toward the option with greater internal-link gravity to existing live pillars.

---
## Task 2 — Category Scoring

The framework (Task 1) applied to all 16 Home Services categories. Factor scores are editorial estimates (0–5) calibrated to the platform's current state and authority-first mandate; they are **planning inputs, not measured data** — the dashboard (Task 5) will replace estimates with real signals over time.

### 2.1 Factor scores by category

Columns: SD=Search demand, CI=Commercial intent, GAP=Content gap, AUTH=Authority leverage, ILink=Internal linking, COMP=Competition(inverse), AFF=Affiliate, LOC=Local, TOOL=Tool potential, SEAS=Seasonal.

| Category | SD | CI | GAP | AUTH | ILink | COMP | AFF | LOC | TOOL | SEAS | Score |
|---|---|---|---|---|---|---|---|---|---|---|---|
| HVAC | 5 | 5 | 3 | 5 | 5 | 3 | 4 | 5 | 5 | 5 | **86** |
| Plumbing | 5 | 5 | 5 | 4 | 4 | 3 | 4 | 5 | 3 | 3 | **84** |
| Roofing | 5 | 5 | 3 | 4 | 4 | 3 | 4 | 5 | 4 | 4 | **80** |
| Windows | 4 | 5 | 3 | 5 | 5 | 3 | 4 | 4 | 4 | 3 | **79** |
| Electrical | 4 | 4 | 5 | 4 | 4 | 3 | 3 | 4 | 3 | 2 | **74** |
| Insulation | 4 | 4 | 5 | 5 | 5 | 4 | 3 | 3 | 4 | 3 | **80** |
| Solar | 4 | 5 | 5 | 4 | 4 | 2 | 5 | 4 | 5 | 2 | **79** |
| Water Damage | 4 | 5 | 3 | 4 | 4 | 3 | 4 | 4 | 2 | 3 | **73** |
| Foundation Repair | 3 | 5 | 5 | 3 | 3 | 4 | 4 | 4 | 3 | 2 | **72** |
| Kitchen Remodeling | 4 | 5 | 5 | 3 | 4 | 2 | 4 | 3 | 4 | 1 | **72** |
| Bathroom Remodeling | 4 | 5 | 3 | 3 | 4 | 2 | 4 | 3 | 4 | 1 | **67** |
| Pest Control | 4 | 4 | 3 | 3 | 3 | 3 | 4 | 5 | 2 | 4 | **70** |
| Home Security | 4 | 4 | 3 | 4 | 4 | 2 | 5 | 5 | 3 | 2 | **72** |
| Garage Doors | 3 | 4 | 5 | 3 | 3 | 4 | 4 | 3 | 3 | 2 | **68** |
| Flooring | 4 | 4 | 5 | 3 | 4 | 2 | 4 | 3 | 3 | 1 | **68** |
| Appliance Repair | 4 | 4 | 5 | 3 | 3 | 3 | 3 | 4 | 3 | 2 | **70** |

### 2.2 Ranked by long-term opportunity

1. **HVAC (86)** — flagship; deepen the cluster (highest authority + tool + seasonal leverage).
2. **Plumbing (84)** — huge demand + total gap + anchors Water Damage/remodels.
3. **Roofing (80)** — high-value, anchors Gutters/Water Damage; pillar already live.
4. **Insulation (80)** — maximal internal-link synergy with HVAC/Windows/Roofing.
5. **Windows (79)** — energy-efficiency bridge to HVAC; pillar live.
6. **Solar (79)** — strong intent + revenue diversity + tool fit (needs compliance care).
7. **Electrical (74)** — total gap; anchors Home Security/Solar.
8. **Water Damage (73)** — high intent; pillar live; anchors Plumbing.
9. **Foundation Repair (72)** / **Kitchen Remodeling (72)** / **Home Security (72)** — strong but more specialized or compliance-heavy.
10. **Pest Control (70)** / **Appliance Repair (70)** — Pest has existing local footprint to exploit.
11. **Garage Doors (68)** / **Flooring (68)** — solid gaps, lower urgency.
12. **Bathroom Remodeling (67)** — pillar live; deepen opportunistically.

### 2.3 Reading the ranking

The top tier (HVAC, Plumbing, Roofing, Insulation, Windows) concentrates investment where authority compounds: deepen the live HVAC flagship, fill the biggest demand-plus-gap opening (Plumbing), and build the energy-envelope cluster (Insulation/Windows/Roofing) that links back into HVAC. Pest Control and Home Security rank mid-pack on content but carry **existing local infrastructure** (33 and 12 state dirs) — cheap local leverage once their clusters mature.

---
## Task 3 — Affiliate Opportunity Matrix

For each category, the candidate revenue paths — the objective is **diversified monetization**, not dependence on a single method. All paths must respect the platform rules: click-to-call only (no lead forms), no advertiser branding/testimonials unless approved, no "free"/guarantee/urgency language, and full compliance + human sign-off before any monetization goes live.

Columns mark fit: ●=strong, ◐=moderate, ○=weak/none.

| Category | Affiliate partners | Lead gen | Click-to-call | Display ads | Digital products | Newsletter | Future sponsorships |
|---|---|---|---|---|---|---|---|
| HVAC | ◐ (filters, thermostats, parts) | ◐ | ● (primary now) | ● | ◐ (maintenance checklist/guide) | ● | ● (mfrs, home-services brands) |
| Plumbing | ◐ (fixtures, leak sensors) | ◐ | ● | ● | ◐ | ● | ◐ |
| Roofing | ○ | ◐ | ● | ● | ○ | ◐ | ● |
| Windows | ◐ (films, treatments) | ◐ | ● | ● | ○ | ◐ | ● |
| Electrical | ◐ (smart switches, surge) | ◐ | ● | ● | ○ | ◐ | ◐ |
| Insulation | ◐ (DIY materials) | ◐ | ● | ● | ◐ (R-value guide) | ◐ | ◐ |
| Solar | ● (high-value referrals) | ● | ● | ● | ◐ (payback calculator gated?) | ● | ● |
| Water Damage | ○ (urgent, restoration) | ◐ | ● | ◐ | ○ | ○ | ◐ |
| Foundation Repair | ○ | ◐ | ● | ◐ | ○ | ○ | ◐ |
| Kitchen Remodeling | ● (appliances, fixtures) | ◐ | ● | ● | ◐ (planning kit) | ● | ● |
| Bathroom Remodeling | ● (fixtures, vanities) | ◐ | ● | ● | ◐ | ● | ◐ |
| Pest Control | ● (DIY products, subs) | ◐ | ● | ● | ◐ (prevention guide) | ● | ◐ |
| Home Security | ● (devices, monitoring) | ● | ● | ● | ◐ | ● | ● |
| Garage Doors | ◐ (openers, parts) | ◐ | ● | ● | ○ | ○ | ◐ |
| Flooring | ● (materials, tools) | ◐ | ● | ● | ◐ | ◐ | ● |
| Appliance Repair | ● (parts, brands) | ◐ | ● | ● | ◐ (troubleshooting guide) | ◐ | ◐ |

### 3.1 Diversification strategy

- **Now:** click-to-call is the live primary path (single phone config, placeholder until an approved number lands). It works on every category.
- **Layer 2 (display + newsletter):** add once a cluster has traffic; newsletters convert best in recurring-need categories (HVAC, Pest, Home Security, remodels).
- **Layer 3 (affiliate):** strongest in product-adjacent categories (Home Security, Solar, Flooring, Pest, Appliance, remodels). Always editorial-first; products recommended on merit, clearly disclosed, never with hype.
- **Layer 4 (digital products + sponsorships):** checklists/guides and brand sponsorships once authority is established. No pay-to-play editorial.
- **Revenue rule:** monetization never overrides the authority-first content sequence in Task 2; a category is built because it earns trust, then monetized responsibly.

---

## Task 4 — Content Gap Matrix

What exists today vs. what's missing, per category, with prioritized gaps. "Pillar" = flagship Help Center. Status grounded in the repo audit (§0). Priority: P1 (highest leverage) → P3.

| Category | Pillar | Missing pillar | Missing supporting articles | Missing tools/calculators | Missing local | Missing FAQs | Top gap priority |
|---|---|---|---|---|---|---|---|
| HVAC | ✅ live | — | Cost, Maintenance, Troubleshooting, Seasonal, Repair-vs-Replace | Repair-vs-Replace, Lifespan, Energy-savings, Filter-reminder | State→city (none yet) | per-supporting | **P1** (deepen cluster + first tool) |
| Plumbing | ❌ | **Yes** | Cost, Water-heater, Leak-troubleshooting, Maintenance | Cost estimator | State (none) | Pillar + cluster | **P1** (build pillar) |
| Roofing | ✅ live | — | Materials/comparison, Cost, Repair-vs-Replace, Ventilation | Cost/lifespan | State (none) | Materials + Cost | **P1** |
| Insulation | ❌ | **Yes** | Cost, R-value, Types, Attic-guide | R-value/savings calc | State (none) | Pillar + cluster | **P1** (link magnet to HVAC) |
| Windows | ✅ live | — | Cost, Repair-vs-Replace, Efficiency, Buying | Cost/savings calc | State (none) | Cost + RvR | **P2** |
| Solar | ❌ | **Yes** | How-it-works, Cost/payback, Is-it-right | Payback calculator | State (none) | Pillar + cluster | **P2** |
| Electrical | ❌ | **Yes** | Panels, Wiring-basics, Safety, Cost | — | State (none) | Pillar | **P2** |
| Water Damage | ✅ live | — | Causes, Cost, Prevention, Mold-basics | — | State (none) | Cost + Prevention | **P2** |
| Pest Control | ✅ live | — | Per-pest guides, Cost, Prevention | — | ✅ 33 states (deepen) | Per-pest FAQs | **P2** (exploit local) |
| Home Security | ✅ live | — | Systems-compare, Cost, Smart-home | — | ✅ 12 states (deepen) | Cost + compare | **P2** (exploit local) |
| Bathroom Remodeling | ✅ live | — | Cost, Planning, Small-bath | Cost estimator | State (none) | Cost + Planning | **P3** |
| Kitchen Remodeling | ❌ | **Yes** | Cost, Planning, Layouts | Cost estimator | State (none) | Pillar + Cost | **P3** |
| Foundation Repair | ❌ | **Yes** | Signs, Cost, Methods | Cost estimator | State (none) | Pillar | **P3** |
| Garage Doors | ❌ | **Yes** | Opener, Repair, Cost | — | State (none) | Pillar | **P3** |
| Flooring | ❌ | **Yes** | Types, Cost, Compare | Cost estimator | State (none) | Pillar | **P3** |
| Appliance Repair | ❌ | **Yes** | Per-appliance, Cost, Repair-vs-Replace | RvR tool | State (none) | Pillar | **P3** |

### 4.1 Gap prioritization summary

- **Highest-leverage gaps (do first):** HVAC supporting cluster + first interactive tool; Plumbing pillar; Insulation pillar; Roofing materials + cost guides. These combine top scores (Task 2) with biggest demand-plus-gap openings.
- **Second wave:** Windows/Solar/Electrical/Water Damage supporting clusters; deepen Pest & Home Security clusters to unlock their existing local pages.
- **Local gap:** no Home Services category except Pest/Home-Security has local pages; HVAC/Plumbing/Roofing local rollout is the largest untapped surface — but gated behind Tier-2 clusters.
- **Tool gap:** zero interactive tools exist; the HVAC Repair-vs-Replace calculator is the single highest-leverage first build (designed in Phase 4/6, build is a later phase).

---
## Task 5 — Editorial Dashboard (design only)

A design for the dashboard that will eventually surface opportunity intelligence at a glance. **Do not build it** — this section specifies metrics, layout, and data sources so it can be built in a later phase.

### 5.1 Metrics (per category and per page)

| Metric | Definition | Source (eventual) | 0 → 100 meaning |
|---|---|---|---|
| Content Score | Completeness of the cluster vs. the ideal template set | Internal content inventory | 0 = nothing; 100 = pillar + full supporting + tool + FAQs |
| Authority Score | Topical authority (internal links in/out, depth, freshness) | Internal link graph + search-console signals | 0 = isolated; 100 = dominant pillar |
| Revenue Potential | Weighted sum of available monetization paths (Task 3) | Affiliate matrix + measured RPM | 0 = none; 100 = multi-path, proven |
| Traffic Potential | Modeled demand × ranking opportunity | Demand data + SERP position | 0 = negligible; 100 = high, attainable |
| Completion % | Built pages ÷ planned pages in the cluster | Content inventory vs. gap matrix | 0–100% |
| Publishing Status | Workflow stage (Phase 6, Task 1) | Editorial workflow tracker | Research → … → Published / Held |
| Seasonality | Current seasonal index for the category | Seasonal model | Off-season → peak |
| Affiliate Readiness | Are compliant monetization paths live? | Compliance log + partner status | Not ready → ready |

### 5.2 Layout (conceptual)

- **Top row — Portfolio summary:** total categories, % with live pillars, overall Completion %, opportunities in each score band (Build now / next / watch / defer).
- **Main grid — Category cards** sorted by Opportunity Score: each card shows the 8 metrics as compact gauges + the next recommended action (from the gap matrix).
- **Drill-down — Cluster view:** a category expands to its pages (pillar + supporting + tools + local), each row showing Publishing Status, Content/Authority/Traffic, and the next workflow gate.
- **Right rail — Action queue:** the live Immediate/Next/Future backlog (Phase 6 Task 5), re-sorted as scores update.
- **Filters:** by score band, status, seasonality (e.g., "show peak-season categories"), and affiliate readiness.

### 5.3 Data sources & refresh

- **Internal:** content inventory, internal link graph, editorial workflow tracker (Phase 6 stages), compliance log.
- **External (read-only, later):** search demand/position, RPM/affiliate performance — fed in through whatever analytics the team adopts.
- **Refresh:** scores recompute on a schedule (e.g., weekly) and on content publish events; the dashboard never publishes or edits — it only informs.

### 5.4 Design constraints

- Reuse the existing design system (no new visual language) when this is eventually built.
- Read-only and internal; no PII, no exposure of partner/financial keys.
- Every "recommended action" links to the relevant playbook stage, not to an auto-publish trigger.

---

## Task 6 — 90-Day Execution Plan

Only work with a credible path to **measurable traffic, authority, or revenue**, sequenced for maximum leverage. Each block lists the leverage rationale. Content production follows the Phase 6 workflow with all human gates; "build tools" is design-ready but coded in a later phase.

### Days 1–30 — Deepen the flagship + open the biggest gap
- **HVAC supporting cluster:** publish Cost Guide, Maintenance Guide, Troubleshooting Guide (3 highest-intent supporting pages), fully interlinked to the live pillar. *Leverage: compounds existing HVAC authority immediately; no new pillar risk.*
- **Plumbing pillar (Tier 1):** build the #2-ranked category's flagship and wire it to Water Damage. *Leverage: largest demand-plus-gap opening in the portfolio.*
- **Install-readiness:** confirm the approved HVAC phone number + licensed images land so HVAC monetization (click-to-call) can actually convert. *Leverage: unlocks revenue on the highest-traffic page.*

### Days 31–60 — Build the authority cluster + first tool
- **Insulation pillar (Tier 1)** + link it bidirectionally to HVAC/Windows/Roofing. *Leverage: maximal internal-link gravity into the flagship.*
- **Roofing supporting:** Materials/Comparison + Cost guides. *Leverage: live pillar + high commercial intent + Gutters/Water-Damage linking.*
- **HVAC Repair-vs-Replace tool (build phase):** the single highest-leverage interactive asset; ship as the first calculator tied to the HVAC cost guide. *Leverage: differentiates the cluster, earns links, raises dwell/conversion.*
- **Layer-2 monetization:** stand up newsletter capture on the mature HVAC cluster. *Leverage: diversifies beyond click-to-call.*

### Days 61–90 — Extend clusters + begin local leverage
- **Windows + Water Damage supporting clusters** (Cost + one decision/prevention guide each). *Leverage: live pillars, energy + moisture link magnets.*
- **HVAC local pilot:** 2–3 highest-demand state pages using the existing \`/{category}/{state}/\` template (now that HVAC is Tier-2). *Leverage: reuses proven local infrastructure; large untapped surface.*
- **Deepen Pest Control / Home Security clusters** enough to activate their existing 33 / 12 state directories. *Leverage: cheapest local expansion in the portfolio — infrastructure already exists.*
- **Re-score everything** with the first 90 days of real data; reload the Immediate/Next/Future queue.

### 6.1 What is intentionally NOT in the 90 days
- Low-score, low-leverage pillars (Garage Doors, Flooring, Foundation, Appliance) stay at Tier-0 stubs until data or links justify investment.
- Kitchen/Bathroom remodel deep-builds wait for the higher-authority clusters to mature.
- No local pages beneath any cluster still below Tier 2.

### 6.2 Success measures (review at day 90)
- HVAC cluster Completion % and authority (internal links + position) materially up.
- Plumbing and Insulation pillars live and earning internal links.
- First interactive tool shipped; newsletter capturing on HVAC.
- HVAC click-to-call live (pending the user-side phone + image inputs).
- A re-scored, data-informed backlog for days 91–180.

---

## Appendix A — Engine cadence
Re-score quarterly or on new data. Categories flow: **score (Task 1) → rank (Task 2) → identify gaps (Task 4) → check monetization fit (Task 3) → schedule (Task 6) → publish via Phase 6 → measure on the dashboard (Task 5) → re-score.**

## Appendix B — What this document is NOT
Documentation only. No code, no redesign, no page creation, no dashboard build. It does not modify the HVAC Help Center. It is the decision engine that determines what ConsumersSupportHelp builds next, feeding the Phase 6 publishing engine in conformance with the Phase 5 standards.
