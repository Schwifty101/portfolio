import { createElement } from 'react'
import type { Metadata } from 'next'
import {
  SITE_URL,
  SITE_NAME,
  ORG_NAME,
  TAGLINE,
  SAME_AS,
} from '@/lib/site'

/**
 * Renders one or more JSON-LD objects as a script tag.
 * Server-safe; used inline on pages and in the root layout.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return createElement('script', {
    type: 'application/ld+json',
    // Escape "<" so the serialised JSON can never break out of the script tag.
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    },
  })
}

/** Stable node id for the person entity, referenced by other schemas. */
const PERSON_ID = `${SITE_URL}/#person`
/** Stable node id for the organisation entity. */
const ORG_ID = `${SITE_URL}/#organization`

export function personSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: 'AI Automation Engineer',
    worksFor: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'NUCES',
    },
    knowsAbout: [
      'AI automation for marketing agencies',
      'Ad operations automation',
      'Pre-sales research automation',
      'AI voice agents',
      'Client onboarding automation',
    ],
    sameAs: SAME_AS,
  }
}

export function organizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    url: SITE_URL,
    founder: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
    },
    sameAs: SAME_AS,
  }
}

export function websiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: TAGLINE,
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
    },
  }
}

export function serviceSchema(opts: {
  name: string
  description: string
  url: string
  serviceType: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    provider: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  }
}

export function faqSchema(items: { q: string; a: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function articleSchema(opts: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': opts.url,
    },
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function pageMetadata(opts: {
  title: string
  description: string
  path: string
}): Metadata {
  const canonical = `${SITE_URL}${opts.path}`
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: ['/og-image.png'],
    },
  }
}
