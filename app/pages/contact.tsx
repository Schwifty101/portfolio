"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { getCalApi } from "@calcom/embed-react"
import { ArrowUpRight } from "lucide-react"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  const viewAnim = (delay: number = 0) =>
    prefersReducedMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 100 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          transition: {
            duration: 1.2,
            delay,
            ease: [0.22, 1, 0.36, 1], // power3.out equivalent
          },
          viewport: { once: true, amount: 0.15 } as const,
        }

  const slideFromSide = (direction: "left" | "right", delay: number = 0) =>
    prefersReducedMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, x: direction === "left" ? -50 : 50 } as const,
          whileInView: { opacity: 1, x: 0 } as const,
          transition: { duration: 0.8, delay, ease: "easeOut" },
          viewport: { once: true, amount: 0.15 } as const,
        }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] border-b border-[#1a1a1a] text-white overflow-hidden min-h-screen flex flex-col"
    >
      {/* Main CTA area — centered */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto w-full text-center">
          {/* Large multi-line headline */}
          <motion.h2
            className="font-barlow font-black uppercase text-[#f0f0ea]"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
            }}
            {...viewAnim(0)}
          >
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            THAT MATTERS
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="max-w-xl mx-auto mt-8 md:mt-12"
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#aaaaaa",
            }}
            {...viewAnim(0.4)}
          >
            A 15-minute call is usually enough to know if there is a fit.
            No slides, no pitch — just a conversation about what you are
            building.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            data-cal-namespace="30min"
            data-cal-link="soban-ahmad/30min"
            data-cal-config='{"layout":"month_view"}'
            className="mt-10 md:mt-14 inline-flex items-center gap-3 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black uppercase px-10 py-4 border border-[#c8f060] cursor-pointer transition-all duration-200 hover:bg-transparent hover:text-[#c8f060] min-h-[44px]"
            style={{
              borderRadius: 0,
              fontSize: "13px",
              letterSpacing: "3px",
            }}
            {...viewAnim(0.6)}
            whileTap={{ scale: 0.95 }}
          >
            <span>BOOK 15 MINUTES</span>
            <motion.span
              className="inline-flex"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, 4, 0], y: [0, -2, 0] }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.button>

          {/* Mobile: stacked email + availability */}
          <motion.div
            className="mt-10 space-y-6 md:hidden"
            {...viewAnim(0.8)}
          >
            <div
              className="font-mono-custom text-[13px] text-[#aaaaaa] hover:text-[#c8f060] transition-colors duration-200 cursor-pointer"
            >
              soban@sobanahmad.dev
            </div>
            <div
              className="flex items-center justify-center gap-2 bg-[#111111] border border-[#1a1a1a] px-4 py-3 mx-auto w-max"
              style={{ borderRadius: 0 }}
            >
              <div
                className="w-6 h-6 bg-[#222222] flex items-center justify-center"
                style={{ borderRadius: 0 }}
              >
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span
                className="font-mono-custom uppercase"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: "#555555",
                }}
              >
                Working Globally
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop: bottom bar — email left, status right */}
      <div className="hidden md:flex absolute bottom-6 md:bottom-8 left-0 right-0 px-[clamp(1rem,5vw,4rem)] items-center justify-between">
        {/* Email — left */}
        <motion.div
          className="font-mono-custom text-[13px] text-[#aaaaaa] hover:text-[#c8f060] transition-colors duration-200 cursor-pointer"
          {...slideFromSide("left", 0.8)}
        >
          soban@sobanahmad.dev
        </motion.div>

        {/* Availability status — right */}
        <motion.div
          className="flex items-center gap-3 bg-[#111111] border border-[#1a1a1a] px-5 py-3"
          style={{ borderRadius: 0 }}
          {...slideFromSide("right", 0.8)}
        >
          <div
            className="w-7 h-7 bg-[#222222] flex items-center justify-center"
            style={{ borderRadius: 0 }}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <span
            className="font-mono-custom uppercase"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#555555",
            }}
          >
            Working Globally
          </span>
        </motion.div>
      </div>
    </section>
  )
}
