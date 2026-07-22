"use client"

import { createElement, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "./useReducedMotion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface RevealProps {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  /** Delay before the reveal starts, seconds. */
  delay?: number
  /** When set, direct children are staggered in by this many seconds each. */
  stagger?: number
  className?: string
}

/**
 * Scroll-triggered fade-and-rise reveal (transform + opacity only).
 *
 * Content is server-rendered visible; the hidden initial state is applied with
 * `gsap.set` on mount only. When `stagger` is provided the element's direct
 * children animate in sequence; otherwise the wrapper itself reveals.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  stagger,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const targets: Element | Element[] =
      stagger != null ? Array.from(el.children) : el

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 24 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced, delay, stagger])

  return createElement(as, { ref, className }, children)
}
