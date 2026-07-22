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

const TITLE = 'AI Receptionist for Med Spas: Speed to Lead'
const DESCRIPTION =
  'An AI receptionist for med spas answers every call, texts back missed enquiries and books with a deposit, so after-hours interest stops leaking away.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/med-spas',
})

const PATH = `${SITE_URL}/med-spas`

// The seven-layer architecture: the call agent is the front door, the rest is the building.
const LAYERS = [
  {
    n: '01',
    heading: 'Demand capture',
    body: 'The ads, the search listing and the social posts that make the phone ring in the first place. Nothing here matters if the calls it creates go unanswered.',
  },
  {
    n: '02',
    heading: 'Landing',
    body: 'The page an enquiry lands on. It sets the expectation and points a caller at the fastest way to book, rather than a form nobody fills in at 9pm.',
  },
  {
    n: '03',
    heading: 'Speed to lead',
    body: 'The gap between an enquiry arriving and someone responding. Minutes, not hours, is what separates a booking from a voicemail that books elsewhere.',
  },
  {
    n: '04',
    heading: 'Qualification',
    body: 'The questions that sort a serious enquiry from a price-shopper before a slot is offered, so the calendar fills with people who actually turn up.',
  },
  {
    n: '05',
    heading: 'Booking and deposit',
    body: 'The appointment secured straight into the calendar with a card deposit that credits to the treatment, so a booking means a body in the chair.',
  },
  {
    n: '06',
    heading: 'The call agent',
    body: 'The front door. A phone agent that answers every call, handles the questions, qualifies the enquiry and books it, at any hour, in a voice callers finish talking to without noticing.',
  },
  {
    n: '07',
    heading: 'Retention and reactivation',
    body: 'The follow-up that brings a client back for the next cycle instead of letting them drift, and wins back the ones who went quiet.',
  },
]

const FAQ = [
  {
    q: 'What is an AI receptionist for a med spa?',
    a: 'It is a phone agent that answers your spa’s calls the way a trained front desk would: it greets the caller, answers questions about treatments and availability from information you approve, qualifies the enquiry and books it straight into your calendar with a deposit. It works after hours, at weekends and while your desk is with a client, so no enquiry rings out.',
  },
  {
    q: 'How does missed-call text back work for a med spa?',
    a: 'When a call is missed, the system sends the caller a text within seconds so the enquiry does not go cold while they scroll on to the next spa. The message opens a booking conversation instead of leaving them on hold with a voicemail. Speed is the whole point: research on lead response, including Harvard Business Review’s work, shows responding in minutes rather than hours changes the odds of ever reaching that person.',
  },
  {
    q: 'Why does speed to lead matter so much for aesthetic clinics?',
    a: 'Aesthetic enquiries are impulsive and comparison-shopped. Someone who has thought about a treatment for months finally calls at 9pm, and if nobody answers, they book with whoever picks up first. The enquiry never shows in any report, so the leak is invisible. Answering on the second ring, every time, is how you keep interest you already paid to create.',
  },
  {
    q: 'Does the call agent replace my front desk?',
    a: 'No. It takes the calls your team physically cannot: after hours, at weekends and the ones that ring while they are with a client in the chair. Your front desk keeps the in-person work that genuinely needs a person, and stops losing enquiries to a voicemail box nobody checks until Monday.',
  },
  {
    q: 'What is the seven-layer architecture you mention?',
    a: 'The call agent is the front door; the architecture is the building behind it. Seven layers run from demand capture and speed-to-lead response through qualification, booking with a deposit, and retention that brings clients back. Most spas start with the front door, the agent that answers the phone, then add the layers that compound around it.',
  },
]

export default function MedSpasHub() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'AI receptionist and speed-to-lead automation for med spas',
            description: DESCRIPTION,
            url: PATH,
            serviceType: 'AI receptionist and speed-to-lead automation for med spas',
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Med Spas', url: PATH },
          ]),
        ]}
      />

      <main>
        {/* Hero: buyer outcome + self-contained 40-60 word answer */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>AI RECEPTIONIST FOR MED SPAS</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                The enquiry you never knew you lost
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                An AI receptionist for med spas answers every call, texts back the ones you miss, and
                books the enquiry with a deposit, at any hour. It closes the after-hours gap where
                interest you already paid to create leaks to the spa down the road. The call agent is
                the front door to a seven-layer system built around speed to lead.
              </p>
              <div className="mt-10">
                <Link
                  href="/med-spas/ai-receptionist"
                  className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[14px] font-semibold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-accent-dim hover:border-accent-dim"
                >
                  Hear the agent take a call
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* The missed-call leak */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE LEAK</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                Why do med spas lose bookings to missed calls?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Because the calls that matter most arrive when nobody is at the desk. A client thinks
                  about a treatment for months, finally rings at 9pm on a Friday, hits voicemail, and
                  books with whoever answers first. That enquiry never lands in a report, so the loss is
                  invisible. You only ever count the bookings you won, never the ones that rang out.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  After-hours interest is where the bleed is heaviest: evenings, weekends and the calls
                  that ring while your front desk has a client in the chair. Aesthetic enquiries are
                  impulsive and comparison-shopped, so a missed call is rarely a call that waits. It is a
                  booking that went elsewhere.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  A missed call at a med spa is not a message to return later. It is usually a booking
                  that has already gone somewhere else.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Speed to lead */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>SPEED TO LEAD</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                How fast do you have to respond to an enquiry?
              </KineticHeadline>
              <Reveal className="mt-8 space-y-6">
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  In minutes, not hours. Research on lead response, including Harvard Business Review’s
                  work on the short life of online enquiries, shows that responding within minutes rather
                  than hours changes the odds of ever reaching the person on the other end. An enquiry
                  cools fast, and a med spa caller has three other clinics one tap away.
                </p>
                <p className="font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                  Speed-to-lead automation closes that gap without asking your team to sit by the phone.
                  The call agent answers on the second ring; a missed call gets a text back within
                  seconds that opens a booking conversation instead of leaving a voicemail nobody hears
                  until Monday.
                </p>
                <p className="font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                  The clinic that answers first, not the one with the best prices, usually gets the
                  booking. Speed is the edge you can actually control.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* The front door and the building: seven-layer architecture */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>THE FRONT DOOR AND THE BUILDING</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                What is the seven-layer med spa architecture?
              </KineticHeadline>
              <p className="mt-6 font-sans text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
                The call agent is the front door. The architecture is the building behind it. Seven
                layers turn a phone that rings into a system that captures, qualifies, books and brings
                clients back. Most spas start at the front door and add the rest as it earns its place.
              </p>

              <Reveal className="mt-10 flex items-baseline gap-4">
                <div className="font-display text-6xl font-semibold text-accent md:text-7xl">
                  <StatCounter value={7} />
                </div>
                <p className="font-sans text-[15px] leading-relaxed text-ink-2">
                  layers, one entry product: the agent that answers the phone.
                </p>
              </Reveal>
            </div>

            <Reveal stagger={0.08} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {LAYERS.map((layer) => (
                <Card
                  key={layer.n}
                  featured={layer.n === '06'}
                  className="flex flex-col"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                    {`// ${layer.n}`}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                    {layer.heading}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {layer.body}
                  </p>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="max-w-3xl font-sans text-[17px] font-semibold leading-relaxed text-ink md:text-[19px]">
                Start with the front door. An agent that answers every call pays back before the rest of
                the building is even framed.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Links down + proof */}
        <section className="border-b border-border bg-bg">
          <Container className="py-24">
            <div className="max-w-3xl">
              <SectionLabel>WHERE TO GO NEXT</SectionLabel>
              <KineticHeadline
                as="h2"
                className="mt-6 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-5xl"
              >
                See it work, then hear it work
              </KineticHeadline>
            </div>

            <Reveal stagger={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                  {'// THE ENTRY PRODUCT'}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                  The AI voice receptionist
                </h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                  The front door in detail: a recording of the agent taking a real call, exactly what it
                  does when it picks up, and the questions every owner asks first.
                </p>
                <Link
                  href="/med-spas/ai-receptionist"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  Hear the agent
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </Card>

              <Card className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                  {'// AGENT BUILD / VOICE'}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink">
                  The AI voice agent case
                </h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                  How the voice agent was designed, built and deployed: the mechanism behind answering,
                  qualifying and booking a call without sounding like a machine.
                </p>
                <Link
                  href="/work/ai-voice-agent"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                >
                  Read the case
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </Card>
            </Reveal>
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
