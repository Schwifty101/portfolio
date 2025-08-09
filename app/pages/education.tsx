"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const Education = () => {
  const sectionRef = useRef(null)
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

  const education = [
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "National University of Computing and Emerging Sciences",
      location: "Islamabad, Pakistan",
      period: "2022 - 2026",
      highlights: [
        "Specialized in Software Engineering and AI/ML",
        "Bridged academic learning with real-world experience across 3+ internship roles",
        "Successfully applied theoretical knowledge through multiple internships and projects",
      ],
    },
  ]

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "TensorFlow Developer Certificate",
    "React Advanced Patterns Certification",
  ]

  return (
    <section id="education" ref={sectionRef} className="section-full section-padding bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="hidden md:block absolute top-20 right-[clamp(1.5rem,5vw,4rem)] w-24 h-24 bg-gray-800 rounded-full opacity-10 z-background" />
      <div className="hidden md:block absolute bottom-40 left-[clamp(1.5rem,5vw,4rem)] w-16 h-16 bg-gray-700 rotate-45 opacity-20 z-background" />

      {/* Large section number */}
      <motion.div
        ref={numberRef}
        className="absolute top-20 left-[clamp(1rem,3vw,2rem)] text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-800 leading-none z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        05
      </motion.div>

      <div className="container-full relative z-20">
        <div className="space-y-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm uppercase tracking-[0.2em]"
            >
              (Education & Certifications)
            </motion.div>

            <motion.h2
              className="section-title text-white"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Academic Foundation
            </motion.h2>

            <motion.p
              className="section-subtitle text-gray-300 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Strong academic background in computer science with continuous learning through professional certifications and industry-recognized credentials.
            </motion.p>
          </div>

          {/* Education */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-gray-300 text-lg">{edu.institution}</p>
                    <p className="text-gray-400">{edu.location}</p>
                  </div>
                  <div className="text-right mt-4 lg:mt-0">
                    <p className="text-gray-300 font-medium">{edu.period}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {edu.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="text-gray-400 flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-8">
            <motion.h3
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Professional Certifications
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-300 font-medium">{cert}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Education }
