import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const variants: Record<AlertVariant, string> = {
  info: 'border-l-blue bg-blue-bg text-blue',
  success: 'border-l-green bg-green-bg text-green',
  warning: 'border-l-amber bg-amber-bg text-amber',
  error: 'border-l-red bg-red-bg text-red',
}

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant: AlertVariant
  children: ReactNode
  className?: string
}

export function Alert({ variant, children, className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn('px-5 py-4 border-l-[3px]', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}
