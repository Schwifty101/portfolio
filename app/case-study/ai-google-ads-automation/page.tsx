"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ArrowLeft, Star, Search, Image as ImageIcon, Briefcase, ShieldCheck, UserCheck, Zap, Database, CheckSquare, Layers } from "lucide-react"
import Link from "next/link"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Footer } from "@/app/pages/Footer"

/* ─── Data ─── */

const techStack = [
  "LangChain", "Python", "Node.js", "Next.js", "Supabase", "PostgreSQL",
  "Google Ads API", "SerpApi", "Gemini", "Satori", "Resvg"
]

const features = [
  {
    label: "Competitive Analysis",
    num: "01",
    description: "Scrapes and analyzes 100+ competitor ads, ranking angles by longevity to find proven strategies and gap opportunities.",
    tags: ["SerpApi", "Longevity Ranking", "Gap Analysis"],
  },
  {
    label: "Variant Generation",
    num: "02",
    description: "Generates gap-first Search RSA headlines and descriptions, strictly adhering to character limits and insight-derived strategies.",
    tags: ["Deterministic Padding", "Insight Mapping"],
  },
  {
    label: "Display Creative Generation",
    num: "03",
    description: "Uses structured render-specs to generate Display ads automatically into 7 standard sizes without the LLM ever writing layout HTML/CSS.",
    tags: ["Satori", "Resvg", "Dynamic Scaling"],
  },
]

const howItWorks = [
  {
    num: "01",
    title: "Deterministic Budgeting",
    icon: Database,
    description: "The LLM never sets or modifies budgets. Budget values flow deterministically from the client profile and are hard-capped at every layer.",
    tags: ["Hard Capping", "Strict Execution"],
  },
  {
    num: "02",
    title: "Two-Layer Quality Gate",
    icon: ShieldCheck,
    description: "A deterministic policy scan checks for banned superlatives and terms. The LLM rubric critiques clarity, CTA strength, and differentiation.",
    tags: ["Compliance Gate", "Double Verification"],
  },
  {
    num: "03",
    title: "Automated Campaign Assembly",
    icon: Layers,
    description: "Assembles ad groups, keyword distributions, and bid strategies automatically based on insights without human assembly time.",
    tags: ["Smart Defaults", "Token Distribution"],
  },
  {
    num: "04",
    title: "Explicit Human Launch",
    icon: CheckSquare,
    description: "The system never publishes on its own. Every campaign creation requires an explicit human review and approval action via a modal.",
    tags: ["Human in the Loop", "Configure by Exception"],
  },
]

const valueImpact = [
  {
    title: "95% Less Labor",
    icon: Zap,
    description: "Campaign setup drops from 13-25 hours per client down to 30-60 minutes, consisting mostly of quick human review.",
    metric: "95%",
    metricLabel: "Time saved per campaign",
  },
  {
    title: "Exponential Capacity",
    icon: UserCheck,
    description: "Account managers can scale from 5-8 clients up to 25-40 without sacrificing ad quality, unlocking pure margin.",
    metric: "3-5x",
    metricLabel: "Increase in client capacity",
  },
  {
    title: "Insight-Driven Ads",
    icon: Search,
    description: "Unlike generic AI copywriting tools, every ad variant is grounded in competitive intelligence and longevity data.",
    metric: "100+",
    metricLabel: "Competitor ads analyzed",
  },
]

const outcomes = [
  { value: "0.5 hr", label: "Setup Time", sublabel: "Down from 13-25 hours" },
  { value: "3-5x", label: "AM Capacity", sublabel: "More clients per manager" },
  { value: "7", label: "Ad Sizes", sublabel: "Auto-rendered Display images" },
  { value: "0", label: "Policy Errors", sublabel: "Zero non-compliant ads pushed" },
]

/* ─── Component ─── */

export default function GoogleAdsAutomationCaseStudy() {
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
              ADS CO-PILOT
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
              AI GOOGLE ADS
              <br />
              <span className="text-[#333333]">AUTOMATION</span>
            </motion.h1>

            <motion.p
              className="text-[17px] md:text-[19px] leading-relaxed text-[#aaaaaa] max-w-3xl mb-10"
              {...fadeProps(0.35)}
            >
              An automated research-to-launch system that distills competitive intelligence into policy-safe, highly optimized Google Ads campaigns, saving agencies up to 95% of setup time.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-10"
              {...fadeProps(0.45)}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">Vertical</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">Marketing Agencies</span>
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
                  MANUAL
                  <br />
                  SETUP
                  <br />
                  <span className="text-[#cc4444]">DOESN'T SCALE.</span>
                </motion.h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.25)}>
                  Marketing agencies running Google Ads for multiple clients face an operational bottleneck that has nothing to do with strategy — it's the hours of repetitive labor before a single ad serves.
                </motion.p>

                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.35)}>
                  For every new client campaign, an account manager spends 13 to 25 hours on competitive research, ad copywriting, display creative production, campaign assembly, and policy review.
                </motion.p>

                <motion.div
                  className="p-6 bg-[#0d0d0d] border border-[#1a1a1a]"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.45)}
                >
                  <p className="text-[15px] leading-[1.8] text-[#f0f0ea] italic">
                    &ldquo;Agencies either limit their client count, hire junior staff who make policy mistakes risking account suspensions, or cut corners on research producing generic ads.&rdquo;
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
              RESEARCH-TO-LAUNCH
              <br />
              <span className="text-[#333333]">CO-PILOT.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              This system automates the entire front half of Google Ads management while keeping humans in control of strategy, budgets, and the publish button.
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
              SAFETY & ARCHITECTURE
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              NON-NEGOTIABLE
              <br />
              <span className="text-[#333333]">CONSTRAINTS.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              The system relies on a LangChain Python service and a Next.js dashboard, communicating to a Supabase Postgres database. Safety is designed into the core architecture.
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
              AGENCY-LEVEL
              <br />
              <span className="text-[#c8f060]">IMPACT.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              The system doesn't just save time — it changes the agency's unit economics. Adding clients 7-25 is pure margin without a new hire needed.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {valueImpact.map((ai, index) => {
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
