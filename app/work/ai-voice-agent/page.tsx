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

const TITLE = 'AI Voice Receptionist Agent for Med Spas'
const DESCRIPTION =
  'A voice agent I designed, built and deployed for a med spa: it answers missed calls, quotes real pricing, books against the live schedule and confirms by text.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/work/ai-voice-agent',
})

const PATH = `${SITE_URL}/work/ai-voice-agent`

const STACK = [
  'Twilio',
  'Vapi',
  'Deepgram Nova-3',
  'Claude Sonnet 4',
  'Cartesia Sonic-2',
  'Fastify',
  'Supabase',
  'PostgreSQL',
  'Next.js',
]

const WHAT_WAS_BUILT = [
  {
    label: 'KNOWS THE CALLER',
    heading: 'Recognises who is calling',
    body: 'It greets returning clients by name, remembers a preferred provider and notes the flags that matter before the conversation starts. A caller is not a stranger every time they ring.',
  },
  {
    label: 'QUOTES REAL PRICING',
    heading: 'Handles service enquiries',
    body: 'It works across the full set of service categories with the real pricing ranges the business actually charges, and steers genuine medical questions to a consultation instead of guessing at an answer it should not give.',
  },
  {
    label: 'BOOKS LIVE',
    heading: 'Checks real availability',
    body: 'It queries the actual provider schedules at real slot granularity, respecting which provider can perform which service, and books against the live calendar rather than a copy that drifts out of date.',
  },
]

const ARCHITECTURE_STEPS = [
  {
    label: 'TRANSACTION-SAFE BOOKING',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Transaction-safe booking
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          When two callers reach for the same slot at the same moment, database transactions decide it
          cleanly so the schedule never double-books. The booking is a real write against the real
          calendar, not a request queued for someone to reconcile later.
        </p>
      </div>
    ),
  },
  {
    label: 'LIVE OWNER DASHBOARD',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Live owner dashboard
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          Conversations stream to a dashboard as they happen over server-sent events, so the owner can
          watch a call in progress, read the transcript and see a booking land in real time. The agent
          is not a black box the owner has to trust blindly.
        </p>
      </div>
    ),
  },
  {
    label: 'INSTANT SMS CONFIRMATION',
    body: (
      <div className="max-w-xl">
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
          Instant SMS confirmation
        </p>
        <p className="mt-4 font-sans text-[16px] leading-relaxed text-ink-2 md:text-[18px]">
          A confirmation text goes out through Twilio within seconds of the booking, often before the
          call has ended. The caller leaves the conversation with the appointment already in writing,
          which is what keeps a booking from quietly evaporating.
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
          The core booking action is protected above everything else. If the confirmation text fails the
          booking still succeeds, if a recording upload fails the data is still logged. The one thing
          that must never break is the appointment, and it does not.
        </p>
      </div>
    ),
  },
]

const OUTCOMES = [
  'A call that used to ring out to voicemail is now answered, after hours and while the front desk is busy with a client in the chair, so a missed call stops quietly becoming a lost customer.',
  'A caller who is ready to book is booked while they are still on the line, against the real schedule, instead of being asked to leave a message and call back.',
  'The front desk keeps its attention on the person in front of them, because the phone is no longer a second job competing with the treatment room.',
]

export default function AiVoiceAgentCase() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'A voice agent that answers the calls a business misses',
            description: DESCRIPTION,
            url: PATH,
            datePublished: '2026-05-13',
            dateModified: '2026-07-22',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Work', url: `${SITE_URL}/work` },
            { name: 'AI Voice Receptionist', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: situation before + self-contained answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>CASE STUDY / VOICE RECEPTIONIST</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                A voice agent that answers the calls a business misses
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                In a med spa the phone call is the sale, and the front desk is busiest exactly when the
                calls peak, so ready-to-book callers hit voicemail and go elsewhere. I designed, built
                and deployed a production voice agent that picks up, quotes real pricing, checks live
                availability, books against the real schedule and confirms by text. This build runs
                inside a business I do not name, the people running it treat it as an edge.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['2026', 'Med spa', 'AI voice receptionist', 'Agent build'].map((m) => (
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
                  A med spa runs on high-intent phone calls. Someone searching for a treatment nearby is
                  ready to book, if a person picks up. But the front desk is busiest during treatment
                  hours, which are the same hours the phone rings most. The call goes to voicemail, and
                  the caller has already found someone who answered.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  A human receptionist handles one call at a time, is not there in the evening or at the
                  weekend, and cannot be in the treatment room and on the phone at once. The gap is not
                  effort, it is coverage: the calls arrive when there is no one free to take them.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  They needed the phone answered every time, without pulling anyone off the work in front
                  of them.
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
                A receptionist that books on the call
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                A voice agent that answers naturally, handles pricing, checks availability through
                real-time integrations and writes a real booking to the database before the caller hangs
                up. Three things make it a receptionist rather than a demo.
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
                How does a call become a booking?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2">
                Twilio carries the call, Vapi manages the voice, Deepgram hears it, Claude Sonnet 4
                reasons through it and Cartesia speaks, over a Fastify backend on Supabase. Four
                decisions turn a conversation into an appointment that holds.
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
                What changed for the business?
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
                  A voice agent lives or dies on the boring part. Anyone can make one that chats. The
                  hard problem is what happens when two people book the same slot in the same second, or
                  when the confirmation text fails after the appointment is already made. Get that wrong
                  and you have not saved a missed call, you have created a double-booking the owner has to
                  clean up.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  So I built it back to front, from the booking outward. The appointment is a real
                  transaction the database protects, and everything else, the text, the recording, the
                  dashboard, is allowed to fail without touching it. The pleasant conversation is the
                  easy half. The half that earns its place is the one that holds up under load.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  A receptionist you can trust is one whose booking never quietly falls through, not one
                  that merely sounds good on the phone.
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
              This is the voice agent behind the receptionist I build for med spas: the front door that
              answers when the desk cannot, books on the call, and stops a missed call quietly becoming a
              lost customer.
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
              {'// '}
              <Link
                href="/med-spas/ai-receptionist"
                className="text-accent transition-colors hover:text-ink"
              >
                See how the AI receptionist works
              </Link>
            </p>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
