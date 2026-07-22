import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { Btn } from '@/components/ui-kodo/Btn'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { Divider } from '@/components/ui-kodo/Divider'
import {
  CursorField,
  KineticHeadline,
  Reveal,
  StatCounter,
  StrikeSwap,
  Marquee,
  PinnedSequence,
} from '@/components/motion'
import { TAGLINE } from '@/lib/site'

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <CursorField className="opacity-70" />
      <Container className="relative py-24 md:py-32">
        <div className="max-w-4xl">
          <SectionLabel>AI AUTOMATION SYSTEMS</SectionLabel>
          <KineticHeadline
            as="h1"
            className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your agency&apos;s growth ceiling is not sales. It is the manual work behind every account.
          </KineticHeadline>
          <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
            I build the AI systems that remove the manual ops eating your margin, so you grow
            without hiring.
          </p>
          <div className="mt-10">
            <Btn href="/contact" variant="primary">
              Book a 15-minute call
            </Btn>
          </div>

          <div className="mt-16">
            <Divider />
            <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <dt className="font-display text-3xl font-semibold text-accent md:text-4xl">
                  <StatCounter value={3} />
                </dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-ink-3">
                  production systems designed, built and deployed
                </dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-semibold text-accent md:text-4xl">
                  ~7,000 USD
                </dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-ink-3">
                  first paid build, a client platform won by referral
                </dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-semibold uppercase text-ink md:text-4xl">
                  Rawalpindi
                </dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-ink-3">
                  building for US agencies an ocean away
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Pain, named                                                                 */
/* -------------------------------------------------------------------------- */

const PAINS = [
  {
    stat: <StatCounter value={87} suffix="%" />,
    heading: 'Budgets paced by hand',
    body: '87% of agencies still pace budgets manually. Naming conventions and QA live in scattered spreadsheets and scripts, too many places for anyone to manage without something slipping.',
    source: 'ppc.land, 2026',
  },
  {
    stat: <StatCounter value={71} suffix="%" />,
    heading: 'CPA drift caught too late',
    body: '71% of ad-ops teams say manual processes actively put client campaigns at risk. Senior strategists hired to grow the business do not have time to catch CPA spikes, because they are stuck jumping between tabs.',
    source: 'ppc.land / Fluency, 2026',
  },
  {
    stat: null,
    heading: 'Onboarding rebuilt every time',
    body: "Every new client restarts the same manual kickoff: prep redone by hand, docs scattered, client strategy inconsistent from one account to the next. The knowledge lives in a strategist's head, not in a system.",
    source: 'KodoAI ICP research, 2026',
  },
]

export function PainSection() {
  return (
    <section className="border-b border-border bg-bg">
      <Container className="py-24">
        <div className="max-w-3xl">
          <SectionLabel>THE PAIN, NAMED</SectionLabel>
          <KineticHeadline
            as="h2"
            className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
          >
            You did not hire strategists to babysit spreadsheets.
          </KineticHeadline>
          <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
            Three costs that never show up as a line item, but quietly set the ceiling on how many
            clients your team can hold.
          </p>
        </div>

        <Reveal stagger={0.12} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PAINS.map((pain) => (
            <Card key={pain.heading} className="flex flex-col">
              {pain.stat && (
                <span className="font-display text-5xl font-semibold text-accent">
                  {pain.stat}
                </span>
              )}
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                {pain.heading}
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                {pain.body}
              </p>
              <span className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                {`// ${pain.source}`}
              </span>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Mechanism (scrollytelling)                                                  */
/* -------------------------------------------------------------------------- */

function SpearStep({
  title,
  body,
  href,
  cta,
}: {
  title: string
  body: string
  href: string
  cta: string
}) {
  return (
    <div className="max-w-3xl">
      <h3 className="font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl">
        {title}
      </h3>
      <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">{body}</p>
      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
      >
        {cta}
        <span aria-hidden>&rarr;</span>
      </Link>
    </div>
  )
}

const MECHANISM_STEPS = [
  {
    label: 'THE WORLDVIEW',
    body: (
      <div className="max-w-3xl">
        <p className="font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl">
          Manual work is{' '}
          <StrikeSwap struck="an inconvenience" replacement="a competitive liability" />.
        </p>
        <p className="mt-8 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
          The move is simple, and it decides who scales and who plateaus: if a task is manual and
          measurable, it can be automated. Everything below is that one belief, applied.
        </p>
        <div className="mt-8 border-y border-border py-4">
          <Marquee speed={28}>
            <span className="whitespace-nowrap px-8 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
              {TAGLINE}
            </span>
            <span className="whitespace-nowrap px-8 font-mono text-[13px] uppercase tracking-[0.15em] text-accent-dim">
              {TAGLINE}
            </span>
          </Marquee>
        </div>
      </div>
    ),
  },
  {
    label: 'SPEAR 01 / AD OPERATIONS',
    body: (
      <SpearStep
        title="Scale the system, not the headcount."
        body="Every strategist you hire to fix an ops problem shrinks the margin you hired them to grow. An ad-operations agent paces budgets, enforces naming and QA, and flags CPA drift before a client feels it, so the team holds more accounts without another salary."
        href="/agencies/ad-operations-automation"
        cta="Ad operations automation"
      />
    ),
  },
  {
    label: 'SPEAR 02 / PRE-SALES RESEARCH',
    body: (
      <SpearStep
        title="Speed of prep beats depth of prep."
        body="The agency that prepares fastest wins, not the one that prepares most. A pre-call research agent gives every AE the same depth of prep on every prospect, grounded in the source data the system scraped, not just the prospects a rep had time for."
        href="/agencies/pre-sales-research-automation"
        cta="Pre-sales research automation"
      />
    ),
  },
  {
    label: 'SPEAR 03 / ONBOARDING INTELLIGENCE',
    body: (
      <SpearStep
        title="A new client should not restart the same manual work."
        body="AI removes the work people never wanted. Onboarding intelligence turns scattered kickoff docs and tribal knowledge into one repeatable system, so client strategy is consistent from the first account to the fiftieth."
        href="/agencies/onboarding-intelligence"
        cta="Onboarding intelligence"
      />
    ),
  },
]

export function MechanismSection() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-24">
        <div className="max-w-3xl">
          <SectionLabel>THE MECHANISM</SectionLabel>
          <h2 className="sr-only">How the automation works</h2>
        </div>
        <PinnedSequence steps={MECHANISM_STEPS} className="mt-8" />
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Proof                                                                       */
/* -------------------------------------------------------------------------- */

export function ProofSection() {
  return (
    <section className="border-b border-border bg-bg">
      <Container className="py-24">
        <div className="max-w-3xl">
          <SectionLabel>PROOF</SectionLabel>
          <KineticHeadline
            as="h2"
            className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
          >
            Systems designed, built and deployed.
          </KineticHeadline>
        </div>

        <Reveal stagger={0.12} className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card featured className="flex flex-col lg:col-span-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
              {`// AR&CO LAW / FLAGSHIP`}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
              A law practice platform, won by referral
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
              My first paid client, a ~7,000 USD build won on a referral. Operations were
              streamlined, bookkeeping got easier, and case management improved. Scoped for six
              weeks, it ran about four months as the client side sorted itself out.
            </p>
            <Link
              href="/work/arco-law"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
            >
              Read the case
              <span aria-hidden>&rarr;</span>
            </Link>
          </Card>

          <Card className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
              {`// AD-OPS AGENT`}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
              An agent that runs ad operations
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
              A monitoring and pacing agent built for a paid-ads team. I do not name them, the
              people running it treat it as an edge.
            </p>
            <Link
              href="/work/ad-ops-agent"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
            >
              Read the build
              <span aria-hidden>&rarr;</span>
            </Link>
          </Card>

          <Card className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
              {`// PRE-CALL BRIEF AGENT`}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
              A pre-call brief on every prospect
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
              A research agent that briefs an AE before every discovery call. I do not name them,
              the people running it treat it as an edge.
            </p>
            <Link
              href="/work/pre-call-brief"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
            >
              Read the build
              <span aria-hidden>&rarr;</span>
            </Link>
          </Card>
        </Reveal>
      </Container>
    </section>
  )
}
