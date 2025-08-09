"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const Experience = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Number animation with lower z-index
    gsap.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 0.8, // Increased opacity for visibility
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

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
    <section id="experience" ref={sectionRef} className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="hidden md:block absolute top-20 right-20 w-24 h-24 bg-gray-200 rounded-full opacity-30 z-background" />
      <div className="hidden md:block absolute bottom-40 left-20 w-16 h-16 bg-gray-300 rotate-45 opacity-40 z-background" />

      {/* Large section number */}
      <motion.div
        ref={numberRef}
        className="absolute top-20 left-8 text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-200 leading-none z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        03
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <div className="space-y-16 lg:space-y-24">
          {/* Header */}
          <div className="space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm uppercase tracking-[0.2em]"
            >
              (Professional Experience)
            </motion.div>

            <motion.h2
              ref={titleRef}
              className="section-title text-gray-900"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Work Experience
            </motion.h2>

            <motion.p
              className="section-subtitle text-gray-600 max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Building impactful solutions across diverse industries and cutting-edge technologies.
            </motion.p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-300 pb-8 lg:pb-12 group cursor-pointer"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "backOut", delay: 0.1 + index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ x: 20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  {/* Timeline & Status */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500">{exp.period}</div>
                    {exp.current && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white uppercase tracking-[0.1em]">
                        Current
                      </div>
                    )}
                    <div className="text-sm font-light text-gray-600 border-l-2 border-gray-300 pl-4">{exp.impact}</div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-9 space-y-4 lg:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="text-gray-600 font-light text-lg">{exp.company}</div> {/* Fixed missing closing tag */}
                    </div>

                    <p className="text-gray-700 leading-relaxed font-light text-base lg:text-lg max-w-3xl">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full font-light hover:bg-gray-300 transition-colors duration-300"
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
