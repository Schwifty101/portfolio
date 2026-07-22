"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "./useReducedMotion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/**
 * Count-up statistic. The final value is server-rendered (crawlable, no layout
 * shift); on scroll into view JS counts from zero to the value. Static when
 * reduced motion is requested.
 */
export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  // Preserve the value's decimal precision (e.g. 4.5 -> 1 dp) and group
  // thousands deterministically so server and client output match.
  const decimals = (String(value).split(".")[1] || "").length
  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const counter = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${format(counter.n)}${suffix}`
        },
      })
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, value, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  )
}
