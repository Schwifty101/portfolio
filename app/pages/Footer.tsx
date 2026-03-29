"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useCallback, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

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
          className="letter inline-block transition-colors duration-300 will-change-transform text-[#555555] group-hover:text-[#f0f0ea]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}

const scrollToSection = (sectionId: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: `#${sectionId}`, offsetY: 0 },
    ease: "power2.inOut"
  })
}

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    // Time update for Islamabad, Pakistan (PKT - UTC+5)
    const updateTime = () => {
      const now = new Date()
      const islamabadTime = now.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Karachi",
      })
      setCurrentTime(islamabadTime + ", ISB")
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  const menuItems = [
    { name: "Home",         href: "hero" },
    { name: "Services",     href: "about" },
    { name: "Experience",   href: "experience" },
    { name: "Testimonials", href: "testimonials" },
    { name: "Work",         href: "project" },
    { name: "Contact",      href: "contact" },
  ]

  const socialItems = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/soban-ahmad-malik/" },
    { name: "Github", href: "https://github.com/Schwifty101" },
  ]

  const resourceItems = [
    { name: "Download Resume", href: "/Resume_SobanAhmad.pdf" },
    // { name: "Certifications", href: "#certifications" },
    // { name: "Tech Articles", href: "#blog" },
  ]

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] text-[#f0f0ea] relative z-content">
      <div className="w-full px-4 border-0 mx-auto my-0 py-12 pb-8">
        <div style={{
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
          overflow: 'hidden',
          padding: '14px 0',
          margin: '0 -16px 48px -16px',
        }}>
          <div className="marquee-track">
            {[
              'AR&CO LAW ASSOCIATES',
              'THE NEW HOME ARCHITECTURES',
              'AI ASSESSMENT PLATFORM',
              'SECURE MESSAGING SYSTEM',
              'MULTI-COMMERCE DASHBOARD',
              'SYSTEMS LIMITED',
              'AR&CO LAW ASSOCIATES',
              'THE NEW HOME ARCHITECTURES',
              'AI ASSESSMENT PLATFORM',
              'SECURE MESSAGING SYSTEM',
              'MULTI-COMMERCE DASHBOARD',
              'SYSTEMS LIMITED',
            ].map((name, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: i % 2 === 0 ? '#333333' : '#1a1a1a',
                  paddingRight: '48px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: 'clamp(48px, 10vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-2px',
            textTransform: 'uppercase',
            color: '#111111',
            marginBottom: '48px',
            userSelect: 'none',
          }}
        >
          SOBAN
          <span style={{ color: '#c8f060' }}>.</span>
          DEV
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          {/* Menu */}
          <div className="w-full md:w-1/2">
            <motion.h3
              className="font-barlow font-black text-[11px] tracking-[3px] uppercase text-[#444444] mb-4 border-b border-[#1a1a1a] pb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Navigate
            </motion.h3>
            <div className="space-y-0 leading-tight">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="block font-light text-[#555555] transition-colors duration-300 text-left py-1 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <SlotMachineText text={item.name} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Socials and Resources */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between">
            {/* Socials */}
            <div className="w-full md:w-1/2 md:px-4">
              <motion.h3
                className="font-barlow font-black text-[11px] tracking-[3px] uppercase text-[#444444] mb-4 border-b border-[#1a1a1a] pb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Follow
              </motion.h3>
              <div className="space-y-0 leading-tight">
                {socialItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="block font-light text-[#555555] transition-colors duration-300 py-1 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <SlotMachineText text={item.name} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="w-full md:w-1/2">
              <motion.h3
                className="font-barlow font-black text-[11px] tracking-[3px] uppercase text-[#444444] mb-4 border-b border-[#1a1a1a] pb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Download
              </motion.h3>
              <div className="space-y-0 leading-tight">
                {resourceItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    download={item.name === "Download Resume" ? "Resume_SobanAhmad.pdf" : undefined}
                    target={item.href.startsWith("#") ? "_self" : "_blank"}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="block font-light text-[#555555] transition-colors duration-300 py-1 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <SlotMachineText text={item.name} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-[#1a1a1a] pt-8 gap-6 md:gap-0">

          {/* Left — identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#333333',
              marginBottom: '8px',
            }}>
              © 2025 Soban Ahmad
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#1a1a1a',
            }}>
              (Engineering + building — Silicon Studio)
            </div>
          </motion.div>

          {/* Right — time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            style={{ textAlign: 'right' }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#333333',
              marginBottom: '4px',
            }}>
              Local Time
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#444444',
              letterSpacing: '1px',
            }}>
              {currentTime}
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  )
}

export { Footer }
