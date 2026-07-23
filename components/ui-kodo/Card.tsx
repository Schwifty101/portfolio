import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  featured?: boolean
  children: ReactNode
  className?: string
}

export function Card({ featured = false, children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border px-7 py-6',
        featured ? 'border-accent-dim' : 'border-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
