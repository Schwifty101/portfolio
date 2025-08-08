"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getCalApi } from "@calcom/embed-react"

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

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gray-800 rounded-full opacity-10 z-background" />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-gray-700 rotate-45 opacity-20 z-background" />

      {/* Large section number */}
      <motion.div
        ref={numberRef}
        className="absolute top-20 left-8 text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800 leading-none z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        05
      </motion.div>

      {/* Main CTA Section */}
      <div className="section-padding relative z-content min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center leading-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 uppercase mb-8 text-2xl font-extralight tracking-[0.3em]"
          >
            (Need an unfair advantage?)
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="text-6xl md:text-8xl mb-16 leading-none tracking-wider lg:text-9xl leading-4 font-black text-gray-200"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            LET'S MAKE
            <br />
            IT HAPPEN
          </motion.h2>

          <motion.button
            data-cal-namespace="30min"
            data-cal-link="soban-ahmad003/30min"
            data-cal-config='{"layout":"month_view"}'
            className="mt-12 inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-12 py-6 rounded-full font-medium text-lg tracking-wider uppercase transition-all duration-300 group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>BOOK A CALL</span>
            <motion.span
              className="text-xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ↗
            </motion.span>
          </motion.button>
        </div>

        {/* Status Badge */}
        <motion.div
          className="absolute bottom-8 left-8 flex items-center space-x-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg px-6 py-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <div className="text-white text-sm font-medium">Working Globally</div>
            <div className="text-gray-400 text-xs">Available Jan '25</div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="absolute bottom-8 right-8 text-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">For Further Inquiries</div>
          <div className="text-gray-300 text-sm">↳ sobanahmad2003@gmail.com</div>
        </motion.div>
      </div>
    </section>
  )
}

export { Contact }
