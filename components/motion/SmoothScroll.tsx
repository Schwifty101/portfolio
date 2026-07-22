"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

/**
 * Desktop-only ScrollSmoother wrapper (port of the original
 * SmoothScrollProvider, with the `isReady` visibility gate removed and a
 * reduced-motion bail-out added).
 *
 * The wrapper/content divs are always rendered so children are present in the
 * server HTML regardless of JS. ScrollSmoother is created only on desktop with
 * motion allowed; on mobile/touch or `prefers-reduced-motion` it is skipped and
 * native scroll is used.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // ScrollSmoother intercepts native scroll on touch and re-renders on every
    // frame, guaranteeing jitter on iOS Safari and mid-range Android.
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window

    if (reduced || isMobile) {
      // Native scroll only: still refresh triggers so scroll-driven components work.
      ScrollTrigger.refresh()
      return
    }

    const raf = requestAnimationFrame(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.8,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0,
      })
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(raf)
      smootherRef.current?.kill()
      smootherRef.current = null
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
