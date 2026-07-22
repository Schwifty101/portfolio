import { JsonLd, faqSchema } from '@/lib/schema'
import { SectionLabel } from '@/components/ui-kodo/SectionLabel'

type FaqItem = { q: string; a: string }

/**
 * Visible, accordion-free FAQ. Every question and answer is present in the
 * server-rendered HTML (no JS, no collapse), and the block emits FAQPage
 * schema inline so the visible copy and the structured data always match.
 */
export function FaqBlock({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="w-full" aria-labelledby="faq-heading">
      <JsonLd data={faqSchema(items)} />
      <div className="mb-8">
        <SectionLabel>FAQ</SectionLabel>
        <h2
          id="faq-heading"
          className="mt-3 font-display text-3xl font-semibold uppercase tracking-tight text-ink md:text-4xl"
        >
          Common questions
        </h2>
      </div>
      <dl className="border-t border-border">
        {items.map((item, index) => (
          <div key={index} className="border-b border-border py-8">
            <dt>
              <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-ink md:text-2xl">
                {item.q}
              </h3>
            </dt>
            <dd className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-ink-2">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
