import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Soban Ahmad - Software Engineer & Developer',
    template: '%s | Soban Ahmad'
  },
  description: 'Portfolio of Soban Ahmad - Full-stack developer. I turn business problems into production-ready software. Explore my projects and technical expertise.',
  keywords: ['software engineer', 'full-stack developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'AI', 'machine learning', 'web development', 'portfolio', 'JavaScript', 'Python', 'cloud architecture'],
  authors: [{ name: 'Soban Ahmad', url: 'https://sobanahmad.dev' }],
  creator: 'Soban Ahmad',
  publisher: 'Soban Ahmad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sobanahmad.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sobanahmad.dev',
    title: 'Soban Ahmad - Software Engineer & Developer',
    description: 'Portfolio of Soban Ahmad - Full-stack developer. I turn business problems into production-ready software.',
    siteName: 'Soban Ahmad Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Soban Ahmad - Software Engineer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soban Ahmad - Software Engineer & Developer',
    description: 'Portfolio of Soban Ahmad - Full-stack developer. I turn business problems into production-ready software.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.JPG',
    shortcut: '/favicon.JPG',
    apple: '/apple-touch-icon.JPG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="3vRG8sFEkda-o8fvds2MUaj9wvTXlLrrW_8mz6vuAyM" />
        <link rel="icon" href="/favicon.JPG" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.JPG" />
        <link rel="shortcut icon" href="/favicon.JPG" type="image/jpeg" />
        <link rel="preconnect" href="https://app.cal.com" />
        <style>{`
          html {
            scroll-restoration: manual;
          }
        `}</style>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <JsonLd />
        <noscript>
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1>Soban Ahmad - Software Engineer &amp; Developer</h1>
            <p>Full-stack developer. I turn business problems into production-ready software.</p>
            <h2>Skills</h2>
            <p>React, Next.js, Node.js, TypeScript, Python, JavaScript, Cloud Architecture, Machine Learning, AI</p>
            <h2>Experience</h2>
            <ul>
              <li>Team Lead – AI-Powered Assessment Platform</li>
              <li>PK Delivery Management Intern</li>
              <li>Fullstack &amp; QA Intern</li>
              <li>Frontend Development Intern</li>
            </ul>
            <h2>Projects</h2>
            <ul>
              <li>Traffic Sign Classification using CNN</li>
              <li>AI-Powered Assessment Platform</li>
              <li>Chess AI Engine</li>
              <li>IMDB Backend Clone</li>
              <li>Multi-Commerce Admin Dashboard</li>
              <li>Weather Forecast Chatbot</li>
            </ul>
            <h2>Education</h2>
            <p>Bachelor of Science in Software Engineering</p>
            <h2>Contact</h2>
            <p>Visit <a href="https://sobanahmad.dev">sobanahmad.dev</a> | <a href="https://www.linkedin.com/in/soban-ahmad-malik/">LinkedIn</a> | <a href="https://github.com/Schwifty101">GitHub</a></p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
