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

const TITLE = 'The Pre-Call Research Checklist for AEs'
const DESCRIPTION =
  'The Pre-Call Research Checklist names 12 signals every AE should check before a discovery call, from funding and hiring to ad activity and decision makers.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources/pre-call-research-checklist',
})

const PATH = `${SITE_URL}/resources/pre-call-research-checklist`

const SIGNALS = [
  {
    n: '01',
    name: 'Company fundamentals',
    body: 'What the business actually does, how it makes money, its size and how it is structured. The base layer every other signal reads against.',
  },
  {
    n: '02',
    name: 'Funding and financial signals',
    body: 'Recent rounds, revenue signals and public financials that hint at budget headroom and how much appetite there is to spend.',
  },
  {
    n: '03',
    name: 'Hiring activity',
    body: 'Open roles reveal where a company is investing right now and which functions are under strain, often before anyone says so on a call.',
  },
  {
    n: '04',
    name: 'Technology stack',
    body: 'The tools they run, what those tools integrate with and where the obvious gaps sit. A read on how a new system would slot in.',
  },
  {
    n: '05',
    name: 'Ad and marketing activity',
    body: 'What they are running, on which channels and for how long. Longevity is a signal of what is working and what is being tested.',
  },
  {
    n: '06',
    name: 'Competitor landscape',
    body: 'Who they benchmark against, where a rival is beating them and which comparisons will land in the room.',
  },
  {
    n: '07',
    name: 'Decision makers',
    body: 'Who holds the budget, who influences the choice and who can quietly block it. The map of who actually needs convincing.',
  },
  {
    n: '08',
    name: 'Recent news and triggers',
    body: 'Announcements, launches, funding, leadership changes: the events that create a reason to act now rather than next quarter.',
  },
  {
    n: '09',
    name: 'Website and funnel signals',
    body: 'What their own conversion path reveals about how they sell, where friction lives and what they already know is broken.',
  },
  {
    n: '10',
    name: 'Social and content footprint',
    body: 'What leadership publishes and repeats. It tells you what they care about and gives you the language they already use.',
  },
  {
    n: '11',
    name: 'Reviews and reputation',
    body: 'What customers and staff say in public. The complaints and the praise both point at where the real pressure sits.',
  },
  {
    n: '12',
    name: 'Prior touchpoints',
    body: 'History with your agency: past enquiries, warm threads, earlier proposals. Context that stops a rep repeating a conversation.',
  },
]

const FAQ = [
  {
    q: 'What is the Pre-Call Research Checklist?',
    a: 'It is a list of 12 signal categories an account executive should check before a discovery call, covering company fundamentals, funding, hiring, the tech stack, ad activity, competitors, decision makers, recent triggers, website signals, content footprint, reputation and prior touchpoints. Together they let a rep walk in already knowing the account rather than asking questions the answers are public to.',
  },
  {
    q: 'Why do most teams only cover a few of these?',
    a: 'Because doing all 12 properly by hand takes real time, and a rep with a full calendar does deep prep on the meetings that feel important and skims the rest. The signals are not hard to find, they are just tedious to gather consistently across every prospect.',
  },
  {
    q: 'How is this different from a generic sales research template?',
    a: 'It is organised around what changes a discovery call, not what fills a CRM field. Each category maps to a decision the rep has to make in the room: who to convince, what trigger to lead with, which competitor comparison will land. It is a prep map, not a data-entry form.',
  },
  {
    q: 'Can this research be automated?',
    a: 'Most of it can. Every one of these categories is drawn from sources a system can gather and summarise, which is exactly what a pre-call brief agent does: the same depth of prep on every prospect, not just the ones a rep had time for. The checklist is the manual version of that system.',
  },
  {
    q: 'How do I get the checklist?',
    a: 'Leave your name and work email and it is sent straight to your inbox. There is no call required to receive it.',
  },
]

export default function PreCallResearchChecklistPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Resources', url: `${SITE_URL}/resources` },
          { name: 'Pre-Call Research Checklist', url: PATH },
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
                / PRE-CALL RESEARCH CHECKLIST
              </SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
              >
                12 signals every AE should check before a discovery call, most teams skip 8
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                The Pre-Call Research Checklist names the 12 categories of signal an account executive
                should read before a discovery call, from funding and hiring to ad activity and who
                actually holds the budget. Cover all 12 and a rep walks in already knowing the account
                instead of asking questions the answers are public to.
              </p>
            </div>
          </Container>
        </section>

        {/* The 12 signals + gated form */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr]">
              <div className="max-w-3xl">
                <SectionLabel>THE 12 SIGNALS</SectionLabel>
                <KineticHeadline
                  as="h2"
                  className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-4xl"
                >
                  What to check before the call
                </KineticHeadline>
                <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Each category below is a decision the rep has to make in the room. Cover it in prep
                  and the call is about fit, not fact-finding.
                </p>

                <Reveal as="ol" stagger={0.06} className="mt-12 border-t border-border">
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

              {/* Gated: arrives by email */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionLabel>GET THE CHECKLIST</SectionLabel>
                <h2 className="mt-6 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink">
                  Have it sent to your inbox
                </h2>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-2">
                  Leave your name and work email and the full checklist arrives in your inbox, ready to
                  run before your next discovery call.
                </p>
                <div className="mt-6">
                  <LeadForm resource="pre-call-research-checklist" />
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
                Running all 12 by hand on every prospect is the part that never survives a full
                calendar. A pre-call brief agent gathers and summarises the same signals for each
                account automatically, so every rep gets the same depth of prep, not just the meetings
                they had time for.
              </p>
              <div className="mt-8">
                <Link
                  href="/agencies/pre-sales-research-automation"
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  See pre-sales research automation
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
