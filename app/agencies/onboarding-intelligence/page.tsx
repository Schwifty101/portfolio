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

const TITLE = 'Client Onboarding Automation for Agencies'
const DESCRIPTION =
  'Client onboarding automation for agencies: turn the first weeks of every engagement into a repeatable system, so a client never waits on a busy account manager.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/agencies/onboarding-intelligence',
})

const PATH = `${SITE_URL}/agencies/onboarding-intelligence`

const STEPS = [
  {
    label: 'INTAKE',
    heading: 'Structured intake',
    body: 'The information a new client hands over stops living in email threads and shared docs. It arrives through one structured intake, captured once and available to everyone who needs it, so nobody chases the same detail twice.',
  },
  {
    label: 'SETUP',
    heading: 'Account and access setup',
    body: 'The repeatable account setup, access grants and tooling handoffs run from a defined sequence rather than the memory of whichever account manager is free, so the same steps happen in the same order for every new engagement.',
  },
  {
    label: 'HANDOFF',
    heading: 'First-week handoff',
    body: 'The handoff from sales to delivery carries the full context of what was promised, so the strategist who inherits the account is not reconstructing the deal from a call recording and a thread.',
  },
  {
    label: 'RECORD',
    heading: 'One system of record',
    body: 'Everything lands in one system of record instead of inboxes and spreadsheets, the same shift that moved the AR&CO Law platform onto a single source of truth. The status of any onboarding is visible at a glance.',
  },
]

const FAQ = [
  {
    q: 'What is client onboarding automation for an agency?',
    a: 'It is a system that runs the first weeks of every new engagement the same way each time: structured intake, account and access setup, a clean sales-to-delivery handoff and one system of record. Instead of an account manager rebuilding onboarding by hand for each client, the process is defined once and repeats, so quality does not depend on who is free that week.',
  },
  {
    q: 'How does automating onboarding reduce client churn?',
    a: 'A rocky first month sets the tone for the whole engagement, and roughly 49% of PPC delivery contracts churn (Focus Digital), often because early delivery slipped. A consistent, fast onboarding protects the first impression that decides whether a client stays, so retention stops depending on who happened to run the setup.',
  },
  {
    q: 'Does this replace account managers?',
    a: 'No. It removes the repetitive assembly from onboarding so account managers spend the first weeks on the relationship and the strategy, not on chasing intake details and rebuilding a setup checklist from memory. The system does the mechanical part; the person does the part clients actually value.',
  },
  {
    q: 'What proof is there that you can build the underlying system?',
    a: 'The AR&CO Law platform. I moved a firm off inboxes and spreadsheets onto one system of record for intake, case tracking, documents and payments. It is the same shift onboarding intelligence makes for an agency, and it is a named, production build.',
  },
  {
    q: 'Is this a custom build?',
    a: 'Yes. The onboarding system is designed around how your agency actually takes on and sets up a client, then built, deployed and handed over. It is not a generic workflow template with your name on it.',
  },
]

export default function OnboardingIntelligence() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Client onboarding automation',
            description: DESCRIPTION,
            url: PATH,
            serviceType: 'Client onboarding automation',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Agencies', url: `${SITE_URL}/agencies` },
            { name: 'Onboarding Intelligence', url: PATH },
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
                / ONBOARDING INTELLIGENCE
              </SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Client onboarding automation for agencies
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Client onboarding automation turns the first weeks of a new engagement into a system
                that runs the same way every time, instead of an account manager rebuilding intake,
                access and setup by hand for each client. It gives an agency a consistent, faster start
                on every account and stops onboarding quality from depending on who happens to be
                available.
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

        {/* How it works */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE MECHANISM</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How does client onboarding automation work?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                It replaces the ad hoc scramble of a new engagement with a defined sequence that runs
                the same way each time. Four moves turn onboarding from a task someone remembers into a
                system that repeats.
              </p>
            </div>

            <Reveal stagger={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              {STEPS.map((s) => (
                <Card key={s.label} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                    {`// ${s.label}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {s.heading}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">{s.body}</p>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Onboarding done from memory varies with the person; onboarding done from a system runs
                the same for the tenth client as it did for the first.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Why inconsistent onboarding costs clients */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE COST</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Why does inconsistent onboarding cost an agency clients?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Because the first month sets the tone for the whole engagement, and a shaky start is
                hard to recover from. Around 49% of PPC delivery contracts churn (Focus Digital), and a
                lot of that decision is made in the weeks when a client is forming their first
                impression of how the agency runs.
              </p>
            </div>

            <Reveal className="mt-12">
              <div className="max-w-md border border-border bg-surface p-6">
                <div className="font-display text-5xl font-semibold text-accent md:text-6xl">
                  <StatCounter value={49} suffix="%" />
                </div>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                  churn on PPC delivery contracts, much of it decided by the first weeks of the
                  engagement (Focus Digital).
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                With margins already in the low teens, a client lost to a rocky onboarding is a margin
                you never earn back. A consistent start is retention insurance.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Proof + link up */}
        <section className="border-b border-border bg-surface">
          <Container className="py-16">
            <div className="max-w-3xl">
              <SectionLabel>PROOF</SectionLabel>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                The underlying move, taking a business off scattered inboxes and spreadsheets and onto
                one system of record, is exactly what I built for AR&amp;CO Law Associates. Operations
                streamlined, bookkeeping easier, case management improved. It is the named proof that I
                ship production platforms.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/work/arco-law"
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  Read the AR&amp;CO Law case
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
        <section className="border-b border-border bg-bg">
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
