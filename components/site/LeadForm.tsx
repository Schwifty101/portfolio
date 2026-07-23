'use client'

import { useState, type FormEvent } from 'react'
import { Alert } from '@/components/ui-kodo/Alert'
import { Btn } from '@/components/ui-kodo/Btn'
import { Skeleton } from '@/components/motion'

type Resource = 'ad-account-leak-audit' | 'pre-call-research-checklist'

interface LeadFormProps {
  resource: Resource
  downloadPath?: string
}

type State = 'idle' | 'submitting' | 'success' | 'error'

const CTA_LABELS: Record<Resource, string> = {
  'ad-account-leak-audit': 'Get the Ad-Account Leak Audit',
  'pre-call-research-checklist': 'Get the Pre-Call Research Checklist',
}

const DOWNLOAD_LABELS: Record<Resource, string> = {
  'ad-account-leak-audit': 'Download the Ad-Account Leak Audit',
  'pre-call-research-checklist': 'Download the Pre-Call Research Checklist',
}

const inputClasses =
  'w-full bg-surface-2 border border-border px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:outline-none focus:border-accent'

const labelClasses =
  'block font-mono text-[12px] font-medium uppercase tracking-[0.15em] text-ink-3'

/**
 * Two-field lead capture (name + work email only). POSTs JSON to /api/lead and
 * moves through idle -> submitting -> success/error. On success it either
 * reveals the download link (when downloadPath is given) or tells the visitor
 * the resource is on its way by email.
 */
export function LeadForm({ resource, downloadPath }: LeadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'submitting') return
    setState('submitting')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, resource }),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null
      if (res.ok && data?.ok) {
        setState('success')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="border border-accent-dim bg-surface p-6">
        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.15em] text-accent">
          {'// SENT'}
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          You are on the list.
        </h3>
        {downloadPath ? (
          <div className="mt-4">
            <p className="font-sans text-[15px] leading-relaxed text-ink-2">
              Your copy is ready. A link is also on its way to your inbox.
            </p>
            <div className="mt-5">
              <a
                href={downloadPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-accent bg-accent px-5 py-3 font-mono text-[14px] font-semibold uppercase tracking-[0.15em] text-bg transition-all duration-200 hover:border-accent-dim hover:bg-accent-dim"
              >
                {DOWNLOAD_LABELS[resource]}
              </a>
            </div>
          </div>
        ) : (
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-2">
            The checklist is on its way to your inbox.
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-surface p-6" noValidate>
      <div className="space-y-5">
        <div>
          <label htmlFor="lead-name" className={labelClasses}>
            {'// NAME'}
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={state === 'submitting'}
            placeholder="Your name"
            className={`mt-2 ${inputClasses}`}
          />
        </div>
        <div>
          <label htmlFor="lead-email" className={labelClasses}>
            {'// WORK EMAIL'}
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === 'submitting'}
            placeholder="you@agency.com"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        {state === 'error' && (
          <Alert variant="error">
            Something went wrong sending that. Please check the details and try again, or email
            soban@sobanahmad.dev.
          </Alert>
        )}

        {state === 'submitting' ? (
          <Skeleton height="48px" label="// SENDING" />
        ) : (
          <Btn variant="primary" type="submit" className="w-full sm:w-auto">
            {CTA_LABELS[resource]}
          </Btn>
        )}
      </div>
    </form>
  )
}
