import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
  description: 'Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture. Explore my projects and technical expertise.',
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
    description: 'Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture.',
    siteName: 'Soban Ahmad Portfolio',
    images: [
      {
        url: '/myPhoto.jpg',
        width: 1200,
        height: 630,
        alt: 'Soban Ahmad - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soban Ahmad - Software Engineer & Developer',
    description: 'Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture.',
    images: ['/myPhoto.jpg'],
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
    <html lang="en" className="scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <meta name="google-site-verification" content="3vRG8sFEkda-o8fvds2MUaj9wvTXlLrrW_8mz6vuAyM" />
        <link rel="icon" href="/favicon.JPG" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.JPG" />
        <link rel="shortcut icon" href="/favicon.JPG" type="image/jpeg" />
        <style>{`
          html {
            scroll-restoration: manual;
          }
        `}</style>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
