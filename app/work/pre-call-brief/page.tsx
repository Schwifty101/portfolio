import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { Divider } from '@/components/ui-kodo/Divider'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal, PinnedSequence } from '@/components/motion'
import { PageCta } from '@/components/site/PageCta'
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  pageMetadata,
} from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Pre-Call Brief Agent for Sales Teams'
const DESCRIPTION =
  'A research agent I designed, built and deployed for a B2B sales team: given a prospect URL, it returns a grounded brief so reps stop walking in with guesses.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/work/pre-call-brief',
})

const PATH = `${SITE_URL}/work/pre-call-brief`

const STACK = [
  'Python 3.12',
  'FastAPI',
  'Celery',
  'Redis',
  'Playwright',
  'Google Gemini',
  'Meta Ad Library',
  'PageSpeed Insights',
  'WeasyPrint',
  'Resend',
  'Supabase',
  'Next.js 14',
]

const WHAT_WAS_BUILT = [
  {
    label: 'INTAKE',
    heading: 'One URL in',
    body: 'A rep pastes a prospect URL, or a CRM webhook fires it, and a background job is enqueued through Redis. Nothing else is asked of the rep. The prospect address is the whole input.',
  },
  {
    label: 'COLLECTION',
    heading: 'Parallel data gathering',
    body: 'Seven tasks run at once: Playwright scrapes the website and LinkedIn, the Meta Ad Library and PageSpeed Insights are queried, and the tech stack is fingerprinted. The raw material is real, retrieved data, not the model guessing.',
  },
  {
    label: 'BRIEF',
    heading: 'A structured brief out',
    body: 'The synthesis step writes the brief a rep actually opens: talking points, pricing anchors and red flags. It is rendered to a branded PDF with WeasyPrint, stored in Supabase and emailed through Resend, ready before the call starts.',
  },
]

const ARCHITECTURE_STEPS = [
  {
    label: 'PARALLEL COLLECTION',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Parallel collection
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          Seven independent tasks run concurrently with asyncio, each pulling from a different source:
          the site, LinkedIn, the Meta Ad Library, PageSpeed and a tech-stack scan. The pipeline waits
          on the slowest source, not the sum of all of them, so a brief is ready quickly instead of
          after a queue of sequential requests.
        </p>
      </div>
    ),
  },
  {
    label: 'GROUNDED EXTRACTION',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Grounded extraction
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          The raw, unstructured material is handed to Google Gemini, which extracts a structured company
          profile and reads their marketing posture. The model works only from what the system actually
          retrieved, so every line in the brief traces back to a source the pipeline pulled, not to the
          model filling in a blank.
        </p>
      </div>
    ),
  },
  {
    label: 'SYNTHESIS AND DELIVERY',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Synthesis and delivery
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          A second Gemini pass writes the finished brief, openers, pricing anchors and red flags, in the
          voice a rep can read at a glance. WeasyPrint renders it to a branded PDF, Supabase stores it
          and Resend emails it, so the deliverable lands in an inbox rather than a dashboard nobody
          checks.
        </p>
      </div>
    ),
  },
  {
    label: 'GRACEFUL DEGRADATION',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Graceful degradation
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          The collection tasks run through asyncio.gather with return_exceptions set, so if LinkedIn
          blocks a scrape the pipeline carries on and names the gap in the brief. A rep sees what could
          not be found rather than a confident sentence built on nothing.
        </p>
      </div>
    ),
  },
]

const OUTCOMES = [
  'Every claim in the brief is grounded in the source data the system scraped, so reps stop walking in with guesses and start the call already knowing the account.',
  'The same depth of prep on every prospect, not just the ones a rep had time for. The research that used to get skipped under a full calendar now happens on all of them.',
  'Prep that used to sit between a rep and their selling hours is returned to the work they are actually paid for, without adding a head to the team to do it.',
]

export default function PreCallBriefCase() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'A research agent that briefs a rep before every call',
            description: DESCRIPTION,
            url: PATH,
            datePublished: '2026-03-04',
            dateModified: '2026-07-22',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Work', url: `${SITE_URL}/work` },
            { name: 'Pre-Call Brief Agent', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: situation before + self-contained answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>CASE STUDY / PRE-CALL BRIEF</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                A research agent that briefs a rep before every call
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Reps were meant to research every prospect before a discovery call, and under a full
                calendar most of that research quietly got skipped. I designed, built and deployed an
                agent that takes a prospect URL, gathers real data from several sources at once and
                returns a grounded brief before the call. This build runs inside a team I do not name,
                the people running it treat it as an edge.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['2026', 'B2B sales', 'Pre-sales research agent', 'Agent build'].map((m) => (
                  <span
                    key={m}
                    className="border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* The manual bottleneck */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE BOTTLENECK</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What was the manual bottleneck?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Before an inbound call, a rep was expected to work through the prospect: the website,
                  the LinkedIn profile, the ads they were running, the way they positioned themselves.
                  Done properly it takes a good part of an hour per prospect, and the calendar rarely
                  allows it. So it slips. The rep walks into the call with a name and a guess.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  The work is not hard, it is repetitive and it sits at exactly the moment a rep has no
                  spare minutes. The prospects who got real preparation were the ones who happened to
                  land on a quiet afternoon, not the ones who mattered most.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  They needed the research to happen on every prospect without a person having to find
                  the time for it.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* What was built */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT WAS BUILT</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                A URL in, a grounded brief out
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                An asynchronous pipeline on Python, FastAPI and Celery that turns a single prospect
                address into a finished brief in a rep&apos;s inbox. Three moves carry it.
              </p>
            </div>

            <Reveal stagger={0.12} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {WHAT_WAS_BUILT.map((p) => (
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
          </Container>
        </section>

        {/* The architecture */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE ARCHITECTURE</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How does the agent stay grounded?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                The reliability of a brief is an architecture problem, not a prompt trick. Four
                decisions keep the output tied to real data and standing up when a source refuses to
                answer.
              </p>
            </div>

            <PinnedSequence
              steps={ARCHITECTURE_STEPS}
              className="mt-16 border border-border bg-bg px-6 py-12 md:px-12"
            />

            <Reveal className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                {'// STACK'}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* What changed */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT CHANGED</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What changed for the team?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                In plain operational terms, three things moved. I am describing what the agent does in
                production, not putting a number on it.
              </p>
            </div>

            <Reveal stagger={0.12} className="mt-12 space-y-4">
              {OUTCOMES.map((o) => (
                <div key={o} className="flex items-start gap-4 border border-border bg-surface p-6">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-accent">
                    +
                  </span>
                  <p className="font-sans text-[16px] leading-relaxed text-ink-2 md:text-[17px]">{o}</p>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* First-hand experience */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE HONEST VERSION</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What I learned building it
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  In this build the hard part was never the writing, it was the scraping. Sources rate
                  limit you, LinkedIn blocks you, a page you relied on last week changes its markup. My
                  first instinct was to make the pipeline try harder. That was wrong. A brief that
                  stalls waiting for a source it will never get is worse than a brief that ships with an
                  honest gap in it.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  So I built the whole thing to degrade on purpose. Every collection task can fail
                  without taking the brief down with it, and the failure is written into the output
                  where a rep can see it. The model is never allowed to paper over a missing source with
                  a plausible sentence.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  That is the line the whole system is built around: a brief a rep can trust is one that
                  admits what it does not know.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Close: link up to the matching offer + CTA */}
        <section className="border-b border-border bg-bg">
          <Container className="py-16">
            <Divider className="mb-10" />
            <p className="max-w-2xl font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
              This is the research agent behind the pre-sales work I build for agencies and sales teams:
              the same depth of prep on every prospect, grounded in real data, without a person having to
              find the hour.
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
              {'// '}
              <Link
                href="/agencies/pre-sales-research-automation"
                className="text-accent transition-colors hover:text-ink"
              >
                See how pre-sales research automation works
              </Link>
            </p>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
