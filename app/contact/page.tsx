import type { Metadata } from 'next'
import { Container } from '@/components/ui-kodo/Container'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'
import { KineticHeadline } from '@/components/motion'
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL, EMAIL } from '@/lib/site'
import { CalEmbed } from './CalEmbed'

const TITLE = 'Book a 15-Minute Fit Call'
const DESCRIPTION =
  'Book a 15-minute fit call with Soban Ahmad (KodoAI) to find where automation can remove a manual bottleneck in your agency. No slides, no pitch, no obligation.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
})

const PATH = `${SITE_URL}/contact`

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: PATH },
        ])}
      />

      <main>
        <section className="border-b border-border">
          <Container className="py-20 md:py-28">
            <div className="max-w-3xl">
              <SectionLabel>CONTACT</SectionLabel>
              <KineticHeadline
                as="h1"
                className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
              >
                Book a 15-minute call
              </KineticHeadline>
              <p className="mt-6 font-sans text-[18px] leading-relaxed text-ink-2 md:text-[20px]">
                A 15-minute call, no slides, no pitch. Pick a time that works and we will look at where
                automation can remove a manual bottleneck in your agency.
              </p>
            </div>

            <div className="mt-14">
              <CalEmbed />
            </div>

            <p className="mt-10 font-mono text-[13px] uppercase tracking-[0.15em] text-ink-3">
              {'// PREFER EMAIL? '}
              <a
                href={`mailto:${EMAIL}`}
                className="text-ink-2 transition-colors hover:text-accent"
              >
                {EMAIL}
              </a>
            </p>
          </Container>
        </section>
      </main>
    </>
  )
}
