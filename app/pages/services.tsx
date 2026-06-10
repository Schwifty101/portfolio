"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { useMobile } from "@/hooks/useMobile"

const services = [
  {
    title: "Pre-Sales Automation",
    description:
      "Prospect URL in. Branded discovery brief in the AE's inbox in 90 seconds. A six-stage async pipeline scrapes website, LinkedIn, Meta Ad Library, Google Ads, tech stack, and PageSpeed — then synthesises it into a brief that preps your team before they dial. 25 hours saved per month. 100% prep consistency.",
    tags: ["Python", "FastAPI", "Gemini 2.5 Pro", "Playwright", "Celery", "Redis"],
  },
  {
    title: "Ad Operations Automation",
    description:
      "Autonomous agents that generate, deploy, A/B test, and optimise ad creative across Meta, Google, and TikTok. Monitors CTR, CPR, and ROAS in real time. Detects creative fatigue. Reallocates budget automatically. Produces 25–40 creatives per month — no strategist in the loop until human approval.",
    tags: ["Meta API", "Google Ads API", "Python", "Celery", "PostgreSQL", "Docker"],
  },
  {
    title: "Intake & Lead Generation Agents",
    description:
      "After-hours agents that answer DMs, qualify leads, handle pricing questions, and book calls — 24/7, across web, phone, and Instagram. Lead generation pipelines that scrape, enrich, and deliver prospect lists on a schedule. No missed leads. No manual list-building.",
    tags: ["Twilio", "Next.js", "FastAPI", "Cal.com", "Supabase", "Railway"],
  },
  {
    title: "Onboarding & Intelligence Agents",
    description:
      "Kickoff transcript plus client URL equals a full strategy brief before the call ends. Competitor ad monitoring agents that surface creative shifts and spend signals daily. Reporting pipelines that pull cross-platform data, synthesise, and deliver — without a human touching a spreadsheet.",
    tags: ["Gemini 2.5 Flash", "Playwright", "TanStack Query", "n8n", "PostgreSQL", "Docker"],
  },
]

function Services() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobile()

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-[#0a0a0a] text-white relative overflow-hidden border-b border-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            className="eyebrow-label mb-8"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: isMobile ? 16 : 30 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.2 },
                  viewport: { once: true, amount: 0.15 },
                })}
          >
            <span className="eyebrow-bar" />
            WHAT I DO
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="section-title font-barlow uppercase text-[#f0f0ea] mb-8"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, x: isMobile ? 0 : -100 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { duration: isMobile ? 0.6 : 1.2, ease: "easeOut" },
                  viewport: { once: true, amount: 0.15 },
                })}
          >
            Services
          </motion.h2>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="border-t border-[#1a1a1a] last:border-b last:border-[#1a1a1a]"
              {...(prefersReducedMotion
                ? { initial: false }
                : {
                    initial: { opacity: 0, y: isMobile ? 16 : 50 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.8,
                      delay: isMobile
                        ? Math.min(0.2, 0.3 + index * 0.1)
                        : 0.3 + index * 0.15,
                    },
                    viewport: { once: true, amount: 0.15 },
                  })}
            >
              <motion.div
                className="py-10 md:py-12 group cursor-default"
                whileHover={prefersReducedMotion ? undefined : { x: isMobile ? 0 : 20 }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                {/* Desktop: 12-col grid */}
                <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="font-mono-custom text-[32px] font-bold text-[#333333] leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-4">
                    <h3 className="font-barlow font-black text-3xl lg:text-5xl uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 leading-[0.9] tracking-[-0.05em]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-4">
                    <p className="text-[15px] leading-[1.7] text-[#aaaaaa]">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="col-span-3 flex flex-wrap gap-2 justify-end">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-custom text-[10px] font-bold uppercase tracking-[2px] border border-[#222222] px-3 py-1 text-[#555555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile: stacked layout */}
                <div className="lg:hidden space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono-custom text-[24px] font-bold text-[#333333] leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-barlow font-black text-3xl uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 leading-[0.9] tracking-[-0.05em]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-[1.7] text-[#aaaaaa]">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-custom text-[10px] font-bold uppercase tracking-[2px] border border-[#222222] px-3 py-1 text-[#555555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Services }
