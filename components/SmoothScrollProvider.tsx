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

        // Small delay to ensure DOM is fully rendered before initializing
        const timer = requestAnimationFrame(() => {
            smootherRef.current = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 2.5,          // Higher = more glide/inertia
                effects: true,
                normalizeScroll: true, // Normalizes scroll deltas → eliminates jitter across trackpads/mice
                smoothTouch: 0.01,     // Slightly more inertia on touch/mobile
            })

            // Refresh ScrollTrigger after smoother is created
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
