import type { Metadata } from 'next'
import { PageCta } from '@/components/site/PageCta'
import { JsonLd, serviceSchema, pageMetadata } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'
import { Hero, PainSection, MechanismSection, ProofSection } from './home/sections'

const TITLE = 'AI Automation Systems for Paid-Ads Agencies | Soban Ahmad'
const DESCRIPTION =
  'Soban Ahmad builds the AI automation systems that remove the manual ops eating agency margin, so paid-ads teams grow without hiring more strategists.'

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/' }),
  // Home sets a full, self-contained title; override the layout's "%s | Soban
  // Ahmad" template so the name is not appended twice.
  title: { absolute: TITLE },
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'AI Automation Systems for Paid-Ads Agencies',
          description: DESCRIPTION,
          url: SITE_URL,
          serviceType: 'AI automation systems for marketing agencies',
        })}
      />
      {/*
        ScrollSmoother is intentionally not mounted here. It pins #smooth-wrapper
        as position:fixed, which pulls the page out of normal flow; because the
        global footer lives outside the wrapper it jumped ~65px on load, causing a
        ~0.56 cumulative layout shift (a CWV/no-layout-shift hard-rule violation).
        The correct full-page fix (footer inside #smooth-content) conflicts with
        the lg:sticky sidebars on the resource pages, so native scroll is used and
        the ScrollTrigger reveals below run on it unchanged.
      */}
      <main>
        <Hero />
        <PainSection />
        <MechanismSection />
        <ProofSection />
        <PageCta />
      </main>
    </>
  )
}
