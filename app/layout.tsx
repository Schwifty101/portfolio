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
    default: 'Soban Ahmad — Engineering Digital Platforms',
    template: '%s | Soban Ahmad'
  },
  description: 'Soban Ahmad — Full-stack engineer building production-grade platforms, AI-powered systems, and SaaS applications for founders who need someone who can actually build it.',
  keywords: ['software engineer', 'full-stack developer', 'React', 'Next.js', 'Node.js', 'TypeScript', 'AI', 'machine learning', 'web development', 'SaaS', 'personal brand', 'technical consulting', 'Python', 'cloud architecture'],
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
    title: 'Soban Ahmad — Engineering Digital Platforms',
    description: 'Full-stack engineer building production-grade platforms, AI-powered systems, and SaaS applications.',
    siteName: 'Soban Ahmad',
    images: [
      {
        url: '/og-image-1.png',
        width: 1200,
        height: 630,
        alt: 'Soban Ahmad — Engineering Digital Platforms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soban Ahmad — Engineering Digital Platforms',
    description: 'Full-stack engineer building production-grade platforms, AI-powered systems, and SaaS applications.',
    images: ['/og-image-1.png'],
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
            <h1>Soban Ahmad — Engineering Digital Platforms</h1>
            <p>Full-stack engineer building production-grade platforms, AI-powered systems, and SaaS applications for founders who need someone who can actually build it.</p>
            <h2>Services</h2>
            <ul>
              <li>Full-Stack Development</li>
              <li>AI &amp; Automation</li>
              <li>SaaS Platforms</li>
              <li>Technical Consulting</li>
            </ul>
            <h2>Selected Work</h2>
            <ul>
              <li>Automated Pre-Call Brief Generator</li>
              <li>AR&amp;CO Law Associates</li>
              <li>AI Assessment Platform</li>
              <li>Secure Messaging System</li>
            </ul>
            <h2>Contact</h2>
            <p>Visit <a href="https://sobanahmad.dev">sobanahmad.dev</a> | <a href="https://www.linkedin.com/in/soban-ahmad-malik/">LinkedIn</a> | <a href="https://github.com/Schwifty101">GitHub</a></p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
