import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'accent' | 'success' | 'error'

const variants: Record<BadgeVariant, string> = {
  default: 'border-border bg-transparent text-ink-3',
  accent: 'border-accent bg-transparent text-accent',
  success: 'border-green bg-green-bg text-green',
  error: 'border-red bg-red-bg text-red',
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-2 border font-mono text-[11px] tracking-[0.15em] uppercase',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
