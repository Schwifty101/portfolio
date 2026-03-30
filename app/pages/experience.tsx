"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useRef } from "react"

const Experience = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const experiences = [
    {
      title: "Team Lead – AI-Powered Assessment Platform",
      company: "Self-Driven Project",
      period: "Mar 2025 – Present",
      description:
        "Leading a 4-person team building a SaaS assessment platform for the Asian tech market. Architected a multi-tenant system using NestJS, Next.js, PostgreSQL, and Kubernetes on AWS.",
      current: true,
      impact: "35% API latency reduction",
      technologies: ["NestJS", "Next.js", "PostgreSQL", "Kubernetes", "AWS"],
    },
    {
      title: "PK Delivery Management Intern",
      company: "Systems Limited",
      period: "June - Aug, 2025",
      description:
        "Built NestJS microservices with PostgreSQL, reducing API latency by 35%. Developed real-time delivery tracker for 150+ deliveries/day.",
      current: false,
      impact: "20% workflow efficiency improvement",
      technologies: ["NestJS", "PostgreSQL", "Redis", "WebSocket"],
    },
    {
      title: "Fullstack & QA Intern",
      company: "zAxiss",
      period: "June - Aug, 2024",
      description:
        "Created an AI chatbot using REST APIs & Generative AI (↑25% engagement). Improved QA process, reducing delivery time by 15%.",
      current: false,
      impact: "25% engagement increase",
      technologies: ["React", "Node.js", "AI APIs", "Testing"],
    },
    {
      title: "Frontend Development Intern",
      company: "Allied Consultants",
      period: "June - Sept, 2022",
      description:
        "Built responsive interfaces using HTML5, CSS3, and JS. Ensured mobile-first cross-browser compatibility.",
      current: false,
      impact: "Cross-browser compatibility",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-[#0d0d0d] text-[#f0f0ea] relative overflow-hidden border-b border-[#1a1a1a]">

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <div className="space-y-16 lg:space-y-24">
          {/* Header */}
          <div className="space-y-6 lg:space-y-8">
            <motion.div
              className="eyebrow-label"
              {...(prefersReducedMotion
                ? { initial: false }
                : {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: 0.2 },
                    viewport: { once: true, amount: 0.15 },
                  })}
            >
              <span className="eyebrow-bar" />
              EXPERIENCE
            </motion.div>

            <motion.h2
              ref={titleRef}
              className="section-title font-barlow font-black uppercase text-[#f0f0ea]"
              {...(prefersReducedMotion
                ? { initial: false }
                : {
                    initial: { opacity: 0, x: -100 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { duration: 1.2, ease: "easeOut" },
                    viewport: { once: true, amount: 0.15 },
                  })}
            >
              Experience
            </motion.h2>

            <motion.p
              className="text-[15px] leading-relaxed text-[#aaaaaa] max-w-3xl"
              {...(prefersReducedMotion
                ? { initial: false }
                : {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: 0.4 },
                    viewport: { once: true, amount: 0.15 },
                  })}
            >
              Building impactful solutions across diverse industries and cutting-edge technologies.
            </motion.p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="border-b border-[#1a1a1a] pb-8 lg:pb-12 group cursor-pointer"
                {...(prefersReducedMotion
                  ? { initial: false }
                  : {
                      initial: { opacity: 0, y: 100 },
                      whileInView: { opacity: 1, y: 0 },
                      transition: { duration: 0.3, ease: "backOut", delay: 0.1 + index * 0.15 },
                      viewport: { once: true, amount: 0.15 },
                    })}
                whileHover={{ x: 20 }}
                // tween transition prevents spring physics overhead on hover
              >
                {/* Wrap whileHover transition as separate prop to avoid conflict with whileInView transition */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  {/* Timeline & Status */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">{exp.period}</div>
                    {exp.current && (
                      <div 
                        className="inline-flex items-center px-3 py-1 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[11px] tracking-[2px] uppercase"
                        style={{ borderRadius: 0 }}
                      >
                        Current
                      </div>
                    )}
                    <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555] border-l-2 border-[#c8f060] pl-4">{exp.impact}</div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-9 space-y-4 lg:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl lg:text-3xl font-barlow font-black uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="font-mono-custom text-[13px] tracking-[2px] uppercase text-[#555555]">{exp.company}</div>
                    </div>

                    <p className="text-[15px] leading-relaxed text-[#aaaaaa] max-w-3xl">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-[#111111] border border-[#1a1a1a] text-[#555555] font-mono-custom text-[11px] tracking-[2px] uppercase hover:border-[#c8f060] hover:text-[#f0f0ea] transition-colors duration-300"
                          style={{ borderRadius: 0 }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Experience }
