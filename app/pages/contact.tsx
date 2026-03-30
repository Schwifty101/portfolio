"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { getCalApi } from "@calcom/embed-react"
import { ArrowUpRight } from 'lucide-react'

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Initialize Cal.com embed
    ; (async function () {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative bg-[#0a0a0a] border-b border-[#1a1a1a] text-white overflow-hidden min-h-screen flex flex-col">

      {/* Main CTA Section - Now takes full screen */}
      <div className="flex-1 flex flex-col justify-center relative z-content px-4 md:px-8 py-8 md:py-16">
        <div className="max-w-7xl mx-auto w-full text-center">
          <motion.h2
            ref={titleRef}
            className="section-title font-barlow font-black tracking-[-2px] text-[#f0f0ea] mb-8 md:mb-16 leading-tight md:leading-none uppercase"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 100 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 1.2, ease: "easeOut" },
                  viewport: { once: true, amount: 0.15 },
                })}
          >
            LET&apos;S TALK.
          </motion.h2>

          <motion.p
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.4 },
                  viewport: { once: true, amount: 0.15 },
                })}
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#555555',
              maxWidth: '400px',
              margin: '0 auto 40px',
              textAlign: 'center',
            }}
          >
            A 15-minute call is usually enough to know if 
            there is a fit. No slides, no pitch — just a 
            conversation about what you are building.
          </motion.p>

          {/*
            Replaced whileHover={{ scale: 1.05 }} with CSS scale(1.03) via className.
            CSS compositor handles transform cheaper than Framer Motion.
          */}
          <motion.button
            data-cal-namespace="30min"
            data-cal-link="soban-ahmad/30min"
            data-cal-config='{"layout":"month_view"}'
            className="mt-6 md:mt-12 inline-flex items-center space-x-2 md:space-x-3 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[13px] tracking-[3px] uppercase px-10 py-4 transition-all duration-200 hover:bg-transparent border border-transparent hover:border-[#c8f060] hover:text-[#c8f060] hover:[transform:scale(1.03)] group min-h-[44px]"
            style={{ borderRadius: 0 }}
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 50 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.6 },
                  viewport: { once: true, amount: 0.15 },
                })}
            whileTap={{ scale: 0.95 }}
            // Removed: whileHover={{ scale: 1.05 }} — replaced with CSS hover:scale(1.03)
          >
            <span>BOOK 15 MINUTES</span>
            <motion.span
              className="text-lg md:text-xl"
              animate={prefersReducedMotion ? undefined : { x: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.button>

          {/* Mobile-specific additional content */}
          <motion.div
            className="mt-8 md:mt-12 space-y-8 md:hidden"
            {...(prefersReducedMotion
              ? { initial: false }
              : {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.8 },
                  viewport: { once: true, amount: 0.15 },
                })}
          >

            {/* Mobile contact info */}
            <div className="text-center space-y-3">
              <div className="font-mono-custom text-[13px] text-[#aaaaaa] hover:text-[#c8f060] transition-colors duration-200 cursor-pointer">soban@sobanahmad.dev</div>
            </div>

            {/* Mobile availability status */}
            <div 
              className="flex items-center justify-center space-x-2 bg-[#111111] border border-[#1a1a1a] px-4 py-3 mx-auto w-max"
              style={{ borderRadius: 0 }}
            >
              <div className="w-6 h-6 bg-[#222222] flex items-center justify-center" style={{ borderRadius: 0 }}>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">Working Globally</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Status Badge */}
      <motion.div
        className="hidden md:flex absolute bottom-6 md:bottom-8 left-4 md:left-8 items-center space-x-3 md:space-x-4 bg-[#111111] border border-[#1a1a1a] px-4 md:px-6 py-3 md:py-4"
        style={{ borderRadius: 0 }}
        {...(prefersReducedMotion
          ? { initial: false }
          : {
              initial: { opacity: 0, x: -50 },
              whileInView: { opacity: 1, x: 0 },
              transition: { duration: 0.8, delay: 0.8 },
              viewport: { once: true, amount: 0.15 },
            })}
      >
        <div className="w-6 h-6 md:w-8 md:h-8 bg-[#222222] flex items-center justify-center" style={{ borderRadius: 0 }}>
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div>
          <div className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#555555]">Working Globally</div>
        </div>
      </motion.div>

      {/* Desktop Contact Info */}
      <motion.div
        className="hidden md:block absolute bottom-6 md:bottom-8 right-4 md:right-8 text-right font-mono-custom text-[13px] text-[#aaaaaa] hover:text-[#c8f060] transition-colors duration-200 cursor-pointer"
        {...(prefersReducedMotion
          ? { initial: false }
          : {
              initial: { opacity: 0, x: 50 },
              whileInView: { opacity: 1, x: 0 },
              transition: { duration: 0.8, delay: 0.8 },
              viewport: { once: true, amount: 0.15 },
            })}
      >
        soban@sobanahmad.dev
      </motion.div>
    </section>
  )
}

export { Contact }
