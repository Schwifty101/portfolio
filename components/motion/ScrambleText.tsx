"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { useReducedMotion } from "./useReducedMotion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
}

interface ScrambleTextProps {
  text: string
  className?: string
}

/**
 * Decode-in effect: the final text is server-rendered (crawlable, no layout
 * shift), then on scroll into view it briefly scrambles and resolves. Static
 * when reduced motion is requested.
 */
export function ScrambleText({ text, className }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scrambleText: { text, chars: "upperCase", speed: 0.6 } },
        {
          duration: 0.8,
          ease: "power2.out",
          scrambleText: { text, chars: "upperCase", speed: 0.6, revealDelay: 0.1 },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [reduced, text])

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
