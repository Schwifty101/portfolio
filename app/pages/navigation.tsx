"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useMobile } from "@/hooks/useMobile"

gsap.registerPlugin(ScrollToPlugin)
import { getCalApi } from "@calcom/embed-react"

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentDate, setCurrentDate] = useState({ month: '', year: '' })
  const isMobile = useMobile()

  const navItems = useMemo(() => [
    { id: "hero", label: "Home" },
    { id: "about", label: "Services" },
    { id: "experience", label: "Experience" },
    { id: "testimonials", label: "Testimonials" },
    { id: "project", label: "Case Studies" },
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

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      setCurrentDate({
        month: monthNames[now.getMonth()],
        year: `'${now.getFullYear().toString().slice(-2)}`
      })
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
    setIsMenuOpen(false)
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 0 },
      ease: "power2.inOut"
    })
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
          // Set willChange just before animating, clear in onComplete — prevents
          // 60-100 permanently promoted compositor layers sitting in VRAM.
          gsap.set(letter, { willChange: "transform" })
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
                  gsap.set(letter, { willChange: "auto" })
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
            className={`letter inline-block transition-colors duration-300 ${isActive ? "text-[#f0f0ea]" : "text-inherit"}`}
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
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 border-b border-[#1a1a1a] ${
          isMobile
            ? "bg-[rgba(10,10,10,0.95)]" // Solid bg on mobile — backdrop-filter blur is very expensive on mid-range Android
            : "bg-[#0a0a0a]/90 backdrop-blur-md"
        }`}
      >
        <div className="w-full px-[clamp(1rem,5vw,6rem)] py-6">
          <div className="flex justify-between items-center min-h-[48px]">

            {/* Logo - Mobile optimized */}
            <motion.div
              className="flex flex-col flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-barlow font-black text-[18px] tracking-[4px] text-[#f0f0ea] uppercase">
                SOBAN AHMAD
              </div>
              <div className="font-mono-custom text-[10px] font-bold text-[#333333] tracking-[3px] uppercase hidden md:block">
                (Silicon Studio)
              </div>
            </motion.div>

            {/* Right Side Container */}
            <div className="relative flex items-center justify-end space-x-8 min-w-[200px] md:min-w-[420px]">

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-11 h-11 bg-[#111111] border border-[#1a1a1a] flex items-center justify-center transition-all duration-300 flex-shrink-0 mr-2"
                style={{ borderRadius: 0 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <motion.div
                    className="w-full h-px bg-[#c8f060]"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 7 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="w-full h-px bg-[#c8f060]"
                    animate={{ opacity: isMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="w-full h-px bg-[#c8f060]"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -7 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>

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
                        className={`font-mono-custom text-[11px] font-bold tracking-[3px] uppercase transition-colors duration-300 ${activeSection === item.id
                            ? "text-[#f0f0ea] border-b border-[#c8f060] pb-[2px]"
                            : "text-[#555555] hover:text-[#f0f0ea] pb-[3px]"
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
                      className="hidden md:inline-flex items-center space-x-3 px-6 py-3 transition-all duration-200 group bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[13px] tracking-[3px] uppercase border border-transparent hover:bg-transparent hover:border hover:border-[#c8f060] hover:text-[#c8f060]"
                      style={{ borderRadius: 0 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>BOOK A CALL</span>
                      <span><ArrowUpRight className="w-4 h-4" /></span>
                    </motion.button>

                    {/* Hamburger Menu */}
                    <motion.button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="hidden md:flex w-12 h-12 bg-[#111111] hover:bg-[#1a1a1a] items-center justify-center transition-all duration-300 flex-shrink-0"
                      style={{ borderRadius: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                      <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                        <motion.div
                          className="w-full h-0.5 bg-[#c8f060]"
                          animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 6 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="w-full h-0.5 bg-[#c8f060]"
                          animate={{ opacity: isMenuOpen ? 0 : 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="w-full h-0.5 bg-[#c8f060]"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col overflow-hidden"
            style={{ borderBottom: '1px solid #1a1a1a', height: '100dvh' }}
          >
            {/* Top bar — mirrors the nav */}
            <div className="w-full px-[clamp(1rem,5vw,6rem)] py-6 flex justify-between items-center border-b border-[#1a1a1a] shrink-0 min-h-[96px]">
              
              {/* Logo - match main nav */}
              <div className="flex flex-col">
                <div className="font-barlow font-black text-[18px] tracking-[4px] text-[#f0f0ea] uppercase">
                  SOBAN AHMAD
                </div>
                <div className="font-mono-custom text-[10px] font-bold text-[#333333] tracking-[3px] uppercase">
                  (Silicon Studio)
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Book A Call button */}
                <motion.button
                  data-cal-namespace="30min"
                  data-cal-link="soban-ahmad/30min"
                  data-cal-config='{"layout":"month_view"}'
                  className="hidden md:inline-flex items-center space-x-3 px-6 py-3 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black text-[13px] tracking-[3px] uppercase border border-transparent hover:bg-transparent hover:border-[#c8f060] hover:text-[#c8f060] transition-colors duration-200"
                  style={{ borderRadius: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>BOOK A CALL</span>
                  <span><ArrowUpRight className="w-4 h-4" /></span>
                </motion.button>

                {/* Close button */}
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 md:w-12 md:h-12 bg-[#111111] hover:bg-[#1a1a1a] flex items-center justify-center transition-all duration-300 flex-shrink-0 border border-[#1a1a1a]"
                  style={{ borderRadius: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    <div className="w-full h-0.5 bg-[#c8f060] absolute" style={{ transform: 'rotate(45deg)' }} />
                    <div className="w-full h-0.5 bg-[#c8f060] absolute" style={{ transform: 'rotate(-45deg)' }} />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Nav links — full width, left aligned */}
            <div className="flex-1 flex flex-col px-[clamp(1rem,5vw,6rem)] justify-between min-h-0">

              <nav className="flex-1 flex flex-col min-h-0 pt-4 md:pt-8 pb-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group w-full flex-1 flex items-center justify-between border-b border-[#1a1a1a] text-left min-h-[50px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.06,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover="hover"
                    variants={{
                      hover: {
                        x: 12,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }
                    }}
                  >
                    {/* Index + Label row */}
                    <div className="flex items-center gap-6 md:gap-12 lg:gap-16">
                      <span className="font-mono-custom text-[11px] font-bold tracking-[2px] uppercase text-[#2a2a2a] group-hover:text-[#444444] transition-colors duration-200 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.span
                        className="font-barlow font-black uppercase text-[#333333] group-hover:text-[#f0f0ea] transition-colors duration-200"
                        style={{ 
                          fontSize: 'clamp(36px, 7vw, 92px)',
                          lineHeight: 1,
                          letterSpacing: '-1px',
                        }}
                        variants={{
                          hover: {
                            color: '#f0f0ea',
                            transition: { duration: 0.2 }
                          }
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </div>

                    {/* Arrow — only visible on hover */}
                    <motion.span className="font-mono-custom text-[#c8f060] text-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </nav>

              {/* Footer strip inside overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex justify-between items-end pb-8 pt-2 shrink-0 min-h-[80px]"
              >
                {/* Left — email + time */}
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="font-mono-custom text-[10px] tracking-[3px] uppercase text-[#333333] mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:soban@sobanahmad.dev"
                      className="font-mono-custom text-[13px] text-[#555555] hover:text-[#c8f060] transition-colors duration-200"
                    >
                      soban@sobanahmad.dev
                    </a>
                  </div>
                  <div>
                    <div className="font-mono-custom text-[10px] tracking-[3px] uppercase text-[#333333] mb-1">
                      Local Time
                    </div>
                    <div className="font-mono-custom text-[13px] text-[#555555]">
                      {currentTime}
                    </div>
                  </div>
                </div>

                {/* Right — availability */}
                <div className="text-right flex flex-col gap-3 items-end hidden sm:flex">
                  
                  {/* Status dot */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono-custom text-[11px] tracking-[2px] uppercase text-[#333333]">
                      Available now
                    </span>
                    <div className="w-2 h-2 bg-[#c8f060] flex-shrink-0" style={{ borderRadius: 0 }} />
                  </div>

                  <div className="font-mono-custom text-[10px] tracking-[3px] uppercase text-[#2a2a2a]">
                    <span style={{color: "#c8f060"}}>{currentDate.month} {currentDate.year} &nbsp;·&nbsp; Working globally</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Navigation }
