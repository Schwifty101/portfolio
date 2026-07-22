"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "./useReducedMotion"

interface SkeletonProps {
  width?: string
  height?: string
  className?: string
  label?: string
}

/**
 * Sharp loading block for reserved embed/media space (holds layout so nothing
 * shifts when real content loads). A 1px scanline sweeps top-to-bottom via a
 * transform loop; under reduced motion the scanline is omitted. Mono
 * "// LOADING" label by default.
 */
export function Skeleton({
  width = "100%",
  height = "120px",
  className,
  label = "// LOADING",
}: SkeletonProps) {
  const reduced = useReducedMotion()

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ width, height }}
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-border bg-surface-2",
        className
      )}
    >
      {!reduced && (
        <>
          <style>{"@keyframes kodo-scan{from{transform:translateY(0)}to{transform:translateY(100%)}}"}</style>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ animation: "kodo-scan 1.8s linear infinite" }}
          >
            <div className="h-px w-full bg-border" />
          </div>
        </>
      )}
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
        {label}
      </span>
    </div>
  )
}
