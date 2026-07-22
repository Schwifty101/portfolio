import type { Metadata } from 'next'
import { SmoothScroll } from '@/components/motion'
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
      <SmoothScroll>
        <main>
          <Hero />
          <PainSection />
          <MechanismSection />
          <ProofSection />
          <PageCta />
        </main>
      </SmoothScroll>
    </>
  )
}
