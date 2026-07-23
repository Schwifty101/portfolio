import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BtnVariant = 'default' | 'primary'

const base =
  'inline-flex items-center justify-center px-5 py-3 border font-mono text-[14px] font-medium tracking-[0.15em] uppercase cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<BtnVariant, string> = {
  default: 'border-border bg-transparent text-ink-2 hover:border-accent hover:text-ink',
  primary:
    'border-accent bg-accent text-bg font-semibold hover:bg-accent-dim hover:border-accent-dim',
}

type CommonProps = {
  variant?: BtnVariant
  className?: string
  children: ReactNode
}

type BtnAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

type BtnAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

export type BtnProps = BtnAsLink | BtnAsButton

export function Btn({ variant = 'default', className, children, ...props }: BtnProps) {
  const classes = cn(base, variants[variant], className)

  if (props.href !== undefined) {
    const { href, ...rest } = props as BtnAsLink
    const isInternal = href.startsWith('/')
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const { type, ...rest } = props as BtnAsButton
  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  )
}
