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

const TITLE = 'Scale a Paid-Ads Agency Without Hiring'
const DESCRIPTION =
  'AI automation for paid-ads agencies that want to scale without hiring. I design, build and deploy systems for ad operations, pre-sales research and client onboarding.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/agencies',
})

const PATH = `${SITE_URL}/agencies`

const OFFERS = [
  {
    href: '/agencies/ad-operations-automation',
    label: 'AD OPERATIONS',
    heading: 'Ad operations automation',
    body: 'An agent does the repetitive front half of ad operations, the competitive research, the drafting, the creative production, and keeps a human on the publish button. Your strategists spend their hours on judgement, not assembly.',
  },
  {
    href: '/agencies/pre-sales-research-automation',
    label: 'PRE-SALES RESEARCH',
    heading: 'Pre-sales research automation',
    body: 'Every rep walks into a discovery call with the same depth of prep, a pre-call brief grounded in the source data the system scraped, not just the prospects someone had time to research the night before.',
  },
  {
    href: '/agencies/onboarding-intelligence',
    label: 'ONBOARDING INTELLIGENCE',
    heading: 'Client onboarding automation',
    body: 'The intake, the account setup and the first-week handoffs stop being rebuilt by hand for every new client. Onboarding becomes a system that runs the same way each time, so a client never waits on a busy account manager.',
  },
]

const PROOF = [
  {
    href: '/work/ad-ops-agent',
    meta: 'AGENT BUILD / PAID-ADS AGENCY',
    heading: 'The ad operations agent',
    body: 'A research-to-launch agent that scrapes the competitive landscape, drafts policy-safe campaigns from that data, and lets a team hold more accounts without another salary.',
  },
  {
    href: '/work/pre-call-brief',
    meta: 'AGENT BUILD / B2B SALES',
    heading: 'The pre-call brief agent',
    body: 'A research agent that briefs an AE before every call, giving every prospect the same depth of prep instead of only the ones a rep had time for.',
  },
  {
    href: '/work/arco-law',
    meta: 'FLAGSHIP / LEGAL PLATFORM',
    heading: 'The AR&CO Law platform',
    body: 'My first paid client, a referral build that moved a firm off inboxes and spreadsheets onto one system of record. Proof I ship production platforms, not demos.',
  },
]

const FAQ = [
  {
    q: 'What does AI automation for a paid-ads agency actually do?',
    a: 'It removes the manual, repetitive work that sits between a strategist and the work clients pay for: budget pacing, campaign setup, competitive research, prospect prep and client onboarding. The strategist keeps judgement and the client relationship; the system does the assembly. The result is more billable capacity at the same headcount.',
  },
  {
    q: 'How can an agency scale without hiring more strategists?',
    a: 'By raising the number of accounts one strategist can carry, rather than adding salaries. Around 87% of agencies still pace budgets by hand (ppc.land), and that manual load is what caps capacity. Automate the load and capacity rises without the margin hit that each new hire brings.',
  },
  {
    q: 'Will an AI system make risky changes to a live ad account?',
    a: 'No. In the systems I build, the model drafts and researches; the decisions with consequences stay deterministic or human. Budgets flow through hard-capped code, policy is a rule-based scan, and publishing is a person clicking a button. The agent earns trust by doing less than it could where money is at stake.',
  },
  {
    q: 'Do you build custom systems or resell a platform?',
    a: 'Custom. I design, build and deploy the system against how your agency actually works, then hand it over. These are production builds running inside real agencies, not a template with your logo on it. The AR&CO Law platform is the named proof that I ship production software.',
  },
  {
    q: 'How do we start?',
    a: 'A 15-minute call. I look at where the manual work is heaviest in your agency, name the bottleneck that would pay back first, and tell you whether automation is the right move before you commit to a build. No slides, no pitch.',
  },
]

export default function AgenciesHub() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'AI automation for marketing agencies',
            description: DESCRIPTION,
            url: PATH,
            serviceType: 'AI automation for marketing agencies',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Agencies', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: buyer outcome + self-contained 40-60 word answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>AI AUTOMATION FOR PAID-ADS AGENCIES</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Scale your agency without hiring
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                A paid-ads agency scales without hiring by automating the manual work that caps each
                strategist&apos;s capacity, not by adding salaries. I design, build and deploy AI
                systems that handle ad operations, pre-sales research and client onboarding, so a team
                carries more accounts at the same headcount and protects the margin that every new
                hire erodes.
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

        {/* Why scaling by hiring breaks the margin */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE MARGIN TRAP</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How can an agency scale without hiring more strategists?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  By raising how many accounts one strategist can carry, instead of adding a salary
                  every time volume grows. The ceiling is not talent, it is the manual work stacked in
                  front of the work clients pay for. Around 87% of agencies still pace budgets by hand
                  (ppc.land), and that load is exactly what caps capacity.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Agency net margins already sit in the low teens. Each strategist hired to fix an ops
                  problem shrinks the very margin they were hired to grow, so growth by headcount is a
                  treadmill. Automating the manual load breaks that link: capacity rises without a new
                  salary attached to it.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  Every strategist you hire to fix an ops problem shrinks the margin you hired them to
                  grow. Automation is how you raise capacity without paying that tax.
                </p>
              </Reveal>

              <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-border bg-bg p-6">
                  <div className="font-display text-5xl font-semibold text-accent md:text-6xl">
                    <StatCounter value={87} suffix="%" />
                  </div>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                    of agencies pace budgets by hand, the manual load that caps capacity (ppc.land).
                  </p>
                </div>
                <div className="border border-border bg-bg p-6">
                  <div className="font-display text-5xl font-semibold text-accent md:text-6xl">
                    <StatCounter value={49} suffix="%" />
                  </div>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                    churn on PPC delivery contracts, often a monitoring failure, not a talent one
                    (Focus Digital).
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* The three offers (links down) */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT I BUILD</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What can an automation engineer build for an agency?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Three systems, each aimed at a different place the manual work stacks up. Roughly 39.75
                hours per strategist per month go to automatable tasks (SparkToro-cited research), and
                these are where most of those hours hide.
              </p>
            </div>

            <Reveal stagger={0.12} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {OFFERS.map((o) => (
                <Card key={o.href} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                    {`// ${o.label}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {o.heading}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {o.body}
                  </p>
                  <Link
                    href={o.href}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                  >
                    See how it works
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Pick the bottleneck that is costing you the most, not the shiniest feature. The right
                first build is the one that pays back fastest.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Proof (links across to cases) */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>PROOF</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Has this actually run in production?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Yes. These are systems designed, built and deployed, running inside real agencies and a
                named legal platform, not slideware. Each case covers the situation before, the
                bottleneck, what was built and what changed.
              </p>
            </div>

            <Reveal stagger={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PROOF.map((p) => (
                <Card key={p.href} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                    {`// ${p.meta}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {p.heading}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {p.body}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                  >
                    Read the case
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                First-hand experience is the moat: I have hit the failure modes these systems avoid,
                because I built and deployed them.
              </p>
            </Reveal>
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
