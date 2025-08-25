"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownRight } from 'lucide-react'
import { gsap } from "gsap"
import { getCalApi } from "@calcom/embed-react"

interface HeroProps {
  onReady?: () => void
}

const Hero = ({ onReady }: HeroProps = {}) => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const leftContentRef = useRef(null)
  const rightContentRef = useRef(null)
  const imageRef = useRef(null)
  const statusRef = useRef(null)
  const fitContainerRef = useRef<HTMLDivElement | null>(null)
  const nameRef = useRef<HTMLSpanElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setIsReady(true)
      onReady?.()
    }, 3200) // Changed to match pasted text timing

      // Initialize Cal.com embed
      ; (async function () {
        const cal = await getCalApi({ namespace: "30min" })
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
      })()

    return () => clearTimeout(readyTimer)
  }, [onReady])

  // Ensure the name always stays on a single line with the maximum size that fits the viewport width
  useLayoutEffect(() => {
    const container = fitContainerRef.current
    const nameEl = nameRef.current
    if (!container || !nameEl) return

    const ro = new ResizeObserver(() => {
      // Reset scale to measure natural width
      nameEl.style.transform = "scale(1)"
      nameEl.style.transformOrigin = "left center"
      const containerWidth = container.clientWidth
      const nameWidth = nameEl.scrollWidth
      if (nameWidth > 0 && containerWidth > 0) {
        // Fit-to-width. Allow upscaling a bit to maximize presence, capped for safety.
        const scale = Math.min(2, Math.max(0.5, containerWidth / nameWidth))
        nameEl.style.transformOrigin = "left center"
        nameEl.style.transform = `scale(${scale})`
      }
    })
    ro.observe(container)
    ro.observe(nameEl)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!isReady) return

    // Check if all required refs are available
    if (!titleRef.current || !leftContentRef.current || !rightContentRef.current || !imageRef.current || !statusRef.current) {
      return
    }

    gsap.defaults({ ease: "power2.out", duration: 1.2 })

    const tl = gsap.timeline({ delay: 0.15 })

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power3.out",
      },
    )
      .fromTo(
        leftContentRef.current,
        { opacity: 0, x: -60, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out"
        },
        "-=1.35",
      )
      .fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "back.out(1.2)",
        },
        "-=1.15",
      )
      .fromTo(
        rightContentRef.current,
        { opacity: 0, x: 60, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out"
        },
        "-=1.35",
      )
      .fromTo(
        statusRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out"
        },
        "-=0.9",
      )

    gsap.to(imageRef.current, {
      y: -12,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.8,
    })

    if (heroRef.current) {
      gsap.set([titleRef.current, leftContentRef.current, rightContentRef.current, imageRef.current], {
        willChange: "transform, opacity"
      })
    }

    return () => {
      tl.kill()
    }
  }, [isReady])


  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-full flex flex-col justify-center bg-black text-white pt-20 lg:pt-24 pb-16 relative overflow-hidden"
    >
      {/* Background elements with animations from pasted text */}
      <AnimatePresence>
        {isReady && (
          <>
            <motion.div
              className="absolute top-20 right-[5%] w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full opacity-20 mobile-hide-bg"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 0.15,
                scale: 1,
                rotate: [0, 180, 360],
              }}
              transition={{
                opacity: { duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                scale: { duration: 1.2, delay: 0.8, ease: [0.68, -0.55, 0.265, 1.55] },
                rotate: {
                  duration: 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                },
              }}
            />
            <motion.div
              className="absolute bottom-40 right-[10%] w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rotate-45 opacity-30 mobile-hide-bg"
              initial={{ opacity: 0, scale: 0.7, rotate: 45 }}
              animate={{
                opacity: 0.25,
                scale: 1,
                rotate: [45, 225, 45],
              }}
              transition={{
                opacity: { duration: 1.1, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
                scale: { duration: 1.1, delay: 1.0, ease: [0.68, -0.55, 0.265, 1.55] },
                rotate: {
                  duration: 18,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: [0.37, 0, 0.63, 1]
                },
              }}
            />
            <motion.div
              className="absolute top-1/2 right-[2%] w-8 h-8 bg-gray-600 rounded-full opacity-40 mobile-hide-bg"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.3, 0.6, 0.3],
                y: [-15, 15, -15],
              }}
              transition={{
                opacity: { duration: 1.8, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] },
                y: {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: [0.37, 0, 0.63, 1]
                },
              }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="w-full px-[clamp(1rem,5vw,4rem)] relative z-10">
        {/* Small intro text with animation from pasted text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isReady ? 1 : 0,
            y: isReady ? 0 : 10
          }}
          transition={{
            delay: 1.5,
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-gray-400 mb-0 text-2xl tracking-widest font-light leading-normal pb-2"
        >
          (Need an unfair advantage?)
        </motion.div>

        {/* Main Title */}
        <div ref={fitContainerRef} className="mb-8">
          <h1 ref={titleRef}
            className="fluid-text-hero font-black leading-none text-white tracking-normal block w-full text-left"
            style={{ fontSize: "clamp(3rem, 12vw, 8rem)" }}
          >
            <span ref={nameRef} className="inline-flex items-baseline whitespace-nowrap will-change-transform">
              <span>SOBAN AHMAD</span>
              <motion.span
                className="text-2xl md:text-4xl lg:text-6xl align-top ml-1 lg:ml-2"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{
                  opacity: isReady ? 1 : 0,
                  scale: isReady ? 1 : 0,
                  rotate: isReady ? 0 : -90,
                }}
                transition={{
                  duration: 0.9,
                  delay: 2.2,
                  ease: [0.68, -0.55, 0.265, 1.55],
                }}
              >
                ©
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Three Column Layout - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 xl:gap-12 items-start">
          {/* Left Content */}
          <div ref={leftContentRef} className="lg:col-span-4 space-y-4 lg:space-y-6">
            <motion.div
              className="text-gray-400 text-xl lg:text-4xl"
              animate={{
                rotate: isReady ? [0, -3, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                delay: 1.8,
                ease: [0.37, 0, 0.63, 1],
              }}
            >
              ↘
            </motion.div>
            <div className="space-y-4 md:space-y-6 lg:space-y-8 pt-4 md:pt-6 lg:pt-8">
              <p className="fluid-text-body text-gray-300 leading-relaxed font-light max-w-sm">
                I help growing brands and startups gain an unfair advantage through premium, results driven software
                solutions.
              </p>
              <motion.button
                data-cal-namespace="30min"
                data-cal-link="soban-ahmad003/30min"
                data-cal-config='{"layout":"month_view"}'
                className="mt-6 md:mt-8 lg:mt-12 inline-flex items-center space-x-2 md:space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 rounded-full font-medium text-base md:text-lg tracking-wider uppercase transition-all duration-300 group"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isReady ? 1 : 0,
                  y: isReady ? 0 : 10
                }}
                transition={{
                  delay: 2.0,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <span className="relative z-10">BOOK A CALL</span>
                <motion.span
                  className="text-base lg:text-lg relative z-10"
                  animate={{
                    x: isReady ? [0, 2, 0] : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                    delay: 2.8,
                    ease: [0.37, 0, 0.63, 1],
                  }}
                >
                  <ArrowDownRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Center - Professional Photo */}
          <div
            ref={imageRef}
            className="lg:col-span-4 flex justify-center items-center order-first lg:order-none"
          >
            <div className="relative h-[30vh] md:h-[45vh] lg:h-[50vh] w-full max-w-xs md:max-w-sm">
              {/* Professional Photo */}
              <motion.div
                className="w-full h-full rounded-2xl shadow-2xl overflow-hidden relative border border-gray-700"
                whileHover={{
                  scale: 1.015,
                  rotate: 0.5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Animated border from pasted text */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.08), transparent)",
                  }}
                  animate={{
                    rotate: isReady ? [0, 360] : 0,
                  }}
                  transition={{
                    duration: 12,
                    repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                    ease: "linear",
                    delay: 2.2,
                  }}
                />

                <img
                  src="/myPhoto.jpg"
                  alt="Soban Ahmad - Professional Photo"
                  className="w-full h-full object-cover relative z-10"
                  style={{
                    objectPosition: "center center",
                    filter: "grayscale(100%)"
                  }}
                />
              </motion.div>

              {/* Optional: Decorative elements around the image */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gray-600 rounded-full opacity-30"
                animate={{
                  scale: isReady ? [1, 1.2, 1] : 1,
                  opacity: isReady ? [0.3, 0.6, 0.3] : 0.3,
                }}
                transition={{
                  duration: 3,
                  repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                  delay: 2.5,
                  ease: [0.37, 0, 0.63, 1],
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-gray-600 rounded-full opacity-20"
                animate={{
                  rotate: isReady ? [0, 360] : 0,
                }}
                transition={{
                  duration: 20,
                  repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                  delay: 3,
                }}
              />
            </div>
          </div>

          {/* Right Content - Availability */}
          <div ref={rightContentRef} className="lg:col-span-4 space-y-4 md:space-y-6 lg:space-y-8 lg:text-right">
            <div className="space-y-3 lg:space-y-4">
              <div className="text-gray-500 pt-4 md:pt-8 lg:pt-16 uppercase font-light text-sm md:text-base lg:text-lg tracking-wide">
                AVAILABLE FOR FREELANCE WORK
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter text-white font-thin">
                <motion.span
                  animate={{
                    color: isReady ? ["#ffffff", "#e5e7eb", "#ffffff"] : "#ffffff",
                  }}
                  transition={{
                    duration: 4,
                    repeat: isReady ? Number.POSITIVE_INFINITY : 0,
                    ease: [0.37, 0, 0.63, 1],
                    delay: 2.3,
                  }}
                >
                  JAN
                </motion.span>
                <span className="text-xl md:text-2xl lg:text-3xl align-top">&apos;25</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: isReady ? 1 : 0,
            y: isReady ? 0 : 15
          }}
          transition={{
            delay: 2.5,
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="absolute bottom-0 right-[clamp(1rem,5vw,4rem)] text-right hidden sm:block"
        >
          <div className="text-gray-500 uppercase tracking-wider mb-2 text-sm">For Further Inquiries</div>
          <motion.div
            className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer text-base"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            ↳ sobanahmad2003@gmail.com
          </motion.div>
        </motion.div>
      </div>
      {/* Animated scroll indicator - keeping original from attached file */}
      <motion.div
        ref={statusRef}
        className="hidden md:flex flex-col items-center space-y-2 pt-8"
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          animate={{
            borderColor: isReady ? ["#4b5563", "#9ca3af", "#4b5563"] : "#4b5563",
          }}
          transition={{
            duration: 3,
            repeat: isReady ? Number.POSITIVE_INFINITY : 0,
            delay: 2.5,
          }}
        >
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            animate={{
              y: isReady ? [0, 16, 0] : 0,
              opacity: isReady ? [1, 0.3, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isReady ? Number.POSITIVE_INFINITY : 0,
              delay: 2.5,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export { Hero }