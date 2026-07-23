'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Btn } from '@/components/ui-kodo/Btn'

type NavLink = { label: string; href: string }

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const overlay = overlayRef.current
    const focusable = () =>
      Array.from(
        overlay?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      )

    // Move focus into the overlay when it opens.
    focusable()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      // Trap focus inside the overlay.
      const items = focusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      // Return focus to the hamburger that opened the menu.
      toggleRef.current?.focus()
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center border border-border bg-transparent text-ink transition-colors hover:border-accent"
      >
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 block h-[2px] w-5 bg-current transition-all duration-200 ${
              open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 block h-[2px] w-5 bg-current transition-all duration-200 ${
              open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
            }`}
          />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={overlayRef}
            id="mobile-menu"
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-bg"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <span className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                SOBAN AHMAD
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center border border-border text-ink transition-colors hover:border-accent"
              >
                <span className="relative block h-4 w-5" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-3xl font-semibold uppercase tracking-tight text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="shrink-0 border-t border-border px-4 py-6">
              <Btn
                href="/contact"
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Book a 15-minute call
              </Btn>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
