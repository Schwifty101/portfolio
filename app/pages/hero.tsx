"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'
import { gsap } from "gsap"
import { getCalApi } from "@calcom/embed-react"
import { useMobile } from "@/hooks/useMobile"

interface HeroProps {
  onReady?: () => void
}

const Hero = ({ onReady }: HeroProps = {}) => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const leftContentRef = useRef(null)
  const rightContentRef = useRef(null)
  const imageRef = useRef(null)
  const statusRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [currentDate, setCurrentDate] = useState({ month: '', year: '' })
  const [currentTime, setCurrentTime] = useState('')
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobile()

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Karachi',
      })
      setCurrentTime(t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const now = new Date()
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    setCurrentDate({
      month: monthNames[now.getMonth()],
      year: `'${now.getFullYear().toString().slice(-2)}`
    })
  }, [])

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setIsReady(true)
      onReady?.()
    }, 3200) // Changed to match pasted text timing

      // Initialize Cal.com embed
      ; (async function () {
        const cal = await getCalApi({ namespace: "30min" })
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
      })()

    return () => clearTimeout(readyTimer)
  }, [onReady])

  // Name sizing is handled by CSS clamp() — no JS ResizeObserver needed.
  // The old ResizeObserver fired on every iOS Safari scroll (viewport chrome hide/show),
  // causing constant style recalculation. CSS clamp is compositor-free and instant.

  useEffect(() => {
    if (!isReady) return

    if (!titleRef.current || !leftContentRef.current || !rightContentRef.current || !imageRef.current || !statusRef.current) {
      return
    }

    // On mobile: cap all durations at 0.6s max — long entrances feel sluggish not premium
    const d = (desktop: number) => isMobile ? Math.min(desktop, 0.6) : desktop

    gsap.defaults({ ease: "power2.out" })

    const tl = gsap.timeline({ delay: isMobile ? 0 : 0.15 })

    gsap.set(titleRef.current, { willChange: "transform, opacity" })

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: isMobile ? 30 : 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: d(1.6),
        ease: "power3.out",
        onComplete: () => {
          gsap.set(titleRef.current, { willChange: "auto" })
          gsap.set(leftContentRef.current, { willChange: "transform, opacity" })
        },
      },
    )
      .fromTo(
        leftContentRef.current,
        { opacity: 0, x: isMobile ? 0 : -60 },
        {
          opacity: 1,
          x: 0,
          duration: d(1.3),
          ease: "power2.out",
          onComplete: () => {
            gsap.set(leftContentRef.current, { willChange: "auto" })
            gsap.set(imageRef.current, { willChange: "transform, opacity" })
          },
        },
        isMobile ? undefined : "-=1.35",
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotation: isMobile ? 0 : -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: d(1.5),
          ease: "back.out(1.2)",
          onComplete: () => {
            gsap.set(imageRef.current, { willChange: "auto" })
            gsap.set(rightContentRef.current, { willChange: "transform, opacity" })
          },
        },
        isMobile ? undefined : "-=1.15",
      )
      .fromTo(
        rightContentRef.current,
        { opacity: 0, x: isMobile ? 0 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: d(1.3),
          ease: "power2.out",
          onComplete: () => {
            gsap.set(rightContentRef.current, { willChange: "auto" })
          },
        },
        isMobile ? undefined : "-=1.35",
      )
      .fromTo(
        statusRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: d(1.1),
          ease: "power2.out"
        },
        isMobile ? undefined : "-=0.9",
      )

    // Floating image animation: skip on mobile — runs infinitely even when off-screen,
    // wasting a rAF loop on devices with the least headroom.
    if (!isMobile) {
      gsap.to(imageRef.current, {
        y: -12,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      })
    }

    return () => {
      tl.kill()
    }
  }, [isReady, isMobile])


  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-full flex flex-col justify-center bg-black text-white pt-32 lg:pt-28 pb-16 relative overflow-hidden border-b border-[#1a1a1a]"
    >
      <div className="w-full px-[clamp(1rem,5vw,4rem)] relative z-10">
        <motion.div
          {...(prefersReducedMotion ? { initial: false } : {
            initial: { opacity: 0 },
            animate: { opacity: isReady ? 1 : 0 },
            transition: { delay: 1.2, duration: 0.8 },
          })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#c8f060',
          }}
        >
          <span>{currentTime} ISB</span>
          <span style={{ color: '#c8f060' }}>—</span>
          <span>Booking projects for Q3 &apos;25</span>
        </motion.div>

        {/* Main Title */}
        {/* Name uses CSS clamp() for sizing — no JS ResizeObserver needed.
             The old observer fired on every iOS Safari viewport resize (browser chrome show/hide). */}
        <div className="mb-8">
          <h1 ref={titleRef}
            className="font-barlow font-black leading-none text-white tracking-normal block w-full text-left"
            style={{ fontSize: "clamp(2rem, 10vw, 8rem)" }}
          >
            <span className="inline-flex items-baseline whitespace-nowrap">
              <span>SOBAN AHMAD</span>
            </span>
          </h1>
        </div>

        {/* Three Column Layout - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 xl:gap-12 items-start">
          {/* Left Content */}
          <div ref={leftContentRef} className="lg:col-span-4 space-y-4 lg:space-y-6">
            <div style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#444444',
                marginBottom: '0',
              }}>
                (Transforming Ideas into digital realities)
              </p>

              <p style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#aaaaaa',
                maxWidth: '320px',
              }}>
                <span style={{ color: '#c8f060' }}>[thinking]</span>, structuring and shipping digital platforms 
                for founders who already know what they want built — 
                and need someone who can actually build it.
              </p>

              <motion.button
                data-cal-namespace="30min"
                data-cal-link="soban-ahmad/30min"
                data-cal-config='{"layout":"month_view"}'
                style={{
                  borderRadius: 0,
                  background: '#c8f060',
                  color: '#0a0a0a',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 900,
                  fontSize: '13px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  padding: '16px 32px',
                  border: '1px solid #c8f060',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-start',
                  transition: 'all 0.2s ease',
                }}
                whileHover={{ 
                  backgroundColor: 'transparent',
                  color: '#c8f060',
                }}
                whileTap={{ scale: 0.98 }}
                {...(prefersReducedMotion ? { initial: false } : {
                  initial: { opacity: 0, y: 10 },
                  animate: {
                    opacity: isReady ? 1 : 0,
                    y: isReady ? 0 : 10
                  },
                  transition: { delay: 0.02, duration: 0.02 },
                })}
              >
                <span>BOOK A CALL</span>
                <ArrowUpRight style={{ width: '14px', height: '14px' }} />
              </motion.button>
            </div>
          </div>

          {/* Center - Professional Photo */}
          <div
            ref={imageRef}
            className="lg:col-span-4 flex justify-center items-center order-first lg:order-none"
          >
            <div className="relative h-[30vh] md:h-[45vh] lg:h-[50vh] w-full max-w-xs md:max-w-sm">
              {/* Professional Photo */}
              <motion.div
                className="w-full h-full overflow-hidden relative shadow-2xl"
                style={{ borderRadius: 0, border: "1px solid #1a1a1a" }}
                {...(prefersReducedMotion ? {} : {
                  whileHover: {
                    scale: 1.015,
                    rotate: 0.5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  },
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  },
                })}
              >
                <img
                  src="/myPhoto-optimized.jpg"
                  alt="Soban Ahmad - Professional Photo"
                  className="w-full h-full object-cover relative z-10"
                  width={557}
                  height={742}
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    objectPosition: "center center",
                    filter: "grayscale(100%)"
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Content - Availability */}
          <div ref={rightContentRef} className="lg:col-span-4 space-y-4 md:space-y-6 lg:space-y-8 lg:text-right">
            <div style={{ 
              paddingTop: '32px', 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
              className="items-start lg:items-end"
            >
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#444444',
                marginBottom: '12px',
              }}>
                (selected outcomes)
              </p>
              {[
                ['$2M+', 'client revenue'],
                ['8 wks','avg. delivery'],
              ].map(([val, label]) => (
                <div key={val} style={{ 
                  display: 'flex', 
                  alignItems: 'baseline',
                  gap: '8px',
                }}
                className="justify-start lg:justify-end"
              >
                  <span style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 900,
                    fontSize: '28px',
                    color: '#f0f0ea',
                    lineHeight: 1,
                  }}>{val}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#444444',
                  }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div
          {...(prefersReducedMotion ? { initial: false } : {
            initial: { opacity: 0, y: 15 },
            animate: {
              opacity: isReady ? 1 : 0,
              y: isReady ? 0 : 15
            },
            transition: {
              delay: 2.5,
              duration: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94]
            },
          })}
          className="absolute bottom-0 right-[clamp(1rem,5vw,4rem)] text-right hidden sm:block"
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#444444',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color='#c8f060'}
          onMouseLeave={e => e.currentTarget.style.color='#444444'}
          >
            soban@sobanahmad.dev
          </div>
        </motion.div>
      </div>
      {/* Animated scroll indicator - keeping original from attached file */}
      <motion.div
        ref={statusRef}
        className="hidden md:flex flex-col items-center space-y-2 pt-8"
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: "#1a1a1a" }}
          {...(prefersReducedMotion ? { initial: false } : {
            animate: {
              borderColor: isReady ? ["#1a1a1a", "#c8f060", "#1a1a1a"] : "#1a1a1a",
            },
            transition: {
              duration: 3,
              repeat: isReady ? Number.POSITIVE_INFINITY : 0,
              delay: 2.5,
            },
          })}
        >
          <motion.div
            className="w-1 h-2 bg-[#c8f060] mt-2"
            style={{ borderRadius: 0 }}
            {...(prefersReducedMotion ? { initial: false } : {
              animate: {
                y: isReady ? [0, 16, 0] : 0,
                opacity: isReady ? [1, 0.3, 1] : 1,
              },
              transition: {
                duration: 2,
                repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                delay: 2.5,
              },
            })}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export { Hero }