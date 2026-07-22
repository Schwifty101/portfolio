"use client"

import { useEffect, useState } from "react"

/**
 * SSR-safe `prefers-reduced-motion` hook.
 *
 * Returns `false` on the server and on the first client render (so hydration
 * matches), then flips to the real value inside an effect. Every motion
 * component consults this and becomes static when it returns `true`.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reduced
}
