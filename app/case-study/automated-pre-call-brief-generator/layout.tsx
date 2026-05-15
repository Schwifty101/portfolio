import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automated Pre-Call Brief Generator — Case Study',
  description:
    'An AI-powered prospect intelligence pipeline that automates pre-call research for marketing agency sales teams using Python, FastAPI, Next.js, and Google Gemini.',
  openGraph: {
    title: 'Automated Pre-Call Brief Generator — Case Study | Soban Ahmad',
    description:
      'AI-powered prospect intelligence pipeline that automates pre-call research for marketing agency sales teams.',
    url: 'https://sobanahmad.dev/case-study/automated-pre-call-brief-generator',
    images: [
      {
        url: '/og-image-1.png',
        width: 1200,
        height: 630,
        alt: 'Automated Pre-Call Brief Generator Case Study — Soban Ahmad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automated Pre-Call Brief Generator — Case Study | Soban Ahmad',
    description:
      'AI-powered prospect intelligence pipeline that automates pre-call research for marketing agency sales teams.',
    images: ['/og-image-1.png'],
  },
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
