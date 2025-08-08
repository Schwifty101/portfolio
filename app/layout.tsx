import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Soban Ahmad - Software Engineer & Developer',
  description: 'Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture.',
  keywords: 'software engineer, full-stack developer, React, Next.js, Node.js, AI, machine learning',
  authors: [{ name: 'Soban Ahmad' }],
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
