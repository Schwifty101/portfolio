import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { JsonLd, websiteSchema, organizationSchema } from '@/lib/schema'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SITE_URL } from '@/lib/site'

const display = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], variable: '--display' })
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--mono' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const DEFAULT_TITLE = 'Soban Ahmad (KodoAI): AI Automation Systems for Agencies'
const DEFAULT_DESCRIPTION =
  'Soban Ahmad builds the AI automation systems that remove the manual ops eating agency margin, so teams grow without hiring.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Soban Ahmad',
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: 'Soban Ahmad', url: SITE_URL }],
  creator: 'Soban Ahmad',
  publisher: 'Soban Ahmad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: 'Soban Ahmad',
    images: [
      {
        url: '/og-image-1.png',
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
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
      <body className="font-sans antialiased" suppressHydrationWarning>
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
