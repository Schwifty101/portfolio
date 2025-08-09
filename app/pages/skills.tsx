"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatePresence } from "framer-motion"

const Skills = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const numberRef = useRef(null)
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Number animation with lower z-index
    gsap.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 0.5, // Increased opacity for visibility
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

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
        { name: "Java", level: "Intermediate" },
        { name: "C/C++", level: "Intermediate" },
        { name: "SQL", level: "Advanced" },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "GSAP", level: "Intermediate" },
        { name: "Three.js", level: "Beginner" },
        { name: "ShadCN UI", level: "Advanced" },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: "Advanced" },
        { name: "NestJS", level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "REST APIs", level: "Advanced" },
        { name: "GraphQL", level: "Intermediate" },
        { name: "Microservices", level: "Intermediate" },
      ],
    },
    {
      title: "Database & Cloud",
      skills: [
        { name: "PostgreSQL", level: "Advanced" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "Redis", level: "Intermediate" },
        { name: "AWS", level: "Intermediate" },
        { name: "Docker", level: "Intermediate" },
        { name: "Kubernetes", level: "Beginner" },
      ],
    },
    {
      title: "Machine Learning",
      skills: [
        { name: "TensorFlow", level: "Intermediate" },
        { name: "Keras", level: "Intermediate" },
        { name: "Scikit-learn", level: "Intermediate" },
        { name: "OpenCV", level: "Beginner" },
        { name: "NumPy", level: "Intermediate" },
        { name: "Pandas", level: "Intermediate" },
      ],
    },
  ]

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index)
  }

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-black text-white relative overflow-hidden">
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
        02
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20"> {/* Increased z-index for text content */}
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-8"
          >
            (Technical Skills)
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="section-title text-white mb-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Technology Stack
          </motion.h2>

          <motion.p
            className="section-subtitle text-gray-300 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A comprehensive toolkit for building modern, scalable applications across the full technology stack.
          </motion.p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-0">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-800 last:border-b-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => toggleCategory(index)}
                className="w-full py-8 flex items-center justify-between text-left hover:bg-gray-900/30 transition-colors duration-300 group"
                whileHover={{ x: 20 }}
              >
                <div className="flex items-center space-x-8">
                  <span className="text-gray-500 text-lg font-mono">({String(index + 1).padStart(2, "0")})</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400 text-2xl"
                >
                  +
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedCategory === index && (
                  <motion.div
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-16 pr-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2, delay: skillIndex * 0.05 }}
                            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-300"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              <span className="text-gray-300 font-medium">{skill.name}</span>
                            </div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{skill.level}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Skills }
