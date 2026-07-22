import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { Btn } from '@/components/ui-kodo/Btn'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Agencies', href: '/agencies' },
  { label: 'Med Spas', href: '/med-spas' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
            SOBAN AHMAD
          </span>
          <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-ink-3 sm:inline">
            // KODOAI
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] font-medium uppercase tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Btn href="/contact" variant="primary">
            Book a 15-minute call
          </Btn>
        </div>

        <MobileMenu links={NAV_LINKS} />
      </Container>
    </header>
  )
}
