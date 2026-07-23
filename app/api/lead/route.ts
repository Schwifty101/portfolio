import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/site'

const RESOURCES = ['ad-account-leak-audit', 'pre-call-research-checklist'] as const

// Deliberately permissive shape check: catches obvious non-emails without
// pretending to validate deliverability (that is the mail provider's job).
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NOTION_DATABASE_ID = '5cfc19a8-d79c-49ee-ae86-d60a820e19e6'

const RESOURCE_META: Record<
  (typeof RESOURCES)[number],
  { notionLabel: string; downloadPath: string; emailSubject: string }
> = {
  'ad-account-leak-audit': {
    notionLabel: 'Ad-Account Leak Audit',
    downloadPath: '/downloads/a7f3e9/ad-account-leak-audit.pdf',
    emailSubject: 'Your Ad-Account Leak Audit from KodoAI',
  },
  'pre-call-research-checklist': {
    notionLabel: 'Pre-Call Research Checklist',
    downloadPath: '/downloads/484272/pre-call-research-checklist.pdf',
    emailSubject: 'Your Pre-Call Research Checklist from KodoAI',
  },
}

function invalid() {
  return NextResponse.json({ ok: false }, { status: 400 })
}

function emailBody(name: string, resourceLabel: string, fileUrl: string) {
  return `<p>Hi ${name},</p>
<p>Here is your copy of the ${resourceLabel}: <a href="${fileUrl}">${fileUrl}</a></p>
<p>Run it against a live account and see what surfaces. If you want a second pair of eyes on the result, book a 15-minute call: <a href="https://sobanahmad.dev/contact">sobanahmad.dev/contact</a></p>
<p>Soban Ahmad<br/>KodoAI</p>`
}

async function sendResourceEmail(
  name: string,
  email: string,
  resource: (typeof RESOURCES)[number]
): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY
  const resendFromEmail = process.env.RESEND_FROM_EMAIL

  if (!resendApiKey || !resendFromEmail) {
    console.log('[lead] Resend not configured, skipping email send', { email, resource })
    return false
  }

  const meta = RESOURCE_META[resource]
  const fileUrl = `${SITE_URL}${meta.downloadPath}`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: email,
        subject: meta.emailSubject,
        html: emailBody(name, meta.notionLabel, fileUrl),
      }),
    })
    if (!res.ok) {
      console.error('[lead] Resend send failed', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (error) {
    console.error('[lead] Resend send failed', error)
    return false
  }
}

async function logLeadToNotion(
  name: string,
  email: string,
  resource: (typeof RESOURCES)[number],
  submittedAt: string,
  emailed: boolean
) {
  const notionApiKey = process.env.NOTION_API_KEY

  if (!notionApiKey) {
    console.log('[lead] Notion not configured, skipping database write', {
      name,
      email,
      resource,
      submittedAt,
      emailed,
    })
    return
  }

  const meta = RESOURCE_META[resource]

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: name } }] },
          Email: { email },
          Resource: { select: { name: meta.notionLabel } },
          'Submitted At': { date: { start: submittedAt } },
          Emailed: { checkbox: emailed },
          Status: { select: { name: 'New' } },
        },
      }),
    })
    if (!res.ok) {
      console.error('[lead] Notion page create failed', res.status, await res.text().catch(() => ''))
    }
  } catch (error) {
    console.error('[lead] Notion page create failed', error)
  }
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
    resource: resource as (typeof RESOURCES)[number],
    submittedAt: new Date().toISOString(),
  }

  const emailed = await sendResourceEmail(payload.name, payload.email, payload.resource)
  await logLeadToNotion(payload.name, payload.email, payload.resource, payload.submittedAt, emailed)

  return NextResponse.json({ ok: true })
}
