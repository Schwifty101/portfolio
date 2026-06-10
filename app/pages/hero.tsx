"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { getCalApi } from "@calcom/embed-react"
import { useMobile } from "@/hooks/useMobile"

interface HeroProps {
  onReady?: () => void
}

export function Hero({ onReady }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const [isReady, setIsReady] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobile()

  // Live clock — PKT (Asia/Karachi, UTC+5)
  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Karachi",
      })
      setCurrentTime(t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  // Ready timer (3.2s for loading screen) + Cal.com init
  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setIsReady(true)
      onReady?.()
    }, 3200)

    ;(async function () {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()

    return () => clearTimeout(readyTimer)
  }, [onReady])

  // GSAP entrance timeline
  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const refs = [
      nameRef.current,
      taglineRef.current,
      tagsRef.current,
      ctaRef.current,
      bottomBarRef.current,
      scrollIndicatorRef.current,
      statsRef.current,
    ]
    if (refs.some((r) => !r)) return

    const d = (desktop: number) => (isMobile ? Math.min(desktop, 0.6) : desktop)

    gsap.defaults({ ease: "power3.out" })

    const tl = gsap.timeline({ delay: isMobile ? 0 : 0.15 })

    // Name: fade in + slide up + scale
    gsap.set(nameRef.current, { willChange: "transform, opacity" })
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: isMobile ? 40 : 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: d(1.6),
        ease: "power3.out",
        onComplete: () => {
          gsap.set(nameRef.current, { willChange: "auto" })
        },
      }
    )

    // Tagline: fade in
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: isMobile ? 15 : 30 },
      {
        opacity: 1,
        y: 0,
        duration: d(1.0),
        ease: "power2.out",
      },
      isMobile ? undefined : "-=1.0"
    )

    // Tags: fade in
    tl.fromTo(
      tagsRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: d(0.8),
        ease: "power2.out",
      },
      isMobile ? undefined : "-=0.7"
    )

    // CTA: fade in + slide up
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: isMobile ? 15 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: d(0.9),
        ease: "power2.out",
      },
      isMobile ? undefined : "-=0.5"
    )

    // Stats
    tl.fromTo(
      statsRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: d(0.8),
        ease: "power2.out",
      },
      isMobile ? undefined : "-=0.5"
    )

    // Bottom bar: fade in
    tl.fromTo(
      bottomBarRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: d(0.8),
        ease: "power2.out",
      },
      isMobile ? undefined : "-=0.4"
    )

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: d(0.6),
        ease: "power2.out",
      },
      isMobile ? undefined : "-=0.3"
    )

    return () => {
      tl.kill()
    }
  }, [isReady, isMobile, prefersReducedMotion])

  // If reduced motion, just show everything once ready
  const showImmediate = prefersReducedMotion && isReady

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0a0a0a] text-white relative overflow-hidden border-b border-[#1a1a1a]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Center content */}
      <div className="w-full px-[clamp(1rem,5vw,4rem)] flex flex-col items-center justify-center text-center relative z-10 py-32 lg:pt-32 lg:pb-24">
        {/* MASSIVE NAME */}
        <h1
          ref={nameRef}
          className="font-barlow font-black uppercase text-[#f0f0ea] text-center select-none"
          style={{
            fontSize: "clamp(3rem, 14vw, 12rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            opacity: showImmediate ? 1 : 0,
          }}
        >
          SOBAN
          <br />
          AHMAD
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-mono-custom max-w-lg mx-auto mt-8 md:mt-10 text-center"
          style={{
            fontSize: "13px",
            lineHeight: 1.7,
            color: "#aaaaaa",
            opacity: showImmediate ? 1 : 0,
          }}
        >
          Engineering digital platforms for founders who need
          someone who can actually build it.
        </p>

        {/* Skill tags */}
        <div
          ref={tagsRef}
          className="flex items-center justify-center gap-3 mt-5 md:mt-6 flex-wrap"
          style={{ opacity: showImmediate ? 1 : 0 }}
        >
          {["Full-Stack", "AI & ML", "SaaS", "Consulting"].map(
            (tag, i, arr) => (
              <span key={tag} className="flex items-center gap-3">
                <span
                  className="font-mono-custom uppercase"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "3px",
                    color: "#555555",
                  }}
                >
                  {tag}
                </span>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "11px",
                    }}
                  >
                    •
                  </span>
                )}
              </span>
            )
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          ref={ctaRef}
          data-cal-namespace="30min"
          data-cal-link="soban-ahmad/30min"
          data-cal-config='{"layout":"month_view"}'
          className="mt-10 md:mt-12 bg-[#c8f060] text-[#0a0a0a] font-barlow font-black uppercase px-8 py-4 border border-[#c8f060] cursor-pointer inline-flex items-center gap-2 transition-all duration-200 hover:bg-transparent hover:text-[#c8f060] min-h-[44px]"
          style={{
            borderRadius: 0,
            fontSize: "13px",
            letterSpacing: "3px",
            opacity: showImmediate ? 1 : 0,
          }}
          whileTap={{ scale: 0.98 }}
        >
          BOOK A CALL
        </motion.button>

        {/* Stats — subtle, below CTA */}
        <div
          ref={statsRef}
          className="flex items-center justify-center gap-8 md:gap-12 mt-10 md:mt-14"
          style={{ opacity: showImmediate ? 1 : 0 }}
        >
          {[
            ["$2M+", "CLIENT REVENUE"],
            ["8 WKS", "AVG. DELIVERY"],
          ].map(([val, label]) => (
            <div key={val} className="flex items-baseline gap-2">
              <span
                className="font-barlow font-black text-[#f0f0ea]"
                style={{ fontSize: "22px", lineHeight: 1 }}
              >
                {val}
              </span>
              <span
                className="font-mono-custom uppercase"
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: "#555555",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar — absolute positioned */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-6 md:bottom-8 left-0 right-0 px-[clamp(1rem,5vw,4rem)] flex items-center justify-between"
        style={{ opacity: showImmediate ? 1 : 0 }}
      >
        {/* Left: Time in PKT */}
        <div
          className="font-mono-custom uppercase"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#555555",
          }}
        >
          {currentTime} PKT
        </div>

        {/* Right: Email */}
        <div
          className="font-mono-custom uppercase hidden sm:block cursor-pointer transition-colors duration-200 hover:text-[#c8f060]"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#555555",
          }}
        >
          soban@sobanahmad.dev
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ opacity: showImmediate ? 1 : 0 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          {...(prefersReducedMotion
            ? {}
            : {
                animate: isReady ? { y: [0, 6, 0] } : undefined,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              })}
        >
          <div
            className="w-[1px] h-6"
            style={{ background: "linear-gradient(to bottom, #333333, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  )
}