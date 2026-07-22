import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

const body = `# Soban Ahmad (KodoAI)

Soban Ahmad is an engineer who designs, builds and deploys AI automation systems, operating under the name KodoAI from Rawalpindi, Pakistan. He works with US paid-ads agencies and inbound-heavy local businesses such as med spas, building the systems that remove the manual operations eating into margin and response time, so a business can grow without adding headcount. The guiding idea is simple: if it is manual and measurable, it can be automated. Every system is designed around a real bottleneck, built to fit the existing workflow, and deployed into production rather than left as a prototype.

## Key pages

- ${SITE_URL}/about: Who Soban Ahmad is, the engineer behind KodoAI, and why manual work is treated as a competitive liability rather than an inconvenience.
- ${SITE_URL}/agencies: Hub for paid-ads agencies, covering how to scale an agency without hiring more strategists.
- ${SITE_URL}/agencies/ad-operations-automation: An AI agent that automates ad operations, budget pacing and CPA monitoring across accounts.
- ${SITE_URL}/agencies/pre-sales-research-automation: Automated discovery-call research so every prospect gets the same depth of preparation.
- ${SITE_URL}/agencies/onboarding-intelligence: Client onboarding automation that removes the work redone by hand for each new account.
- ${SITE_URL}/med-spas: Hub for med spas and local services, covering speed-to-lead and missed-call recovery.
- ${SITE_URL}/med-spas/ai-receptionist: An AI voice receptionist that answers enquiries and captures bookings after hours.
- ${SITE_URL}/work/arco-law: Case study of a legal operations platform designed, built and deployed for a law firm.
- ${SITE_URL}/work/pre-call-brief: Case study of an automated pre-call brief generator for sales teams.
- ${SITE_URL}/work/ad-ops-agent: Case study of an AI agent that automates paid-ads operations.
- ${SITE_URL}/work/ai-voice-agent: Case study of an AI voice receptionist deployed for inbound-heavy local businesses.
- ${SITE_URL}/resources/ad-account-leak-audit: The Ad-Account Leak Audit, ten signals that client accounts may be quietly losing money.
- ${SITE_URL}/resources/pre-call-research-checklist: The Pre-Call Research Checklist, twelve signals every account executive should check before a discovery call.
- ${SITE_URL}/contact: Book a 15-minute call to discuss where automation could remove a bottleneck.
`

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
