"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'
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

  const projects = [
    {
      id: 1,
      title: "AR&CO Law Associates — Full-Stack Platform",
      description: "Full-stack platform built for AR&CO Law Associates, a premier law firm in Islamabad. Delivered a custom frontend with scroll animations, a client portal with authentication and dashboard, an admin dashboard for managing consultations and users, and integrated payment gateways covering consultation booking, monthly retainer and one-time service payments.",
      tech: ["Next.js", "NestJS", "PostgreSQL", "AWS"],
      year: "2025",
      category: "Full-Stack Platform",
      impact: "Client Project",
      details: "Delivered a custom frontend, client portal with authentication, admin dashboard, and integrated payment gateways for consultation booking.",
      link: "https://ar-co-web.vercel.app",
      liveLink: "https://ar-co-web.vercel.app",
      caseStudy: {
        problem: "AR&CO, a premier law firm, relied on manual processes for consultation bookings and retainer payments. They lacked a centralized digital presence to onboard clients efficiently, manage legal documents securely, and process multi-tier payments.",
        solution: "Architected a full-stack platform featuring a public-facing dynamic frontend, an authenticated client portal, and a powerful admin dashboard. Integrated Stripe for hybrid payment flows (one-time bookings vs. monthly subscription retainers).",
        results: ["Automated 100% of consultation bookings", "Enabled secure document sharing", "Established a premium digital brand identity"]
      }
    },
    {
      id: 2,
      title: "AI-Powered Assessment Platform",
      description: "Leading a 4-person team building a comprehensive SaaS assessment platform for the Asian tech market. Features multi-tenant architecture, AI-powered plagiarism detection, and integrated proctoring.",
      tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Kubernetes", "OpenAI GPT-4"],
      year: "2025",
      category: "Full-Stack SaaS",
      impact: "Multi-tenant SaaS Platform",
      details: "Architected scalable microservices with Kubernetes deployment, Auth0 integration, Judge0 code execution, and role-based access control with AI-powered features.",
      link: "https://github.com/Schwifty101/AI-Assessment-Platform",
      caseStudy: {
        problem: "Tech recruiters in the Asian market faced high drop-off rates due to clunky assessment tools, while dealing with increasingly sophisticated candidate plagiarism that traditional tools couldn't catch.",
        solution: "Built a microservices-based SaaS platform with Kubernetes. Integrated Judge0 for secure remote code execution and implemented an AI agent using GPT-4 to analyze coding patterns and flag AI-generated submissions.",
        results: ["Multi-tenant architecture supporting discrete agency silos", "Seamless remote code execution", "Advanced AI anti-cheat mechanisms"]
      }
    },
    {
      id: 3,
      title: "Multi-Commerce Admin Dashboard",
      description: "Full-stack e-commerce management system with AWS integration, user authentication, and comprehensive order management. Built for scalability and performance.",
      tech: ["React.js", "Node.js", "MongoDB", "AWS", "ShadCN UI", "Authentication"],
      year: "2024",
      category: "Full-Stack Development",
      impact: "Complete E-commerce Solution",
      details: "MERN stack dashboard with cloud integration, secure authentication, inventory management, and modern UI components for optimal user experience.",
      link: "https://github.com/Schwifty101/MultiCommerce-Admin-Dashboard",
      caseStudy: {
        problem: "Managing multiple storefronts required fragmented tools, leading to inventory desync, delayed order processing, and a lack of centralized oversight.",
        solution: "Developed a centralized MERN stack admin dashboard with AWS cloud integration, providing unified real-time inventory management and secure multi-role authentication.",
        results: ["Centralized multi-channel inventory control", "Scalable cloud integration for peak traffic", "Streamlined order management workflow"]
      }
    },
    {
      id: 4,
      title: "Traffic Sign Classification using CNN",
      description: "Built a deep learning system achieving 98.75% accuracy in recognizing 43 different traffic sign types. Expanded training data from 39K to 162K images using advanced data augmentation techniques.",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
      year: "2024",
      category: "Machine Learning",
      impact: "98.75% Accuracy",
      details: "Implemented convolutional neural network with image preprocessing, data augmentation, and model optimization techniques for robust traffic sign detection.",
      link: "https://github.com/Schwifty101/TrafficSignClassificationCNN",
      caseStudy: {
        problem: "Autonomous driving systems struggle to reliably parse traffic signs under varying lighting, weather, and motion blur conditions, impacting safety.",
        solution: "Engineered a custom Convolutional Neural Network (CNN) in TensorFlow. Implemented robust data augmentation strategies to expand the dataset from 39K to 162K images, effectively teaching the model to handle edge cases.",
        results: ["Achieved 98.75% classification accuracy", "Robust detection across 43 different sign classifications", "Pre-processed data for rapid real-time inference"]
      }
    }
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

  // Pin the left column using ScrollTrigger (works with ScrollSmoother)
  useEffect(() => {
    if (!isLgScreen || !leftColumnRef.current || !gridRef.current) return

    const timer = requestAnimationFrame(() => {
      const trigger = ScrollTrigger.create({
        trigger: leftColumnRef.current,
        start: "top top+=128",
        endTrigger: gridRef.current,
        end: () => `bottom top+=${128 + (leftColumnRef.current?.offsetHeight || 0)}`,
        pin: true,
        pinSpacing: false,
      })

      ScrollTrigger.refresh()

      return () => trigger.kill()
    })

    return () => cancelAnimationFrame(timer)
  }, [isLgScreen])

  // Optimized scroll handling with throttling (only on large screens)
  useEffect(() => {
    if (!isLgScreen) return

    let ticking = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      lastScrollY = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProjectState(lastScrollY)
          ticking = false
        })

        ticking = true
      }
    }

    const updateProjectState = (scrollY: number) => {
      if (!containerRef.current || projectRefs.current.length === 0) return

      // Get the container bounds
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight

      // Calculate scroll progress through the projects section (0 to 1)
      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollY - containerTop + window.innerHeight / 2) / containerHeight),
      )

      // Map scroll progress to number position
      const maxMovement = window.innerHeight * 0.15
      const calculatedPosition = scrollProgress * maxMovement - maxMovement / 2
      setNumberPosition(calculatedPosition)

      // Find the currently visible project based on viewport center
      let visibleProject = 0
      let minDistance = Number.POSITIVE_INFINITY

      projectRefs.current.slice(0, projects.length).forEach((ref, index) => {
        if (!ref) return

        const rect = ref.getBoundingClientRect()
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

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
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
    <div id="project" className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-8"
          >
            (Case Studies)
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            CASE STUDIES
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 leading-relaxed font-light max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A curated collection of client solutions showcasing strategic problem solving and bottom-line impact.
          </motion.p>
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
                  <div className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-black text-gray-900 leading-none opacity-80 select-none text-center flex items-start">
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
                  <div className="absolute bottom-0 left-10 text-gray-500 text-sm font-mono">
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
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl lg:rounded-2xl card-padding-fluid hover:border-gray-600 transition-all duration-500 hover:shadow-2xl">
                      {/* Project Header */}
                      <div className="flex justify-between items-start mb-4 lg:mb-6">
                        <div className="text-gray-500 text-sm font-mono">{String(index + 1).padStart(2, "0")}</div>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm">{project.year}</div>
                          <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">{project.category}</div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="space-y-4 lg:space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                            {project.title}
                          </h3>

                          <div className="flex items-center space-x-3 lg:space-x-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-400 text-sm font-medium">{project.impact}</span>
                          </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-base lg:text-lg">{project.description}</p>

                        <p className="text-gray-500 leading-relaxed text-sm lg:text-base">{project.details}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-3 lg:pt-4">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gray-800 text-gray-300 text-xs lg:text-sm rounded-full font-light hover:bg-gray-700 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Case Study Details */}
                        {project.caseStudy && (
                          <div className="mt-8 p-6 bg-gray-950/50 rounded-xl border border-gray-800 space-y-6">
                            <div>
                              <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                                The Problem
                              </h4>
                              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">{project.caseStudy.problem}</p>
                            </div>
                            <div>
                              <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                The Solution
                              </h4>
                              <p className="text-gray-400 text-sm lg:text-base leading-relaxed">{project.caseStudy.solution}</p>
                            </div>
                            <div>
                              <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                The Impact
                              </h4>
                              <ul className="space-y-2">
                                {project.caseStudy.results.map((result, i) => (
                                  <li key={i} className="text-gray-400 text-sm lg:text-base flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
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
                              className="flex items-center bg-white text-black px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:bg-gray-200 transition-colors duration-300 group/livelink"
                            >
                              <span className="text-sm lg:text-base font-semibold tracking-wide">Live Demo</span>
                              <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                            </a>
                          )}
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group/link"
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
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl card-padding-fluid hover:border-gray-600 transition-all duration-500 hover:shadow-2xl">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="text-gray-500 text-sm font-mono">{String(index + 1).padStart(2, "0")}</div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">{project.year}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">{project.category}</div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-400 text-sm font-medium">{project.impact}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed text-base">{project.description}</p>

                    <p className="text-gray-500 leading-relaxed text-sm">{project.details}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs rounded-full font-light hover:bg-gray-700 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Case Study Details */}
                    {project.caseStudy && (
                      <div className="mt-6 p-4 md:p-6 bg-gray-950/50 rounded-xl border border-gray-800 space-y-5">
                        <div>
                          <h4 className="text-gray-300 font-semibold text-sm md:text-base mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                            The Problem
                          </h4>
                          <p className="text-gray-400 text-sm md:text-base leading-relaxed">{project.caseStudy.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-semibold text-sm md:text-base mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                            The Solution
                          </h4>
                          <p className="text-gray-400 text-sm md:text-base leading-relaxed">{project.caseStudy.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-semibold text-sm md:text-base mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            The Impact
                          </h4>
                          <ul className="space-y-2">
                            {project.caseStudy.results.map((result, i) => (
                              <li key={i} className="text-gray-400 text-sm md:text-base flex items-start">
                                <span className="text-green-500 mr-2 mt-0.5">✓</span>
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
                          className="flex items-center bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 group/livelink"
                        >
                          <span className="text-sm font-semibold tracking-wide">Live Demo</span>
                          <span className="ml-2 text-base"><ArrowUpRight className="w-4 h-4" /></span>
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group/link"
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentProject === index ? "bg-white scale-125" : "bg-gray-600 hover:bg-gray-500"
                  }`}
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

        {/* Call to Action */}
        <motion.div
          className="text-center pb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <button
            className="mt-6 md:mt-8 inline-flex items-center space-x-1 md:space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 md:px-12 py-3 md:py-6 rounded-full font-medium text-sm md:text-base tracking-wide md:tracking-wider uppercase transition-all duration-300 transform hover:scale-105 group"
          >
            <a
              href="https://github.com/Schwifty101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-colors duration-300 group/link"
            >VIEW ALL PROJECTS</a>
            <span className=""><ArrowUpRight className="w-4 h-4" /></span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
