"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useMobile } from "@/hooks/useMobile"

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [counter, setCounter] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobile()

  useEffect(() => {
    const startTime = Date.now()
    let animationFrame: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / 2200, 1) // Reduced to 2.2 seconds for better timing
      const counterValue = Math.ceil(progress * 100)

      setCounter(counterValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Start exit sequence
        setTimeout(() => {
          setIsExiting(true)
          // Complete after exit animation
          setTimeout(() => {
            setIsComplete(true)
            onComplete()
          }, 800) // Exit animation duration
        }, 300) // Brief pause at 100%
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-loading bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.05 : 1,
      }}
      transition={{
        duration: isExiting ? 0.8 : 0,
        ease: "easeInOut",
      }}
      style={{
        pointerEvents: isComplete ? "none" : "auto",
      }}
    >
      <div className="text-center relative">
        <motion.div
          {...(prefersReducedMotion
            ? { initial: false }
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.6 },
              })}
          style={{ 
            marginBottom: '48px', 
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: '18px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#f0f0ea'
          }}
        >
          SOBAN<span style={{color:'#c8f060'}}>.</span>DEV
        </motion.div>

        {/* Main Counter */}
        <div className="mb-8 relative">
          <motion.div
            className="text-8xl md:text-9xl font-barlow font-black tracking-tighter text-white relative z-10"
            animate={{
              scale: isExiting ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: isExiting ? 0.6 : 0,
              // Removed: repeat: POSITIVE_INFINITY while not exiting — unnecessary rAF loop.
              // Keep only the exit scale pulse.
              repeat: 0,
              ease: "easeInOut",
            }}
          >
            {counter.toString().padStart(2, "0")}
          </motion.div>

          {/* Glow div: hidden on mobile — blur-xl (filter: blur(24px)) on an animating
              element forces a software render path on most mobile GPUs. */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent blur-xl"
              animate={{
                opacity: isExiting ? [0.3, 0.6, 0] : [0, 0.3, 0],
              }}
              transition={{
                duration: isExiting ? 0.8 : 3,
                repeat: isExiting ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {/* Loading Text */}
        <motion.div
          className="font-mono-custom text-[11px] tracking-[4px] uppercase text-[#555555] mt-4"
          animate={{
            opacity: isExiting ? [1, 0] : [0.5, 1, 0.5],
          }}
          transition={{
            duration: isExiting ? 0.4 : 2,
            repeat: isExiting ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {isExiting ? "Welcome" : "Loading Portfolio"}
        </motion.div>

        {/* Enhanced Progress Bar */}
        <div className="w-64 h-px bg-[#111111] mx-auto overflow-hidden mt-8" style={{borderRadius: 0}}>
          <motion.div
            className="h-full bg-[#c8f060]"
            style={{borderRadius: 0}}
            initial={{ width: "0%" }}
            animate={{
              width: `${counter}%`,
              opacity: isExiting ? 0 : 1,
            }}
            transition={{
              width: { duration: 0.1, ease: "easeOut" },
              opacity: { duration: isExiting ? 0.4 : 0 },
            }}
          />
        </div>

        {/* Completion indicator */}
        {counter === 100 && !isExiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-2 h-2 bg-[#c8f060] rounded-full animate-pulse" />
          </motion.div>
        )}
      </div>

      {/* Exit transition overlay */}
      {isExiting && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  )
}

export { LoadingScreen }
