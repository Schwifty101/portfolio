"use client"

import { createElement, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useReducedMotion } from "./useReducedMotion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface KineticHeadlineProps {
  children: string
  as?: "h1" | "h2" | "h3"
  className?: string
}

/**
 * Split-line headline reveal. Renders a plain heading element server-side (the
 * full string is in the HTML); on mount it splits the text into masked lines
 * that rise into place on scroll. Reverts cleanly to the plain heading when
 * reduced motion is requested.
 */
export function KineticHeadline({
  children,
  as = "h2",
  className,
}: KineticHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let split: SplitText | null = null
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: "lines", mask: "lines" })
      gsap.set(split.lines, { yPercent: 110 })
      gsap.to(split.lines, {
        yPercent: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      })
    }, el)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [reduced, children])

  return createElement(as, { ref, className }, children)
}
