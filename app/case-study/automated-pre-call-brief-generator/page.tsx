"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ArrowLeft, Star, Activity, Zap, Database, CheckCircle, Bot, Brain } from "lucide-react"
import Link from "next/link"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Footer } from "@/app/pages/Footer"

/* ─── Data ─── */

const techStack = [
  "Python 3.12", "FastAPI", "Next.js 14", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Google Gemini API",
  "Playwright", "Celery", "Redis", "PostgreSQL", "Supabase", "Docker", "Railway"
]

const pipelineStages = [
  {
    label: "Intake",
    num: "01",
    description:
      "A sleek Next.js frontend (or CRM webhook) submits the prospect URL. A background job is immediately enqueued via Redis.",
    tags: ["Next.js", "Webhook", "Redis Queue"],
  },
  {
    label: "Parallel Data Collection",
    num: "02",
    description:
      "Seven tasks run concurrently: scraping website & LinkedIn via Playwright, querying Meta Ad Library, Google PageSpeed Insights, and detecting tech stack via custom regex.",
    tags: ["Playwright", "Meta Graph API", "Asyncio"],
  },
  {
    label: "Structured AI Analysis",
    num: "03",
    description:
      "Raw unstructured data is passed to Google Gemini 2.5 Flash, which extracts a structured company profile and analyzes their marketing posture.",
    tags: ["Gemini 2.5 Flash", "Data Extraction"],
  },
  {
    label: "AI Synthesis & Delivery",
    num: "04",
    description:
      "Gemini 2.5 Pro writes the final brief (openers, pricing anchors, red flags). It is rendered into a branded PDF via WeasyPrint, uploaded to Supabase, and emailed via Resend.",
    tags: ["Gemini 2.5 Pro", "WeasyPrint", "Resend"],
  },
]

const keyFeatures = [
  {
    num: "01",
    title: "Graceful Degradation",
    icon: Activity,
    description:
      "The async collection steps (asyncio.gather with return_exceptions=True) ensure that if LinkedIn blocks a scraping attempt, the pipeline continues smoothly and honestly reports the data gap in the final brief.",
    tags: ["Asyncio", "Fault Tolerance", "Data Gaps Handling"],
  },
  {
    num: "02",
    title: "Real-Time UI Tracker",
    icon: Zap,
    description:
      "The Next.js frontend polls the backend using TanStack Query to display a live, step-by-step progress tracker as the AI pipeline works, ensuring users aren't left staring at a static loading spinner.",
    tags: ["TanStack Query", "Live Polling", "UX"],
  },
  {
    num: "03",
    title: "Scalable Architecture",
    icon: Database,
    description:
      "The 'free-tier' data providers (like DIY regex scanning and Playwright) are abstracted behind unified client interfaces, making it trivial to swap them out for enterprise APIs without touching the core orchestration logic.",
    tags: ["Abstracted Interfaces", "Modular Architecture"],
  },
]

const outcomes = [
  { value: "25", label: "Hours Saved", sublabel: "Per month for senior staff" },
  { value: "60s", label: "Delivery Time", sublabel: "From URL to finished PDF brief" },
  { value: "100%", label: "Prep Consistency", sublabel: "Every call thoroughly researched" },
  { value: "0", label: "Hallucinations", sublabel: "Strictly grounded on retrieved data" },
]

/* ─── Component ─── */

export default function AutomatedPreCallBriefGeneratorCaseStudy() {
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
          {/* Ambient background text */}
          <div className="absolute top-[20%] left-[-3%] opacity-[0.015] pointer-events-none z-0 select-none hidden lg:block">
            <span className="font-barlow font-black text-[25vw] leading-[0.8] whitespace-nowrap uppercase">
              PRE-CALL
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)] relative z-10">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              CASE STUDY
            </motion.div>

            <motion.h1
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              PRE-CALL BRIEF
              <br />
              <span className="text-[#333333]">GENERATOR</span>
            </motion.h1>

            <motion.p
              className="text-[17px] md:text-[19px] leading-relaxed text-[#aaaaaa] max-w-3xl mb-10"
              {...fadeProps(0.35)}
            >
              An AI-powered prospect intelligence pipeline that automates pre-call research for marketing agency sales teams.
            </motion.p>

            {/* Meta strip */}
            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-10"
              {...fadeProps(0.45)}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">Domain</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">Sales Enablement & AI</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">By</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">Soban Ahmad, KodoAI</span>
              </div>
            </motion.div>

            {/* Tech pills */}
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
                  LOST
                  <br />
                  IN
                  <br />
                  <span className="text-[#cc4444]">RESEARCH.</span>
                </motion.h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.25)}>
                  Before an inbound discovery call, marketing agency sales reps typically spend 20–40 minutes manually researching a prospect. They dig through the company&apos;s website, LinkedIn profile, and active ads to understand their positioning. In reality, this research often gets skipped due to time constraints, resulting in generic discovery calls and lost deals.
                </motion.p>

                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.35)}>
                  The primary technical challenge was building a highly reliable asynchronous pipeline capable of scraping unstructured data from disparate sources, making sense of it without AI hallucinations, and delivering the final brief—all within a 60–180 second window. Furthermore, the initial version was architected to be completely free-tier optimized for sales demos, requiring graceful degradation when facing rate limits.
                </motion.p>

                <motion.div
                  className="p-6 bg-[#0d0d0d] border border-[#1a1a1a]"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.45)}
                >
                  <p className="text-[15px] leading-[1.8] text-[#f0f0ea] italic">
                    &ldquo;Given just a prospect&apos;s website URL, the system orchestrates a complex data collection and AI analysis pipeline to deliver a structured, actionable intelligence brief straight to the sales rep&apos;s inbox.&rdquo;
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
              PIPELINE FLOW
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              SIX STAGES.
              <br />
              <span className="text-[#333333]">ONE MINUTE.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              The backend is driven by Python, FastAPI, and Celery, executing an asynchronous workflow to gather, analyze, and synthesize prospect data.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {pipelineStages.map((stage, index) => (
                <motion.div
                  key={stage.num}
                  className="group p-6 md:p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#c8f060] transition-all duration-300"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.2 + index * 0.12)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono-custom text-[11px] text-[#444444] tracking-[4px]">
                      {stage.num}
                    </span>
                  </div>

                  <h3 className="font-barlow font-black text-xl uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 mb-4">
                    {stage.label}
                  </h3>

                  <p className="text-[14px] leading-[1.7] text-[#aaaaaa] mb-6">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map((tag) => (
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
              KEY FEATURES
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
              Building a reliable data collection pipeline that won&apos;t fail when third-party services block scraping attempts requires defensive engineering.
            </motion.p>

            {/* Technical details */}
            <div className="space-y-0">
              {keyFeatures.map((item, index) => {
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

        {/* ═══════════════════  OUTCOMES  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              THE IMPACT
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

            <motion.div
              className="mt-12 p-8 bg-[#0a0a0a] border border-[#1a1a1a]"
              style={{ borderRadius: 0 }}
              {...fadeProps(0.4)}
            >
              <ul className="space-y-4">
                {[
                  "Automated the most tedious phase of the sales process, allowing teams to focus on selling rather than researching",
                  "Sales teams walk into every discovery call fully prepared with deep context and tailored talking points",
                  "Guaranteed 100% preparation consistency across all reps, driving higher close rates",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#c8f060] mt-0.5 shrink-0">✓</span>
                    <span className="text-[14px] leading-[1.7] text-[#aaaaaa]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════  CTA  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a]">
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
              WANT TO BUILD
              <br />
              <span className="text-[#c8f060]">AI PIPELINES?</span>
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
