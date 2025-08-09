"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 0.5,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const services = [
    {
      number: "01",
      title: "Full-Stack Development",
      description:
        "Building scalable web applications using modern technologies like React, Next.js, Node.js, and cloud platforms.",
    },
    {
      number: "02",
      title: "Machine Learning & AI",
      description:
        "Developing intelligent solutions using Python, TensorFlow, and various ML algorithms for real-world applications.",
    },
    {
      number: "03",
      title: "Cloud Architecture",
      description:
        "Designing and implementing robust cloud solutions on AWS and Azure with focus on scalability and performance.",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="hidden md:block absolute top-20 right-20 w-32 h-32 bg-gray-800 rounded-full opacity-10 z-background" />
      <div className="hidden md:block absolute bottom-40 left-20 w-16 h-16 bg-gray-700 rotate-45 opacity-20 z-background" />

      {/* Large section number */}
      <motion.div
        ref={numberRef}
        className="absolute top-20 left-8 text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800 leading-none z-10 pointer-events-none" // Adjusted z-index to 10, below text
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }} // Adjusted opacity for visibility
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        01
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20"> {/* Increased z-index for text content */}
        <div className="space-y-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm uppercase tracking-[0.2em]"
            >
              (About)
            </motion.div>

            <motion.h2
              ref={titleRef}
              className="section-title text-white"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Software Engineering
            </motion.h2>

            <motion.p
              className="section-subtitle text-gray-300 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              A passionate developer with expertise in building scalable, modern applications that drive real business
              results.
            </motion.p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-800 pb-8 group cursor-pointer"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "backOut", delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 20 }}
              >
                <div className="flex items-start space-x-8">
                  <div className="text-gray-500 text-sm font-mono">{service.number}</div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-3xl text-lg">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12 md:pt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { number: "1+", label: "Years Experience" },
              { number: "15+", label: "Technologies" },
              { number: "10+", label: "Projects Completed" },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { About }
