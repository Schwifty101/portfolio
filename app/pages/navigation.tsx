"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'
import gsap from "gsap"
import { getCalApi } from "@calcom/embed-react"

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date()
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return {
      month: monthNames[now.getMonth()],
      year: `'${now.getFullYear().toString().slice(-2)}`
    }
  })

  const navItems = useMemo(() => [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Works" },
    { id: "project", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ], [])

  useEffect(() => {
    // Always start with hero as active section
    setActiveSection("hero")

    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, 1000)

      // Initialize Cal.com embed
      ; (async function () {
        const cal = await getCalApi({ namespace: "30min" })
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
      })()

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

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)

      const sections = navItems.map((item) => document.getElementById(item.id))
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition + 200 >= sectionTop && scrollPosition + 200 < sectionBottom) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timeInterval)
      clearTimeout(timer)
    }
  }, [navItems])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }


  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className="inline-block"
      >
        {text}
      </motion.span>
    )
  }

  const SlotMachineText = ({ text, isActive = false }: { text: string; isActive?: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleMouseEnter = useCallback(() => {
      if (isAnimating) return

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
                    setTimeout(() => setIsAnimating(false), 100)
                  }
                }
              })
            },
          })
        })
      }
    }, [isAnimating])

    const handleMouseLeave = useCallback(() => {
      // No need to reset isAnimating here
    }, [])

    return (
      <div
        ref={containerRef}
        className="inline-block overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`letter inline-block transition-colors duration-300 will-change-transform ${isActive ? "text-white" : isScrolled ? "text-gray-300" : "text-gray-400"
              }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Main Navigation - Full Width */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700`}
      >
        <div className="w-full px-[clamp(1rem,5vw,6rem)] py-6">
          <div className="flex justify-between items-center min-h-[48px]">

            {/* Logo - Mobile optimized */}
            <motion.div
              className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-1 lg:space-y-0 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-white font-medium text-lg md:text-xl lg:text-2xl tracking-tight">
                {hasAnimated ? (
                  <>
                    Soban A.
                    <span className="align-top text-sm md:text-base lg:text-lg">©</span>
                  </>
                ) : (
                  <>
                    <AnimatedText text="Soban Ahmad" />
                    <span className="text-sm md:text-base lg:text-lg align-top">©</span>
                  </>
                )}
              </div>
              <div className="text-gray-400 font-light text-xs md:text-sm pl-0 md:pl-12 hidden md:block">
                {hasAnimated ? (
                  "(Software Engineer & Developer)"
                ) : (
                  <AnimatedText text="(Software Engineer & Developer)" delay={0.2} />
                )}
              </div>
            </motion.div>

            {/* Right Side Container */}
            <div className="relative flex items-center justify-end min-w-[200px] md:min-w-[420px]">

              {/* Desktop Navigation - Only show when not scrolled */}
              <AnimatePresence>
                {!isScrolled ? (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: hasAnimated ? 0.3 : 3.7 }}
                    className="hidden md:flex items-center space-x-8"
                  >
                    {navItems.slice(1).map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`font-light tracking-wide transition-colors duration-300 text-sm ${activeSection === item.id ? "text-white" : "text-gray-400 hover:text-gray-200"
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: hasAnimated ? 0.3 + index * 0.1 : 3.7 + index * 0.1 }}
                      >
                        <SlotMachineText text={item.label} isActive={activeSection === item.id} />
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  /* Scrolled Navigation */
                  <motion.div
                    key="scrolled-nav"
                    className="flex items-center space-x-4 absolute right-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      data-cal-namespace="30min"
                      data-cal-link="soban-ahmad/30min"
                      data-cal-config='{"layout":"month_view"}'
                      className="hidden md:inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium text-medium tracking-wider uppercase transition-all duration-300 group"
                      whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>BOOK A CALL</span>
                      <span><ArrowUpRight className="w-4 h-4" /></span>
                    </motion.button>

                    {/* Hamburger Menu */}
                    <motion.button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="w-12 h-12 bg-gray-200 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                        <motion.div
                          className="w-full h-0.5 bg-black"
                          animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 6 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="w-full h-0.5 bg-black"
                          animate={{ opacity: isMenuOpen ? 0 : 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="w-full h-0.5 bg-black"
                          animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? -6 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black w-full h-full"
          >
            {/* Right Side Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="ml-auto w-full max-w-2xl h-full bg-black p-[clamp(2rem,5vw,4rem)] flex flex-col"
            >

              {/* Navigation Links */}
              <div className="flex-1 flex items-center justify-start">
                <nav className="space-y-0 leading-none">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="group block text-left font-bold text-2xl md:text-3xl lg:text-5xl leading-snug"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      whileHover="hover"
                      variants={{
                        hover: {
                          x: 20,
                          transition: {
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                      <motion.span
                        className="inline-block text-gray-300 leading-snug"
                        variants={{
                          hover: {
                            color: "#ffffff",
                            x: 8,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }
                        }}
                      >
                        {item.label}
                      </motion.span>
                      <motion.span
                        className="inline-block ml-2 md:ml-4 text-xl md:text-2xl lg:text-3xl text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        variants={{
                          hover: {
                            opacity: 1,
                            x: 0,
                            color: "#ffffff",
                            transition: { duration: 0.3, ease: "easeOut", delay: 0.1 }
                          }
                        }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  ))}
                </nav>
              </div>
              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex justify-between items-end pt-8"
              >
                {/* Bottom Left - Email and Local Time */}
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-500 uppercase text-sm tracking-wider mb-2">
                      Email Address
                    </div>
                    <div className="text-gray-300 text-lg">
                      sobanahmad2003@gmail.com
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 uppercase text-sm tracking-wider mb-2">
                      Local Time
                    </div>
                    <div className="text-gray-300 font-mono text-lg">
                      {currentTime}
                    </div>
                  </div>
                </div>

                {/* Bottom Right - Globe Icon and Availability */}
                <div className="text-right space-y-4 hidden sm:block">
                  <div className="flex items-center justify-end space-x-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 uppercase text-sm tracking-wider">Working Globally</span>
                  </div>
                  <div className="text-gray-500 uppercase text-sm tracking-wider">
                    Available {currentDate.month} {currentDate.year}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Navigation }
