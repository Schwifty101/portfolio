"use client"

import { useState, useEffect } from 'react'
import { LoadingScreen } from './pages/loading-screen'
import { Navigation } from './pages/navigation'
import { Hero } from './pages/hero'
import { About } from './pages/about'
import { Work } from './pages/work'
import { Process } from './pages/process'
import { Services } from './pages/services'
import { Resources } from './pages/resources'
import { Contact } from './pages/contact'
import { Footer } from './pages/Footer'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Ensure page starts at top on mount/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <Navigation />
      <SmoothScrollProvider isReady={!isLoading}>
        <main className="w-full">
          <Hero />
          <About />
          <Work />
          <Process />
          <Services />
          <Resources />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </>
  )
}
