# Case Study: AI-Powered Google Ads Automation for Agencies

## The Problem: Manual Campaign Setup Doesn't Scale

Marketing agencies running Google Ads for multiple clients face an operational bottleneck that has nothing to do with strategy — it's the **hours of repetitive labor** before a single ad serves.

For every new client campaign, an account manager must:

| Task | Manual Time | What It Involves |
|------|------------|------------------|
| Competitive research | 3-5 hours | Browsing Google Ads Transparency Center, screenshotting competitor ads, noting patterns, identifying angles |
| Ad copywriting | 3-6 hours | Writing 15+ RSA headlines (≤30 chars each), 4+ descriptions (≤90 chars), display copy variations — per angle, per ad group |
| Display creative production | 4-8 hours | Briefing a designer, iterating on layouts, resizing for 7 standard Google sizes, brand compliance review |
| Campaign assembly | 2-4 hours | Structuring ad groups, assigning keywords, setting match types, configuring bid strategy, scheduling, negatives |
| Policy review | 1-2 hours | Checking every headline and description against Google Ads policies, brand guidelines, banned terms |
| **Total per client** | **13-25 hours** | **Before the first ad serves** |

An agency managing 15 clients spends **200-375 hours/month** just on setup and refresh — that's **1.5-2.5 full-time employees** doing work that doesn't require strategic thinking, just attention to detail and repetition.

The result: agencies either limit their client count (capping revenue), hire junior staff who make policy mistakes (risking account suspensions), or cut corners on research (producing generic ads that underperform).

---

## The Solution: Research-to-Launch Co-Pilot

This system automates the entire front half of Google Ads management — from competitive intelligence through campaign assembly — while keeping humans in control of strategy, budgets, and the publish button.

### What the System Does

**Step 1: Competitive Analysis (replaces 3-5 hours of manual research)**

The system scrapes and analyzes the competitive landscape for the client's vertical and geography:

- **Corpus collection**: Pulls 100+ competitor ads from Google Ads Transparency Center and SerpApi.
- **Enrichment (per ad)**: Extracts value propositions, emotional hooks, implied personas, claims, CTAs, offer types, price points, and promotion cadence. Display ads get vision analysis: faces, before/after imagery, text density, dominant colors.
- **Longevity-weighted ranking**: Instead of ranking by frequency (which rewards cheap, short-lived spam), the system ranks by **how long ads survive**. An ad running for 90 days with multiple variants scores higher than 50 identical ads that each lasted a week. This surfaces what actually works, not what's cheapest to produce.
- **Gap identification**: The strategic payload. The system identifies 2-5 angles that competitors are **not** covering — positioning opportunities the client can own. These gaps drive generation, not imitation.

**Output: Analysis Object** — winning angles (ranked by longevity), saturated angles to avoid, gap opportunities, creative norms, keyword seeds, common offers, CTA patterns, and target persona.

**Step 2: Variant Generation (replaces 3-6 hours of copywriting + 4-8 hours of design)**

The system generates ad variants along a deliberate test matrix, grounded in the analysis:

- **Gap-first strategy**: Variants are generated along explicit axes — gap opportunities first (own what competitors miss), then proven survivor angles (what's working long-term), then client USP. Every variant carries an `insight_ref` tying it back to the specific strategic insight it exploits.
- **Search RSA generation**: 3-15 headlines (≤30 chars) + 2-4 descriptions (≤90 chars) per variant. Character limits enforced deterministically — truncated at word boundaries, padded with insight-derived fallbacks, deduped.
- **Display creative generation**: LLM emits a structured render-spec (template ID, headline, subhead, CTA, image query, treatment). Deterministic code renders the actual creative — the LLM never writes layout HTML/CSS.
- **4 proven display templates**: split_image_left, image_overlay_bottom, bold_centered, minimal_left_rule. Each renders at 7 standard Google sizes (1200x628, 728x90, 320x50, 160x600, 300x600, 300x250, 336x280) with per-size font scaling, padding, and layout adaptation.
- **Brand compliance**: Colors from brand kit with WCAG-legible contrast computation. Fonts loaded from brand kit or Google Fonts with bundled fallback. Logo embedded when available.

**Two-layer quality gate (no unsafe copy ships):**

1. **Deterministic policy scan**: Banned superlatives ("best", "#1", "guaranteed", "miracle", "100%", "risk-free", "instant results"), excessive punctuation, brand do-not-use terms. This gate can only block — it can never be overridden by the LLM.
2. **LLM rubric critique**: Scores single-message clarity, CTA strength, and differentiation (0-1 each). Variants scoring below 0.5 on any dimension are regenerated up to 2 times, then dropped entirely.

**Step 3: Campaign Assembly (replaces 2-4 hours of manual configuration)**

Deterministic, non-LLM campaign assembly with smart defaults:

- **Budget**: Copied verbatim from the client profile. The LLM never sets, suggests, or modifies budget values. This is a non-negotiable architectural constraint enforced at every layer.
- **Bid strategy**: Automatically mapped from campaign goal — leads/calls/sales → maximize conversions; traffic/awareness → maximize clicks. Uses Google Smart Bidding.
- **Ad group theming**: Groups organized by the strategic insight each variant exploits. A gap-angle variant goes in a different ad group than a proven-angle variant, with keywords distributed by topic relevance.
- **Keyword distribution**: Analysis keyword seeds distributed across ad groups by token overlap. Every seed used exactly once. Default negatives applied (free, cheap, jobs, careers, diy).
- **Networks, scheduling, flight dates**: Smart defaults with full override capability.

**Step 4: Human Review (configure-by-exception, not build-from-scratch)**

The agency reviews a complete, ready-to-launch campaign and edits only what needs changing:

- Campaign settings: name, budget (slider with visible cap), bid strategy, networks, flight dates.
- Per-ad-group: keywords (add/remove, change match type), negatives, toggle individual ad variants on/off.
- Visual summary: enabled ad count, total keywords, budget cap warning.
- Display preview: rendered PNGs at any of 7 standard sizes, switchable in the UI.

**Step 5: Approval & Launch (explicit human gate)**

- Approval modal restates the budget cap and enabled-variant count.
- Test client ID required (prevents accidental publish to wrong account).
- Policy gate runs again at launch time on all enabled ads (defense-in-depth).
- Campaign created PAUSED in Google Ads (nothing serves until the agency explicitly activates).
- Full audit trail: every launch, edit, pause, and budget change logged with actor and timestamp.

---

## Quantified Value: The Math for an Agency

### Per-Client Time Savings

| Task | Manual | Automated | Savings |
|------|--------|-----------|---------|
| Competitive research | 3-5 hrs | 5-10 min (pipeline runs) | 92-97% |
| Ad copywriting (Search RSA) | 3-6 hrs | 2-5 min (generate + review) | 95-98% |
| Display creative production | 4-8 hrs | 5-10 min (render-specs + auto-render) | 93-98% |
| Campaign assembly | 2-4 hrs | 1-2 min (smart defaults) | 95-97% |
| Policy review | 1-2 hrs | 0 min (automated two-layer gate) | 100% |
| Human review + edits | — | 15-30 min (configure by exception) | Net new |
| **Total per client** | **13-25 hrs** | **30-60 min** | **85-96%** |

### Agency-Level Impact (15 Clients)

| Metric | Manual Process | With System | Delta |
|--------|---------------|-------------|-------|
| Hours per client (setup + monthly refresh) | 13-25 hrs | 0.5-1 hr | -90% |
| Monthly labor hours (15 clients, 1 refresh/month) | 195-375 hrs | 8-15 hrs | -95% |
| Account managers needed | 2-3 FTEs | 1 (part-time on this) | -60-70% |
| Labor cost (at $65/hr loaded) | $12,675-$24,375/mo | $520-$975/mo | -$12,000-$23,000/mo |
| Max clients per AM before quality drops | 5-8 | 25-40 | 3-5x capacity |
| Time to first draft campaign (new client) | 2-3 business days | Same day | -80% |
| Policy violation risk | Manual review (human error) | Deterministic + LLM double-gate | Near-zero |

### Revenue Impact

The system doesn't just save time — it changes the agency's unit economics:

- **At $2,000/month per client**: an agency managing 15 clients generates $30,000/month. With 2 AMs at $5,000/month each, labor on campaign setup alone is $10,000-$24,000. The system reduces that to under $1,000.
- **Capacity unlock**: the same AM who managed 6 clients can now manage 25+. Adding clients 7-25 is pure margin — no new hire needed.
- **Speed as a sales tool**: "We'll have your first campaign drafted by end of day" beats "We'll have something for you to review next week."

---

## What Makes This Different

### vs. Generic AI Copywriting Tools (ChatGPT, Jasper, Copy.ai)

Generic tools generate copy in a vacuum. This system generates copy **grounded in competitive intelligence**:

- Every variant is tied to a specific strategic insight — a gap competitors aren't covering or a proven angle with longevity signal.
- Variants aren't random; they're a **deliberate test matrix** (gap angles first, then proven survivors, then USP).
- Character limits, policy compliance, and brand guidelines are enforced deterministically — not by asking the LLM to "please keep headlines under 30 characters."
- Display creatives are rendered as production PNGs at correct Google Ads dimensions, not text descriptions of what an ad could look like.

### vs. Google Ads Scripts / Automation Rules

Scripts automate bid management and reporting — the back half. This system automates the front half: research, creative production, and campaign assembly. They're complementary, not competing.

### vs. Hiring Junior Staff

- Juniors make policy mistakes that risk account suspension. The system has a deterministic policy gate that cannot be overridden.
- Juniors produce generic copy. The system produces copy grounded in competitive gaps.
- Juniors take 2-3 days per client. The system produces a draft campaign in under an hour.
- Juniors need training, management, and have turnover. The system needs a config change.

---

## Safety Architecture

This system is built around four non-negotiable constraints:

**1. The LLM never sets budget.**
Budget values flow from the client profile through deterministic code. The budget is hard-capped at every layer: campaign assembly, server-side API validation, and the execution layer. The LLM is not in this code path at any point.

**2. No autonomous publishing.**
Every campaign launch requires an explicit human approval action — a button click in a modal that restates the budget cap and variant count. The system never publishes on its own, never schedules auto-publishing, and never modifies a live campaign without human action.

**3. The LLM fills templates; it never freehands layout.**
Display creatives come from 4 pre-built parameterized templates. The LLM emits a structured JSON render-spec; deterministic code (Satori + Resvg) renders the actual PNG. The LLM does not write HTML, CSS, or any production layout code.

**4. Two-layer policy enforcement.**
A deterministic scan (banned terms, punctuation rules, brand do-not-use) runs at both generation and launch time. The LLM's policy judgment can only agree with or be overridden by the deterministic gate — never the reverse. An ad that fails the deterministic check is blocked regardless of what the LLM thinks.

**Audit trail**: every mutating action — launches, edits, pauses, budget changes — is logged with actor, timestamp, and details.

---

## Technical Architecture

```
[Agency Dashboard — Next.js]
         │
         ▼
[Node API Layer — Auth, Data, Orchestration, Rendering, Google Ads]
         │                                    │
         ▼                                    ▼
[Python AI Service — LangChain]      [Google Ads REST API v21]
   ├─ Scrape (Transparency Center + SerpApi)    (Test account only in MVP)
   ├─ Enrich (deterministic signals + LLM interpretation + vision)
   ├─ Aggregate (longevity-weighted ranking + gap synthesis)
   ├─ Generate (axis-planned variants + render-specs)
   └─ Critique (deterministic policy gate + LLM rubric)
         │
         ▼
[Supabase Postgres — Profiles, Analyses, Creatives, Campaigns, Audit Log]
```

### Key Design Decisions

- **Provider-abstracted LLM**: Default Gemini (free tier, vision, context caching) for MVP. Swap to Claude, GPT, or any provider via config — never hardcoded.
- **Provider-abstracted Google Ads client**: Mock client for development/testing (deterministic fake resource names, no network). Real client activates only when all 5 credentials are present.
- **Schema-first**: 5 core data objects (ClientProfile, EnrichedAdRecord, AnalysisObject, RenderSpec, CampaignConfig) defined once in Zod (TypeScript) and mirrored as Pydantic (Python). Validated at every boundary.
- **Map-reduce analysis (no RAG)**: The scraped corpus is distilled into a compact analysis object via map (enrich each ad) and reduce (aggregate into angles + gaps). No vector database. Prompt caching via stable prefix + per-variant suffix.
- **Deterministic rendering**: Satori (JSX → SVG) + Resvg (SVG → PNG). Works offline, no browser needed, serverless-compatible. Brand colors computed for WCAG contrast. Stock images from Unsplash/Pexels with brand-gradient fallback (works with zero API keys).
- **70+ automated tests**: 45+ Python (pipeline, generation, critique) + 25+ TypeScript (campaign assembly, execution, Google Ads mock, policy checks). Full pipeline runnable offline with cached corpus + FakeLlm.

---

## Who This Is For

- **Digital marketing agencies** managing 5-50 Google Ads clients who spend more time on setup than strategy.
- **Freelance PPC consultants** who want to scale beyond 5-8 clients without hiring.
- **In-house marketing teams** at multi-location businesses (med spas, dental, legal, home services) running location-specific campaigns.

The demo vertical is med spas / aesthetic clinics, but the system is vertical-agnostic — any high-intent local-service vertical works with a configuration change (dental, legal, home services, fitness).

---

## Summary

| | Manual Process | With System |
|---|---|---|
| Time to first campaign draft | 2-3 business days | Under 1 hour |
| Research depth | Anecdotal (what the AM noticed) | 100+ competitor ads analyzed with longevity weighting |
| Creative strategy | "Write something similar to competitors" | Gap-first: own what competitors miss |
| Ad variants per campaign | 3-5 (time-limited) | 10-20 (policy-safe, grounded in insights) |
| Display creative sizes | 1-2 (designer bandwidth) | 7 standard sizes, auto-rendered |
| Policy compliance | Manual review (error-prone) | Deterministic two-layer gate (near-zero risk) |
| Budget control | Spreadsheet / manual entry | Hard-capped by code; LLM never involved |
| Autonomous publishing risk | Possible (accidental click) | Impossible (explicit approval gate + policy re-check) |
| Clients per account manager | 5-8 | 25-40 |
| Monthly labor cost (15 clients) | $12,000-$24,000 | Under $1,000 |
