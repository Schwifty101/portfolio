"use client"

import { useState } from 'react'
import { LoadingScreen } from './pages/loading-screen'
import { Navigation } from './pages/navigation'
import { Hero } from './pages/hero'
import { About } from './pages/about'
import { Skills } from './pages/skills'
import { Experience } from './pages/experience'
import { Project } from './pages/project' // Ensure this is a named import
import { Education } from './pages/education'
import { Contact } from './pages/contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

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
      </div>
    </>
  )
}
