"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"

const Skills = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

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
        { name: "Tailwind", level: "Advanced" },
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
        { name: "MSA", level: "Intermediate" },
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
        { name: "TF", level: "Intermediate" },
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
    <section id="skills" ref={sectionRef} className="section-padding bg-[#0a0a0a] text-white relative overflow-hidden border-b border-[#1a1a1a]">

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20"> {/* Increased z-index for text content */}
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            className="eyebrow-label mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow-bar" />
            CAPABILITIES
          </motion.div>

          <motion.h2
            ref={titleRef}
            className="section-title font-barlow uppercase text-[#f0f0ea] mb-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Capabilities
          </motion.h2>

          <motion.p
            className="text-[15px] leading-relaxed text-[#aaaaaa] max-w-3xl"
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
              className="border-b border-[#1a1a1a] last:border-b-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => toggleCategory(index)}
                className="w-full py-8 flex items-center justify-between text-left transition-colors duration-300 group"
                whileHover={{ x: 20 }}
              >
                <div className="flex items-center space-x-8">
                  <span className="font-mono-custom text-[11px] text-[#444444]">({String(index + 1).padStart(2, "0")})</span>
                  <h3 className="font-barlow font-black text-[32px] md:text-[40px] uppercase text-[#f0f0ea] group-hover:text-[#c8f060] transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedCategory === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#c8f060] text-2xl"
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
                            className="flex items-center justify-between p-4 bg-[#111111] border border-[#1a1a1a] hover:border-[#c8f060] transition-colors duration-150"
                            style={{ borderRadius: 0 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 ${skill.level === 'Advanced' ? 'bg-[#c8f060]' : skill.level === 'Intermediate' ? 'bg-[#444444]' : 'bg-[#222222]'}`} style={{ borderRadius: 0 }}></div>
                              <span className="text-[#aaaaaa] text-[13px]">{skill.name}</span>
                            </div>
                            <span className="font-mono-custom text-[10px] uppercase tracking-[2px] text-[#444444]">{skill.level}</span>
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
