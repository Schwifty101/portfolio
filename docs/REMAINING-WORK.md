# Remaining

Work — KodoAI Redesign

Updated 2026-07-23. Branch `redesign/kodoai` (22 commits) is build-green, reviewed, and merge-ready. Everything below is what's left, roughly in priority order.

## Blocking launch

- [X] **Merge decision.** `redesign/kodoai` → `main` (local merge or PR), then deploy to Vercel and smoke-test the live site (redirects, fonts, Cal embed, PDF download).
- [X] **Lead delivery rebuilt: direct Notion + Resend, no external webhook.** `app/api/lead/route.ts` no longer fires `LEAD_WEBHOOK_URL` (removed). It now logs every lead straight into the "Website Leads" Notion database and emails the requested resource via Resend, both fail-open. What's left is account setup, not code:
  - [X] Notion internal integration ("website") created, shared with the "Website Leads" database, `NOTION_API_KEY` set in Vercel (Production/Preview/Development).
  - [X] Resend account created, `RESEND_API_KEY` and `RESEND_FROM_EMAIL` (`soban@sobanahmad.dev`) set in Vercel. Awaiting a local end-to-end test (Notion row + email delivery) before trusting it in prod.
- [X] **Pre-Call Research Checklist asset built.** PDF added at `public/downloads/484272/pre-call-research-checklist.pdf` (from the outreach asset library) and wired into the resource page as an instant download, same pattern as the leak audit, plus the Resend email above.

## Post-launch, near-term

- [x] **Mobile menu overlay fixed.** `SiteHeader`'s `backdrop-blur-md` was creating a new CSS containing block for the menu's `fixed inset-0` overlay (nested inside the header), so it only covered the header's own box instead of the viewport. Portaled the overlay to `document.body` in `MobileMenu.tsx`.
- [x] **GSAP ScrollSmoother re-enabled.** Was wired up in `components/motion/SmoothScroll.tsx` but never mounted; `gsap` reinstalled at latest (ScrollSmoother is no longer Club GreenSock-only) and wrapped around `{children}` + `SiteFooter` in `app/layout.tsx`, with `SiteHeader` kept outside the wrapper (sticky positioning breaks inside a transformed ScrollSmoother container, same class of bug as the mobile-menu fix above). Desktop-only by design; mobile/touch/reduced-motion still get native scroll.
- [ ] **Validate JSON-LD** on the live URLs with Google's Rich Results Test (Person, Organization, Service, FAQPage, Article, BreadcrumbList). Local markup is builder-generated but unvalidated by Google tooling.
- [ ] **Search Console:** submit sitemap, confirm indexing, watch the `/case-study/*` 308s resolve.
- [ ] **Lighthouse mobile pass.** Desktop measured 98/100/CLS 0; mobile not measured.
- [ ] **Compress `public/og-image.png`** (398 KB, heavy for a social card; it renders in every DM link preview).

## Content engine (brief phase two)

- [X] **Blog articles: three pillar cornerstones published.** `manual-ad-ops-margin-cost.mdx`, `faster-prep-wins-discovery-calls.mdx`, `does-hiring-shrink-agency-margin.mdx` (manual-work, preparation, agency-economics), built from the validated stats plus one new, independently-verified stat (Basis 2026 Advertising Agency Report, 87.3% believe the time-and-headcount model is broken or will be within 3-5 years). All three added to `app/sitemap.ts`. Next cornerstone/cluster article is the med-spa lane, still open, plus the brief's 1-2 week cadence going forward.
- [X] **Ungated leak-audit article published.** `content/blog/10-signals-your-ad-account-is-losing-money.mdx`, brief section 9's crawlable citation asset, all 10 signals expanded with real explanatory paragraphs (not the resource page's one-liners), cross-linked to `/resources/ad-account-leak-audit` for the PDF and `/work/ad-ops-agent` as proof. Added to the sitemap.
- [ ] **Quarterly refresh loop:** revisit cornerstone pages, keep `dateModified`/sitemap `lastmod` honest (currently lastmod = build date).

## Deferred / when it happens

- [ ] **Med spa real numbers.** When the first med spa client is live, replace mechanism-only proof on `/med-spas/*` with their real figures (funnel playbook's "add later" note).
- [ ] **AIO tracking** (brief section 13): monthly fixed-prompt sweep across ChatGPT/Perplexity/Gemini/AI Overviews for citation and mention rate.
- [ ] **Small accepted code minor:** LeadForm hardcoded `lead-name`/`lead-email` input ids (only matters if the form is ever rendered twice on one page). The download-label half of this item is done, the label is resource-specific now.

## Standing decisions (do not "fix")

- CTA copy "Book a 15-minute call" with 30-minute Cal event is **deliberate** (buffer for overruns).
- No NUCES, no Rawalpindi/Pakistan, no US-only claims anywhere on the site (owner decision 2026-07-23, overrides the master brief).
- Receptionist page (`/med-spas/ai-receptionist`) must never gain a booking widget, pricing, or `/contact` CTA — it feeds the live cold-call funnel.
