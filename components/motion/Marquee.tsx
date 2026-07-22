"use client"

import type { ReactNode } from "react"
import { useReducedMotion } from "./useReducedMotion"

interface MarqueeProps {
  children: ReactNode
  /** Loop duration in seconds (lower = faster). */
  speed?: number
}

/**
 * Continuous horizontal marquee driven by a pure CSS transform loop (no JS
 * per-frame work). The children are duplicated so the loop is seamless. Under
 * reduced motion it renders a single static row with no animation.
 */
export function Marquee({ children, speed = 40 }: MarqueeProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className="overflow-hidden">
        <div className="flex w-max">{children}</div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <style>{"@keyframes kodo-marquee{to{transform:translateX(-50%)}}"}</style>
      <div
        className="flex w-max"
        style={{ animation: `kodo-marquee ${speed}s linear infinite` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
