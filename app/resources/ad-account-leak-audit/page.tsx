import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Divider } from '@/components/ui-kodo/Divider'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal } from '@/components/motion'
import { FaqBlock } from '@/components/site/FaqBlock'
import { PageCta } from '@/components/site/PageCta'
import { LeadForm } from '@/components/site/LeadForm'
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const TITLE = 'The Ad-Account Leak Audit for Agencies'
const DESCRIPTION =
  'The Ad-Account Leak Audit names 10 signals a client account is quietly losing money, from budget pacing drift to attribution mismatch. Run it in 20 minutes.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources/ad-account-leak-audit',
})

const PATH = `${SITE_URL}/resources/ad-account-leak-audit`
const DOWNLOAD_PATH = '/downloads/a7f3e9/ad-account-leak-audit.pdf'

const SIGNALS = [
  {
    n: '01',
    name: 'Budget pacing drift',
    body: 'The account is spending 10% or more off its daily pace before Thursday, so it overspends by the weekend with nobody seeing it until Monday.',
  },
  {
    n: '02',
    name: 'Creative fatigue',
    body: 'Click-through rate has fallen three or more days running with no creative rotation. Every extra day it runs costs 8 to 15% more per click.',
  },
  {
    n: '03',
    name: 'CPA creep',
    body: 'Cost per acquisition is rising week on week with no bid or budget change, a sign the account is optimising toward lower-quality signals.',
  },
  {
    n: '04',
    name: 'ROAS below target',
    body: 'Return on ad spend has sat below target for seven days or more with no escalation logged, so the client pays a full management fee for worse results.',
  },
  {
    n: '05',
    name: 'Frequency overload',
    body: 'Meta ad frequency is above 3.5 with no creative refresh or audience expansion. The audience is burnt and CPMs are climbing.',
  },
  {
    n: '06',
    name: 'Audience overlap',
    body: 'Multiple ad sets target the same users inside one campaign, so the account bids against itself and inflates its own CPMs.',
  },
  {
    n: '07',
    name: 'Quality Score erosion',
    body: 'Top-spend Google keywords carry a Quality Score below 6, which means the account pays a premium per click for poor ad relevance.',
  },
  {
    n: '08',
    name: 'Impression share loss',
    body: 'Branded terms sit below 70% Search Impression Share, so competitors capture traffic from the client’s own brand name.',
  },
  {
    n: '09',
    name: 'Silent disapprovals',
    body: 'Ads are disapproved or running limited with no action taken, leaving campaigns at reduced reach or offline and undetected.',
  },
  {
    n: '10',
    name: 'Attribution mismatch',
    body: 'Meta counts on a 28-day click, Google on 30, the dashboard on 7. Three conversion counts, none comparable, reporting quietly broken.',
  },
]

const FAQ = [
  {
    q: 'What is the Ad-Account Leak Audit?',
    a: 'It is a one-page checklist of 10 specific signals that a paid-ads account is losing money without anyone noticing: budget pacing drift, creative fatigue, CPA creep, ROAS below target, frequency overload, audience overlap, Quality Score erosion, impression share loss, silent disapprovals and attribution mismatch. You run it against any client account in about 20 minutes.',
  },
  {
    q: 'How do I read the result?',
    a: 'Each signal is marked clear or flagged as you check it. Three or more flagged signals on one account is the threshold worth acting on: the account is at real risk of quietly overspending or underdelivering. Fewer than three is worth watching but rarely urgent.',
  },
  {
    q: 'Does it work for both Google and Meta accounts?',
    a: 'Yes. The signals span both platforms. Some are Google-specific (Quality Score erosion, impression share loss), some are Meta-specific (frequency overload), and several apply to any paid channel (budget pacing, CPA creep, ROAS drift, attribution mismatch).',
  },
  {
    q: 'What do I do once I find a leak?',
    a: 'The audit tells you where an account is bleeding; fixing it every month by hand is the deeper problem. Most of these signals can be watched continuously by an ad-operations agent that flags drift the day it starts, rather than the Monday after. That is the system the audit maps to.',
  },
  {
    q: 'Do I have to book a call to get it?',
    a: 'No. Leave your name and work email and the audit is yours to download straight away, with a copy sent to your inbox. The call is a separate, optional next step if you want to talk through what you found.',
  },
]

export default function AdAccountLeakAuditPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Resources', url: `${SITE_URL}/resources` },
          { name: 'Ad-Account Leak Audit', url: PATH },
        ])}
      />

      <main>
        {/* Hero + answer-first block */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>
                <Link href="/resources" className="text-ink-3 transition-colors hover:text-accent">
                  RESOURCES
                </Link>{' '}
                / AD-ACCOUNT LEAK AUDIT
              </SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
              >
                10 signals your client accounts are quietly losing money
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                The Ad-Account Leak Audit is a one-page checklist of 10 signals that a paid-ads
                account is losing money without anyone noticing, from budget pacing drift to a broken
                attribution setup. Run it against any client account in about 20 minutes. Three or
                more signals flagged means the account is at risk.
              </p>
            </div>
          </Container>
        </section>

        {/* The 10 signals + gated form */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr]">
              <div className="max-w-3xl">
                <SectionLabel>THE 10 SIGNALS</SectionLabel>
                <KineticHeadline
                  as="h2"
                  className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-4xl"
                >
                  What the audit checks
                </KineticHeadline>
                <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Every signal below is a way an account bleeds spend or misreports results. The
                  wording is the audit itself: check each one against a live account and mark it clear
                  or flagged.
                </p>

                <Reveal
                  as="ol"
                  stagger={0.06}
                  className="mt-12 border-t border-border"
                >
                  {SIGNALS.map((s) => (
                    <li key={s.n} className="flex gap-5 border-b border-border py-6">
                      <span className="font-mono text-[13px] font-medium tracking-[0.15em] text-accent">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                          {s.name}
                        </h3>
                        <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-2">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </Reveal>
              </div>

              {/* Gated download */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionLabel>GET THE AUDIT</SectionLabel>
                <h2 className="mt-6 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink">
                  Take the one-page checklist with you
                </h2>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-2">
                  Leave your name and work email and the printable audit is yours to run on every
                  client account, monthly.
                </p>
                <div className="mt-6">
                  <LeadForm resource="ad-account-leak-audit" downloadPath={DOWNLOAD_PATH} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Map to offer */}
        <section className="border-b border-border bg-bg">
          <Container className="py-16">
            <div className="max-w-3xl">
              <SectionLabel>WHAT TO DO WITH IT</SectionLabel>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Finding a leak once is useful; catching it the day it starts is the actual fix. Most
                of these signals can be watched continuously by an ad-operations agent that flags
                drift before the weekend does the damage, instead of a strategist re-running the audit
                by hand.
              </p>
              <div className="mt-8">
                <Link
                  href="/agencies/ad-operations-automation"
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  See ad operations automation
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <Divider className="mb-12" />
            <FaqBlock items={FAQ} />
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
