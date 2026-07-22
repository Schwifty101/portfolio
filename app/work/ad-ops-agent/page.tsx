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

const TITLE = 'Ad Operations Agent: research to launch'
const DESCRIPTION =
  'A research-to-launch agent I built for a paid-ads agency: it drafts policy-safe Google Ads campaigns from competitive data, with a human on the publish button.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/work/ad-ops-agent',
})

const PATH = `${SITE_URL}/work/ad-ops-agent`

const STACK = [
  'LangChain',
  'Python',
  'Node.js',
  'Next.js',
  'Google Ads API',
  'SerpApi',
  'Google Gemini',
  'Satori',
  'Resvg',
  'Supabase',
  'PostgreSQL',
]

const WHAT_WAS_BUILT = [
  {
    label: 'RESEARCH',
    heading: 'Competitive analysis',
    body: 'It scrapes the competitor ads running in a niche through SerpApi, ranks the angles by how long each has stayed live, and reads that longevity as a signal of what is working and where the gaps are. The strategy starts from evidence, not a blank prompt.',
  },
  {
    label: 'COPY',
    heading: 'Variant generation',
    body: 'It writes gap-first responsive search ad headlines and descriptions that map back to the research, padded deterministically to sit inside the character limits Google enforces. The angles it reaches for are the ones the market left open.',
  },
  {
    label: 'CREATIVE',
    heading: 'Display generation',
    body: 'Display ads are built from structured render specs into the standard sizes, with Satori and Resvg drawing the layout. The model never writes layout HTML or CSS, so the creative stays consistent instead of drifting with every generation.',
  },
]

const ARCHITECTURE_STEPS = [
  {
    label: 'DETERMINISTIC BUDGETING',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Deterministic budgeting
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          The model never sets or changes a budget. Budget values flow from the client profile through
          deterministic code and are hard-capped at every layer they pass through. The creative part of
          the system and the money part of the system are kept deliberately separate.
        </p>
      </div>
    ),
  },
  {
    label: 'TWO-LAYER QUALITY GATE',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Two-layer quality gate
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          Every draft passes two checks before a human ever sees it. A deterministic policy scan catches
          banned superlatives and prohibited terms, then a model rubric critiques clarity, call to
          action and differentiation. Copy that trips the policy scan is stopped by rule, not by
          judgement.
        </p>
      </div>
    ),
  },
  {
    label: 'CAMPAIGN ASSEMBLY',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Campaign assembly
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          Ad groups, keyword distributions and bid strategies are assembled from the research
          automatically, so the structure a strategist would build by hand arrives already drafted. It
          is a starting point a human edits, not a black box that decides on its own.
        </p>
      </div>
    ),
  },
  {
    label: 'EXPLICIT HUMAN LAUNCH',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Explicit human launch
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          The agent never publishes on its own. Every campaign reaches a review screen and waits for a
          person to approve it before anything touches a live account. The human keeps the publish
          button, which is the point: the account owner stays accountable for what runs.
        </p>
      </div>
    ),
  },
]

const OUTCOMES = [
  'The repetitive front half of ad operations, the research, the drafting, the creative production, is done by the time a strategist opens the account, so their time goes to judgement instead of assembly.',
  'A team can hold more accounts without another salary. Capacity stops being capped by how many campaigns a person can build by hand in a week.',
  'Every campaign a strategist reviews is already grounded in competitive data and already through the policy gate, so the work they sign off on starts from a defensible place.',
]

export default function AdOpsAgentCase() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'A research-to-launch agent that runs ad operations',
            description: DESCRIPTION,
            url: PATH,
            datePublished: '2026-04-08',
            dateModified: '2026-07-22',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Work', url: `${SITE_URL}/work` },
            { name: 'Ad Operations Agent', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: situation before + self-contained answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>CASE STUDY / AD OPERATIONS</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                A research-to-launch agent that runs ad operations
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Setting up a new Google Ads client is hours of repetitive work before a single ad serves:
                competitor research, copy, display creative, campaign assembly, policy review. I
                designed, built and deployed an agent that does the front half of that, grounded in the
                competitive landscape, and keeps a human on the publish button. This build runs inside an
                agency I do not name, the people running it treat it as an edge.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['2026', 'Paid-ads agency', 'Ad operations agent', 'Agent build'].map((m) => (
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
                  For every new client campaign, an account manager works through competitive research,
                  ad copywriting, display creative production, campaign assembly and policy review. None
                  of it is the strategy the client is paying for. It is the setup that has to happen
                  before the strategy can run.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  That labour sets the ceiling on the whole agency. Take on more clients and you either
                  hire, which shrinks the margin, or you lean on junior staff who make the policy
                  mistakes that get accounts suspended, or you cut the research and ship generic ads. The
                  bottleneck is not talent, it is the hours the setup eats.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  They needed the setup to stop being the thing that caps how many accounts a strategist
                  can carry.
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
                Research, copy and creative, drafted
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                A LangChain service and a Next.js dashboard over a Supabase Postgres database that
                automate the front half of Google Ads work while a human keeps strategy, budgets and the
                publish button. Three moves make up the draft.
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
                How is it kept safe to run?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                An agent touching live ad accounts has to be safe by construction, not by hope. Four
                decisions draw a hard line between what the model drafts and what actually goes live.
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
                What changed for the agency?
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
                  The temptation with an ad agent is to let the model do more: set the budgets, pick the
                  bid strategy, push the campaign live when it is confident. Every one of those is a place
                  where a wrong call costs the client real money or gets an account suspended. So I did
                  the opposite. The model drafts, and everything with consequences is either
                  deterministic code or a human decision.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Budgets never pass through the model. Policy is a rule-based scan, not a judgement
                  call. Publishing is a person clicking a button. That is not the model being weak, it is
                  the system being honest about where a machine belongs and where it does not.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  An agent that touches live accounts earns trust by doing less than it could, in the
                  places that matter.
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
              This is the agent behind the ad-operations work I build for agencies: the repetitive setup
              drafted from real competitive data, the risky decisions kept deterministic or human, so a
              team can hold more accounts without another salary.
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
              {'// '}
              <Link
                href="/agencies/ad-operations-automation"
                className="text-accent transition-colors hover:text-ink"
              >
                See how ad operations automation works
              </Link>
            </p>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
