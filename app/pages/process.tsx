"use client"

import { motion, useReducedMotion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understanding your business, goals, and technical requirements through focused conversations. No fluff — just the facts I need to build the right thing.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Mapping the architecture, data models, and technical decisions before writing a single line of code. Every choice is intentional.",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "Rapid development with weekly checkpoints. You see real progress, not slide decks. Working software, deployed and testable.",
  },
  {
    number: "04",
    title: "Launch & Iterate",
    description:
      "Deployment, monitoring, and refinement. The work doesn't end at launch — I stay until the system is battle-tested.",
  },
]

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const stepVariantsReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export function Process() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="process" className="section-padding bg-[#0a0a0a] text-[#f0f0ea] border-b border-[#1a1a1a]">
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
            HOW I WORK
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
            PROJECT JOURNEY
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              variants={prefersReducedMotion ? stepVariantsReduced : stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="border-t border-[#1a1a1a] py-12 lg:py-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Large Number */}
                <div className="lg:col-span-4 xl:col-span-3">
                  <span
                    className="block font-barlow font-black text-[#111111] leading-none select-none"
                    style={{
                      fontSize: "clamp(5rem, 10vw, 8rem)",
                      lineHeight: 0.85,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-barlow font-black uppercase text-[#f0f0ea] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#aaaaaa] max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Quote */}
        <motion.div
          className="mt-16 lg:mt-24 py-16 lg:py-20 border-t border-[#1a1a1a]"
          {...(prefersReducedMotion
            ? { initial: false }
            : {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.9, delay: 0.2 },
                viewport: { once: true },
              })}
        >
          <blockquote className="max-w-4xl mx-auto text-center">
            <span
              className="block font-barlow font-black text-[#c8f060] leading-none select-none mb-4"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              &ldquo;
            </span>
            <p
              className="italic text-[#aaaaaa] leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
            >
              We&rsquo;ve heard every concern. Every &lsquo;what if.&rsquo; You really need to know
              — we&rsquo;ve built this before, and we&rsquo;ll build it right.
            </p>
            <span
              className="block font-barlow font-black text-[#c8f060] leading-none select-none mt-4"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              &rdquo;
            </span>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
