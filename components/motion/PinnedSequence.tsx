"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "./useReducedMotion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface PinnedSequenceProps {
  steps: { label: string; body: ReactNode }[]
  className?: string
}

/**
 * Scrollytelling sequence.
 *
 * Server-renders (and falls back to) a plain stacked list of every step, so all
 * content is crawlable and present without JS. On desktop with motion allowed it
 * pins the panel and cross-fades one step to the next as the user scrolls.
 * Mobile and reduced-motion keep the plain stacked list.
 */
export function PinnedSequence({ steps, className }: PinnedSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) return

    const root = rootRef.current
    const inner = innerRef.current
    if (!root || !inner) return

    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray<HTMLElement>(".ps-step", root)
      if (stepEls.length < 2) return

      // Stack every step in the same box; only the first is visible to start.
      gsap.set(inner, { position: "relative", minHeight: "100vh" })
      gsap.set(stepEls, { position: "absolute", inset: 0 })
      gsap.set(stepEls.slice(1), { opacity: 0, yPercent: 8 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + window.innerHeight * stepEls.length,
          pin: inner,
          scrub: 0.5,
        },
      })

      stepEls.forEach((el, i) => {
        if (i === 0) return
        tl.to(stepEls[i - 1], { opacity: 0, yPercent: -8, duration: 0.5, ease: "power2.out" })
        tl.to(el, { opacity: 1, yPercent: 0, duration: 0.5, ease: "power2.out" }, "<")
      })
    }, root)

    return () => ctx.revert()
  }, [reduced, steps.length])

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div ref={innerRef}>
        {steps.map((step, i) => (
          <div key={i} className="ps-step flex flex-col justify-center gap-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink-3">
              {`// ${step.label}`}
            </span>
            <div>{step.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
