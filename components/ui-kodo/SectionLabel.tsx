import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-[12px] font-medium tracking-[0.15em] uppercase text-ink-3',
        className,
      )}
      {...props}
    >
      {'// '}
      {children}
    </span>
  )
}
