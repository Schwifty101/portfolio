"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ArrowLeft, Star, Phone, Calendar, Clock, DollarSign, Activity, Bot, BarChart } from "lucide-react"
import Link from "next/link"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Footer } from "@/app/pages/Footer"

/* ─── Data ─── */

const techStack = [
  "Twilio", "Vapi", "Deepgram Nova-3", "Claude Sonnet 4", "Cartesia Sonic-2",
  "Fastify", "Supabase", "PostgreSQL", "Next.js"
]

const features = [
  {
    label: "Identifies the Caller",
    num: "01",
    description: "Greets returning clients by name, remembers preferred providers, flags VIP status, and notes sensitivities seamlessly.",
    tags: ["Personalization", "CRM Sync"],
  },
  {
    label: "Service Inquiries",
    num: "02",
    description: "Navigates 13 service categories with real pricing ranges and units, steering non-standard medical questions to free consultations.",
    tags: ["Dynamic Pricing", "Medical Deflection"],
  },
  {
    label: "Real-Time Availability",
    num: "03",
    description: "Queries actual provider schedules across Mon-Sat hours with 15-minute slot granularity, respecting provider-service qualifications.",
    tags: ["Smart Scheduling", "Provider Logic"],
  },
]

const howItWorks = [
  {
    num: "01",
    title: "Transaction-Safe Booking",
    icon: Calendar,
    description: "Database transactions prevent double-booking when two callers request the same slot simultaneously. Captures essential details instantly.",
    tags: ["Concurrency Control", "Frictionless Capture"],
  },
  {
    num: "02",
    title: "Real-Time Owner Dashboard",
    icon: Activity,
    description: "Live conversation streaming directly to a dashboard. Watch ROI metrics update, track conversions, and monitor every call transcript in real-time.",
    tags: ["Live Webhooks", "SSE Updates"],
  },
  {
    num: "03",
    title: "Instant SMS Confirmation",
    icon: Clock,
    description: "Sends an SMS confirmation via Twilio within 10 seconds of booking, before the call even ends, driving down no-show rates.",
    tags: ["Twilio SMS", "Instant Delivery"],
  },
  {
    num: "04",
    title: "Graceful Degradation",
    icon: Bot,
    description: "If SMS fails, booking succeeds. If recording upload fails, data logs. Built to prioritize the core booking action above all else.",
    tags: ["Fault Tolerance", "Reliability"],
  },
]

const aiOpportunities = [
  {
    title: "After-Hours Coverage",
    icon: Clock,
    description: "Available 24/7 including evenings, weekends, and holidays — peak inquiry times when no one is at the desk.",
    metric: "24/7",
    metricLabel: "Always on, zero missed calls",
  },
  {
    title: "Concurrent Call Handling",
    icon: Phone,
    description: "A human receptionist handles one call at a time. Maya handles an infinite number of simultaneous calls without putting anyone on hold.",
    metric: "100%",
    metricLabel: "Handling capacity",
  },
  {
    title: "Instant Conversion",
    icon: DollarSign,
    description: "Voicemail callback conversion is 12-18%. Maya books the client while they are still highly motivated to schedule.",
    metric: "40-50%",
    metricLabel: "Live conversion rate",
  },
]

const outcomes = [
  { value: "100%", label: "Calls Answered", sublabel: "Zero missed opportunities" },
  { value: "40-50%", label: "Live Conversion", sublabel: "Compared to 12-18% on voicemail" },
  { value: "3-4", label: "Break-Even", sublabel: "Bookings needed to cover cost" },
  { value: "3 Days", label: "To Launch", sublabel: "From setup to first call" },
]

/* ─── Component ─── */

export default function VoiceReceptionistCaseStudy() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
      ; (async function () {
        const cal = await getCalApi({ namespace: "30min" })
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
      })()
  }, [])

  const fadeProps = (delay = 0) =>
    prefersReducedMotion
      ? { initial: false as const }
      : {
        initial: { opacity: 0, y: 24 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        transition: { duration: 0.7, delay, ease: "easeOut" } as const,
        viewport: { once: true, amount: 0.15 } as const,
      }

  return (
    <>
      {/* ── Minimal Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 w-full z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md"
      >
        <div className="w-full px-[clamp(1rem,5vw,6rem)] py-6">
          <div className="flex justify-between items-center min-h-[48px]">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <ArrowLeft className="w-4 h-4 text-[#555555] group-hover:text-[#c8f060] transition-colors duration-200" />
              <div className="flex flex-col">
                <span className="font-barlow font-black text-[18px] tracking-[4px] text-[#f0f0ea] uppercase">
                  SOBAN AHMAD
                </span>
                <span className="font-mono-custom text-[10px] font-bold text-[#333333] tracking-[3px] uppercase hidden md:block">
                  (KodoAI)
                </span>
              </div>
            </Link>

            <motion.button
              data-cal-namespace="30min"
              data-cal-link="soban-ahmad/30min"
              data-cal-config='{"layout":"month_view"}'
              className="hidden md:inline-flex items-center space-x-3 px-6 py-3 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[13px] tracking-[3px] uppercase border border-transparent hover:bg-transparent hover:border-[#c8f060] hover:text-[#c8f060] transition-colors duration-200"
              style={{ borderRadius: 0 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>BOOK A CALL</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="w-full bg-[#0a0a0a] text-[#f0f0ea]">

        {/* ═══════════════════  HERO  ═══════════════════ */}
        <section className="pt-40 md:pt-48 pb-20 md:pb-28 border-b border-[#1a1a1a] relative overflow-hidden">
          <div className="absolute top-[20%] left-[-3%] opacity-[0.015] pointer-events-none z-0 select-none hidden lg:block">
            <span className="font-barlow font-black text-[28vw] leading-[0.8] whitespace-nowrap uppercase">
              MAYA AI
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)] relative z-10">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              CASE STUDY
            </motion.div>

            <motion.h1
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-6"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              AI VOICE RECEPTIONIST
              <br />
              <span className="text-[#333333]">FOR MED SPAS</span>
            </motion.h1>

            <motion.p
              className="text-[17px] md:text-[19px] leading-relaxed text-[#aaaaaa] max-w-3xl mb-10"
              {...fadeProps(0.35)}
            >
              Maya is a production-grade voice AI receptionist built specifically for med spas. She answers every inbound call within 3 rings, handles the full booking conversation, creates appointments, and sends SMS confirmations.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-10"
              {...fadeProps(0.45)}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">Vertical</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">Med Spas / Aesthetics</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">By</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">Soban Ahmad, KodoAI</span>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0a1a0a] border border-[#c8f060]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#c8f060] text-[#c8f060]" />
                ))}
                <span className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#c8f060] ml-1">UPWORK</span>
              </div>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2" {...fadeProps(0.55)}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-[#111111] border border-[#1a1a1a] text-[#555555] font-mono-custom text-[11px] tracking-[2px] uppercase hover:border-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-300"
                  style={{ borderRadius: 0 }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════  THE PROBLEM  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
                  <span className="eyebrow-bar" />
                  THE PROBLEM
                </motion.div>
                <motion.h2
                  className="font-barlow font-black text-[#f0f0ea] uppercase tracking-tighter"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 0.9 }}
                  {...fadeProps(0.2)}
                >
                  EVERY
                  <br />
                  MISSED CALL
                  <br />
                  <span className="text-[#cc4444]">IS LOST REVENUE.</span>
                </motion.h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.25)}>
                  Med spas operate in a high-intent, appointment-driven market where the phone call is the sale. A prospective client searching "Botox near me" or "lip filler consultation" is ready to book — if someone answers.
                </motion.p>

                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.35)}>
                  Front desks are busiest during treatment hours — the same hours when calls peak. The phone rings, goes to voicemail, and a $750 lip filler appointment walks to a competitor who picked up. Voicemail callback rates in med spas average 12-18%. The caller already found someone else.
                </motion.p>

                <motion.div
                  className="p-6 bg-[#0d0d0d] border border-[#1a1a1a]"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.45)}
                >
                  <p className="text-[15px] leading-[1.8] text-[#f0f0ea] italic">
                    &ldquo;They needed a receptionist that is available 24/7, never calls in sick, and seamlessly books appointments against their real schedule.&rdquo;
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════  WHAT WAS BUILT  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              WHAT WAS BUILT
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              24/7 AI AGENT.
              <br />
              <span className="text-[#333333]">LIVE BOOKING.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              Maya answers calls naturally, handles pricing inquiries dynamically, checks availability via real-time API integrations, and performs actual database transactions to confirm appointments.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.num}
                  className="group p-6 md:p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#c8f060] transition-all duration-300"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.2 + index * 0.12)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono-custom text-[11px] text-[#444444] tracking-[4px]">
                      {feature.num}
                    </span>
                  </div>

                  <h3 className="font-barlow font-black text-xl md:text-2xl uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 mb-4">
                    {feature.label}
                  </h3>

                  <p className="text-[14px] leading-[1.7] text-[#aaaaaa] mb-6">
                    {feature.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-custom text-[10px] tracking-[2px] text-[#555] border border-[#222] px-3 py-1 uppercase"
                        style={{ borderRadius: 0 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════  HOW IT WORKS  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              HOW IT WORKS
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              ENGINEERING
              <br />
              <span className="text-[#333333]">DECISIONS.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              The platform orchestrates Twilio for PSTN, Vapi for AI voice management, and a Fastify backend connecting to Supabase for PMS integration and real-time dashboard updates.
            </motion.p>

            <div className="space-y-0">
              {howItWorks.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.num}
                    className="border-b border-[#1a1a1a] group cursor-default"
                    {...fadeProps(0.15 + index * 0.1)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8">
                      <div className="md:col-span-4 flex items-start gap-4 md:gap-6">
                        <span className="font-mono-custom text-[11px] text-[#555555] tracking-[4px] mt-1 shrink-0">
                          {item.num}
                        </span>
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#c8f060] shrink-0" />
                          <h3 className="font-barlow font-bold text-lg md:text-xl uppercase tracking-wide text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div className="md:col-span-8">
                        <p className="text-[14px] leading-[1.7] text-[#aaaaaa] mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono-custom text-[10px] tracking-[2px] text-[#555] border border-[#222] px-3 py-1 uppercase"
                              style={{ borderRadius: 0 }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════  VALUE & ROI  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              THE ROI
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              WHY IT
              <br />
              <span className="text-[#c8f060]">MATTERS.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              At an average booking value of $450, missing 25% of 50 monthly calls leads to thousands in lost revenue. Maya changes the fundamental math of a med spa's front desk.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {aiOpportunities.map((ai, index) => {
                const Icon = ai.icon
                return (
                  <motion.div
                    key={ai.title}
                    className="group p-6 md:p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#c8f060] transition-all duration-300"
                    style={{ borderRadius: 0 }}
                    {...fadeProps(0.15 + index * 0.08)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-5 h-5 text-[#c8f060] shrink-0" />
                      <h3 className="font-barlow font-bold text-base md:text-lg uppercase tracking-wide text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300">
                        {ai.title}
                      </h3>
                    </div>

                    <p className="text-[13px] leading-[1.65] text-[#aaaaaa] mb-6">
                      {ai.description}
                    </p>

                    <div className="pt-4 border-t border-[#1a1a1a]">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="font-barlow font-black text-[#c8f060]"
                          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                        >
                          {ai.metric}
                        </span>
                      </div>
                      <span className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#555555]">
                        {ai.metricLabel}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════  OUTCOMES  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              OUTCOMES
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-16"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              RESULTS
              <span className="text-[#c8f060]">.</span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.label}
                  className="p-6 md:p-8 border border-[#1a1a1a] bg-[#0d0d0d]"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.15 + index * 0.1)}
                >
                  <div
                    className="font-barlow font-black text-[#c8f060] mb-2"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}
                  >
                    {outcome.value}
                  </div>
                  <div className="font-barlow font-bold text-sm md:text-base uppercase tracking-wide text-[#f0f0ea] mb-1">
                    {outcome.label}
                  </div>
                  <div className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#555555]">
                    {outcome.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════  CTA  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)] text-center">
            <motion.div className="eyebrow-label justify-center mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              LET&apos;S TALK
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-6"
              style={{ fontSize: "clamp(2rem, 7vw, 5rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              WANT RESULTS
              <br />
              <span className="text-[#c8f060]">LIKE THIS?</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-2xl mx-auto mb-10"
              {...fadeProps(0.3)}
            >
              I scope everything in detail before payment is taken. You work directly with a senior engineer,
              not a project manager relaying messages to an offshore team.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              {...fadeProps(0.4)}
            >
              <motion.button
                data-cal-namespace="30min"
                data-cal-link="soban-ahmad/30min"
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[13px] tracking-[3px] uppercase border border-transparent hover:bg-transparent hover:border-[#c8f060] hover:text-[#c8f060] transition-colors duration-200"
                style={{ borderRadius: 0 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>BOOK A 15-MIN CALL</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
