import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { Divider } from '@/components/ui-kodo/Divider'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal } from '@/components/motion'
import { PageCta } from '@/components/site/PageCta'
import {
  JsonLd,
  personSchema,
  breadcrumbSchema,
  pageMetadata,
} from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const TITLE = 'About Soban Ahmad: The AI Automation Engineer Behind KodoAI'
const DESCRIPTION =
  'Soban Ahmad is the AI automation engineer behind KodoAI, designing, building and deploying systems that remove manual ops eating margin for paid-ads agencies.'

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/about' }),
  // The title already carries the full name; override the layout's
  // "%s | Soban Ahmad" template so it is not appended twice.
  title: { absolute: TITLE },
}

const BUILDS = [
  {
    label: 'PRE-CALL BRIEF AGENT',
    heading: 'A research agent that briefs an AE before every discovery call',
    body: 'It gives every rep the same depth of prep on every prospect, grounded in the source data the system scraped, not just the prospects someone had time for.',
  },
  {
    label: 'AD-OPS AGENT',
    heading: 'A monitoring and pacing agent that runs ad operations',
    body: 'It paces budgets, holds naming and QA in place, and flags CPA drift before a client feels it, so a team holds more accounts without another salary.',
  },
  {
    label: 'AI VOICE RECEPTIONIST',
    heading: 'A voice agent that answers the calls a business misses',
    body: 'It picks up after hours and when the front desk is busy, captures the enquiry, and keeps a missed call from quietly becoming a lost customer.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'About', url: `${SITE_URL}/about` },
          ]),
        ]}
      />

      <main>
        {/* ---------------------------------------------------------------- */}
        {/* Hero: problem framing + self-contained entity answer             */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>ABOUT</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Manual work is a competitive liability, not a cost of doing business.
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                I am Soban Ahmad, the engineer behind KodoAI. I design, build and deploy the AI
                automation systems that take repetitive ops off an agency&apos;s P&amp;L, so paid-ads
                teams add clients without adding salaries. Every system is built to fit an existing
                workflow and deployed into production, not left as a prototype.
              </p>
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Problem + Agitate: the margin / headcount trap in P&L language   */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE MARGIN TRAP</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                You cannot hire your way past a margin ceiling.
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  When an agency grows, the manual work grows with it: budgets paced by hand,
                  naming and QA held together in spreadsheets, the same kickoff rebuilt for every new
                  client. None of it appears as a line item, yet it sets a hard limit on how many
                  accounts your team can hold.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  So the reflex is to hire. The trouble is that every strategist you bring on to fix
                  an ops problem shrinks the margin you hired them to grow. You buy capacity in whole
                  salaries and spend most of it on work nobody wanted to do by hand. The ceiling does
                  not move, it just costs more to sit under.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  The bottleneck is not talent. It is the manual work sitting between your team and
                  the billable hours you are paying for.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Solution: the systems Soban designs, builds, deploys             */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT I BUILD</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Systems I design, build and deploy.
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                Not advice, and not a dashboard you have to run yourself. Working software that does
                the repetitive work in production. Most of it runs inside agencies that would rather
                I did not name them: I do not, the people running it treat it as an edge.
              </p>
            </div>

            <Reveal stagger={0.12} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {BUILDS.map((build) => (
                <Card key={build.label} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                    {`// ${build.label}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {build.heading}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
                    {build.body}
                  </p>
                </Card>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* The person: the human moat and the entity behind the schema      */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE PERSON</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Soban Ahmad, an engineer who ships.
              </KineticHeadline>
            </div>

            <Reveal className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:gap-14">
              <div className="border border-border">
                <Image
                  src="/myPhoto2.jpeg"
                  alt="Soban Ahmad, AI automation engineer and founder of KodoAI"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  I am an engineer who designs, builds and deploys the systems, not just specs them.
                  The work travels because the systems do, running in production long after a call
                  ends.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  My first paid client, in January 2026, was a law practice platform for AR&amp;CO,
                  a roughly 7,000 USD build won on a referral. It was scoped for six weeks and ran
                  about four months as the client side sorted itself out. Operations were
                  streamlined, bookkeeping got easier, and case management improved. The delay taught
                  me as much as the code did: how a build survives contact with a real business.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  I am the person, not a machine, and on this offer that matters. The whole promise is
                  that I automate the boring 90% so your team keeps the 10% that wins. You should
                  know who is doing the automating.
                </p>
              </div>
            </Reveal>

            <Divider className="mt-16" />

            <Reveal className="mt-10 max-w-3xl">
              <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Three systems designed, built and deployed. A first platform build won by referral.
                An engineering education and a habit of shipping. I would rather show you what a
                system does than tell you what it guarantees, so here is the offer:
              </p>
              <p className="mt-6 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-accent md:text-3xl">
                I will show you where automation can remove a bottleneck before you invest a dollar.
              </p>
              <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
                {'// '}
                <Link href="/work" className="text-accent transition-colors hover:text-ink">
                  See the systems
                </Link>
              </p>
            </Reveal>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
