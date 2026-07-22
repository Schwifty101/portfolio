"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "./useReducedMotion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StrikeSwapProps {
  struck: string
  replacement: string
  className?: string
}

/**
 * Scroll-triggered word swap: the struck word gets a red line drawn through it,
 * then the accent replacement rises in beside it. Both words are present in the
 * server HTML in their final visible state (struck word crossed out, accent
 * replacement shown); JS only animates the transition.
 */
export function StrikeSwap({ struck, replacement, className }: StrikeSwapProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const root = ref.current
    if (!root) return

    const line = root.querySelector<HTMLElement>("[data-strike]")
    const rep = root.querySelector<HTMLElement>("[data-replacement]")
    if (!line || !rep) return

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" })
      gsap.set(rep, { opacity: 0, y: 8 })

      gsap
        .timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } })
        .to(line, { scaleX: 1, duration: 0.4, ease: "power2.out" })
        .to(rep, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1")
    }, root)

    return () => ctx.revert()
  }, [reduced, struck, replacement])

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap items-baseline gap-x-3", className)}>
      <span className="relative text-ink-3">
        {struck}
        <span
          data-strike
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-red"
        />
      </span>
      <span data-replacement className="text-accent">
        {replacement}
      </span>
    </span>
  )
}
