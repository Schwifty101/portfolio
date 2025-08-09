"use client"

import { useState, useEffect } from 'react'
import { LoadingScreen } from './pages/loading-screen'
import { Navigation } from './pages/navigation'
import { Hero } from './pages/hero'
import { About } from './pages/about'
import { Skills } from './pages/skills'
import { Experience } from './pages/experience'
import { Project } from './pages/project' // Ensure this is a named import
import { Education } from './pages/education'
import { Contact } from './pages/contact'
import { Footer } from './pages/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Ensure page starts at top on mount/refresh
  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo(0, 0)

    // Also scroll to hero section specifically after loading is complete
    if (!isLoading) {
      setTimeout(() => {
        const heroElement = document.getElementById('hero')
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main className="w-full">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Project />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
