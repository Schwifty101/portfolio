"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

interface SmoothScrollProviderProps {
    children: React.ReactNode
    isReady: boolean
}

export function SmoothScrollProvider({ children, isReady }: SmoothScrollProviderProps) {
    const smootherRef = useRef<ScrollSmoother | null>(null)

    useEffect(() => {
        if (!isReady) return

        // Detect mobile: skip ScrollSmoother entirely on touch/mobile devices.
        // ScrollSmoother intercepts native scroll on touch and re-renders on every
        // frame, guaranteeing jitter on iOS Safari and mid-range Android.
        const isMobile =
            window.matchMedia("(max-width: 768px)").matches ||
            "ontouchstart" in window

        if (isMobile) {
            // On mobile just refresh triggers — no smoother, native scroll only
            ScrollTrigger.refresh()
            return
        }

        // Desktop only: create ScrollSmoother with reduced inertia
        const timer = requestAnimationFrame(() => {
            smootherRef.current = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.8,           // Reduced from 2.5 — less positional lag on slower machines
                effects: true,
                normalizeScroll: true, // Desktop only: normalizes scroll deltas across trackpads/mice
                smoothTouch: 0,        // 0 instead of 0.01 — even 0.01 breaks iOS Safari momentum scroll
            })

            ScrollTrigger.refresh()
        })

        return () => {
            cancelAnimationFrame(timer)
            if (smootherRef.current) {
                smootherRef.current.kill()
                smootherRef.current = null
            }
        }
    }, [isReady])

    return (
        <div
            id="smooth-wrapper"
            className={`transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
        >
            <div id="smooth-content">
                {children}
            </div>
        </div>
    )
}

