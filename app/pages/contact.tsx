"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getCalApi } from "@calcom/embed-react"
import { ArrowUpRight } from 'lucide-react'

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

      // Initialize Cal.com embed
      ; (async function () {
        const cal = await getCalApi({ namespace: "30min" })
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
      })()

    // Number animation with lower z-index
    gsap.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 0.8,
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

  return (
    <section id="contact" ref={sectionRef} className="relative bg-black text-white overflow-hidden min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="hidden md:block absolute top-20 right-20 w-32 h-32 bg-gray-800 rounded-full opacity-10 z-background" />
      <div className="hidden md:block absolute bottom-40 left-20 w-16 h-16 bg-gray-700 rotate-45 opacity-20 z-background" />

      {/* Large section number */}
      <motion.div
        ref={numberRef}
        className="absolute top-48 md:top-20 left-4 md:left-8 text-[8rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800 leading-none z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        06
      </motion.div>

      {/* Main CTA Section - Now takes full screen */}
      <div className="flex-1 flex flex-col justify-center relative z-content px-4 md:px-8 py-8 md:py-16">
        <div className="max-w-7xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 uppercase mb-4 md:mb-8 text-sm md:text-xl lg:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em]"
          >
            (Need an unfair advantage?)
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="section-title text-white mb-8 md:mb-16 leading-tight md:leading-none tracking-wide md:tracking-wider font-black"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            LET&apos;S MAKE
            <br />
            IT HAPPEN
          </motion.h2>

          <motion.button
            data-cal-namespace="30min"
            data-cal-link="soban-ahmad/30min"
            data-cal-config='{"layout":"month_view"}'
            className="mt-6 md:mt-12 inline-flex items-center space-x-2 md:space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-medium text-base md:text-lg tracking-wide md:tracking-wider uppercase transition-all duration-300 group min-h-[44px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>BOOK A CALL</span>
            <motion.span
              className="text-lg md:text-xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.button>

          {/* Mobile-specific additional content */}
          <motion.div
            className="mt-8 md:mt-12 space-y-8 md:hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >

            {/* Mobile contact info */}
            <div className="text-center space-y-3">
              <div className="text-gray-500 text-xs uppercase tracking-wider">For Further Inquiries</div>
              <div className="text-gray-300 text-sm">sobanahmad2003@gmail.com</div>
            </div>

            {/* Mobile availability status */}
            <div className="flex items-center justify-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-3 mx-auto w-1/2">
              <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="text-white text-sm font-medium">Available Jan &apos;25</div>
                <div className="text-gray-400 text-xs">Working Globally</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Status Badge */}
      <motion.div
        className="hidden md:flex absolute bottom-6 md:bottom-8 left-4 md:left-8 items-center space-x-3 md:space-x-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg px-4 md:px-6 py-3 md:py-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div>
          <div className="text-white text-xs md:text-sm font-medium">Working Globally</div>
          <div className="text-gray-400 text-xs">Available Jan &apos;25</div>
        </div>
      </motion.div>

      {/* Desktop Contact Info */}
      <motion.div
        className="hidden md:block absolute bottom-6 md:bottom-8 right-4 md:right-8 text-right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">For Further Inquiries</div>
        <div className="text-gray-300 text-xs md:text-sm hover:text-white transition-colors duration-300 cursor-pointer">↳ sobanahmad2003@gmail.com</div>
      </motion.div>
    </section>
  )
}

export { Contact }
