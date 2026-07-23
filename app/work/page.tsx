import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal } from '@/components/motion'
import { PageCta } from '@/components/site/PageCta'
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Work: Systems I Design, Build and Deploy'
const DESCRIPTION =
  'Case studies of AI systems Soban Ahmad designed, built and deployed: a law practice platform, an ad-ops agent, a research agent and a voice receptionist.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/work',
})

type CaseCard = {
  slug: string
  tag: string
  year: string
  vertical: string
  system: string
  heading: string
  body: string
}

const CASES: CaseCard[] = [
  {
    slug: 'arco-law',
    tag: 'FLAGSHIP',
    year: '2026',
    vertical: 'Legal',
    system: 'Client platform',
    heading: 'A law practice platform for AR&CO Law Associates',
    body: 'My first paid client, a roughly 7,000 USD build won on a referral. A three-portal platform that moved a firm off inboxes and spreadsheets onto one system of record: intake, case tracking, documents and payments. Operations streamlined, bookkeeping easier, case management improved.',
  },
  {
    slug: 'ad-ops-agent',
    tag: 'AGENT BUILD',
    year: '2026',
    vertical: 'Paid-ads agency',
    system: 'Ad operations agent',
    heading: 'A research-to-launch agent that runs ad operations',
    body: 'It scrapes the competitive landscape, drafts policy-safe campaigns grounded in that data, and keeps a human on the publish button. It lets a team hold more accounts without another salary. This build runs inside an agency I do not name, the people running it treat it as an edge.',
  },
  {
    slug: 'pre-call-brief',
    tag: 'AGENT BUILD',
    year: '2026',
    vertical: 'B2B sales',
    system: 'Pre-sales research agent',
    heading: 'A research agent that briefs an AE before every call',
    body: 'It gives every rep the same depth of prep on every prospect, grounded in the source data the system scraped, not just the prospects someone had time for. This build runs inside a team I do not name, the people running it treat it as an edge.',
  },
  {
    slug: 'ai-voice-agent',
    tag: 'AGENT BUILD',
    year: '2026',
    vertical: 'Med spa',
    system: 'AI voice receptionist',
    heading: 'A voice agent that answers the calls a business misses',
    body: 'It picks up after hours and when the front desk is busy, quotes real pricing, checks live availability, books against the real schedule and confirms by text. A missed call stops quietly becoming a lost customer. Named honestly, without the ones running it.',
  },
]

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Work', url: `${SITE_URL}/work` },
        ])}
      />

      <main>
        {/* -------------------------------------------------------------- */}
        {/* Hero: self-contained answer + index framing                    */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>WORK</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Systems designed, built and deployed
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Not decks and not advice. Working software that runs in production and does the
                repetitive work. One named build for a law practice, and three agents running quietly
                inside agencies and teams that treat them as an edge. Each case covers the situation
                before, the manual bottleneck, what was built and what changed.
              </p>
            </div>
          </Container>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Case index                                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <Reveal stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {CASES.map((c) => (
                <Card
                  key={c.slug}
                  featured={c.tag === 'FLAGSHIP'}
                  className="flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                      {`// ${c.year} · ${c.vertical} · ${c.system}`}
                    </span>
                    <span
                      className={
                        c.tag === 'FLAGSHIP'
                          ? 'font-mono text-[11px] uppercase tracking-[0.15em] text-accent'
                          : 'font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3'
                      }
                    >
                      {c.tag}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
                    {c.heading}
                  </h2>

                  <p className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {c.body}
                  </p>

                  <Link
                    href={`/work/${c.slug}`}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                  >
                    Read the case
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </Card>
              ))}
            </Reveal>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
