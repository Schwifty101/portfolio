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
    <html lang="en" className="scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <title>Soban Ahmad - Software Engineer & Developer</title>
        <meta name="title" content="Soban Ahmad - Software Engineer & Developer" />
        <meta name="description" content="Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sobanahmad.vercel.app/" />
        <meta property="og:title" content="Soban Ahmad - Software Engineer & Developer" />
        <meta property="og:description" content="Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture." />
        <meta property="og:image" content="https://replug.io/images/example.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sobanahmad.vercel.app/" />
        <meta property="twitter:title" content="Soban Ahmad - Software Engineer & Developer" />
        <meta property="twitter:description" content="Portfolio of Soban Ahmad - Full-stack developer specializing in modern web applications, AI/ML solutions, and cloud architecture." />
        <meta property="twitter:image" content="https://replug.io/images/example.png" />
        <link rel="icon" href="/myPhoto.jpg" type="image/jpg" />
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
