import type { Metadata } from 'next'
import Image from 'next/image'
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

const TITLE = 'AR&CO Law: platform that replaced inbox ops'
const DESCRIPTION =
  'How I designed, built and deployed a three-portal client platform for AR&CO Law Associates, a referral build that streamlined operations and case management.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/work/arco-law',
})

const PATH = `${SITE_URL}/work/arco-law`

const PORTALS = [
  {
    label: 'PUBLIC SITE',
    heading: 'The public site',
    body: 'Practice areas, the team and the firm’s subscription offerings, built to turn a visitor into a registered client and route them into the right intake flow.',
  },
  {
    label: 'CLIENT PORTAL',
    heading: 'The client portal',
    body: 'Authenticated clients track their active cases and full timelines, submit and monitor complaints, book and pay for consultations, and reach their documents without phoning the office.',
  },
  {
    label: 'STAFF CRM',
    heading: 'The staff CRM',
    body: 'Attorneys and staff manage cases, assign work, log client interactions, process registrations and send invoices, with every action recorded in one auditable place.',
  },
]

const ARCHITECTURE_STEPS = [
  {
    label: 'LAYERED AUTHENTICATION',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Layered authentication
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          Every request passes through a JWT guard and a role guard before it reaches a handler.
          Clients see only their own data, staff see the full system, and row-level security at the
          database sits underneath the application code as a second check.
        </p>
      </div>
    ),
  },
  {
    label: 'WEBHOOK-DRIVEN PAYMENTS',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Webhook-driven payments
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          When a client pays for a subscription, a consultation or a service, LemonSqueezy sends a
          signed webhook as Merchant of Record. The backend verifies the HMAC signature, drops
          duplicate events and updates the record. No polling, no manual reconciliation.
        </p>
      </div>
    ),
  },
  {
    label: 'AUTOMATIC AUDIT TRAIL',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Automatic audit trail
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          A global interceptor logs every create, update, delete and status change across the system
          without any per-endpoint code. Staff can filter the activity log by user, action, entity or
          date, which matters for a firm working in a regulated setting.
        </p>
      </div>
    ),
  },
  {
    label: 'SHARED VALIDATION',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Shared validation
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          The same Zod schemas run on the frontend form and the backend endpoint. One definition, one
          source of truth, so what the client submits is what the server accepts.
        </p>
      </div>
    ),
  },
]

const OUTCOMES = [
  'Operations streamlined: intake, case tracking, documents and payments run through one platform instead of email threads and phone calls.',
  'Bookkeeping easier: payments across subscriptions, consultations and per-service registrations reconcile through signed webhooks rather than manual entry.',
  'Case management improved: staff work cases and log interactions in one place, and clients can see where their matter stands without calling the office.',
]

export default function ArcoLawCase() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'AR&CO Law Associates: a client platform that replaced inbox operations',
            description: DESCRIPTION,
            url: PATH,
            datePublished: '2026-01-15',
            dateModified: '2026-07-22',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Work', url: `${SITE_URL}/work` },
            { name: 'AR&CO Law', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* -------------------------------------------------------------- */}
        {/* Hero: situation before + self-contained answer                 */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>CASE STUDY / AR&CO LAW</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                A law practice platform that replaced inbox operations
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                AR&CO Law Associates ran their client operations out of email and phone calls, with no
                single system of record. I designed, built and deployed a three-portal platform: a
                public site, a client portal and a staff CRM, pulling intake, case tracking, documents
                and payments into one place. It was my first paid client, a roughly 7,000 USD build won
                on a referral.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['2026', 'Legal', 'Client platform', 'Referral build'].map((m) => (
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

        {/* -------------------------------------------------------------- */}
        {/* The manual bottleneck                                          */}
        {/* -------------------------------------------------------------- */}
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
                  Everything moved through an inbox. New clients had no way to track a case, submit a
                  complaint or reach a document without calling the office directly, so the firm fielded
                  status-update calls instead of doing legal work. Staff spent hours each week on intake
                  admin, collecting payments by hand and chasing document uploads.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  There was no single record of client interactions, cases or billing. The work was not
                  hard, it was repetitive and scattered, and it sat between the attorneys and the hours
                  they were actually paid for.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  They needed a platform that let clients self-serve and let staff stop running
                  operations out of their inboxes.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* What was built                                                 */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT WAS BUILT</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Three portals, one platform
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                A full-stack platform with three distinct portals, each built for a different audience,
                sharing one data model and one system of record.
              </p>
            </div>

            <Reveal stagger={0.12} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PORTALS.map((p) => (
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

        {/* -------------------------------------------------------------- */}
        {/* The architecture: scroll walkthrough + diagram                 */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE ARCHITECTURE</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How does the platform hold together?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                A NestJS backend API sits behind a Next.js frontend served through a secure proxy.
                Supabase handles authentication, the PostgreSQL database, row-level security and file
                storage. LemonSqueezy processes payments as Merchant of Record. Four decisions carry
                most of the weight.
              </p>
            </div>

            <PinnedSequence
              steps={ARCHITECTURE_STEPS}
              className="mt-16 border border-border bg-bg px-6 py-12 md:px-12"
            />

            <Reveal className="mt-16 border border-border bg-bg p-4 md:p-8">
              <Image
                src="/arco-architecture.png"
                alt="AR&CO platform architecture: three portals connected through a NestJS API to Supabase authentication, a PostgreSQL database with row-level security, file storage and LemonSqueezy payments"
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 100vw, 720px"
                className="mx-auto h-auto w-full max-w-[720px]"
              />
            </Reveal>
          </Container>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* What changed, in plain operational terms                       */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT CHANGED</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What changed for the firm?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                In plain operational terms, three things moved. I am describing what the platform does
                in production, not putting a number on it.
              </p>
            </div>

            <Reveal stagger={0.12} className="mt-12 space-y-4">
              {OUTCOMES.map((o) => (
                <div key={o} className="flex items-start gap-4 border border-border bg-surface p-6">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-accent">
                    +
                  </span>
                  <p className="font-sans text-[16px] leading-relaxed text-ink-2 md:text-[17px]">
                    {o}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-10 max-w-3xl">
              <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
                {'// '}
                <a
                  href="https://arandcolaw.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-colors hover:text-ink"
                >
                  See it live at arandcolaw.com
                </a>
              </p>
            </Reveal>
          </Container>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* First-hand experience: the honest version                      */}
        {/* -------------------------------------------------------------- */}
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
                  In the AR&CO build I hit the gap between a clean scope and a real business. I scoped
                  it for six weeks. It ran about four months, and almost none of that was code. The
                  delay came from the client side: decisions that needed sign-off sat waiting,
                  requirements shifted as the firm looked at their own operations properly for the first
                  time, and content and access I needed arrived in pieces.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  I could have treated that as noise. Instead it taught me how a build survives contact
                  with a working firm: keep the architecture ready for change, keep the scope visible so
                  drift is a conversation rather than a surprise, and design so that the parts already
                  agreed can ship while the rest is still being decided.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  The platform is live and doing its job. The timeline is the part I will not dress up,
                  because managing it is now part of how I work.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Close: link up to the agencies hub, then the CTA               */}
        {/* -------------------------------------------------------------- */}
        <section className="border-b border-border bg-bg">
          <Container className="py-16">
            <Divider className="mb-10" />
            <p className="max-w-2xl font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
              This was a platform build. The same instinct, removing the manual work that sits between a
              team and the hours they are paid for, is what I bring to the agency systems I design,
              build and deploy.
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
              {'// '}
              <Link href="/agencies" className="text-accent transition-colors hover:text-ink">
                See what I build for agencies
              </Link>
            </p>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
