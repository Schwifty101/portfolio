# KodoAI Site Redesign — Design Spec

Date: 2026-07-22. Owner: Soban Ahmad. Status: approved in brainstorm session.

Source-of-truth documents (this spec arranges them, never contradicts them):

- **Build brief:** `/Users/sobanahmad/Documents/Claude/Projects/Freelancing Stuff/KodoAI-Website-SEO-AIO-Build-Brief.md` (the master spec: IA, page-by-page conversion spec, SEO/AIO engine, compliance rules)
- **Design system:** `/Users/sobanahmad/Documents/Claude/Projects/Freelancing Stuff/LinkedIn + outreach/strategy/design-system.md` (Editorial Brutalism: colours, type, spacing, components)

## 1. Decisions made (locked)

1. **Brutalism-first, adapted effects.** The Editorial Brutalism design system governs. Requested trend effects are reinterpreted to fit it:
   - Scrollytelling: yes (GSAP ScrollTrigger, already installed)
   - Kinetic typography: yes (split-text reveals, scramble/decode on mono labels, strike→accent swaps)
   - Glassmorphism: reinterpreted as **brutalist glass** — `backdrop-filter: blur()` panels with `border-radius: 0` and 1px `--border`, used only for chrome (sticky nav, sticky CTAs). Never decorative.
   - Claymorphism: **dropped** (soft rounded forms contradict the system).
   - Skeleton loading: yes, brutalist style (sharp blocks, scanline shimmer, mono `// LOADING` label).
   - Hover effects: yes (border-sweep, accent fill, letter-tracking expansion).
2. **Cursor effect: lightweight canvas only.** Dot-grid displacement field, ~2KB custom canvas, lazy-loaded, desktop-only, disabled under `prefers-reduced-motion`. Hero zones only. No WebGL fluid sim library.
3. **Scope: full IA** per brief section 5, all pages in one run.
4. **Blog: structure and templates only.** No articles written in this run.
5. **Rebuild strategy: clean rebuild on a feature branch.** The current site is a client-rendered single-page app (`app/page.tsx` is `"use client"` with every section a client component). Crawlers get an empty shell; the brief calls this the single most common failure. The new site is multi-page, server-rendered/static, with motion in small client islands. Old `app/pages/*` deleted at the end.

## 2. Architecture

**Stack:** existing Next.js App Router repo (`/Users/sobanahmad/portfolio-project`), Tailwind, GSAP (+ ScrollTrigger, ScrollSmoother already in use), framer-motion available. TypeScript.

**Rendering rule:** every route is a server component that renders full content HTML. Motion components are client islands that *enhance* already-rendered content — they never gate content visibility (no content that appears only after JS). Initial paint shows content; JS adds motion.

**Route map (brief section 5, verbatim):**

```
/                          Home (Tier 1 agency wedge, conversion-first)
/about                     Entity page, Person schema, E-E-A-T
/work                      Case-study index
/work/arco-law             AR&CO platform case (flagship proof)
/work/pre-call-brief       Pre-call brief agent build story
/work/ad-ops-agent         Ad-ops agent build story
/work/ai-voice-agent       Voice receptionist build story
/agencies                  Agency silo hub
/agencies/ad-operations-automation
/agencies/pre-sales-research-automation
/agencies/onboarding-intelligence
/med-spas                  Med spa silo hub
/med-spas/ai-receptionist  Routes into live VSL funnel logic; NO booking widget
/blog                      Article index (empty state ready, grouped-by-pillar layout)
/blog/[slug]               MDX article template (answer-first shape, full schema)
/resources                 Resource hub
/resources/ad-account-leak-audit        Gated flagship lead magnet page
/resources/pre-call-research-checklist  Gated secondary lead magnet page
/contact                   Booking terminal (Cal.com embed + email)
/llms.txt  /brand-facts.json  /robots.txt  /sitemap.xml
```

Old routes `/case-study/*` get permanent redirects to the matching `/work/*` URLs (next.config redirects).

**URL migration map:**

| Old | New |
|---|---|
| `/case-study/arco-law` | `/work/arco-law` |
| `/case-study/automated-pre-call-brief-generator` | `/work/pre-call-brief` |
| `/case-study/ai-google-ads-automation` | `/work/ad-ops-agent` |
| `/case-study/ai-voice-receptionist` | `/work/ai-voice-agent` |

## 3. Foundation layer

**Tokens:** all CSS custom properties from design-system.md Appendix B, in `app/globals.css` `:root`. Tailwind config maps them (`bg`, `surface`, `surface-2`, `surface-3`, `border`, `border-2`, `ink`, `ink-2`, `ink-3`, `muted`, `accent`, `accent-dim`, semantic colours).

**Fonts:** self-hosted, subset, via `next/font/local` in `app/fonts/`: Barlow Condensed (display; 400–900), IBM Plex Sans (body; 400–700), IBM Plex Mono (mono; 300–600). Inter removed. Exposed as CSS vars `--display`, `--sans`, `--mono`.

**Primitives** (`components/ui-kodo/` to avoid clashing with existing shadcn `components/ui/`): `Btn` (default + primary), `Card` (+ featured), `Badge` (+ accent/success/error), `Alert` (info/success/warning/error, left border), `SectionLabel` (mono eyebrow with `//` prefix), `Divider` (+ dashed), `Container` (1280px max, responsive padding). Exact CSS per design-system.md section 5. `border-radius: 0` globally.

**Shell:** `SiteHeader` (brutalist-glass sticky bar: wordmark `SOBAN AHMAD` + mono descriptor `// KODOAI`, nav links Work / Agencies / Med Spas / Resources / Blog / About, primary CTA "Book a 15-minute call"), `SiteFooter` (silo-aware link columns, email, LinkedIn/GitHub `sameAs` links, tagline "If it is manual and measurable, it can be automated."). Mobile nav: full-screen brutalist overlay.

## 4. Motion system

Deliverables: `docs/design/motion-guide.md` (the written guide) + `components/motion/` (the library). Every page module consumes the library; no page writes bespoke animation code outside it.

**Library components/hooks:**

| Export | What it does |
|---|---|
| `SmoothScroll` | Existing `SmoothScrollProvider` retained (GSAP ScrollSmoother, desktop-only, mobile native). Moves to `components/motion/`. |
| `Reveal` | Scroll-triggered entrance (opacity + translateY ≤ 24px), stagger support. Content rendered in HTML always; animation from visible-but-unstyled is FOUC-safe (CSS initial state only applied when JS present via `js`-class gate). |
| `KineticHeadline` | Split-text line/word reveal for Barlow Condensed headlines. Server-renders plain text; client enhances. |
| `ScrambleText` | Decode/scramble effect for mono labels and stats. |
| `StrikeSwap` | Strike-through old term in `--red`, swap in accent replacement (design-system Appendix A pattern, adapted for web). |
| `StatCounter` | Scroll-triggered count-up for numeric proof. Renders final number in HTML. |
| `PinnedSequence` | ScrollTrigger pinned section for scrollytelling (home mechanism section, case-study architecture walkthroughs). Must degrade to plain stacked sections on mobile and reduced-motion. |
| `Marquee` | Tagline marquee, CSS-transform based, pausable, reduced-motion → static. |
| `CursorField` | Canvas dot-grid displacement, lazy via dynamic import, desktop + fine pointer only, killed by reduced-motion. Hero zones only. |
| `Skeleton` | Sharp-cornered block with scanline shimmer + `// LOADING` mono label. Used for Cal.com embed, VSL embed, images. |
| `useReducedMotion` | Single source of truth; every component checks it. |

**Hard rules (also written into the guide):**

1. Animate `transform` and `opacity` only. Never properties that trigger layout.
2. Content never hidden pending JS. SEO text is in the initial HTML, full stop.
3. `prefers-reduced-motion: reduce` disables all motion including smooth scroll.
4. Mobile: no pinned sequences, no cursor field, reveals simplified.
5. Motion durations 0.4–0.8s, ease `power2.out` family. Nothing bouncy (off-brand).
6. Accent colour in motion only where accent is allowed at rest (interactive/emphasis).
7. Zero CLS: reserve space for embeds via Skeleton at identical dimensions.

**Loading screen:** current `loading-screen.tsx` replaced by a lighter first-visit-only wordmark stamp (≤ 800ms, sessionStorage-gated, never blocks LCP content) — or dropped if it threatens LCP. Implementer decides against Lighthouse evidence; brief's CWV-green requirement wins over the effect.

## 5. Page specs (conversion + SEO shape)

Every page follows brief section 6 (conversion spec) + 7b (answer-first structure): one H1, direct 40–60 word answer up top, question-shaped H2s, extractable short paragraphs, bolded takeaway per section, FAQ block on commercial pages, one primary CTA repeated ("Book a 15-minute call"), email fallback. Copy rules per brief section 12 (British English, no em dashes, no absolutes, no Upwork, no "free", P&L framing). The retired claims ("0 hallucinations", "100% prep consistency", "25 hours saved", "$2M+ client revenue", "8 wks avg delivery") must not appear; replacements per brief section 12.

Per-page content sources:

- **Home:** brief 6-Home. Hero belief headline direction, sub-line, credibility strip (defensible claims only), pain blocks from ICP language, mechanism (worldview + three spears linking to offer pages), proof (AR&CO + two agents), close CTA.
- **About:** brief 6-About. PAS + person. Person/Organization schema anchor.
- **Case studies:** structure per brief 6; AR&CO facts from `client-work/AR_CO_executive_summary_updated.md` real outcomes; agent builds framed as designed/built/deployed with confidentiality line. Existing copy in `app/case-study/*/page.tsx` and `CASE_STUDY.md`/`CASE_STUDY2.md` is raw material, filtered through section 12 compliance.
- **Silo pages:** brief 6 + keyword clusters 7a. FAQ blocks with real buyer questions. Med spa receptionist page: pure nurture shape, **no booking widget**, mirrors VSL funnel logic (brief section 10).
- **Resources:** gated pages per brief section 9: named-deliverable CTA, name + work email only, crawlable value description on page. Resume demoted (available, not featured).
- **Contact:** Cal.com embed (`@calcom/embed-react` already installed) + `soban@sobanahmad.dev`. One action. Skeleton while embed loads.
- **Blog:** index grouped by three pillars + med spa lane; MDX pipeline; article template implementing brief section 8 shape (H1 question, direct answer, key takeaways block, FAQ, byline, dates).

## 6. SEO / AIO layer

- **`lib/schema.ts` + `JsonLd` component:** typed builders for `Person`, `Organization`, `WebSite`, `Service`, `FAQPage`, `Article`/`BlogPosting`, `BreadcrumbList`. Coverage per brief 7c table. Existing `components/JsonLd.tsx` replaced.
- **Metadata:** unique title (50–60 chars) + description (140–160) per page via Metadata API; OG/Twitter cards everywhere; canonicals.
- **Machine files:** `app/llms.txt/route.ts` (~8KB curated map), `public/brand-facts.json`, `robots.txt` allowing GPTBot/ClaudeBot/PerplexityBot/Google-Extended + sitemap ref, `app/sitemap.ts` extended to full route map with real `lastmod`.
- **Internal-link silo discipline:** spokes ↑ hub, spokes → proof cases, blog ↓ offers; no agency↔med-spa cross links except via `/about` and worldview content.

## 7. Execution model

Subagent-driven development (superpowers:subagent-driven-development). Controller/planner: Fable 5 (this session). Implementer + reviewer subagents: **Opus 4.8** (`model: opus`). Work on feature branch `redesign/kodoai` via worktree. Per-task review (spec + quality), final whole-branch review, then merge decision.

## 8. Acceptance (from brief section 14)

Foundation: tiered IA, all pages static/server-rendered, CWV green, self-hosted subset fonts, unique meta + OG per page, robots/sitemap/canonicals. Conversion: one-screen home conversion, single CTA rule, entity About, AR&CO real outcomes, crawlable gated-resource pages. SEO/AIO: answer-first shape, validated JSON-LD, llms.txt + brand-facts.json, silo linking. Compliance: section 12 full pass. Funnels: agency booking frictionless, med spa page mirrors playbook with no booking widget.

**Lead capture backend:** the two gated resource pages post (name + work email + resource id) to `app/api/lead/route.ts`, which validates and forwards the payload to the webhook named in the `LEAD_WEBHOOK_URL` environment variable (Soban connects n8n/Make/Zapier later). If the variable is unset the route logs the lead server-side and still returns success to the visitor; the gated download link is then revealed client-side. The PDF itself lives at an unguessable path under `public/` (obscurity-level gating is acceptable for a lead magnet).

Out of scope this run: blog articles, analytics dashboards, email delivery service integration (webhook forwarding only), WhatsApp/nurture systems.
