"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useCallback, useRef } from "react"
import { gsap } from "gsap"

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

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
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
      clearInterval(timeInterval)
    }
  }, [])

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
    { name: "LinkedIn", href: "https://www.linkedin.com/in/soban-ahmad-malik/" },
    { name: "Github", href: "https://github.com/Schwifty101" },
  ]

  const resourceItems = [
    { name: "Download Resume", href: "/Resume_SobanAhmad.pdf" },
    // { name: "Certifications", href: "#certifications" },
    // { name: "Tech Articles", href: "#blog" },
  ]

  return (
    <footer className="bg-gray-100 text-gray-900 relative z-content">
      <div className="max-w-7xl px-4 border-0 mx-auto my-0 py-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          {/* Menu */}
          <div className="w-full md:w-1/2">
            <motion.h3
              className="text-lg font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Menu
            </motion.h3>
            <div className="space-y-0 leading-tight">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="block font-light text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left py-1"
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
                className="text-lg font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Socials
              </motion.h3>
              <div className="space-y-0 leading-tight">
                {socialItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="block font-light text-gray-600 hover:text-gray-900 transition-colors duration-300 py-1"
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
                className="text-lg font-bold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Resources
              </motion.h3>
              <div className="space-y-0 leading-tight">
                {resourceItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    download={item.name === "Download Resume" ? "Resume_SobanAhmad.pdf" : undefined}
                    target={item.href.startsWith("#") ? "_self" : "_blank"}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="block font-light text-gray-600 hover:text-gray-900 transition-colors duration-300 py-1"
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
        <div className="flex flex-col border-t border-gray-300 justify-between md:flex-row items-start pb-0 pt-8 md:pt-16 gap-6 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mb-0"
          >
            <div className="font-black mb-2 text-gray-900 text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tighter">© 2025 Soban Ahmad</div>
            <div className="text-gray-600 tracking-normal text-sm md:text-base lg:text-lg font-normal">All rights reserved.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-left md:text-right"
          >
            <div className="text-gray-500 uppercase tracking-wider mb-1 font-bold text-sm md:text-base lg:text-xl">Local Time</div>
            <div className="text-gray-700 font-mono font-light text-base md:text-lg lg:text-xl tracking-wide">{currentTime}</div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
