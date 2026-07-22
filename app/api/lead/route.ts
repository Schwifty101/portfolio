import { NextResponse } from 'next/server'

const RESOURCES = ['ad-account-leak-audit', 'pre-call-research-checklist'] as const

// Deliberately permissive shape check: catches obvious non-emails without
// pretending to validate deliverability (that is the mail provider's job).
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function invalid() {
  return NextResponse.json({ ok: false }, { status: 400 })
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return invalid()
  }

  const data = body as Record<string, unknown> | null
  const name = typeof data?.name === 'string' ? data.name.trim() : ''
  const email = typeof data?.email === 'string' ? data.email.trim() : ''
  const resource = data?.resource

  if (!name || name.length > 200) return invalid()
  if (!email || email.length > 320 || !EMAIL_SHAPE.test(email)) return invalid()
  if (typeof resource !== 'string' || !RESOURCES.includes(resource as (typeof RESOURCES)[number])) {
    return invalid()
  }

  const payload = {
    name,
    email,
    resource,
    submittedAt: new Date().toISOString(),
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      // Never fail the visitor because a downstream webhook is down.
      console.error('[lead] webhook delivery failed', error)
    }
  } else {
    console.log('[lead] new lead', payload)
  }

  return NextResponse.json({ ok: true })
}
