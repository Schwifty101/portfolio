"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ArrowLeft, Star, Shield, CreditCard, FileText, CheckCircle, Bot, Brain, MessageSquare, Route, FileSearch } from "lucide-react"
import Link from "next/link"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Footer } from "@/app/pages/Footer"

/* ─── Data ─── */

const techStack = [
  "Next.js 16", "NestJS", "Supabase", "PostgreSQL", "LemonSqueezy",
  "Tailwind CSS", "Zod", "React Hook Form", "GSAP", "Framer Motion",
  "Vercel", "Railway",
]

const portals = [
  {
    label: "Public Website",
    num: "01",
    description:
      "A marketing site covering practice areas, team, facilitation services, and subscription offerings. Designed to convert visitors into registered clients and route them into the right intake flow.",
    tags: ["Lead Conversion", "Practice Areas", "Subscription Offerings"],
  },
  {
    label: "Client Portal",
    num: "02",
    description:
      "Authenticated clients can track active cases and their full activity timelines, submit and monitor complaints, book consultations and pay online, access uploaded documents, and manage their Civic Retainer subscription.",
    tags: ["Case Tracking", "Document Access", "Online Payments", "Complaints"],
  },
  {
    label: "Admin & Staff CRM",
    num: "03",
    description:
      "Attorneys and staff manage cases, assign work, log client interactions, process service registrations, send invoices, and audit every action taken in the system. No action goes unrecorded.",
    tags: ["Case Management", "Activity Log", "Invoicing", "Staff Assignment"],
  },
]

const howItWorks = [
  {
    num: "01",
    title: "Layered Authentication",
    icon: Shield,
    description:
      "Every request passes through a JWT guard and a role guard before reaching any handler. Clients see only their own data. Staff see the full system. Row-level security at the database layer acts as a second line of defence independent of the application code.",
    tags: ["JWT Guards", "Role-Based Access", "Row-Level Security"],
  },
  {
    num: "02",
    title: "Webhook-Driven Payments",
    icon: CreditCard,
    description:
      "When a client pays for a subscription, consultation, or service registration, LemonSqueezy sends a cryptographically signed webhook. The backend verifies the HMAC signature, checks for duplicate events, and updates the relevant record. No polling, no manual reconciliation.",
    tags: ["HMAC Verification", "Idempotency", "Three Billing Models"],
  },
  {
    num: "03",
    title: "Automatic Audit Trail",
    icon: FileText,
    description:
      "A global interceptor logs every create, update, delete, and status change across the system without any per-endpoint code. Attorneys can filter the full activity log by user, action type, entity, or date range. This log satisfies the evidentiary requirements firms face in regulated environments.",
    tags: ["Global Interceptor", "Full Mutation Logging", "Regulatory Compliance"],
  },
  {
    num: "04",
    title: "Shared Validation",
    icon: CheckCircle,
    description:
      "The same Zod schemas run on the frontend form and the backend API endpoint. One definition, one source of truth. What the client submits is exactly what the server accepts.",
    tags: ["Zod Schemas", "Single Source of Truth", "Full-Stack Validation"],
  },
]

const aiOpportunities = [
  {
    title: "Intelligent Client Intake",
    icon: Brain,
    description:
      "A GPT-4 layer could extract case context from free-text descriptions, pre-classify the relevant practice area, and flag high-priority queries before a human reviews them.",
    metric: "£100K+",
    metricLabel: "recovered annually for a 5-person firm",
  },
  {
    title: "Document Processing & Extraction",
    icon: FileSearch,
    description:
      "An AI pipeline could read uploaded contracts, complaints, and property documents on upload and surface key clauses, dates, parties, and obligations automatically.",
    metric: "13 hrs",
    metricLabel: "attorney time recovered monthly",
  },
  {
    title: "AI-Generated Case Summaries",
    icon: Bot,
    description:
      "A GPT-4 summary layer could generate a plain-English status update for both the client and the assigned attorney on demand — directly reducing status-update calls.",
    metric: "20–30%",
    metricLabel: "reduction in inbound queries",
  },
  {
    title: "24/7 Client-Facing Chatbot",
    icon: MessageSquare,
    description:
      "A retrieval-augmented chatbot trained on the firm's practice area content and FAQ library would handle the majority of inbound queries outside office hours.",
    metric: "90 days",
    metricLabel: "typical payback period",
  },
  {
    title: "Automated Complaint Routing",
    icon: Route,
    description:
      "An NLP classifier reading the complaint description could route it to the correct practice area and staff member automatically, reducing first-response time.",
    metric: "0",
    metricLabel: "complaints sitting unassigned",
  },
]

const outcomes = [
  { value: "3", label: "Portals Live", sublabel: "Public · Client · Admin" },
  { value: "3", label: "Payment Types", sublabel: "Subscription · One-time · Per-service" },
  { value: "100%", label: "Self-Serve Booking", sublabel: "Zero phone calls required" },
  { value: "5★", label: "Upwork Rating", sublabel: "Client satisfaction" },
]

/* ─── Component ─── */

export default function ArcoCaseStudy() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
    ;(async function () {
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
                  (Silicon Studio)
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
            <span className="font-barlow font-black text-[28vw] leading-[0.8] whitespace-nowrap uppercase">
              AR&CO
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
              AR&CO LAW
              <br />
              <span className="text-[#333333]">ASSOCIATES</span>
            </motion.h1>

            <motion.p
              className="text-[17px] md:text-[19px] leading-relaxed text-[#aaaaaa] max-w-3xl mb-10"
              {...fadeProps(0.35)}
            >
              Client portal, workflow automation, and AI-ready infrastructure for a law firm
              that was running on phone calls and spreadsheets.
            </motion.p>

            {/* Meta strip */}
            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-10"
              {...fadeProps(0.45)}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">Client</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">AR&CO Law Associates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#1a1a1a]">
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">By</span>
                <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#f0f0ea]">Soban Ahmad, Silicon.Studio</span>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0a1a0a] border border-[#c8f060]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#c8f060] text-[#c8f060]" />
                ))}
                <span className="font-mono-custom text-[10px] tracking-[2px] uppercase text-[#c8f060] ml-1">UPWORK</span>
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
                  RUNNING
                  <br />
                  ON
                  <br />
                  <span className="text-[#cc4444]">INBOXES.</span>
                </motion.h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.25)}>
                  AR&CO Law Associates were running their client operations through email and phone calls.
                  New clients had no way to track their cases, submit complaints, or access their documents
                  without calling the office directly. Staff were spending hours each week on intake admin, manual
                  payment collection, and chasing document uploads. The firm had no single system of record for
                  client interactions, cases, or billing.
                </motion.p>

                <motion.p className="text-[15px] leading-[1.8] text-[#aaaaaa]" {...fadeProps(0.35)}>
                  The result: attorneys were fielding status-update calls instead of doing legal work, and clients
                  had no visibility into what was happening with their matter.
                </motion.p>

                <motion.div
                  className="p-6 bg-[#0d0d0d] border border-[#1a1a1a]"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.45)}
                >
                  <p className="text-[15px] leading-[1.8] text-[#f0f0ea] italic">
                    &ldquo;They needed a secure, professional platform that would let clients self-serve
                    and let staff stop managing operations through their inboxes.&rdquo;
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
              THREE PORTALS.
              <br />
              <span className="text-[#333333]">ONE PLATFORM.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              A full-stack law firm platform with three distinct portals, each built for a different audience.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {portals.map((portal, index) => (
                <motion.div
                  key={portal.num}
                  className="group p-6 md:p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#c8f060] transition-all duration-300"
                  style={{ borderRadius: 0 }}
                  {...fadeProps(0.2 + index * 0.12)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono-custom text-[11px] text-[#444444] tracking-[4px]">
                      {portal.num}
                    </span>
                  </div>

                  <h3 className="font-barlow font-black text-xl md:text-2xl uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 mb-4">
                    {portal.label}
                  </h3>

                  <p className="text-[14px] leading-[1.7] text-[#aaaaaa] mb-6">
                    {portal.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {portal.tags.map((tag) => (
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
              The platform runs a NestJS backend API behind a Next.js frontend served through a secure proxy.
              Supabase handles authentication, database, row-level security, and file storage. LemonSqueezy
              processes payments as Merchant of Record.
            </motion.p>

            {/* Architecture diagram */}
            <motion.div
              className="mb-16 p-4 md:p-8 bg-[#0d0d0d] border border-[#1a1a1a] flex justify-center"
              style={{ borderRadius: 0 }}
              {...fadeProps(0.35)}
            >
              <img
                src="/arco-architecture.png"
                alt="AR&CO Platform Architecture — Three portals connected through a NestJS API to Supabase Auth, PostgreSQL, and LemonSqueezy Payments"
                className="w-full max-w-2xl h-auto"
                style={{ filter: "brightness(1.05)" }}
                loading="lazy"
              />
            </motion.div>

            {/* Technical details */}
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

        {/* ═══════════════════  AI OPPORTUNITIES  ═══════════════════ */}
        <section className="py-20 md:py-32 border-b border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-[clamp(1rem,5vw,4rem)]">
            <motion.div className="eyebrow-label mb-6" {...fadeProps(0.1)}>
              <span className="eyebrow-bar" />
              AI-READY INFRASTRUCTURE
            </motion.div>

            <motion.h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-[-2px] mb-4"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.9 }}
              {...fadeProps(0.2)}
            >
              WHERE AI
              <br />
              <span className="text-[#c8f060]">MULTIPLIES</span>
              <br />
              <span className="text-[#333333]">THE VALUE.</span>
            </motion.h2>

            <motion.p
              className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-3xl mb-16"
              {...fadeProps(0.3)}
            >
              This platform was delivered without AI. That was the right call for the initial scope.
              The architecture is designed to support AI augmentation at several high-value points —
              each one a discrete, scoped integration that can be added without rebuilding anything.
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

                    {/* ROI metric */}
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

            <motion.p
              className="mt-8 text-[13px] text-[#555555] font-mono-custom tracking-[1px]"
              {...fadeProps(0.5)}
            >
              None of these require starting over. Each connects to the existing data model and API structure that is already live.
            </motion.p>
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

            {/* Additional outcomes list */}
            <motion.div
              className="mt-12 p-8 bg-[#0d0d0d] border border-[#1a1a1a]"
              style={{ borderRadius: 0 }}
              {...fadeProps(0.4)}
            >
              <ul className="space-y-4">
                {[
                  "Full client portal live, handling intake, case tracking, document management, payments, and subscriptions",
                  "Staff CRM replacing spreadsheets and email threads, with a full auditable activity log",
                  "Payment processing live across three service types with automated reconciliation and no manual intervention",
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

              <a
                href="https://arandcolaw.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-4 text-[#555555] font-mono-custom text-[13px] tracking-[2px] uppercase border border-[#1a1a1a] hover:border-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-200"
                style={{ borderRadius: 0 }}
              >
                <span>VIEW LIVE SITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
