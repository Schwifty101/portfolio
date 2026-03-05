"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote } from 'lucide-react'

const Testimonials = () => {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    const testimonials = [
        {
            id: 1,
            name: "Shoaib Razzaq",
            role: "Founding Partner, AR&CO Law Associates",
            content: "We are lawyers, not tech people, and the thought of moving the entire firm online was quite daunting for us. Soban handled everything and made the process straightforward. Our clients can now book their own consultations and make payments without us having to manage it all manually over the phone. It has genuinely changed the way we run things.",
        },
        {
            id: 2,
            name: "Rizwan",
            role: "Founder, The New Home",
            content: "The quality of our work has always spoken for itself in person, but translating that onto a website is not as simple as it sounds. Soban understood exactly what we were looking for. The site he built presents our portfolio of ceilings and flooring the way it deserves to be shown. New clients actually mention it when they first reach out to us.",
        }
    ]

    return (
        <section id="testimonials" ref={sectionRef} className="section-padding bg-black text-white relative overflow-hidden py-32 border-t border-gray-900">

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-4"
                    >
                        (Client Impact)
                    </motion.div>
                    <motion.h2
                        ref={headerRef}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        TRUSTED BY PARTNERS
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gray-900/40 border border-gray-800 p-8 md:p-12 rounded-2xl relative group hover:bg-gray-900/80 hover:border-gray-700 transition-all duration-500"
                        >
                            <Quote className="w-12 h-12 text-gray-800 absolute top-8 right-8 group-hover:text-gray-700 transition-colors duration-500" />

                            <div className="relative z-10 space-y-8">
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 font-bold uppercase">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                                        <div className="text-gray-500 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export { Testimonials }
