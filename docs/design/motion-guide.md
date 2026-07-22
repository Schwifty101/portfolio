# Motion Guide

The animation, layout and flow guide for sobanahmad.dev (KodoAI). This is the
contract for every moving thing on the site. If an effect is not in this
document, it does not ship.

## Philosophy: brutalist motion

Motion here is precise and mechanical, never playful. The visual language is
Editorial Brutalism: sharp corners, a dark canvas, condensed display type. Motion
must read the same way, engineered, deliberate, in service of the content.

The rules that follow from that:

- **Transform and opacity only.** No animating colour, width, height, box-shadow
  or layout properties. Those trigger layout/paint work and cause jank.
- **No bounce, no overshoot, no elastic.** Easing stays in the `power2.out`
  family. Nothing wobbles back into place.
- **Durations 0.4s to 0.8s.** Long enough to read as intentional, short enough to
  stay out of the way. Count-ups and scrubbed sequences are the only things that
  run longer, and they are tied to user scroll.
- **Motion enhances, never gates.** All page content is server-rendered and
  visible without JavaScript. The hidden "before" state of any reveal is applied
  with `gsap.set` on mount, never as a CSS class in the server HTML. A crawler,
  a reader with JS disabled, or a failed script all get the full, final content.
- **Reduced motion is absolute.** Every component consults `useReducedMotion`.
  When the user prefers reduced motion, tweens do not run, smooth scroll is
  disabled, and the component renders its static final state. `prefers-reduced-motion`
  also short-circuits CSS transitions globally (see `app/globals.css`).
- **Mobile is calmer.** No pinned sections and no cursor canvas on touch/mobile.
  These are desktop-pointer affordances and scroll-jank risks on touch.

Everything lives in `components/motion` and is imported through the barrel:

```tsx
import { Reveal, KineticHeadline, StatCounter } from "@/components/motion"
```

Pages never hand-roll GSAP. They compose these components. That keeps the SSR
guarantee, the reduced-motion guarantee, and the easing/duration budget in one
place.

## Core Web Vitals budget

- **No layout shift (CLS ~ 0).** Reveals animate `transform`/`opacity` on
  content that already occupies its final space. `StatCounter` and `ScrambleText`
  server-render their final text, so their box never resizes. Any embed
  (Cal.com, VSL, media) is wrapped in `Skeleton` at fixed dimensions so the slot
  is reserved before the embed arrives.
- **Cursor field is lazy.** `CursorField` is decorative; import it with
  `next/dynamic` (`ssr: false`) so it never blocks first paint or ships in the
  critical bundle. It renders `null` on touch/mobile/reduced-motion, so most
  visitors download nothing extra for it.
- **rAF is disciplined.** The only continuous rAF loop is `CursorField`, and it
  pauses when scrolled off-screen (IntersectionObserver) or when the tab is
  hidden. `Marquee` uses a pure CSS transform loop, no per-frame JS.
- **No font shift.** Fonts are self-hosted via `next/font` with `display: swap`
  defaults; motion never depends on webfont load.
- **INP stays low.** GSAP work runs inside `gsap.context` scoped to the element
  and is reverted on unmount, so triggers do not accumulate across navigations.

## Components

### `useReducedMotion(): boolean`

SSR-safe `prefers-reduced-motion` hook. Returns `false` on the server and first
client render (so hydration matches), then the real value. Every other component
uses it; call it directly only when a page needs a bespoke static fallback.

```tsx
const reduced = useReducedMotion()
```

### `SmoothScroll({ children })`

Desktop-only ScrollSmoother wrapper. Renders `#smooth-wrapper` / `#smooth-content`
around its children (always present in the HTML). Creates ScrollSmoother only on
desktop with motion allowed; on mobile/touch or reduced motion it is a no-op and
native scroll is used.

**Where it belongs:** wrap the page body inside the page (a client boundary in
the page, not in the root layout, which stays server-only). Use on long
scroll-driven pages (Home, case studies). Not required on short form pages.

```tsx
// app/page.tsx (server) renders a client wrapper:
<SmoothScroll>{/* page sections */}</SmoothScroll>
```

Only one `SmoothScroll` per page; it owns the single `#smooth-wrapper`.

### `Reveal({ children, as?, delay?, stagger?, className? })`

Scroll-triggered fade-and-rise. Without `stagger` the wrapper itself reveals;
with `stagger` its direct children reveal in sequence.

**Where it belongs:** the default reveal for section blocks, card grids, list
items. Use `stagger` on card rows (pain cards, case cards, proof grids).

```tsx
<Reveal as="div" stagger={0.08} className="grid gap-6 md:grid-cols-3">
  <Card>…</Card>
  <Card>…</Card>
  <Card>…</Card>
</Reveal>
```

### `KineticHeadline({ children, as?, className? })`

Split-line headline reveal: masked lines rise into place. Server-renders a plain
`h1`/`h2`/`h3` with the full string.

**Where it belongs:** the primary headline of a section, and page H1s (Home hero,
About, silo hubs, offer pages). One per section; do not stack kinetic headlines.
`children` must be a plain string.

```tsx
<KineticHeadline as="h1" className="font-display text-6xl uppercase">
  Your agency&apos;s growth ceiling is not sales.
</KineticHeadline>
```

### `ScrambleText({ text, className? })`

Decode-in effect on scroll into view. Final text is server-rendered.

**Where it belongs:** short mono meta or eyebrow accents (section labels,
stat captions, a one-line kicker). Not for body copy or long strings, the
scramble reads as noise past a few words.

```tsx
<ScrambleText text="// SYSTEM DEPLOYED" className="font-mono text-ink-3" />
```

### `StrikeSwap({ struck, replacement, className? })`

Scroll-triggered word swap: a red line is drawn through `struck`, then the accent
`replacement` rises in. Both words are in the server HTML in final state.

**Where it belongs:** the worldview beat, exactly once. Home mechanism section:
"inconvenience" struck, "competitive liability" in accent. High-impact, so use it
sparingly (ideally one instance site-wide).

```tsx
<StrikeSwap struck="inconvenience" replacement="competitive liability" />
```

### `StatCounter({ value, prefix?, suffix?, className? })`

Count-up from zero on scroll into view. The final value (with prefix/suffix) is
server-rendered, so the box never resizes. Decimal precision and thousands
grouping are preserved and deterministic across server/client.

**Where it belongs:** defensible numeric proof only (production systems deployed,
sourced ICP statistics such as 87% manual pacing). Never fabricated metrics, and
never any retired claim.

```tsx
<StatCounter value={87} suffix="%" className="font-display text-5xl text-accent" />
<StatCounter value={7000} prefix="~$" className="font-display text-5xl" />
```

### `PinnedSequence({ steps, className? })`

Desktop: pins a panel and cross-fades through `steps` on scroll. Mobile and
reduced motion: a plain stacked list of every step (all content crawlable).

**Where it belongs:** scrollytelling only, where sequence is the point: Home
mechanism (the three spears), the AR&CO architecture walkthrough. Not on
commercial silo/offer pages, those stay fast and scannable. Each `body` can be
any `ReactNode` (including links to offer/case pages).

```tsx
<PinnedSequence
  steps={[
    { label: "STEP 01", body: <p>Remove manual budget pacing.</p> },
    { label: "STEP 02", body: <p>Catch CPA drift before it bites.</p> },
    { label: "STEP 03", body: <p>Automate onboarding intelligence.</p> },
  ]}
/>
```

### `Marquee({ children, speed? })`

Continuous horizontal marquee via a pure CSS transform loop (children are
duplicated for a seamless loop). Static single row under reduced motion. `speed`
is the loop duration in seconds (lower = faster; default 40).

**Where it belongs:** a running tagline or logo/keyword strip, at most one per
page. Keep contents short.

```tsx
<Marquee speed={30}>
  <span className="px-8 font-display text-4xl uppercase">
    If it is manual and measurable, it can be automated.
  </span>
</Marquee>
```

### `CursorField({ className? })`

Canvas dot-grid (every 28px) that displaces away from the pointer within a 120px
radius and lerps back; displaced dots lerp from `--border-2` toward `--accent-dim`.
Renders `null` on touch/mobile/reduced-motion. The rAF loop pauses off-screen and
when the tab is hidden.

**Where it belongs:** the Home hero background layer, once. Position it absolutely
behind hero content. Load it lazily:

```tsx
const CursorField = dynamic(
  () => import("@/components/motion").then((m) => m.CursorField),
  { ssr: false }
)

<section className="relative">
  <CursorField />
  <div className="relative z-10">{/* hero content */}</div>
</section>
```

### `Skeleton({ width?, height?, className?, label? })`

Sharp loading block: `--surface-2` base, a 1px scanline sweeping top-to-bottom via
transform, mono `// LOADING` label by default. No scanline under reduced motion.

**Where it belongs:** reserve fixed space for anything that loads after paint:
the Cal.com embed on `/contact` (~700px), a VSL/Loom embed, the `LeadForm`
submitting state. Always give it the embed's real dimensions so there is zero
layout shift when the content arrives.

```tsx
<Skeleton height="700px" label="// LOADING CALENDAR" />
```

## Hard rules (from Global Constraints)

- Animate `transform` and `opacity` only.
- All page content is present in server-rendered HTML; motion never gates
  visibility. Initial hidden state is applied only when JS runs, via the library.
- `prefers-reduced-motion: reduce` disables all motion, including smooth scroll.
- Mobile: no pinned sections, no cursor canvas.
- Durations 0.4s to 0.8s, `power2.out` family easing, nothing bouncy.
- Pages compose these components; they never hand-roll GSAP.
