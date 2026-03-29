"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from 'next/image'

const Testimonials = () => {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)

    const testimonials = [
        {
            id: 1,
            name: "Shoaib Razzaq",
            role: "Founding Partner, AR&CO Law Associates",
            content: "We are lawyers, not tech people, and the thought of moving the entire firm online was quite daunting for us. Soban handled everything and made the process straightforward. Our clients can now book their own consultations and make payments without us having to manage it all manually over the phone. It has genuinely changed the way we run things.",
            image: "/Shoaib_Razaq.webp"
        },
        {
            id: 2,
            name: "Rizwan",
            role: "Founder, The New Home",
            content: "The quality of our work has always spoken for itself in person, but translating that onto a website is not as simple as it sounds. Soban understood exactly what we were looking for. The site he built presents our portfolio of ceilings and flooring the way it deserves to be shown. New clients actually mention it when they first reach out to us.",
            image: "/raja_shehbaz.webp"
        }
    ]

    return (
        <section id="testimonials" ref={sectionRef} className="section-padding bg-[#0d0d0d] text-white relative overflow-hidden py-32 border-b border-[#1a1a1a]">

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
                <div className="text-center mb-20">
                    <motion.h2
                        ref={headerRef}
                        className="text-4xl md:text-6xl font-barlow font-black tracking-[-1px] text-[#f0f0ea]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        IN THEIR WORDS.
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
                            className="bg-[#111111] border border-[#1a1a1a] p-8 md:p-12 relative group hover:border-[#c8f060] transition-colors duration-200"
                            style={{ borderRadius: 0 }}
                        >
                            <div style={{
                              position:'absolute', top:'32px', right:'32px',
                              width:'20px', height:'1px', background:'#c8f060'
                            }} />

                            <div className="relative z-10 space-y-8">
                                <p className="text-[15px] leading-[1.7] text-[#aaaaaa]">
                                    {testimonial.content}
                                </p>

                                <div className="flex items-center space-x-4">
                                    {testimonial.image ? (
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 object-cover border border-[#1a1a1a]"
                                            style={{ borderRadius: 0 }}
                                        />
                                    ) : (
                                        <div 
                                            className="w-12 h-12 bg-[#111111] flex items-center justify-center text-[#c8f060] font-bold uppercase border border-[#1a1a1a]"
                                            style={{ borderRadius: 0 }}
                                        >
                                            {testimonial.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-barlow font-black text-[18px] uppercase tracking-[2px] text-[#f0f0ea]">{testimonial.name}</div>
                                        <div className="font-mono-custom text-[11px] uppercase tracking-[2px] text-[#555555]">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  style={{
                    marginTop: '48px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#333333',
                  }}
                >
                  <span style={{color: '#c8f060'}}>$2M+</span> in combined revenue outcomes across client 
                  platforms — most results visible within six months.
                </motion.div>
            </div>
        </section>
    )
}

export { Testimonials }
