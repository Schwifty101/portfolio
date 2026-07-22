import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { Container } from '@/components/ui-kodo/Container'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { Btn } from '@/components/ui-kodo/Btn'
import { KineticHeadline } from '@/components/motion'
import { PageCta } from '@/components/site/PageCta'
import { JsonLd, articleSchema, breadcrumbSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import { getAllPosts, getPost, type Pillar } from '@/lib/blog'
import { mdxComponents } from '@/mdx-components'

/** Every published post is prerendered; no filesystem reads happen at request time. */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

/** Only prerendered slugs resolve; unknown /blog/<slug> requests 404 at the routing layer. */
export const dynamicParams = false

/** Short, human-readable eyebrow label for each pillar id. */
const PILLAR_LABEL: Record<Pillar, string> = {
  'manual-work': 'Manual work',
  preparation: 'Preparation',
  'agency-economics': 'Agency economics',
  'med-spa': 'Med spas',
}

/** Closing next-step link and intro, chosen by the post's pillar. */
const PILLAR_CTA: Record<Pillar, { href: string; label: string; intro: string }> = {
  'manual-work': {
    href: '/agencies/ad-operations-automation',
    label: 'See the ad operations automation build',
    intro:
      'If this is the kind of manual work eating your margin, the matching build shows the mechanism in full.',
  },
  preparation: {
    href: '/agencies/pre-sales-research-automation',
    label: 'See the pre-sales research automation build',
    intro:
      'If pre-sales prep is quietly draining hours your P&L never bills for, the matching build shows the mechanism in full.',
  },
  'agency-economics': {
    href: '/agencies',
    label: 'See how the agency systems fit together',
    intro:
      'If your margins are thinner than the work deserves, the matching build shows how the economics tighten up.',
  },
  'med-spa': {
    href: '/med-spas/ai-receptionist',
    label: 'See the AI receptionist build',
    intro:
      'If missed calls are leaking bookings straight off your P&L, the matching build shows the mechanism in full.',
  },
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { meta, content } = post
  const url = `${SITE_URL}/blog/${slug}`
  const cta = PILLAR_CTA[meta.pillar]

  // Compile the MDX body to a component at build time.
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    baseUrl: import.meta.url,
  })

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: meta.title,
            description: meta.description,
            url,
            datePublished: meta.datePublished,
            dateModified: meta.dateModified,
          }),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: `${SITE_URL}/blog` },
            { name: meta.title, url },
          ]),
        ]}
      />

      <main>
        {/* Header: pillar label, H1, byline, dates */}
        <section className="border-b border-border">
          <Container className="py-20 md:py-28">
            <div className="max-w-3xl">
              <SectionLabel>{PILLAR_LABEL[meta.pillar]}</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
              >
                {meta.title}
              </KineticHeadline>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/about" className="group flex items-center gap-3">
                  <Image
                    src="/myPhoto-optimized.jpg"
                    alt="Soban Ahmad"
                    width={40}
                    height={40}
                    className="h-10 w-10 border border-border object-cover"
                  />
                  <span className="font-sans text-[15px] font-medium text-ink transition-colors group-hover:text-accent">
                    {SITE_NAME}
                  </span>
                </Link>
                <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink-3">
                  <span>{`// Published ${formatDate(meta.datePublished)}`}</span>
                  {meta.dateModified && meta.dateModified !== meta.datePublished && (
                    <span className="ml-4">{`// Updated ${formatDate(meta.dateModified)}`}</span>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Key takeaways */}
        {meta.takeaways.length > 0 && (
          <section className="border-b border-border bg-surface">
            <Container className="py-14">
              <div className="max-w-3xl border border-border bg-bg p-8">
                <SectionLabel>KEY TAKEAWAYS</SectionLabel>
                <ol className="mt-6 space-y-4">
                  {meta.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mono text-[14px] font-medium tracking-[0.15em] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-[17px] leading-relaxed text-ink-2">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </section>
        )}

        {/* MDX body */}
        <section>
          <Container className="py-16 md:py-20">
            <article className="max-w-3xl">
              <MDXContent components={mdxComponents} />
            </article>
          </Container>
        </section>

        {/* Pillar next-step */}
        <section className="border-t border-border bg-surface">
          <Container className="py-16">
            <div className="max-w-3xl">
              <SectionLabel>NEXT STEP</SectionLabel>
              <p className="mt-4 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2">
                {cta.intro}
              </p>
              <div className="mt-6">
                <Btn href={cta.href} variant="default">
                  {cta.label}
                </Btn>
              </div>
            </div>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
