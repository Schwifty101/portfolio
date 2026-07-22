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

const TITLE = 'Ad Operations Automation for Agencies'
const DESCRIPTION =
  'Ad operations automation for agencies: an AI agent drafts research, campaigns and creative while a human keeps budgets and the publish button.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/agencies/ad-operations-automation',
})

const PATH = `${SITE_URL}/agencies/ad-operations-automation`

const STEPS = [
  {
    label: 'RESEARCH',
    heading: 'Competitive research',
    body: 'The agent scrapes the ads running in a niche, ranks the angles by how long each has stayed live, and reads that longevity as a signal of what is working. Strategy starts from evidence, not a blank prompt.',
  },
  {
    label: 'DRAFTING',
    heading: 'Campaign drafting',
    body: 'Responsive search ad copy, ad groups, keyword distributions and bid strategies are assembled from the research automatically, padded to sit inside the character limits Google enforces. A strategist edits a draft, not a blank account.',
  },
  {
    label: 'CREATIVE',
    heading: 'Display creative',
    body: 'Display ads are rendered from structured specs into the standard sizes, so the model never writes layout code and the creative stays consistent instead of drifting with every generation.',
  },
  {
    label: 'POLICY',
    heading: 'Policy checks',
    body: 'Every draft passes a deterministic policy scan for banned superlatives and prohibited terms before a human sees it, so the copy a strategist signs off on starts from a defensible place.',
  },
]

const FAQ = [
  {
    q: 'How does an AI agent automate ad operations?',
    a: 'It does the repetitive setup a strategist would otherwise do by hand: scraping competitor ads for angles, drafting responsive search copy and ad groups, rendering display creative from structured specs, and running a policy scan. Each account arrives already drafted and already checked, so the strategist starts from a reviewable draft rather than a blank campaign.',
  },
  {
    q: 'Will the agent change budgets or publish campaigns on its own?',
    a: 'No. Budgets never pass through the model; they flow through deterministic code and are hard-capped at every layer. Publishing is always a person clicking a button on a review screen. The agent drafts and researches, and every decision with financial consequences stays deterministic or human.',
  },
  {
    q: 'Does automating ad ops mean lower-quality campaigns?',
    a: 'The opposite is the aim. Around 71% of ad-ops teams say manual work puts campaigns at risk (Fluency), because tired hands cut corners on research and QA. An agent applies the same competitive research and the same policy gate to every account, so the floor on quality rises even as volume does.',
  },
  {
    q: 'How much strategist time does this actually free up?',
    a: 'Roughly 39.75 hours per strategist per month go to automatable tasks (SparkToro-cited research). Framed in P&L terms, that is capacity a senior strategist can return to billable strategy and to carrying more accounts, rather than a headline about hours saved.',
  },
  {
    q: 'Is this a template or a custom build?',
    a: 'A custom build. The agent is designed, built and deployed against how your agency runs, then handed over. It is production software, already running inside a paid-ads agency, not a demo. The ad operations agent case study is the proof.',
  },
]

export default function AdOpsAutomation() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'AI ad operations automation',
            description: DESCRIPTION,
            url: PATH,
            serviceType: 'AI ad operations automation',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Agencies', url: `${SITE_URL}/agencies` },
            { name: 'Ad Operations Automation', url: PATH },
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
                / AD OPERATIONS AUTOMATION
              </SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Ad operations automation for agencies
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Ad operations automation uses an AI agent to do the repetitive setup behind every
                paid-ads account, the competitive research, the campaign drafting, the creative
                production and the policy checks, while a person keeps strategy, budgets and the
                publish button. It lets a team run more accounts at the same headcount, because
                capacity stops being capped by manual assembly.
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
                How does an AI agent automate ad operations?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                It does the front half of the work in four moves, each grounded in real competitive
                data. Around 71% of ad-ops teams say manual work puts campaigns at risk (Fluency),
                usually because tired hands cut corners on exactly this setup. The agent does not get
                tired and does not skip a step.
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
                The agent drafts the account; the strategist judges it. That split is the whole point:
                machines do assembly, people do the decisions that carry consequences.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Is it safe */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>SAFETY BY CONSTRUCTION</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Is it safe to let an agent touch a live account?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Yes, because the risky decisions never reach the model. Budget values flow from the
                  client profile through deterministic code and are hard-capped at every layer they
                  pass through. The creative part of the system and the money part of the system are
                  kept deliberately separate.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Policy is a rule-based scan, not a judgement call, and publishing is a person on a
                  review screen. Nothing touches a live account until someone approves it, so the
                  account owner stays accountable for what runs.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  An agent that touches live accounts earns trust by doing less than it could, in the
                  places where a wrong call costs the client money.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Capacity and margin */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE P&amp;L CASE</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What does this do to capacity and margin?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                It raises the number of accounts one strategist can hold without another salary
                attached. Around 87% of agencies still pace budgets by hand (ppc.land), and roughly
                39.75 hours per strategist per month go to automatable tasks (SparkToro-cited
                research). That is billable capacity, not a time-saving headline.
              </p>
            </div>

            <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border border-border bg-bg p-6">
                <div className="font-display text-5xl font-semibold text-accent md:text-6xl">
                  <StatCounter value={87} suffix="%" />
                </div>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                  of agencies pace budgets by hand, the load an agent removes first (ppc.land).
                </p>
              </div>
              <div className="border border-border bg-bg p-6">
                <div className="font-display text-5xl font-semibold text-accent md:text-6xl">
                  <StatCounter value={39.75} suffix=" hrs" />
                </div>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                  per strategist per month lost to automatable tasks (SparkToro-cited research).
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Capacity you buy by hiring shrinks the margin; capacity you build with a system
                protects it.
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
                This is not theory. I designed, built and deployed the ad operations agent behind this
                page, and it runs inside a paid-ads agency today. The case study covers the bottleneck,
                the architecture and what changed.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/work/ad-ops-agent"
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  Read the ad operations agent case
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
