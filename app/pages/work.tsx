"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const tierConfig: Record<string, { label: string; color: string; bg: string }> = {
  client:    { label: "CLIENT WORK",       color: "#c8f060", bg: "#0a1a0a" },
  personal:  { label: "PERSONAL BUILD",    color: "#555555", bg: "#111111" },
  technical: { label: "TECHNICAL PROJECT", color: "#444444", bg: "#0a0a0a" },
}

const projects = [
  {
    id: 1,
    title: "AI Voice Receptionist for Med Spas",
    year: "2026",
    category: "Voice AI & Automation",
    tier: "client",
    tech: ["Twilio", "Vapi", "Deepgram", "Claude 3.5", "Fastify", "Supabase", "Next.js"],
    description:
      "A production-grade voice AI receptionist for med spas that answers calls, checks real-time availability, and books appointments 24/7.",
    caseStudyLink: "/case-study/ai-voice-receptionist",
  },
  {
    id: 2,
    title: "AI Google Ads Co-Pilot",
    year: "2026",
    category: "AI & Marketing Automation",
    tier: "client",
    tech: ["LangChain", "Python", "Next.js", "Node.js", "Supabase", "Google Ads API"],
    description:
      "An automated research-to-launch system that distills competitive intelligence into policy-safe, highly optimized Google Ads campaigns.",
    caseStudyLink: "/case-study/ai-google-ads-automation",
  },
  {
    id: 3,
    title: "Automated Pre-Call Brief Generator",
    year: "2026",
    category: "AI & Automation",
    tier: "client",
    tech: ["Python", "FastAPI", "Next.js", "Playwright", "Gemini API", "Celery", "PostgreSQL"],
    description:
      "An intelligent automation system that generates comprehensive pre-call briefs by scraping prospect data, analyzing it with AI, and delivering actionable insights before every sales call.",
    caseStudyLink: "/case-study/automated-pre-call-brief-generator",
  },
  {
    id: 4,
    title: "AR&CO Law Associates",
    year: "2025",
    category: "Full-Stack Platform",
    tier: "client",
    tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Stripe"],
    description:
      "Complete digital transformation for a law firm — from client portal to case management, payment processing, and automated workflows. Live at arandcolaw.com",
    caseStudyLink: "/case-study/arco-law",
    liveLink: "https://arandcolaw.com",
  },
  {
    id: 5,
    title: "AI Assessment Platform",
    year: "2025",
    category: "Full-Stack SaaS",
    tier: "personal",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Kubernetes", "Auth0", "GPT-4", "Judge0"],
    description:
      "End-to-end SaaS platform for AI-powered coding assessments with real-time code execution, automated grading, and comprehensive analytics.",
  },
  {
    id: 6,
    title: "Secure Messaging System",
    year: "2024",
    category: "Security / Cryptography",
    tier: "technical",
    tech: ["Next.js", "Node.js", "MongoDB", "Web Crypto API", "AES-256-GCM", "ECDH/ECDSA"],
    description:
      "Military-grade encrypted messaging platform implementing end-to-end encryption with perfect forward secrecy.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

const cardVariantsReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export function Work() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="work" className="section-padding bg-[#0a0a0a] text-[#f0f0ea] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="space-y-6 lg:space-y-8 mb-16 lg:mb-24">
          <motion.div
            className="eyebrow-label"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.8 },
                  viewport: { once: true },
                })}
          >
            <span className="eyebrow-bar" />
            SELECTED WORK
          </motion.div>

          <motion.h2
            className="section-title font-barlow font-black uppercase text-[#f0f0ea]"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, x: -100 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { duration: 1.2, ease: "easeOut" },
                  viewport: { once: true },
                })}
          >
            CASE STUDIES
          </motion.h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const tier = tierConfig[project.tier]

            return (
              <motion.div
                key={project.id}
                custom={index}
                variants={prefersReducedMotion ? cardVariantsReduced : cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                transition={prefersReducedMotion ? undefined : { type: "tween", duration: 0.25 }}
                className="group"
              >
                <div
                  className="h-full bg-[#111111] border border-[#1a1a1a] p-6 lg:p-8 transition-all duration-300 hover:border-[#c8f060] flex flex-col"
                  style={{ borderRadius: 0 }}
                >
                  {/* Top Row: Category + Tier */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#444444]">
                      {project.category}
                    </span>
                    <div
                      className="px-2 py-1 font-mono-custom text-[10px] font-bold tracking-[2px] uppercase"
                      style={{
                        color: tier.color,
                        background: tier.bg,
                        border: `1px solid ${tier.color}`,
                        borderRadius: 0,
                      }}
                    >
                      {tier.label}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-barlow font-black uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 mb-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] leading-[1.7] text-[#aaaaaa] mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] text-[#555555] font-mono-custom text-[11px] tracking-[2px] uppercase hover:border-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-300"
                        style={{ borderRadius: 0 }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Year + Actions */}
                  <div className="flex items-center justify-between pt-5 border-t border-[#1a1a1a] mt-auto">
                    <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#444444]">
                      {project.year}
                    </span>

                    <div className="flex items-center gap-4">
                      {project.caseStudyLink && (
                        <Link
                          href={project.caseStudyLink}
                          className="flex items-center gap-1.5 font-mono-custom text-[11px] tracking-[2px] uppercase text-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-300"
                        >
                          Read Case Study
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[11px] tracking-[3px] uppercase hover:bg-transparent border border-transparent hover:border-[#c8f060] hover:text-[#c8f060] transition-colors duration-300"
                          style={{ borderRadius: 0 }}
                        >
                          Visit Live
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
