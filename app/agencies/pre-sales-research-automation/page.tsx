import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { Divider } from '@/components/ui-kodo/Divider'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal, StatCounter } from '@/components/motion'
import { FaqBlock } from '@/components/site/FaqBlock'
import { PageCta } from '@/components/site/PageCta'
import {
  JsonLd,
  serviceSchema,
  breadcrumbSchema,
  pageMetadata,
} from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Discovery Call Research Automation'
const DESCRIPTION =
  'Discovery call research automation: an agent builds a pre-call brief for every prospect, grounded in scraped source data, so no rep opens a call on guesswork.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/agencies/pre-sales-research-automation',
})

const PATH = `${SITE_URL}/agencies/pre-sales-research-automation`

const BRIEF_PARTS = [
  {
    label: 'THE COMPANY',
    heading: 'Company snapshot',
    body: 'What the prospect does, how big they are, and the recent moves that matter, pulled from public sources and structured into a page a rep can read in two minutes.',
  },
  {
    label: 'THE FOOTPRINT',
    heading: 'Marketing footprint',
    body: 'What the prospect is already running, where the visible gaps are, and the angles a competitor has left open, so the conversation starts from evidence rather than a generic pitch.',
  },
  {
    label: 'THE PERSON',
    heading: 'Who is on the call',
    body: 'The role and background of the person across the table, so a rep opens with relevance instead of reading a title off a calendar invite for the first time.',
  },
  {
    label: 'THE ANGLE',
    heading: 'Likely pain and talking points',
    body: 'The probable pain and the talking points that follow from it, every one grounded in the source data the system scraped, so a rep walks in with a point of view, not a guess.',
  },
]

const FAQ = [
  {
    q: 'What does a pre-call brief include?',
    a: 'A company snapshot, the current marketing footprint and visible gaps, who is on the call and their background, and the likely pain with talking points that follow from it. Every line is grounded in the source data the system scraped, so the brief is a structured read of real evidence rather than a template a rep fills in from memory.',
  },
  {
    q: 'How does discovery call research automation work?',
    a: 'An agent scrapes and structures the same public sources a strategist would gather by hand, then assembles them into a consistent brief for every scheduled call. The rep reads the brief instead of doing the research, so prep stops depending on how much time anyone had the night before.',
  },
  {
    q: 'Is the brief accurate, or does the model invent things?',
    a: 'The brief is grounded in the source data the system actually scraped, so a rep is reading structured evidence, not a confident guess. The point of the system is that reps stop walking in with assumptions and start from what the sources support.',
  },
  {
    q: 'How much prep time does this return to the team?',
    a: 'Roughly 39.75 hours per strategist per month go to automatable tasks like manual research (SparkToro-cited research). In P&L terms, that is prep which used to eat a week of a senior rep, returned to selling and to carrying more conversations, rather than a headline about hours saved.',
  },
  {
    q: 'Is this a custom build or an off-the-shelf tool?',
    a: 'A custom build, designed around how your team qualifies and sells, then deployed and handed over. It is production software already briefing reps before real calls. The pre-call brief agent case study is the proof.',
  },
]

export default function PreSalesResearchAutomation() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Pre-sales research automation',
            description: DESCRIPTION,
            url: PATH,
            serviceType: 'Pre-sales research automation',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Agencies', url: `${SITE_URL}/agencies` },
            { name: 'Pre-Sales Research Automation', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: buyer outcome + self-contained 40-60 word answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>
                <Link href="/agencies" className="text-ink-3 transition-colors hover:text-accent">
                  AGENCIES
                </Link>{' '}
                / PRE-SALES RESEARCH AUTOMATION
              </SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Discovery call research automation
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Discovery call research automation gives every rep a pre-call brief before every
                prospect meeting, generated by an agent that scrapes and structures the same source
                data a strategist would gather by hand. It means every prospect gets the same depth of
                prep, not just the ones a rep had time to research, so no call opens on guesswork.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[14px] font-semibold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-accent-dim hover:border-accent-dim"
                >
                  Book a 15-minute call
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* What a brief includes */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE DELIVERABLE</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What does a pre-call brief include?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Four parts, each grounded in real source data and structured so a rep can read it in a
                couple of minutes before the call. Not a template filled in from memory, a read of the
                evidence.
              </p>
            </div>

            <Reveal stagger={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              {BRIEF_PARTS.map((p) => (
                <Card key={p.label} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                    {`// ${p.label}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {p.heading}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">{p.body}</p>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Every claim in the brief is grounded in the source data the system scraped, so reps
                stop walking in with guesses.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* How it works */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE MECHANISM</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How does discovery call research automation work?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  The agent scrapes and structures the same public sources a strategist would gather by
                  hand, then assembles them into one consistent brief for every scheduled call. The rep
                  reads the brief instead of doing the digging, so prep stops depending on how much
                  time anyone had the night before.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Because it runs on every call, the depth of prep no longer rises and falls with the
                  calendar. The prospect booked at the end of a busy week gets the same brief as the one
                  booked on a quiet Monday.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  The same depth of prep on every prospect, not just the ones a rep had time for.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Speed beats depth */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE PRINCIPLE</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Why does prep speed beat prep depth?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Because the agency that prepares fastest wins the room, not the one that prepares most.
                Roughly 39.75 hours per strategist per month go to automatable tasks like manual
                research (SparkToro-cited research). When that research is automatic, thorough prep
                stops being a luxury reserved for the biggest prospects.
              </p>
            </div>

            <Reveal className="mt-12">
              <div className="max-w-md border border-border bg-bg p-6">
                <div className="font-display text-5xl font-semibold text-accent md:text-6xl">
                  <StatCounter value={39.75} suffix=" hrs" />
                </div>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                  per strategist per month lost to automatable tasks such as manual prospect research
                  (SparkToro-cited research).
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Speed of prep beats depth of prep: automate the research and every rep prepares like
                your best one, on every call.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Proof + link up */}
        <section className="border-b border-border bg-bg">
          <Container className="py-16">
            <div className="max-w-3xl">
              <SectionLabel>PROOF</SectionLabel>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                I designed, built and deployed the pre-call brief agent behind this page, and it briefs
                reps before real calls today. The case study covers the bottleneck, the architecture
                and what changed.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/work/pre-call-brief"
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  Read the pre-call brief case
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link
                  href="/agencies"
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3 transition-colors hover:text-accent"
                >
                  Back to agency automation
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
