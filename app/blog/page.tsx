import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal } from '@/components/motion'
import { PageCta } from '@/components/site/PageCta'
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'
import { getAllPosts, type Pillar, type PostMeta } from '@/lib/blog'

const TITLE = 'Notes on Automating Agency Manual Work'
const DESCRIPTION =
  'Writing on manual work as a competitive liability, why speed of preparation wins, agency economics, and speed-to-lead for med spas, from builds I have shipped.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/blog',
})

/** The four content lanes, in reading order, each with its one-line definition. */
const PILLARS: { id: Pillar; label: string; definition: string }[] = [
  {
    id: 'manual-work',
    label: 'Manual work as a competitive liability',
    definition:
      'The cost that never hits the invoice: the CPA drift caught too late, the QA redone by hand across four platforms.',
  },
  {
    id: 'preparation',
    label: 'Speed of preparation beats depth',
    definition:
      'The agency that prepares fastest wins, not the one that prepares most. Where discovery calls are really lost.',
  },
  {
    id: 'agency-economics',
    label: 'Scale the system, not the headcount',
    definition:
      'The margin-and-headcount trap: every strategist hired to fix an ops problem shrinks the margin they were hired to grow.',
  },
  {
    id: 'med-spa',
    label: 'Speed to lead for med spas',
    definition:
      'Missed-call recovery and the after-hours enquiry bleed: why the front desk cannot be the only thing answering.',
  },
]

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-border py-6 transition-colors hover:bg-surface"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
        {`// ${formatDate(post.datePublished)}`}
      </span>
      <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink transition-colors group-hover:text-accent md:text-2xl">
        {post.title}
      </h3>
      <p className="mt-2 max-w-2xl font-sans text-[15px] leading-relaxed text-ink-2">
        {post.description}
      </p>
    </Link>
  )
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
        ])}
      />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>BLOG</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Notes from the builds
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                One idea runs through all of it: if it is manual and measurable, it can be automated.
                These are the notes behind that belief, grouped by the four lanes I write in, each
                grounded in a system I have shipped rather than a trend I have read about.
              </p>
            </div>
          </Container>
        </section>

        {/* Pillars */}
        <section className="bg-surface">
          <Container className="py-20 md:py-24">
            <div className="space-y-20">
              {PILLARS.map((pillar) => {
                const pillarPosts = posts.filter((p) => p.pillar === pillar.id)
                return (
                  <Reveal key={pillar.id} as="div">
                    <div className="max-w-3xl border-l-2 border-accent-dim pl-6">
                      <SectionLabel>{pillar.id.toUpperCase()}</SectionLabel>
                      <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
                        {pillar.label}
                      </h2>
                      <p className="mt-3 font-sans text-[16px] leading-relaxed text-ink-2">
                        {pillar.definition}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-border">
                      {pillarPosts.length > 0 ? (
                        pillarPosts.map((post) => <PostRow key={post.slug} post={post} />)
                      ) : (
                        <p className="border-b border-border py-6 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
                          {'// First articles are in the works'}
                        </p>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
