"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type ServiceItem = {
  num: string
  title: string
  description: string
  tags: string[]
}

const services: ServiceItem[] = [
  {
    num: "01",
    title: "The Realization",
    description:
      "Most of the web is built like a digital brochure — static, fragile, and ultimately restrictive. True value isn't found in pages, but in systems. A client portal, an admin dashboard, a payment sequence: the invisible engines that dictate whether a business stalls or scales.",
    tags: ["Systems Thinking", "Architecture", "Scale"],
  },
  {
    num: "02",
    title: "Architecture First",
    description:
      "The decisions that actually matter happen before a single line of code exists. Data models. Authentication patterns. API contracts. Get these wrong and you're rebuilding in 18 months. Get them right and scaling becomes beautifully boring.",
    tags: ["Data Models", "Auth Patterns", "API Design"],
  },
  {
    num: "03",
    title: "The AI Equation",
    description:
      "I refuse to implement intelligence just for the pitch deck. I integrate AI strictly where it earns its place — detecting anomalies in submissions, automating intensive data intake, or surfacing critical decisions from absolute noise. Capability the product genuinely could not achieve without it.",
    tags: ["AI Integration", "LLM", "Automation"],
  },
  {
    num: "04",
    title: "Delivery as Law",
    description:
      "A platform that is 95% done is 0% useful. In my workflow, shipping is the foundational feature. Staged milestones, weekly deployments, and production parity from day one — complex ideas converted into relentless execution.",
    tags: ["Shipping", "Milestones", "Execution"],
  },
]

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Set all items invisible at start
      gsap.set(itemRefs.current, {
        opacity: 0,
        y: 40,
      })

      // Build the scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleY: self.progress,
                transformOrigin: "top center",
              })
            }
          },
        },
      })

      // Animate header in first
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )

      // Animate each item in sequence
      itemRefs.current.forEach((item) => {
        if (!item) return
        tl.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "+=0.3"
        )
      })

      // Hold at end before unpinning
      tl.to({}, { duration: 0.5 })
    }, sectionRef)

    setTimeout(() => ScrollTrigger.refresh(), 500)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-[#0d0d0d] text-white relative overflow-visible flex flex-col justify-center border-b border-[#1a1a1a]"
      style={{ willChange: "transform" }}
    >
      {/* Ambient background text */}
      <div className="absolute top-[15%] left-[-2%] opacity-[0.02] pointer-events-none z-0 select-none">
        <h2 className="font-barlow font-black text-[25vw] leading-[0.8] whitespace-nowrap">
          STORY
        </h2>
      </div>

      {/* Scroll progress indicator */}
      <div
        style={{
          position: "absolute",
          right: "32px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "120px",
          background: "#1a1a1a",
          zIndex: 20,
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: "100%",
            height: "100%",
            background: "#c8f060",
            transform: "scaleY(0)",
            transformOrigin: "top center",
          }}
        />
      </div>

      <div className="container-full relative z-10 w-full max-w-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-stretch">

          {/* Left Column — static header */}
          <div ref={headerRef} className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col justify-end pb-4">
            <div className="mb-3 flex items-center">
              <span className="eyebrow-bar"></span>
              <span className="eyebrow-label text-[#c8f060]">The Narrative</span>
            </div>

            <h2
              className="font-barlow font-black text-[#f0f0ea] uppercase tracking-tighter"
              style={{ fontSize: "clamp(2.4rem, 4vw, 4.2rem)", lineHeight: "0.85" }}
            >
              BEYOND
              <br />
              <span className="text-[#333333]">THE</span>
              <br />
              CODE.
            </h2>

            <p className="mt-4 text-[#aaaaaa] text-sm leading-[1.7]">
              [engineering] and shipping digital platforms, client portals, SaaS systems, payment
              infrastructure — for founders who have a real problem and need someone who will actually
              solve it.
            </p>
          </div>

          {/* Right Column — service narratives */}
          <div className="lg:col-span-8 space-y-0">
            {services.map((service, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className="border-b border-[#1a1a1a] pb-4 group cursor-pointer"
                whileHover={{ x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pt-4">
                  {/* Number + Title */}
                  <div className="md:col-span-5 flex items-start gap-6">
                    <span className="font-mono-custom text-[11px] text-[#555555] tracking-[4px] mt-1">
                      {service.num}
                    </span>
                    <h3 className="font-barlow font-bold text-xl uppercase tracking-wide text-[#f0f0ea]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-7">
                    <p className="text-[#aaaaaa] text-sm leading-[1.65]">{service.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono-custom text-[10px] tracking-[2px] text-[#555] border border-[#222] px-3 py-1 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export { About }
