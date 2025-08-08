"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type React from "react"

const SlotMachineText = ({ text, className = "" }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleMouseEnter = useCallback(() => {
    if (isAnimating) return // Prevent animation if already running
    
    setIsAnimating(true)
    if (containerRef.current) {
      const letters = containerRef.current.querySelectorAll(".letter")
      letters.forEach((letter, index) => {
        gsap.to(letter, {
          y: -20,
          duration: 0.08,
          delay: index * 0.015,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(letter, { y: 20 })
            gsap.to(letter, {
              y: 0,
              duration: 0.15,
              ease: "back.out(1.2)",
              onComplete: () => {
                if (index === letters.length - 1) {
                  // Reset animation state when last letter completes
                  setTimeout(() => setIsAnimating(false), 100)
                }
              }
            })
          },
        })
      })
    }
  }, [isAnimating])

  return (
    <div
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter inline-block transition-colors duration-300 will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

    // Time update for Islamabad, Pakistan (PKT - UTC+5)
    const updateTime = () => {
      const now = new Date()
      const islamabadTime = new Date(now.getTime() + 5 * 60 * 60 * 1000) // UTC+5
      setCurrentTime(
        islamabadTime.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + ", ISB",
      )
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      clearInterval(timeInterval)
    }
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const menuItems = [
    { name: "Home", href: "hero" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Works", href: "experience" },
    { name: "Projects", href: "project" },
    { name: "Education", href: "education" },
    { name: "Contact", href: "contact" },
  ]

  const socialItems = [
    { name: "LinkedIn", href: "https://linkedin.com/in/soban-ahmad-malik" },
    { name: "Github", href: "https://github.com/Schwifty101" },
    
  ]

  const resourceItems = [
    { name: "Download Resume", href: "/resume.pdf" },
    { name: "Certifications", href: "#certifications" },
    { name: "Tech Articles", href: "#blog" },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative bg-black text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-gray-800 rounded-full opacity-20 z-background" />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-gray-700 rotate-45 opacity-30 z-background" />

      {/* Large section number */}
      <motion.div
        ref={numberRef}
        className="absolute top-20 left-8 text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800 leading-none z-section-number pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        05
      </motion.div>

      {/* Main CTA Section */}
      <div className="section-padding relative z-content">
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
            onClick={scrollToContact}
            className="inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-12 py-6 rounded-full font-medium text-lg tracking-wider uppercase transition-all duration-300 group"
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

      {/* Footer Section */}
      <div className="bg-gray-100 text-gray-900 relative z-content">
        <div className="max-w-7xl px-4 border-0 mx-auto my-0 py-12 pb-8">
  <div className="flex justify-between">
    {/* Menu */}
    <div className="w-1/2">
      <h3 className="text-lg font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">Menu</h3>
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.href)}
            className="block text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left"
          >
            <SlotMachineText text={item.name} />
          </button>
        ))}
      </div>
    </div>

    {/* Socials and Resources */}
    <div className="w-1/2 flex justify-between">
      {/* Socials */}
      <div className="w-1/2 px-4">
        <h3 className="text-lg font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">Socials</h3>
        <div className="space-y-2">
          {socialItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : "_self"}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
              className="block text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <SlotMachineText text={item.name} />
            </a>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="w-1/2">
        <h3 className="text-lg font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">Resources</h3>
        <div className="space-y-2">
          {resourceItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <SlotMachineText text={item.name} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Footer */}
  <div className="flex flex-col border-t border-gray-300 justify-between md:flex-row items-start pb-0 pt-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mb-4 md:mb-0"
    >
      <div className="font-black mb-2 text-gray-900 text-6xl leading-6 tracking-tighter">© 2025 Soban Ahmad</div>
      <div className="text-gray-600 tracking-normal text-6xl font-extrabold">All rights reserved.</div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      viewport={{ once: true }}
      className="text-right"
    >
      <div className="text-gray-500 uppercase tracking-wider mb-1 font-black text-4xl">Local Time</div>
      <div className="text-gray-700 font-mono font-light text-xl tracking-widest">{currentTime}</div>
    </motion.div>
  </div>
</div>
      </div>
    </section>
  )
}

export { Contact }
