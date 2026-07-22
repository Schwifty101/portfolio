# Remaining Work — KodoAI Redesign

Updated 2026-07-23. Branch `redesign/kodoai` (22 commits) is build-green, reviewed, and merge-ready. Everything below is what's left, roughly in priority order.

## Blocking launch

- [ ] **Merge decision.** `redesign/kodoai` → `main` (local merge or PR), then deploy to Vercel and smoke-test the live site (redirects, fonts, Cal embed, PDF download).
- [ ] **Set `LEAD_WEBHOOK_URL`** in Vercel env. Until set, lead-form submissions are only logged server-side. Point it at an n8n/Make/Zapier webhook that stores the lead and (for the checklist) sends the email.
- [ ] **Pre-Call Research Checklist asset does not exist.** The landing page promises delivery by email. Either build the PDF (mirror the leak-audit format) and wire it into the webhook email, or gate the page until it exists.

## Post-launch, near-term

- [ ] **Validate JSON-LD** on the live URLs with Google's Rich Results Test (Person, Organization, Service, FAQPage, Article, BreadcrumbList). Local markup is builder-generated but unvalidated by Google tooling.
- [ ] **Search Console:** submit sitemap, confirm indexing, watch the `/case-study/*` 308s resolve.
- [ ] **Lighthouse mobile pass.** Desktop measured 98/100/CLS 0; mobile not measured.
- [ ] **Compress `public/og-image.png`** (398 KB, heavy for a social card; it renders in every DM link preview).

## Content engine (brief phase two)

- [ ] **Blog articles.** Structure/pipeline is live with zero posts. Brief cadence: one cornerstone or cluster article every 1–2 weeks. Start with the three pillar pages (manual-work, preparation, agency-economics) built from the validated stats (87% pacing, 71% risk, 39.75 hrs, 49% churn). Template at `content/blog/_template.mdx`.
- [ ] **Ungated leak-audit article.** Brief section 9: publish the 10 signals as a crawlable article (citation asset) while the PDF stays gated.
- [ ] **Quarterly refresh loop:** revisit cornerstone pages, keep `dateModified`/sitemap `lastmod` honest (currently lastmod = build date).

## Deferred / when it happens

- [ ] **Med spa real numbers.** When the first med spa client is live, replace mechanism-only proof on `/med-spas/*` with their real figures (funnel playbook's "add later" note).
- [ ] **AIO tracking** (brief section 13): monthly fixed-prompt sweep across ChatGPT/Perplexity/Gemini/AI Overviews for citation and mention rate.
- [ ] **Small accepted code minors:** LeadForm hardcoded input ids + download label (matters only if a second downloadable resource is added); `SmoothScroll` is an unused export kept for possible re-enablement.

## Standing decisions (do not "fix")

- CTA copy "Book a 15-minute call" with 30-minute Cal event is **deliberate** (buffer for overruns).
- No NUCES, no Rawalpindi/Pakistan, no US-only claims anywhere on the site (owner decision 2026-07-23, overrides the master brief).
- Receptionist page (`/med-spas/ai-receptionist`) must never gain a booking widget, pricing, or `/contact` CTA — it feeds the live cold-call funnel.
