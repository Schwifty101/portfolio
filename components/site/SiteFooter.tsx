import Link from 'next/link'
import { Container } from '@/components/ui-kodo/Container'
import { TAGLINE, EMAIL, SAME_AS } from '@/lib/site'

type FooterLink = { label: string; href: string }

const AGENCIES: FooterLink[] = [
  { label: 'Agencies', href: '/agencies' },
  { label: 'Ad Operations Automation', href: '/agencies/ad-operations-automation' },
  { label: 'Pre-Sales Research Automation', href: '/agencies/pre-sales-research-automation' },
  { label: 'Onboarding Intelligence', href: '/agencies/onboarding-intelligence' },
]

const MED_SPAS: FooterLink[] = [
  { label: 'Med Spas', href: '/med-spas' },
  { label: 'AI Receptionist', href: '/med-spas/ai-receptionist' },
]

const PROOF: FooterLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'AR&CO Law', href: '/work/arco-law' },
  { label: 'Pre-Call Brief', href: '/work/pre-call-brief' },
  { label: 'Ad Ops Agent', href: '/work/ad-ops-agent' },
  { label: 'AI Voice Agent', href: '/work/ai-voice-agent' },
]

const MORE: FooterLink[] = [
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const [LINKEDIN_URL, GITHUB_URL] = SAME_AS

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.15em] text-ink-3">
        // {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-sans text-[15px] text-ink-2 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <FooterColumn title="Agencies" links={AGENCIES} />
          <FooterColumn title="Med Spas" links={MED_SPAS} />
          <FooterColumn title="Proof" links={PROOF} />
          <FooterColumn title="More" links={MORE} />
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
              SOBAN AHMAD{' '}
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.15em] text-ink-3">
                // KODOAI
              </span>
            </p>
            <p className="mt-3 max-w-md font-sans text-[15px] text-ink-2">{TAGLINE}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-block font-mono text-[13px] tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
            >
              {EMAIL}
            </a>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex gap-6">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink-2 transition-colors hover:text-accent"
              >
                GitHub
              </a>
            </div>
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink-3">
              Associated with{' '}
              <a
                href="https://www.bluegile.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                www.bluegile.xyz
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
