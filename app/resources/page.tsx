import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Card } from '@/components/ui-kodo/Card'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline, Reveal } from '@/components/motion'
import { PageCta } from '@/components/site/PageCta'
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL, SAME_AS } from '@/lib/site'

const TITLE = 'Resources: Audits and Checklists for Agencies'
const DESCRIPTION =
  'Practical resources for agencies automating manual work: the Ad-Account Leak Audit and the Pre-Call Research Checklist, both yours for a name and a work email.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources',
})

const PATH = `${SITE_URL}/resources`

const LINKEDIN = SAME_AS.find((u) => u.includes('linkedin')) ?? SAME_AS[0]
const GITHUB = SAME_AS.find((u) => u.includes('github')) ?? SAME_AS[1]

const MAGNETS = [
  {
    href: '/resources/ad-account-leak-audit',
    label: 'FLAGSHIP',
    title: 'The Ad-Account Leak Audit',
    description:
      '10 signals your client accounts are quietly losing money, from budget pacing drift to broken attribution. Run it on any account in about 20 minutes.',
    cta: 'Get the Ad-Account Leak Audit',
  },
  {
    href: '/resources/pre-call-research-checklist',
    label: 'FOR SALES TEAMS',
    title: 'The Pre-Call Research Checklist',
    description:
      '12 signals every AE should check before a discovery call, most teams skip 8. The prep map that lets a rep walk in already knowing the account.',
    cta: 'Get the Pre-Call Research Checklist',
  },
]

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Resources', url: PATH },
        ])}
      />

      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <Container className="py-24 md:py-32">
            <div className="max-w-4xl">
              <SectionLabel>RESOURCES</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
              >
                Tools for agencies automating the manual work
              </KineticHeadline>
              <p className="mt-8 max-w-2xl font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                Two working resources for agency teams: one to find where a paid-ads account is
                leaking money, one to sharpen the prep before a discovery call. Each is yours for a
                name and a work email, and each maps to a system that does the same job continuously.
              </p>
            </div>
          </Container>
        </section>

        {/* Featured magnets */}
        <section className="border-b border-border bg-surface">
          <Container className="py-24">
            <SectionLabel>THE RESOURCES</SectionLabel>
            <Reveal
              stagger={0.1}
              className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {MAGNETS.map((m) => (
                <Card key={m.href} featured className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-3">
                    {`// ${m.label}`}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-3xl">
                    {m.title}
                  </h2>
                  <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {m.description}
                  </p>
                  <Link
                    href={m.href}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-ink"
                  >
                    {m.cta}
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </Card>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* Toolkit + resume */}
        <section className="border-b border-border bg-bg">
          <Container className="py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <SectionLabel>ELSEWHERE</SectionLabel>
                <h2 className="mt-6 font-display text-2xl font-semibold uppercase leading-tight tracking-tight text-ink">
                  The toolkit
                </h2>
                <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-ink-2">
                  Where the builds and the working notes live.
                </p>
                <ul className="mt-6 space-y-3">
                  <li>
                    <a
                      href={GITHUB}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
                    >
                      GitHub
                      <span aria-hidden="true">-&gt;</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
                    >
                      LinkedIn
                      <span aria-hidden="true">-&gt;</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:border-l md:border-border md:pl-12">
                <SectionLabel>ALSO AVAILABLE</SectionLabel>
                <p className="mt-6 max-w-md font-sans text-[14px] leading-relaxed text-ink-3">
                  Looking for a CV rather than a build partner? The{' '}
                  <a
                    href="/Resume_SobanAhmad.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-2 underline decoration-border underline-offset-4 transition-colors hover:text-accent"
                  >
                    resume is here
                  </a>
                  .
                </p>
              </div>
            </div>
          </Container>
        </section>

        <PageCta />
      </main>
    </>
  )
}
