![1784818686828](image/REMAINING-WORK/1784818686828.pdf)

# Remaining 

Work — KodoAI Redesign

Updated 2026-07-23. Branch `redesign/kodoai` (22 commits) is build-green, reviewed, and merge-ready. Everything below is what's left, roughly in priority order.

## Blocking launch

- [ ] **Merge decision.** `redesign/kodoai` → `main` (local merge or PR), then deploy to Vercel and smoke-test the live site (redirects, fonts, Cal embed, PDF download).
- [x] **Lead delivery rebuilt: direct Notion + Resend, no external webhook.** `app/api/lead/route.ts` no longer fires `LEAD_WEBHOOK_URL` (removed). It now logs every lead straight into the "Website Leads" Notion database and emails the requested resource via Resend, both fail-open. What's left is account setup, not code:
  - [ ] Create a Notion internal integration at notion.so/my-integrations, share the "Website Leads" database with it, set `NOTION_API_KEY` in Vercel.
  - [ ] Create a Resend account, verify a sending domain, set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in Vercel.
  - [ ] Until those are set, leads still land safely (server-side `console.log`), they just aren't logged or emailed.
- [x] **Pre-Call Research Checklist asset built.** PDF added at `public/downloads/484272/pre-call-research-checklist.pdf` (from the outreach asset library) and wired into the resource page as an instant download, same pattern as the leak audit, plus the Resend email above.

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
- [ ] **Small accepted code minor:** LeadForm hardcoded `lead-name`/`lead-email` input ids (only matters if the form is ever rendered twice on one page). The download-label half of this item is done, the label is resource-specific now. `SmoothScroll` is an unused export kept for possible re-enablement.

## Standing decisions (do not "fix")

- CTA copy "Book a 15-minute call" with 30-minute Cal event is **deliberate** (buffer for overruns).
- No NUCES, no Rawalpindi/Pakistan, no US-only claims anywhere on the site (owner decision 2026-07-23, overrides the master brief).
- Receptionist page (`/med-spas/ai-receptionist`) must never gain a booking widget, pricing, or `/contact` CTA — it feeds the live cold-call funnel.
