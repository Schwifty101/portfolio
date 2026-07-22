"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "./useReducedMotion"

const SPACING = 28 // px between dots
const RADIUS = 120 // px displacement radius
const MAX_PUSH = 14 // px maximum displacement
const DOT = 1.5 // dot radius

/** Read a CSS custom property as [r,g,b]. */
function rgb(varName: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/**
 * Interactive dot-grid that displaces away from the pointer and lerps back.
 * Decorative only: renders `null` on touch, mobile, or reduced motion, and the
 * rAF loop pauses when off-screen (IntersectionObserver) or the tab is hidden.
 */
export function CursorField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const mobile = window.matchMedia("(max-width: 768px)").matches
    setEnabled(!reduced && !touch && !mobile)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    const base = rgb("--border-2")
    const hot = rgb("--accent-dim")
    const pointer = { x: -9999, y: -9999 }
    let cols = 0
    let rows = 0
    // The loop runs only while BOTH conditions hold; each source toggles its
    // own flag and sync() derives the single running state from their AND.
    let visible = !document.hidden
    let onscreen = true
    let running = false
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / SPACING)
      rows = Math.ceil(h / SPACING)
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const bx = i * SPACING
          const by = j * SPACING
          const dx = bx - pointer.x
          const dy = by - pointer.y
          const dist = Math.hypot(dx, dy)
          let x = bx
          let y = by
          let t = 0
          if (dist < RADIUS && dist > 0) {
            t = 1 - dist / RADIUS
            const push = t * MAX_PUSH
            x += (dx / dist) * push
            y += (dy / dist) * push
          }
          const r = base[0] + (hot[0] - base[0]) * t
          const g = base[1] + (hot[1] - base[1]) * t
          const b = base[2] + (hot[2] - base[2]) * t
          ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
          ctx.beginPath()
          ctx.arc(x, y, DOT, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      if (!running) return
      draw()
      raf = requestAnimationFrame(loop)
    }

    // Single source of truth: run iff visible AND on-screen.
    const sync = () => {
      const shouldRun = visible && onscreen
      if (shouldRun && !running) {
        running = true
        loop()
      } else if (!shouldRun && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onVisibility = () => {
      visible = !document.hidden
      sync()
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerout", onLeave)
    document.addEventListener("visibilitychange", onVisibility)

    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    sync()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerout", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}
