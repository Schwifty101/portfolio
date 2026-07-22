import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'

/**
 * Design-system mapping for MDX article bodies. Barlow Condensed display for
 * headings, IBM Plex Sans for body at 18px ink-2, IBM Plex Mono for code, acid
 * lime for links, bordered surface tables. Every element sits on the token set;
 * border-radius stays 0 throughout.
 *
 * Shared by the Next.js convention (useMDXComponents) and passed directly to the
 * compiled MDX content in app/blog/[slug]/page.tsx.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mt-14 mb-5 font-display text-3xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-4xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mt-10 mb-4 font-display text-xl font-semibold uppercase leading-tight tracking-tight text-ink md:text-2xl"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="my-6 font-sans text-[18px] leading-[1.7] text-ink-2" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="my-6 list-disc space-y-2 pl-6 font-sans text-[18px] leading-[1.7] text-ink-2 marker:text-accent"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="my-6 list-decimal space-y-2 pl-6 font-sans text-[18px] leading-[1.7] text-ink-2 marker:font-mono marker:text-accent"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="pl-1" {...props} />,
  a: ({ href = '#', ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isInternal = href.startsWith('/')
    const className = 'text-accent underline underline-offset-4 transition-colors hover:text-ink'
    if (isInternal) {
      return <Link href={href} className={className} {...props} />
    }
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props} />
    )
  },
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="italic" {...props} />,
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[15px] text-ink"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-8 border-l-2 border-accent bg-surface py-2 pl-6 font-sans text-[18px] italic leading-[1.7] text-ink-2"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse border border-border text-left font-sans text-[16px]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-surface-2" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border border-border px-4 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.15em] text-ink"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border border-border px-4 py-3 align-top text-ink-2" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-12 border-t border-border" {...props} />
  ),
}

/**
 * Next.js MDX convention hook. Merges caller-provided components over the
 * design-system defaults.
 */
export function useMDXComponents(components: Record<string, unknown>) {
  return { ...mdxComponents, ...components }
}
