import { Container } from '@/components/ui-kodo/Container'
import { Btn } from '@/components/ui-kodo/Btn'
import { EMAIL } from '@/lib/site'

type PageCtaProps = {
  heading?: string
  sub?: string
}

export function PageCta({
  heading = 'A 15-minute call is usually enough to know if there is a fit.',
  sub = 'No slides, no pitch.',
}: PageCtaProps) {
  return (
    <section className="border-t border-border bg-surface">
      <Container className="py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-ink md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 font-sans text-[17px] text-ink-2">{sub}</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Btn href="/contact" variant="primary">
              Book a 15-minute call
            </Btn>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-[13px] tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
