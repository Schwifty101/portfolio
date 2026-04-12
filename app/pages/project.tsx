"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export const Project = () => { // Changed to named export
  const [currentProject, setCurrentProject] = useState(0)
  const [numberPosition, setNumberPosition] = useState(0)
  const [isLgScreen, setIsLgScreen] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const tierConfig: Record<string, { label: string; color: string; bg: string }> = {
    client:    { label: 'CLIENT WORK',       color: '#c8f060', bg: '#0a1a0a' },
    personal:  { label: 'PERSONAL BUILD',    color: '#555555', bg: '#111111' },
    technical: { label: 'TECHNICAL PROJECT', color: '#444444', bg: '#0a0a0a' },
  }

  const projects = [
    {
      id: 1,
      title: "AR&CO Law Associates",
      description:
        "A law firm that ran entirely on phone calls and WhatsApp forwards. We built the infrastructure that lets them operate like a modern firm - client portal, case tracking, appointment booking, and a payment system that handles three different billing models.",
      tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Stripe"],
      year: "2025",
      category: "Full-Stack Platform",
      tier: "client",
      impact: "Live — arandcolaw.com",
      details: "Delivered in 8 weeks. Live at arandcolaw.com",
      link: "https://arandcolaw.com",
      liveLink: "https://arandcolaw.com",
      caseStudyLink: "/case-study/arco-law",
      caseStudy: {
        problem:
          "AR&CO relied entirely on phone calls for consultation bookings and manual bank transfers for payments. No digital presence to onboard clients at scale or process three distinct payment types - one-time, retainer, and per-service.",
        solution:
          "Built three interconnected systems: a public-facing site, an authenticated client portal for document uploads and case tracking, and a full admin dashboard. Stripe handles hybrid payment flows with automated invoice generation.",
        results: [
          "100% of consultation bookings now self-serve",
          "Secure client document sharing live at launch",
          "Firm established a digital identity matching its in-person reputation",
        ],
      },
    },
    {
      id: 2,
      title: "The New Home Architectures",
      description:
        "Their work was exceptional. Their digital presence was a WhatsApp number. We built a portfolio platform with a [content management system] - they can add services, publish new projects, and update content without touching a developer. New clients now mention the site the first time they call.",
      tech: ["Next.js", "NestJS", "Supabase", "WhatsApp API"],
      year: "2025",
      category: "Portfolio + CMS",
      tier: "client",
      impact: "Live — client enquiry platform",
      details:
        "Portfolio platform with full CMS. Services, projects, and content all self-managed by the client.",
      link: "https://thenewhome.pk",
      liveLink: "https://thenewhome.pk",
      caseStudy: {
        problem:
          "The firm's portfolio of high-end interior work was being shared only via WhatsApp images. Prospective clients had no way to evaluate quality before reaching out, and the team had no way to update their own content without calling a developer.",
        solution:
          "Built a portfolio-led site with a curated project gallery, service category pages, and a WhatsApp-first enquiry flow. Added a full content management system so the client owns their content completely.",
        results: [
          "New clients cite the website unprompted at first contact",
          "Client manages all content independently post-launch",
          "Enquiry quality improved - leads arrive pre-qualified",
        ],
      },
    },
    {
      id: 3,
      title: "AI Assessment Platform",
      description:
        "Built for the problem that keeps tech recruiters up at night - candidates submitting AI-generated code. A multi-tenant SaaS with sandboxed remote code execution and a GPT-4 engine that flags AI submissions with reasoning, not just a score.",
      tech: [
        "Next.js", "NestJS", "PostgreSQL",
        "Kubernetes", "Auth0", "GPT-4", "Judge0",
      ],
      year: "2025",
      category: "Full-Stack SaaS",
      tier: "personal",
      impact: "Personal build — in progress",
      details:
        "Multi-tenant. Kubernetes-managed. Architected for 10,000+ concurrent users.",
      link: "https://github.com/Schwifty101",
      caseStudy: {
        problem:
          "Tech recruiters in Asian markets face high candidate drop-off on clunky tools and sophisticated plagiarism that simpler detectors miss entirely.",
        solution:
          "Microservices on Kubernetes with Auth0 multi-tenancy, Judge0 for sandboxed code execution across 40+ languages, and a GPT-4 agent that analyses coding patterns and flags AI-generated submissions with explainable reasoning.",
        results: [
          "Multi-tenant architecture with discrete agency data silos",
          "Sandboxed remote code execution across 40+ languages",
          "AI anti-cheat engine with explainable flagging",
        ],
      },
    },
    {
      id: 4,
      title: "Secure Messaging System",
      description:
        "An end-to-end encrypted messaging system built without touching a single E2EE library. Custom key exchange protocol, AES-256-GCM encryption, and three independent layers of replay attack protection. The server has no access to plaintext at any point.",
      tech: [
        "Next.js", "Node.js", "MongoDB",
        "Web Crypto API", "AES-256-GCM", "ECDH/ECDSA",
      ],
      year: "2024",
      category: "Security / Cryptography",
      tier: "technical",
      impact: "Custom cryptographic protocol",
      details:
        "Academic information security project. Custom AECDH-ECDSA key exchange protocol from scratch.",
      link: "https://github.com/Schwifty101",
      caseStudy: {
        problem:
          "Building real E2EE from scratch means designing key exchange, preventing MITM and replay attacks, and ensuring nothing sensitive ever touches the server.",
        solution:
          "Designed a custom 3-message AECDH-ECDSA key exchange protocol. AES-256-GCM encrypts all messages client-side. Three-layer replay protection: unique nonces, 5-minute timestamp window, and sequence number enforcement.",
        results: [
          "Server has no access to plaintext at any point",
          "MITM attacks prevented via ECDSA digital signatures",
          "Replay attacks blocked by nonce + timestamp + sequence",
        ],
      },
    },
  ]

  // Check for large screen breakpoint
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLgScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = () => checkScreenSize()

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // GSAP-based pinning and scroll tracking (optimized for ScrollSmoother)
  useEffect(() => {
    if (!isLgScreen || !leftColumnRef.current || !gridRef.current || !containerRef.current) return

    let pinTrigger: globalThis.ScrollTrigger | null = null
    let progressTrigger: globalThis.ScrollTrigger | null = null

    // Delay initialization strictly to ensure ScrollSmoother creates its wrapper first
    const timer = setTimeout(() => {
      // 1. Pin the left column
      pinTrigger = ScrollTrigger.create({
        trigger: leftColumnRef.current,
        start: "top top+=128",
        endTrigger: gridRef.current,
        end: () => `bottom top+=${128 + ((leftColumnRef.current as HTMLElement).offsetHeight || 0)}`,
        pin: true,
        pinSpacing: false,
      })

      // 2. Track scroll progress and update project index/numbers
      progressTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          if (!projectRefs.current.length) return

          // Map scroll progress to number position
          const maxMovement = window.innerHeight * 0.15
          const calculatedPosition = self.progress * maxMovement - maxMovement / 2
          setNumberPosition(calculatedPosition)

          // Find the currently visible project based on viewport visual center
          let visibleProject = 0
          let minDistance = Number.POSITIVE_INFINITY

          projectRefs.current.slice(0, projects.length).forEach((ref, index) => {
            if (!ref) return

            const rect = (ref as HTMLElement).getBoundingClientRect()
            const projectCenter = rect.top + rect.height / 2
            const viewportCenter = window.innerHeight / 2
            const distance = Math.abs(projectCenter - viewportCenter)

            if (distance < minDistance) {
              minDistance = distance
              visibleProject = index
            }
          })

          setCurrentProject(visibleProject)
        }
      })

      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (pinTrigger) pinTrigger.kill()
      if (progressTrigger) progressTrigger.kill()
    }
  }, [isLgScreen])

  // Animation variants for just the changing number
  const numberVariants = {
    initial: {
      y: 30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.55, 0.06, 0.68, 0.19] as const,
      },
    },
  }

  return (
    <div id="project" className="min-h-screen bg-[#0a0a0a] text-white border-b border-[#1a1a1a]">
      {/* Header */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="eyebrow-label mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow-bar" />
            SELECTED WORK
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-barlow font-black tracking-[-2px] text-[#f0f0ea] mb-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            CASE STUDIES
          </motion.h2>
        </div>
      </div>

      {/* Conditional Layout Based on Screen Size */}
      <div ref={containerRef} className="container-fluid">
        {isLgScreen ? (
          // Large screen: Two Column Layout with counter
          <div ref={gridRef} className="grid grid-cols-4 gap-y-0 min-h-screen">
            {/* Left Column - Project Numbers */}
            <div ref={leftColumnRef} className="h-fit relative col-span-1 overflow-hidden">
              <div className="flex items-center justify-center h-[60vh] relative">
                <div
                  ref={numberRef}
                  className="relative w-full flex items-end justify-center"
                  style={{
                    transform: `translateY(${numberPosition}px)`,
                    transition: "transform 0.025s ease-out",
                  }}
                >
                  <div className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-[#111111] leading-none opacity-100 select-none text-center flex items-start">
                    <span>0</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentProject}
                        variants={numberVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        {currentProject + 1}
                      </motion.span>
                    </AnimatePresence>
                    <span>.</span>
                  </div>

                  {/* Project Counter */}
                  <div className="absolute bottom-0 left-10 font-mono-custom text-[11px] text-[#444444]">
                    {String(currentProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Cards */}
            <div className="col-span-3 flex flex-col items-end">
              <div className="w-4/5">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    ref={(el) => {
                      projectRefs.current[index] = el
                    }}
                    className="group cursor-pointer mobile-section-gap"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="bg-[#0d0d0d] border border-[#1a1a1a] card-padding-fluid transition-all duration-300 hover:border-[#c8f060]"
                      style={{ borderRadius: 0 }}
                    >
                      {/* Project Header */}
                      <div className="flex justify-between items-start mb-4 lg:mb-6">
                        <div className="font-mono-custom text-[11px] text-[#444444]">{String(index + 1).padStart(2, "0")}</div>
                        <div className="text-right">
                          <div className="font-mono-custom text-[11px] text-[#444444] uppercase tracking-[2px]">{project.year}</div>
                          <div className="font-mono-custom text-[11px] text-[#444444] uppercase tracking-[2px] mt-1">{project.category}</div>
                          {(project as any).tier && tierConfig[(project as any).tier] && (
                            <div style={{
                              marginTop: '4px',
                              display: 'inline-block',
                              padding: '3px 8px',
                              background: tierConfig[(project as any).tier].bg,
                              border: `1px solid ${tierConfig[(project as any).tier].color}`,
                              borderRadius: 0,
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              color: tierConfig[(project as any).tier].color,
                            }}>
                              {tierConfig[(project as any).tier].label}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="space-y-4 lg:space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-2xl lg:text-4xl xl:text-5xl font-barlow font-black uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300">
                            {project.title}
                          </h3>

                          <div className="flex items-center space-x-3 lg:space-x-4">
                            <div className="w-2 h-2 bg-[#c8f060]" style={{ borderRadius: 0 }}></div>
                            <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#c8f060]">{project.impact}</span>
                          </div>
                        </div>

                        <p className="text-[15px] leading-relaxed text-[#aaaaaa]">{project.description}</p>

                        <p className="text-[13px] text-[#555555]">{project.details}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-3 lg:pt-4">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1.5 lg:px-4 lg:py-2 bg-[#111111] border border-[#1a1a1a] text-[#555555] font-mono-custom text-[11px] tracking-[2px] uppercase hover:border-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-300"
                              style={{ borderRadius: 0 }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Case Study Details */}
                        {project.caseStudy && (
                          <div 
                            className="mt-8 p-6 bg-[#0a0a0a] border border-[#1a1a1a] space-y-6"
                            style={{ borderRadius: 0 }}
                          >
                            <div>
                              <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-[#cc4444] mr-2" style={{ borderRadius: 0 }}></span>
                                <span className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#cc4444]">Problem</span>
                              </h4>
                              <p className="text-[#aaaaaa] text-[14px] leading-relaxed">{project.caseStudy.problem}</p>
                            </div>
                            <div>
                              <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-[#555555] mr-2" style={{ borderRadius: 0 }}></span>
                                <span className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#555555]">Approach</span>
                              </h4>
                              <p className="text-[#aaaaaa] text-[14px] leading-relaxed">{project.caseStudy.solution}</p>
                            </div>
                            <div>
                              <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-[#c8f060] mr-2" style={{ borderRadius: 0 }}></span>
                                <span className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#c8f060]">Outcome</span>
                              </h4>
                              <ul className="space-y-2 mt-3">
                                {project.caseStudy.results.map((result, i) => (
                                  <li key={i} className="text-[#aaaaaa] text-[14px] flex items-start">
                                    <span className="text-[#c8f060] mr-2">✓</span>
                                    {result}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* View Project Link */}
                        <div className="pt-4 lg:pt-6 flex items-center gap-4 lg:gap-6 flex-wrap">
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[11px] tracking-[3px] uppercase px-6 py-3 hover:bg-transparent border border-transparent hover:border-[#c8f060] hover:text-[#c8f060] transition-colors duration-300 group/livelink"
                              style={{ borderRadius: 0 }}
                            >
                              <span>Live Demo</span>
                              <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                            </a>
                          )}
                          {(project as any).caseStudyLink && (
                            <Link
                              href={(project as any).caseStudyLink}
                              className="flex items-center bg-transparent text-[#c8f060] font-barlow font-black text-[11px] tracking-[3px] uppercase px-6 py-3 border border-[#c8f060] hover:bg-[#c8f060] hover:text-[#0a0a0a] transition-colors duration-300"
                              style={{ borderRadius: 0 }}
                            >
                              <span>Read Case Study</span>
                              <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                            </Link>
                          )}
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-[#555555] font-mono-custom hover:text-[#c8f060] transition-colors duration-300 group/link"
                          >
                            <span className="text-sm lg:text-base font-medium tracking-wide">View Project</span>
                            <span className="ml-2 text-base lg:text-lg"><ArrowUpRight className="w-4 h-4" /></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Mobile/Tablet: Single column layout with cards only
          <div className="space-y-8 md:space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="bg-[#0d0d0d] border border-[#1a1a1a] card-padding-fluid transition-all duration-300 hover:border-[#c8f060]"
                  style={{ borderRadius: 0 }}
                >
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="font-mono-custom text-[11px] text-[#444444]">{String(index + 1).padStart(2, "0")}</div>
                    <div className="text-right">
                      <div className="font-mono-custom text-[11px] text-[#444444] uppercase tracking-[2px]">{project.year}</div>
                      <div className="font-mono-custom text-[11px] text-[#444444] uppercase tracking-[2px] mt-1">{project.category}</div>
                      {(project as any).tier && tierConfig[(project as any).tier] && (
                        <div style={{
                          marginTop: '4px',
                          display: 'inline-block',
                          padding: '3px 8px',
                          background: tierConfig[(project as any).tier].bg,
                          border: `1px solid ${tierConfig[(project as any).tier].color}`,
                          borderRadius: 0,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color: tierConfig[(project as any).tier].color,
                        }}>
                          {tierConfig[(project as any).tier].label}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-barlow font-black uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#c8f060]" style={{ borderRadius: 0 }}></div>
                        <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#c8f060]">{project.impact}</span>
                      </div>
                    </div>

                    <p className="text-[15px] leading-relaxed text-[#aaaaaa]">{project.description}</p>

                    <p className="text-[13px] text-[#555555]">{project.details}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-[#111111] border border-[#1a1a1a] text-[#555555] font-mono-custom text-[11px] tracking-[2px] uppercase hover:border-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-300"
                          style={{ borderRadius: 0 }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Case Study Details */}
                    {project.caseStudy && (
                      <div 
                        className="mt-6 p-4 md:p-6 bg-[#0a0a0a] border border-[#1a1a1a] space-y-5"
                        style={{ borderRadius: 0 }}
                      >
                        <div>
                          <h4 className="text-gray-300 font-semibold text-sm md:text-base mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-[#cc4444] mr-2" style={{ borderRadius: 0 }}></span>
                            <span className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#cc4444]">Problem</span>
                          </h4>
                          <p className="text-[#aaaaaa] text-[14px] leading-relaxed">{project.caseStudy.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-semibold text-sm md:text-base mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-[#555555] mr-2" style={{ borderRadius: 0 }}></span>
                            <span className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#555555]">Approach</span>
                          </h4>
                          <p className="text-[#aaaaaa] text-[14px] leading-relaxed">{project.caseStudy.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-semibold text-sm md:text-base mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-[#c8f060] mr-2" style={{ borderRadius: 0 }}></span>
                            <span className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#c8f060]">Outcome</span>
                          </h4>
                          <ul className="space-y-2 mt-3">
                            {project.caseStudy.results.map((result, i) => (
                              <li key={i} className="text-[#aaaaaa] text-[14px] flex items-start">
                                <span className="text-[#c8f060] mr-2 mt-0.5">✓</span>
                                <span className="flex-1">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* View Project Link */}
                    <div className="pt-4 flex items-center gap-4 flex-wrap">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[11px] tracking-[3px] uppercase px-6 py-3 hover:bg-transparent border border-transparent hover:border-[#c8f060] hover:text-[#c8f060] transition-colors duration-300 group/livelink"
                          style={{ borderRadius: 0 }}
                        >
                          <span>Live Demo</span>
                          <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                        </a>
                      )}
                      {(project as any).caseStudyLink && (
                        <Link
                          href={(project as any).caseStudyLink}
                          className="flex items-center bg-transparent text-[#c8f060] font-barlow font-black text-[11px] tracking-[3px] uppercase px-6 py-3 border border-[#c8f060] hover:bg-[#c8f060] hover:text-[#0a0a0a] transition-colors duration-300"
                          style={{ borderRadius: 0 }}
                        >
                          <span>Read Case Study</span>
                          <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                        </Link>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#555555] font-mono-custom hover:text-[#c8f060] transition-colors duration-300 group/link"
                      >
                        <span className="text-sm font-medium tracking-wide">View Project</span>
                        <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Navigation Dots - Only show on large screens */}
        {isLgScreen && (
          <div className="flex justify-center space-x-4 py-20">
            {projects.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to project ${index + 1}: ${projects[index].title}`}
                className={`w-3 h-3 transition-all duration-300 ${currentProject === index ? "bg-[#c8f060] scale-125" : "bg-[#222222] hover:bg-gray-600"
                  }`}
                style={{ borderRadius: 0 }}
                onClick={() => {
                  const el = projectRefs.current[index]
                  if (el) {
                    gsap.to(window, {
                      duration: 1,
                      scrollTo: { y: el, offsetY: window.innerHeight / 3 },
                      ease: "power2.inOut"
                    })
                  }
                }}
              />
            ))}
          </div>
        )}


      </div>
    </div>
  )
}
