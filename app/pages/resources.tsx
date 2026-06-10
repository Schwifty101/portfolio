"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { useMobile } from "@/hooks/useMobile"

const resources = [
  {
    name: "Resume",
    description: "Latest resume with full project history and technical skills.",
    href: "/Resume_SobanAhmad.pdf",
    isDownload: true,
    isExternal: false,
  },
  {
    name: "GitHub",
    description: "Open source contributions and side projects.",
    href: "https://github.com/Schwifty101",
    isDownload: false,
    isExternal: true,
  },
  {
    name: "LinkedIn",
    description: "Professional network and career updates.",
    href: "https://linkedin.com/in/soban-ahmad-malik",
    isDownload: false,
    isExternal: true,
  },
]

function Resources() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobile()

  return (
    <section
      id="resources"
      ref={sectionRef}
      className="section-padding bg-[#0a0a0a] text-white relative overflow-hidden border-b border-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
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
            RESOURCES
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="section-title font-barlow uppercase text-[#f0f0ea]"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, x: isMobile ? 0 : -100 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { duration: isMobile ? 0.6 : 1.2, ease: "easeOut" },
                  viewport: { once: true, amount: 0.15 },
                })}
          >
            Toolkit
          </motion.h2>
        </div>

        {/* Resources List */}
        <div className="space-y-0">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="border-t border-[#1a1a1a] last:border-b last:border-[#1a1a1a]"
              {...(prefersReducedMotion
                ? { initial: false }
                : {
                    initial: { opacity: 0, y: isMobile ? 16 : 40 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.8,
                      delay: isMobile
                        ? Math.min(0.2, 0.2 + index * 0.1)
                        : 0.2 + index * 0.15,
                    },
                    viewport: { once: true, amount: 0.15 },
                  })}
            >
              <motion.a
                href={resource.href}
                {...(resource.isDownload ? { download: true } : {})}
                {...(resource.isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between py-8 md:py-10 cursor-pointer transition-colors duration-300 hover:bg-[#0d0d0d]"
                whileHover={
                  prefersReducedMotion ? undefined : { x: isMobile ? 0 : 10 }
                }
                transition={{ type: "tween", duration: 0.25 }}
              >
                {/* Left: Name + Description */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 min-w-0">
                  <h3 className="font-barlow font-bold text-xl uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300 tracking-[-0.02em] shrink-0">
                    {resource.name}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#aaaaaa] truncate">
                    {resource.description}
                  </p>
                </div>

                {/* Right: Arrow */}
                <motion.div
                  className="ml-6 shrink-0 text-[#555555] group-hover:text-[#c8f060] transition-colors duration-300"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { x: 4, y: -4 }
                  }
                  transition={{ type: "tween", duration: 0.2 }}
                >
                  <ArrowUpRight size={22} strokeWidth={2} />
                </motion.div>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Resources }
