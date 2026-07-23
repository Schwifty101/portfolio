import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { Divider } from '@/components/ui-kodo/Divider'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal, Skeleton } from '@/components/motion'
import { FaqBlock } from '@/components/site/FaqBlock'
import {
  JsonLd,
  serviceSchema,
  breadcrumbSchema,
  pageMetadata,
} from '@/lib/schema'
import { SITE_URL, EMAIL } from '@/lib/site'

const TITLE = 'AI Voice Receptionist for Med Spa Bookings'
const DESCRIPTION =
  'Hear the AI voice receptionist take a real med spa call: it answers every enquiry, handles the questions, qualifies the caller and books with a deposit.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/med-spas/ai-receptionist',
})

const PATH = `${SITE_URL}/med-spas/ai-receptionist`

const STEPS = [
  {
    n: '01',
    heading: 'Answers',
    body: 'Every call, every hour. Evenings, weekends, and the ones that ring while your front desk has a client in the chair. Nothing rings out to voicemail.',
  },
  {
    n: '02',
    heading: 'Handles the questions',
    body: 'Treatments, availability, what to expect on the day, answered the way your best front desk person would, from information you review and approve first.',
  },
  {
    n: '03',
    heading: 'Qualifies',
    body: 'Asks the right questions before it offers a slot, so a price-shopper and a serious enquiry are sorted before either reaches your calendar.',
  },
  {
    n: '04',
    heading: 'Books with a deposit',
    body: 'Straight into your calendar with a card deposit that credits to the treatment. A booking that carries a deposit is a booking that tends to show up.',
  },
]

// Objection-handling FAQ, mirrored from the live funnel playbook.
const FAQ = [
  {
    q: 'Will it sound robotic?',
    a: 'You have a recording of it above, so listen and decide for yourself. Callers regularly finish the whole conversation without realising it was not a person, and it does not get flustered on the fourth call of the hour. It is built to hold a natural conversation, not to read a script.',
  },
  {
    q: 'What if it gets a question it cannot answer?',
    a: 'It does not guess. Anything medical, unusual, or outside what you have approved gets a message taken or the call passed to your team, and you see a full transcript of every conversation either way. The agent is built to do less than it could where a wrong answer would matter.',
  },
  {
    q: 'Is this safe for my clients’ information?',
    a: 'The agent handles enquiries and bookings, not medical records, and it never gives medical advice. Conversation data is stored securely and belongs to you. It sits in front of your clinical systems, it does not reach into them.',
  },
  {
    q: 'Does it replace my front desk?',
    a: 'No. It takes the calls your team physically cannot: after hours, at weekends, and the ones that ring while they are with a client. Your team keeps the in-person work that actually needs a person, and stops losing enquiries to a voicemail box.',
  },
  {
    q: 'What do I have to set up?',
    a: 'The build is done for you. It is shaped around how your spa already works: your treatments, your availability, the way you like enquiries handled. You review and approve everything before it takes a single live call, so nothing goes out in your name that you have not signed off.',
  },
  {
    q: 'Does it work with my booking system?',
    a: 'It books into your calendar and works alongside the systems you already run, rather than asking you to rip anything out. The exact fit gets confirmed as part of the build, so the agent slots into your day instead of adding another screen to watch.',
  },
]

export default function AiReceptionistPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'AI voice receptionist for med spas',
            description: DESCRIPTION,
            url: PATH,
            serviceType: 'AI voice receptionist for med spas',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Med Spas', url: `${SITE_URL}/med-spas` },
            { name: 'AI voice receptionist', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: buyer outcome + self-contained 40-60 word answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>THE FRONT DOOR</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Hear it answer the call you would have missed
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                An AI voice receptionist is a phone agent that answers every call to your med spa,
                handles the questions, qualifies the enquiry and books it with a deposit, at any hour.
                It takes the after-hours and between-client calls your front desk cannot, in a voice
                callers finish talking to without noticing. The recording below shows it on a real call.
              </p>
            </div>
          </Container>
        </section>

        {/* VSL: Loom embed in a fixed-dimension frame, Skeleton reserves exact space (no CLS) */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>HEAR IT ANSWER</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What does the agent sound like on a call?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Like a calm, well-briefed front desk. No slides and no pitch deck, just the agent taking
                a call and booking it. Listen, then read how it works underneath.
              </p>
            </div>

            <div className="mt-12">
              <div
                className="relative w-full overflow-hidden border border-border-2 bg-surface"
                style={{ aspectRatio: '100 / 82.736' }}
              >
                <Skeleton
                  height="100%"
                  className="absolute inset-0"
                  label="// LOADING DEMO"
                />
                <iframe
                  src="https://www.loom.com/embed/6a94ebfd8b1348448f9fb8c8fa9dba29"
                  title="AI voice receptionist taking a real med spa call"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-3">
                <span>{'// no slides, no pitch deck. the agent, taking a call.'}</span>
                <span>{'// runtime 03:30'}</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Mechanism: what happens when it picks up */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHAT HAPPENS WHEN IT PICKS UP</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What does an AI receptionist actually do on a call?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Four things, in order, on every call it takes. It answers, it handles the questions, it
                qualifies the enquiry, and it books the appointment with a deposit.
              </p>
            </div>

            <Reveal stagger={0.08} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <Card key={step.n} className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                    {`// ${step.n}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {step.heading}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {step.body}
                  </p>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Every enquiry gets answered, qualified and booked the same way, whether it lands at 11am
                on a Tuesday or 9pm on a Friday.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* How it works: mechanism underneath */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>HOW IT WORKS</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How is it built to stay reliable?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  The agent works from information you approve: your treatments, your availability, the
                  answers you would give yourself. It is not left to invent details. When a call runs
                  past what it knows, it takes a message or hands off to your team rather than guessing,
                  and you get a full transcript of every conversation either way.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Booking flows straight into your calendar, and the deposit is taken through your
                  payment setup, so an appointment carries commitment before your team touches it. The
                  build is shaped around how your spa already runs, then reviewed and approved by you
                  before it takes a single live call.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  It earns trust by doing less than it could where a wrong answer would matter, and doing
                  the routine work faultlessly where it will not.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* FAQ: objection handling */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <Divider className="mb-12" />
            <FaqBlock items={FAQ} />
          </Container>
        </section>

        {/* Close: nurture, no booking widget. "You are already on the calendar" for funnel
            arrivals, plus an email line for organic visitors. No PageCta, no /contact, no calendar. */}
        <section className="border-t border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-2xl">
              <SectionLabel>WHAT HAPPENS NEXT</SectionLabel>
              <h2 className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-4xl">
                You are already on the calendar
              </h2>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                If you booked on the phone with me, there is nothing to pick here. You did that already.
                The meeting link is in your message thread, and if the time stops working, just reply
                there and we will move it. On the call you will hear the agent live on a scenario from
                your own spa, see the numbers on your figures, not an industry average, and get a
                straight answer on fit, even if that answer is no.
              </p>

              <Card className="mt-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                  {'// WHAT TO EXPECT'}
                </span>
                <ul className="mt-4 space-y-3 font-sans text-[15px] leading-relaxed text-ink-2">
                  <li>The agent, live, on a scenario from your own spa.</li>
                  <li>Real numbers, yours, not an industry average.</li>
                  <li>A straight answer on fit, even if that answer is no.</li>
                  <li>Nothing to sign and nothing to buy on this page.</li>
                </ul>
              </Card>

              <p className="mt-10 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                Found this page on your own, without a call booked yet? Send a note to{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-mono text-[15px] tracking-[0.02em] text-accent underline underline-offset-4 transition-colors hover:text-ink"
                >
                  {EMAIL}
                </a>{' '}
                and tell me a bit about your spa. I will come back to you.
              </p>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
