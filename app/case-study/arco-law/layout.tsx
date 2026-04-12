import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AR&CO Law Associates — Case Study',
  description:
    'How we replaced phone calls, spreadsheets, and manual payments with a full-stack law firm platform — client portal, staff CRM, and automated billing. Built with Next.js, NestJS, Supabase, and LemonSqueezy.',
  openGraph: {
    title: 'AR&CO Law Associates — Case Study | Soban Ahmad',
    description:
      'Full-stack law firm platform with client portal, workflow automation, and AI-ready infrastructure. Delivered by Silicon.Studio.',
    url: 'https://sobanahmad.dev/case-study/arco-law',
    images: [
      {
        url: '/og-image-1.png',
        width: 1200,
        height: 630,
        alt: 'AR&CO Law Associates Case Study — Soban Ahmad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR&CO Law Associates — Case Study | Soban Ahmad',
    description:
      'Full-stack law firm platform with client portal, workflow automation, and AI-ready infrastructure.',
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
