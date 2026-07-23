# KodoAI Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sobanahmad.dev from a client-rendered single-page portfolio into a multi-page, server-rendered, Editorial-Brutalist conversion + SEO/AIO site per the KodoAI build brief.

**Architecture:** Next.js App Router, every route a server component rendering full content HTML; motion is a small library of client islands (GSAP ScrollTrigger + custom canvas) that enhance already-rendered content. Hub-and-spoke IA: agency silo (primary), med spa silo (secondary), work/proof, resources, blog structure, machine-readable identity files.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind (tokens as CSS vars), GSAP + ScrollTrigger + ScrollSmoother (already installed), `next/font/google` (build-time self-hosting), `@calcom/embed-react`, MDX via `@next/mdx`.

**Spec:** `docs/superpowers/specs/2026-07-22-kodoai-redesign-design.md`
**Master brief (content authority):** `/Users/sobanahmad/Documents/Claude/Projects/Freelancing Stuff/KodoAI-Website-SEO-AIO-Build-Brief.md`
**Design system (visual authority):** `/Users/sobanahmad/Documents/Claude/Projects/Freelancing Stuff/LinkedIn + outreach/strategy/design-system.md`

## Global Constraints

Copy rules (apply to every visible word; violations are review failures):

- British English throughout (optimise, centre, behaviour, recognise).
- **No em dashes anywhere.** Use commas, colons, or parentheses.
- No absolute claims: never "0 hallucinations", "100% consistency", "guaranteed", "zero errors".
- These exact retired claims must NOT appear: "0 hallucinations", "100% prep consistency", "25 hours saved", "$2M+ CLIENT REVENUE", "8 WKS AVG. DELIVERY", any Upwork/JSS reference.
- No "free" in any CTA. Name the deliverable ("Get the Ad-Account Leak Audit").
- No "save time" as a lead benefit; frame in P&L terms (billable-hour reclamation, capacity without hiring, revenue protection).
- Primary CTA everywhere: **"Book a 15-minute call"**. One primary action per screen, email fallback `soban@sobanahmad.dev`. Never two primary CTAs on one screen.
- Universal tagline: *If it is manual and measurable, it can be automated.*
- Hero belief: *Manual work is a competitive liability, not an inconvenience.*
- Identity: **SOBAN AHMAD**, descriptor **(KodoAI)**. Never presented as a student. No invented client names; agent builds use the confidentiality line: "I do not name them, the people running it treat it as an edge."
- No fabricated metrics. AR&CO facts: paid build won by referral, ~7,000 USD, first paid client (Jan 2026), scoped six weeks, ran about four months due to client-side chaos. Real outcomes only: operations streamlined, bookkeeping easier, case management improved.

Design rules:

- `border-radius: 0` on every element, no exceptions. No decorative gradients. Dark theme only.
- Colours only from the token set (Task 1). Text never pure white; use `--ink #f4f3ee`, `--ink-2 #c4c2b8`, `--ink-3 #8a887e`.
- Accent `#c8f060` only for interactive elements, CTAs, emphasis. Never decorative.
- Fonts: Barlow Condensed (display, uppercase, tight tracking), IBM Plex Sans (body, line-height ≥ 1.6), IBM Plex Mono (labels/meta, `//` prefix, 0.15em tracking). No other fonts.
- Spacing on 4px base. Max content width 1280px. Mobile breakpoint ≤ 768px, tablet 769–1024px.
- Claymorphism forbidden. Glass effects only as "brutalist glass": `backdrop-filter: blur` + 0 radius + 1px `--border`, chrome only (nav, sticky CTA).

Motion rules:

- Animate `transform` and `opacity` only.
- All page content present in server-rendered HTML; motion never gates visibility. Initial state hiding may only be applied when JS is running (the motion library handles this; pages never hand-roll animations).
- `prefers-reduced-motion: reduce` disables all motion including smooth scroll.
- Mobile: no pinned sections, no cursor canvas.
- Durations 0.4–0.8s, `power2.out` family easing, nothing bouncy.

SEO rules (every page):

- Exactly one H1. Question-shaped H2s where the page teaches. A direct, self-contained 40–60 word answer in the first block of every silo/offer/case page.
- Unique `title` (50–60 chars) and `description` (140–160 chars) via the Metadata API; OG + Twitter card; canonical.
- JSON-LD via `lib/schema.ts` builders only (Task 4); schema must describe only what is visibly on the page.
- FAQ block (visible + `FAQPage` schema) on every commercial page (`/agencies/*`, `/med-spas/*`, resource landing pages).
- Silo linking: spokes link up to their hub and to proof case studies; never link an `/agencies/*` page to a `/med-spas/*` page.

Verification protocol (replaces unit tests; this is a static marketing site with no test framework):

- `npm run build` must pass with the page listed as prerendered (○ or ●, not ƒ) in the route table, except `/api/lead`.
- SSR content check: after build, `grep` the prerendered HTML in `.next/server/app/<route>.html` for key copy strings. This proves crawlers get real HTML.
- Compliance grep must return nothing for changed files: `grep -rn "—\|Upwork\|JSS\|hallucination" app components lib --include='*.tsx' --include='*.ts' --include='*.mdx' | grep -v node_modules` (the em dash character, not hyphens).
- Commit after each task with a conventional message.

Working branch: `redesign/kodoai` (created in Task 1 via worktree/branch). NEVER commit to `main`.

---

## File Structure (end state)

```
app/
  layout.tsx                 root layout: fonts, header, footer, site-wide schema
  globals.css                tokens, base styles, motion-safe initial states
  page.tsx                   Home (server component)
  about/page.tsx
  work/page.tsx
  work/arco-law/page.tsx
  work/pre-call-brief/page.tsx
  work/ad-ops-agent/page.tsx
  work/ai-voice-agent/page.tsx
  agencies/page.tsx
  agencies/ad-operations-automation/page.tsx
  agencies/pre-sales-research-automation/page.tsx
  agencies/onboarding-intelligence/page.tsx
  med-spas/page.tsx
  med-spas/ai-receptionist/page.tsx
  resources/page.tsx
  resources/ad-account-leak-audit/page.tsx
  resources/pre-call-research-checklist/page.tsx
  contact/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  api/lead/route.ts
  llms.txt/route.ts
  sitemap.ts
components/
  ui-kodo/                   Btn, Card, Badge, Alert, SectionLabel, Divider, Container
  motion/                    SmoothScroll, Reveal, KineticHeadline, ScrambleText,
                             StrikeSwap, StatCounter, PinnedSequence, Marquee,
                             CursorField, Skeleton, useReducedMotion
  site/                      SiteHeader, SiteFooter, PageCta, FaqBlock, LeadForm
lib/
  site.ts                    site constants (URL, name, email, cal link, sameAs)
  schema.ts                  JSON-LD builders + JsonLd component
content/blog/                MDX articles (empty + one _template.mdx)
docs/design/motion-guide.md  the animation/layout/flow guide
public/brand-facts.json
public/robots.txt            (updated)
public/downloads/<hash>/     gated PDFs
```

Deleted at the end (Task 13): `app/pages/*`, `app/case-study/*` (after redirects), `components/Footer.tsx`, `components/JsonLd.tsx`, `components/SmoothScrollProvider.tsx`, `components/ContactForm.tsx` (empty), `components/theme-provider.tsx` if unused.

---

### Task 1: Branch, tokens, fonts, primitives

**Files:**
- Modify: `app/globals.css` (replace theme layer with token set; keep Tailwind directives)
- Modify: `tailwind.config.ts` (map tokens)
- Modify: `app/layout.tsx` (fonts only in this task: replace Inter with the three families)
- Create: `lib/site.ts`
- Create: `components/ui-kodo/{Btn,Card,Badge,Alert,SectionLabel,Divider,Container}.tsx`

**Interfaces (later tasks rely on these exact names):**

`lib/site.ts`:
```ts
export const SITE_URL = "https://sobanahmad.dev"
export const SITE_NAME = "Soban Ahmad"
export const ORG_NAME = "KodoAI"
export const TAGLINE = "If it is manual and measurable, it can be automated."
export const EMAIL = "soban@sobanahmad.dev"
export const CAL_LINK = "soban-ahmad/30min"   // data-cal-link value
export const CAL_NAMESPACE = "30min"
export const SAME_AS = [
  "https://www.linkedin.com/in/sobanahmad",   // verify against current site footer before committing
  "https://github.com/sobanahmad",            // verify against current site footer before committing
]
```

CSS vars in `:root` exactly as design-system.md Appendix B (`--bg`, `--surface`, `--surface-2`, `--surface-3`, `--border`, `--border-2`, `--ink`, `--ink-2`, `--ink-3`, `--muted`, `--accent`, `--accent-dim`, `--green`, `--green-bg`, `--amber`, `--amber-bg`, `--red`, `--red-bg`, `--blue`, `--blue-bg`, `--display`, `--sans`, `--mono`). Global `* { border-radius: 0 !important; }` is NOT acceptable (breaks nothing but is a sledgehammer); instead set `border-radius: 0` in the base layer on common elements and never add a radius class.

Tailwind `theme.extend.colors`: `bg`, `surface`, `"surface-2"`, `"surface-3"`, `border`, `"border-2"`, `ink`, `"ink-2"`, `"ink-3"`, `muted`, `accent`, `"accent-dim"`, plus semantic pairs, each `var(--…)`. `fontFamily`: `display`, `sans`, `mono` from the vars.

Fonts via `next/font/google` in `app/layout.tsx` (build-time self-hosted, satisfies the self-host requirement):
```ts
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--display" })
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--sans" })
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300","400","500","600"], variable: "--mono" })
```
(html gets the three variable classes; remove Inter.)

Primitive components: props and markup follow design-system.md section 5 CSS verbatim (translated to Tailwind or a small CSS module). Exports:
```ts
Btn({ href?, variant?: "default" | "primary", children, ...button/anchor props })  // mono 14px, uppercase, 0.15em
Card({ featured?, children, className? })
Badge({ variant?: "default" | "accent" | "success" | "error", children })
Alert({ variant: "info" | "success" | "warning" | "error", children })
SectionLabel({ children })   // renders "// " prefix + uppercase mono 12px, ink-3
Divider({ dashed? })
Container({ children, className? })  // max-w-[1280px], px-12 desktop / px-6 tablet / px-4 mobile
```

**Steps:**

- [ ] Create branch: `git checkout -b redesign/kodoai`
- [ ] Rewrite `app/globals.css` token layer; base styles: `body { background: var(--bg); color: var(--ink); font-family: var(--sans); -webkit-font-smoothing: antialiased; }`
- [ ] Map tokens in `tailwind.config.ts`; keep existing shadcn config keys that `components/ui` needs compiling (do not delete existing keys, extend)
- [ ] Swap fonts in `app/layout.tsx` (metadata untouched this task)
- [ ] Create `lib/site.ts`; verify SAME_AS URLs against links in `app/pages/Footer.tsx` / `components/Footer.tsx` and use the real ones
- [ ] Create the seven primitives in `components/ui-kodo/`
- [ ] Verify: `npm run build` passes; site still renders (old pages will look font-changed, acceptable)
- [ ] Commit: `feat: add Editorial Brutalism tokens, fonts, ui-kodo primitives`

### Task 2: Motion library + motion guide

**Files:**
- Create: `components/motion/SmoothScroll.tsx` (port of `components/SmoothScrollProvider.tsx`, drop `isReady` prop, add reduced-motion bail-out)
- Create: `components/motion/{useReducedMotion.ts,Reveal.tsx,KineticHeadline.tsx,ScrambleText.tsx,StrikeSwap.tsx,StatCounter.tsx,PinnedSequence.tsx,Marquee.tsx,CursorField.tsx,Skeleton.tsx,index.ts}`
- Create: `docs/design/motion-guide.md`

**Interfaces (exact export signatures; every page task consumes these):**

```ts
useReducedMotion(): boolean                          // matchMedia, SSR-safe (false on server)
SmoothScroll({ children }): JSX                      // desktop-only ScrollSmoother wrapper; no-op when reduced motion or mobile
Reveal({ children, as?: keyof JSX.IntrinsicElements, delay?: number, stagger?: number, className? })
KineticHeadline({ children: string, as?: "h1"|"h2"|"h3", className? })   // split-line reveal; renders plain element serverside
ScrambleText({ text: string, className? })           // decode-in on scroll into view
StrikeSwap({ struck: string, replacement: string, className? })  // red strike-through then accent replacement, scroll-triggered
StatCounter({ value: number, prefix?: string, suffix?: string, className? })  // HTML contains final value; JS counts up
PinnedSequence({ steps: { label: string, body: ReactNode }[], className? })   // desktop: pinned scroll steps; mobile/reduced: plain stacked list
Marquee({ children, speed?: number })                // CSS transform loop; static when reduced motion
CursorField({ className? })                          // canvas dot-grid displacement; render null on touch/mobile/reduced-motion; dynamic-import friendly
Skeleton({ width?: string, height?: string, className?, label?: string })  // sharp block, scanline shimmer, mono "// LOADING" default label
```

Implementation notes (binding):

- Client components (`"use client"`) except the guide. GSAP + ScrollTrigger only inside `useEffect`/`useGSAP`; SSR renders final visible state.
- Hide-before-reveal pattern: components set initial hidden state via `gsap.set` on mount, never via CSS class in server HTML (content visible without JS).
- `CursorField`: single `<canvas>`, dot grid every 28px, dots displace away from pointer within 120px radius, lerp back; `requestAnimationFrame` loop paused when off-screen (IntersectionObserver) or tab hidden. Colours: dots `--border-2`, displaced dots lerp toward `--accent-dim`. Under ~120 lines, no dependency.
- `Skeleton` shimmer: 1px horizontal scanline sweeping via transform, `--surface-2` base, `--border` line.
- `motion-guide.md` documents: the philosophy (brutalist motion = precise, mechanical, no bounce), each component with usage snippet, where each effect belongs per page, the hard rules from Global Constraints, and the CWV budget (no effect may add layout shift; cursor field lazy).

**Steps:**

- [ ] Write `useReducedMotion` + `SmoothScroll` (port, add reduced-motion + remove loading gate)
- [ ] Write the nine motion components per signatures above
- [ ] Write `components/motion/index.ts` re-exporting all
- [ ] Write `docs/design/motion-guide.md`
- [ ] Verify: `npm run build` passes (library compiles unused)
- [ ] Commit: `feat: add brutalist motion library and motion guide`

### Task 3: SEO layer (schema builders, metadata helper)

**Files:**
- Create: `lib/schema.ts`
- Create: `components/site/FaqBlock.tsx`
- Delete: `components/JsonLd.tsx` usage comes later; do not delete yet (old layout still imports it)

**Interfaces:**

```ts
// lib/schema.ts  (all return plain objects)
JsonLd({ data }: { data: object | object[] }): JSX   // renders <script type="application/ld+json">
personSchema(): object            // Soban Ahmad, jobTitle "AI Automation Engineer", worksFor KodoAI, sameAs, alumniOf "NUCES", knowsAbout automation topics
organizationSchema(): object      // KodoAI, founder → person, url, sameAs
websiteSchema(): object
serviceSchema(opts: { name: string; description: string; url: string; serviceType: string }): object  // provider = organization, areaServed "United States"
faqSchema(items: { q: string; a: string }[]): object
articleSchema(opts: { headline: string; description: string; url: string; datePublished: string; dateModified: string }): object  // author = person
breadcrumbSchema(items: { name: string; url: string }[]): object
pageMetadata(opts: { title: string; description: string; path: string }): Metadata  // canonical, OG, Twitter card, og-image
// components/site/FaqBlock.tsx (server component)
FaqBlock({ items: { q: string; a: string }[] })      // visible accordion-free stacked Q/A (no JS) + emits faqSchema via JsonLd
```

**Steps:**

- [ ] Write `lib/schema.ts` with all builders; titles/descriptions NOT hardcoded here (pages own theirs); entity facts from `lib/site.ts`
- [ ] Write `FaqBlock` (question as h3 display font, answer body text, bordered rows; schema inline)
- [ ] Verify: `npm run build`
- [ ] Commit: `feat: add JSON-LD schema builders and FAQ block`

### Task 4: Site shell (header, footer, root layout, redirects)

**Files:**
- Create: `components/site/SiteHeader.tsx`, `components/site/SiteFooter.tsx`, `components/site/PageCta.tsx`
- Modify: `app/layout.tsx` (header/footer, site-wide schema, base metadata rewrite)
- Modify: `next.config.mjs` (redirects `/case-study/* → /work/*` per spec URL map)

**Interfaces:**
```ts
SiteHeader()   // sticky, brutalist glass (backdrop-blur, bg rgba of --bg at ~0.7, 1px bottom --border), wordmark "SOBAN AHMAD" + mono "// KODOAI", links: Work, Agencies, Med Spas, Resources, Blog, About; right: Btn primary "Book a 15-minute call" → /contact. Mobile: full-screen overlay menu (client island), body content unaffected.
SiteFooter()   // columns: Agencies (hub + 3 offers), Med Spas (hub + receptionist), Proof (work index + 4 cases), Resources/Blog/About/Contact; tagline line; email; LinkedIn + GitHub from SAME_AS; keeps the associated-company link present in current Footer.tsx (check and carry it over).
PageCta({ heading?: string, sub?: string })  // reusable close block: default heading "A 15-minute call is usually enough to know if there is a fit.", sub "No slides, no pitch.", Btn primary "Book a 15-minute call" → /contact, mono email fallback link.
```

Root layout: fonts (Task 1), `SmoothScroll` NOT here (per-page where needed; keep layout server-only), header + footer, `JsonLd` with `[websiteSchema(), organizationSchema()]`, base metadata: default title `Soban Ahmad (KodoAI): AI Automation Systems for Agencies`, template `%s | Soban Ahmad`, `metadataBase` `SITE_URL`, `en_GB` locale.

**Steps:**

- [ ] Write SiteHeader (desktop + mobile overlay), SiteFooter (carry over associated-company link from `components/Footer.tsx`), PageCta
- [ ] Rewrite `app/layout.tsx`; stop importing old `components/JsonLd`
- [ ] Add permanent redirects in `next.config.mjs`: the four `/case-study/*` → `/work/*` mappings from the spec
- [ ] Verify: build passes; old home renders inside new shell (temporary double-nav with old page acceptable until Task 5)
- [ ] Commit: `feat: add site shell, root layout, case-study redirects`

### Task 5: Home page

**Files:**
- Replace: `app/page.tsx` (server component; delete the current client version's content entirely)
- Create: `app/home/sections.tsx` if the page grows past ~300 lines (one file per concern is fine; implementer's call)

**Content (brief section 6-Home; copy written fresh, obeying Global Constraints):**

1. Hero: `CursorField` layer; `SectionLabel` eyebrow `// AI AUTOMATION SYSTEMS`; H1 via `KineticHeadline`, direction: "Your agency's growth ceiling is not sales. It is the manual work behind every account."; sub-line "I build the AI systems that remove the manual ops eating your margin, so you grow without hiring."; single `Btn primary` "Book a 15-minute call"; credibility strip: only defensible items (production systems deployed: 3; first platform build: ~7,000 USD referral project; based Rawalpindi, building for US agencies). No retired claims.
2. Pain section: three `Card`s from validated ICP pains: manual budget pacing (87% of agencies pace budgets by hand), CPA drift caught too late, onboarding redone by hand per client. `Reveal` stagger. Each stat via `StatCounter` where numeric.
3. Mechanism (scrollytelling): `PinnedSequence` with the worldview: step 1 `Marquee` tagline or `StrikeSwap` ("inconvenience" → "competitive liability"), then three spears as steps, each linking to its offer page (`/agencies/ad-operations-automation`, `/agencies/pre-sales-research-automation`, `/agencies/onboarding-intelligence`).
4. Proof: AR&CO flagship card (real outcomes) + two agent build cards (confidentiality line), linking to `/work/*`.
5. Close: `PageCta`.

Metadata: title `AI Automation Systems for Paid-Ads Agencies | Soban Ahmad`, description ~150 chars on removing manual ops without hiring. Schema: `serviceSchema` (serviceType "AI automation systems for marketing agencies") + breadcrumbs none (root).

**Steps:**

- [ ] Write the page (server component; motion via library imports only)
- [ ] Wrap page content in `SmoothScroll` (client boundary inside the page, not layout)
- [ ] Verify: `npm run build`; grep `.next/server/app/index.html` for "growth ceiling" and "Book a 15-minute call" (SSR proof)
- [ ] Compliance grep (Global Constraints) on changed files
- [ ] Commit: `feat: rebuild home as server-rendered agency conversion page`

### Task 6: About page

**Files:**
- Create: `app/about/page.tsx`

**Content (brief 6-About):** PAS then person. Problem: the margin/headcount trap in P&L language. Agitate: every strategist hired to fix ops shrinks the margin. Solution: the systems Soban designs, builds, deploys (confidentiality line ready). The person: Rawalpindi, engineer who ships, building for agencies an ocean away; photo (`public/myPhoto-optimized.jpg`) with descriptive alt. Credentials without absolutes. Close: value-first CTA "I will show you where automation can remove a bottleneck before you invest a dollar." + `PageCta`.

Schema: `personSchema()` + `breadcrumbSchema`. Metadata: title `About Soban Ahmad: The Engineer Behind KodoAI`, description ~150 chars.

Motion: `KineticHeadline` H1, `Reveal` sections. No pinned sequence.

**Steps:**

- [ ] Write page
- [ ] Verify: build; grep `.next/server/app/about.html` for "Rawalpindi"; compliance grep
- [ ] Commit: `feat: add about entity page`

### Task 7: Work index + AR&CO case study

**Files:**
- Create: `app/work/page.tsx`, `app/work/arco-law/page.tsx`

**Sources:** existing `app/case-study/arco-law/page.tsx` + `CASE_STUDY.md`/`CASE_STUDY2.md` as raw material; AR&CO facts per Global Constraints; architecture image `public/arco-architecture.png`.

**Work index:** H1 "Systems designed, built and deployed", four case cards (AR&CO flagship + three agents) with mono meta (year, vertical, system type), each → `/work/<slug>`. `Reveal` stagger.

**AR&CO case structure (brief 6-case + design-system 6.6):** situation before → the manual bottleneck → what was built → architecture (scroll-driven walkthrough: `PinnedSequence` steps over the architecture, image with alt text) → what changed in plain operational terms (operations streamlined, bookkeeping easier, case management improved). First-hand experience passage ("in the AR&CO build I hit…"). No Upwork mention, no fabricated metrics; timeline honesty (scoped six weeks, ran about four months, why). External corroboration link to `arandcolaw.com`. Close: `PageCta` + link to `/agencies` hub.

Schema per case: `articleSchema` + `breadcrumbSchema`. FAQ optional, only if real questions exist.

**Steps:**

- [ ] Write `/work` index
- [ ] Write `/work/arco-law`
- [ ] Verify: build; grep `.next/server/app/work/arco-law.html` for "referral"; compliance grep (especially Upwork)
- [ ] Commit: `feat: add work index and AR&CO case study`

### Task 8: Remaining case studies

**Files:**
- Create: `app/work/pre-call-brief/page.tsx`, `app/work/ad-ops-agent/page.tsx`, `app/work/ai-voice-agent/page.tsx`

**Sources:** existing `app/case-study/automated-pre-call-brief-generator/page.tsx`, `app/case-study/ai-google-ads-automation/page.tsx`, `app/case-study/ai-voice-receptionist/page.tsx`. Reuse their genuine technical content; strip every retired claim; systems framed as designed, built and deployed with the confidentiality line; mechanism language per brief section 12 replacements ("every claim in the brief is grounded in the source data the system scraped", "the same depth of prep on every prospect, not just the ones a rep had time for").

Same structure and schema as Task 7. Each case links to its offer page: pre-call-brief → `/agencies/pre-sales-research-automation`, ad-ops-agent → `/agencies/ad-operations-automation`, ai-voice-agent → `/med-spas/ai-receptionist`.

**Steps:**

- [ ] Write the three pages
- [ ] Verify: build; grep each `.next/server/app/work/*.html` for its H1; compliance grep (retired claims list)
- [ ] Commit: `feat: add agent build case studies`

### Task 9: Agencies silo (hub + three offer pages)

**Files:**
- Create: `app/agencies/page.tsx`, `app/agencies/ad-operations-automation/page.tsx`, `app/agencies/pre-sales-research-automation/page.tsx`, `app/agencies/onboarding-intelligence/page.tsx`

**Shape (each page, brief 6-silo + 7a/7b):**

- Opens with the buyer outcome; the core question answered in the first two sentences (40–60 word direct answer block).
- Question-shaped H2s ("How does an AI agent automate ad operations?", "What does a pre-call brief include?", "How can an agency scale without hiring more strategists?" for the respective pages), one idea each, answer-first, a statistic or named source in most sections (87% manual pacing; 71% of ad-ops teams say manual work risks campaigns; ~39.75 hours per strategist per month lost; ~49% PPC delivery churn; sources: ppc.land, Fluency, SparkToro, Focus Digital).
- Bolded takeaway sentence per section. `FaqBlock` (4–6 real buyer questions each). `serviceSchema` + `faqSchema` + breadcrumbs.
- Hub links down to the three offers and to `/work/ad-ops-agent`, `/work/pre-call-brief`, `/work/arco-law`. Offers link up to `/agencies` and to their proof case. No links to med-spa pages.
- One `PageCta` per page. Keyword targets per brief 7a table (hub: "scale agency without hiring"; ad-ops: "ad operations automation"; pre-sales: "discovery call research automation"; onboarding: "onboarding intelligence"/"client onboarding automation agency").
- Motion: `KineticHeadline`, `Reveal`, `StatCounter`; no pinned sequences (commercial pages stay fast and scannable).

**Steps:**

- [ ] Write hub, then the three offer pages
- [ ] Verify: build; grep each prerendered HTML for its direct-answer opening sentence; compliance grep
- [ ] Commit: `feat: add agencies silo hub and offer pages`

### Task 10: Med spa silo

**Files:**
- Create: `app/med-spas/page.tsx`, `app/med-spas/ai-receptionist/page.tsx`

**Constraints (brief section 10, binding):** the receptionist page is nurture-shaped: demo/mechanism/FAQ, and **contains no booking widget and no self-serve calendar link**. Its CTA is not "Book a 15-minute call": close with "You are already on the calendar" framing for funnel arrivals plus an email/phone contact line for organic visitors ("Send a note to soban@sobanahmad.dev") since cold-call booking happens live. No pricing anywhere. Reference build for tone/structure: `Med Spa Funnel/site/index.html` (Editorial Brutalism VSL page). If a VSL embed is included use `Skeleton` at fixed dimensions; source the Loom URL from that reference file, and omit the embed if no URL is found there.

Hub (`/med-spas`): speed-to-lead and missed-call problem for med spas, after-hours enquiry bleed, the call agent as "the front door" to a seven-layer architecture ("the building"). Keywords: "AI receptionist for med spas", "med spa missed call text back", "speed to lead automation". Links: down to `/med-spas/ai-receptionist`, proof link to `/work/ai-voice-agent`. No links to `/agencies/*`.

Schema: `serviceSchema` + `faqSchema` + breadcrumbs both pages.

**Steps:**

- [ ] Write hub and receptionist page
- [ ] Verify: build; grep receptionist HTML to confirm NO `data-cal-link` and no `/contact` primary button; compliance grep
- [ ] Commit: `feat: add med spa silo with nurture-shaped receptionist page`

### Task 11: Resources + lead capture + contact

**Files:**
- Create: `app/resources/page.tsx`, `app/resources/ad-account-leak-audit/page.tsx`, `app/resources/pre-call-research-checklist/page.tsx`
- Create: `components/site/LeadForm.tsx`, `app/api/lead/route.ts`
- Create: `app/contact/page.tsx`
- Copy: `Ad-Account-Leak-Audit.pdf` from `/Users/sobanahmad/Documents/Claude/Projects/Freelancing Stuff/Ad-Account-Leak-Audit.pdf` → `public/downloads/a7f3e9/ad-account-leak-audit.pdf`

**LeadForm interface:**
```ts
LeadForm({ resource: "ad-account-leak-audit" | "pre-call-research-checklist", downloadPath: string })
// name + work email fields only; POST JSON { name, email, resource } to /api/lead;
// on success reveals downloadPath link. States: idle/submitting(Skeleton-style)/success/error(Alert).
```

**`app/api/lead/route.ts`:** validate name + email shape; if `process.env.LEAD_WEBHOOK_URL` set, `fetch` POST the payload; else `console.log`. Always `{ ok: true }` on valid input. No PDF path in the response (client already has it via props; obscurity-level gating accepted per spec).

**Leak-audit landing page:** crawlable value copy: "10 signals your client accounts are quietly losing money", the ideas described in extractable text (each signal named with one-line description, sourced from the PDF; read it at the path above), CTA "Get the Ad-Account Leak Audit" (never "free"). Maps to `/agencies/ad-operations-automation` link. `FaqBlock`. Checklist page: same mechanic, "12 signals every AE should check before a discovery call, most teams skip 8"; no PDF exists yet, so the form success state says the checklist arrives by email, and the page notes it maps to `/agencies/pre-sales-research-automation`.

**Resources hub:** the two magnets featured; toolkit links (GitHub, LinkedIn) present; resume available as a plain link, not featured.

**Contact page:** H1, one-line reassurance ("A 15-minute call, no slides, no pitch."), Cal.com inline embed via `@calcom/embed-react` (`CAL_LINK`, `CAL_NAMESPACE` from `lib/site.ts`) wrapped in `Skeleton` at fixed height (~700px) until loaded, mono email fallback. Nothing else.

**Steps:**

- [ ] Copy the PDF into `public/downloads/a7f3e9/`
- [ ] Write LeadForm + `/api/lead`
- [ ] Write the three resource pages
- [ ] Write `/contact`
- [ ] Verify: build (route table shows `/api/lead` as ƒ, everything else prerendered); grep leak-audit HTML for "10 signals"; `curl -s -X POST localhost` check skipped (no server in CI), instead typecheck passes; compliance grep (no "free")
- [ ] Commit: `feat: add resources with gated lead magnets and contact page`

### Task 12: Blog structure (MDX pipeline, index, template)

**Files:**
- Modify: `next.config.mjs`, `package.json` (add `@next/mdx @mdx-js/loader @mdx-js/react gray-matter`)
- Create: `lib/blog.ts`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `content/blog/_template.mdx`, `mdx-components.tsx`

**Interfaces:**
```ts
// lib/blog.ts — reads content/blog/*.mdx (ignores _template.mdx) via gray-matter
type PostMeta = { slug: string; title: string; description: string; pillar: "manual-work" | "preparation" | "agency-economics" | "med-spa"; datePublished: string; dateModified: string; takeaways: string[] }
getAllPosts(): PostMeta[]
getPost(slug: string): { meta: PostMeta; content: string } | null
```

`[slug]/page.tsx`: `generateStaticParams` from `getAllPosts`, renders MDX with the article shape wrapper: H1, direct-answer lead paragraph (first MDX paragraph), key-takeaways block from frontmatter, byline (name + photo, links to `/about`), visible published/updated dates, `articleSchema` + breadcrumbs, closing CTA link chosen by pillar (manual-work → `/agencies/ad-operations-automation`, preparation → `/agencies/pre-sales-research-automation`, agency-economics → `/agencies`, med-spa → `/med-spas/ai-receptionist`). `mdx-components.tsx` maps h2/h3/p/table/ul to the design system styles.

Index: grouped by the three pillars + med spa lane, each pillar with a one-line definition; graceful empty state ("First articles are in the works") since only the template exists.

`_template.mdx`: complete example article skeleton with frontmatter and section comments showing the brief-8 shape (question H1, 40–60 word answer, takeaways, question H2s with stat placeholders marked as instructions-in-comments, first-hand passage slot, FAQ, CTA note).

**Steps:**

- [ ] Add MDX deps + config
- [ ] Write `lib/blog.ts`, index, slug template, `_template.mdx`, `mdx-components.tsx`
- [ ] Verify: build (blog index prerendered, no slug pages emitted); grep blog index HTML for pillar names
- [ ] Commit: `feat: add blog structure with MDX pipeline and article template`

### Task 13: Machine files + legacy cleanup

**Files:**
- Create: `app/llms.txt/route.ts`, `public/brand-facts.json`
- Modify: `public/robots.txt`, `app/sitemap.ts`
- Delete: `app/pages/` (entire dir), `app/case-study/` (entire dir; redirects live in next.config), `components/Footer.tsx`, `components/JsonLd.tsx`, `components/SmoothScrollProvider.tsx`, `components/ContactForm.tsx`; `components/theme-provider.tsx` and unused `components/ui/*` only if nothing imports them (check with grep first)

**Content:**

- `llms.txt` (route returning `text/plain`, target ≤ 8KB): one-paragraph entity definition (Soban Ahmad / KodoAI, what he builds, for whom), then curated URL list with one-line descriptions: about, both silo hubs, all offer pages, all four cases, both resource pages, contact.
- `brand-facts.json`: brand name KodoAI, founder Soban Ahmad, tagline, one-line definition, service list (ad-ops automation, pre-sales research automation, onboarding intelligence, AI voice receptionist), service area United States, contact email, sameAs from `lib/site.ts` values (hand-copy, it is a static file).
- `robots.txt`: allow all including GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Googlebot, Bingbot explicitly; `Sitemap: https://sobanahmad.dev/sitemap.xml`.
- `sitemap.ts`: every route in the File Structure map (except api), `lastmod` = build date for now.

**Steps:**

- [ ] Write the four machine files
- [ ] Grep for imports of each legacy file before deleting; delete legacy files/dirs
- [ ] Verify: `npm run build` passes clean; route table contains only new routes; `curl`-free check: `.next/server/app/llms.txt` exists or route compiles
- [ ] Commit: `feat: add machine identity files, remove legacy single-page site`

### Task 14: Compliance, accessibility and performance sweep

**Files:** any (fix-ups only)

**Steps:**

- [ ] Run full compliance grep over `app components lib content docs/design`: em dash character, "Upwork", "JSS", "hallucination", "100%", "guaranteed", case-insensitive "free " in CTA contexts, "$2M", "25 hours", "8 wks". Fix every hit in site copy (plan/spec docs exempt).
- [ ] American-spelling sweep of visible copy: grep for "optimize", "center" (copy strings only, not CSS properties/classnames), "behavior", "recognize"; fix to British spellings.
- [ ] Accessibility pass: exactly one H1 per page (grep page files), alt text on every `<img>`/`Image`, visible focus states on Btn/links/inputs (`:focus-visible` outline in accent), keyboard-reachable mobile menu and forms, `aria-expanded` on the menu toggle.
- [ ] Reduced-motion check: with `prefers-reduced-motion`, no GSAP tweens run (code-review the library's guards; every motion component consults `useReducedMotion`).
- [ ] Performance: `npm run build` output: first-load JS for `/` under ~160KB gzip target; cursor field and Cal embed dynamically imported; no font layout shift (`display: swap` behaviour via next/font default).
- [ ] Lighthouse spot-check if Chrome available: `npx serve`-free path: `npm run start` + Lighthouse on `/` (performance ≥ 90 desktop). If environment lacks Chrome, record as manual follow-up in the report, do not fake it.
- [ ] Commit: `chore: compliance, accessibility and performance sweep`

---

## Self-Review Notes

- Spec coverage: IA (T4–T13), tokens/fonts (T1), motion + guide (T2), schema (T3), all pages (T5–T12), machine files (T13), compliance/acceptance (T14, plus per-task greps). Redirects (T4). Lead capture (T11). Blog structure only (T12). Loading-screen replacement: intentionally dropped, old loading screen deleted with `app/pages` (T13); spec allowed dropping it if it threatened LCP, and it did (it gated all content).
- Interfaces consistent: `PageCta`, `FaqBlock`, `LeadForm`, motion exports, schema builders named identically across tasks.
- No placeholders: copy directions carry exact headline directions, exact stats with sources, exact retired-claim lists; implementers write final prose under the Global Constraints, which is the intended division of labour for a content site.
