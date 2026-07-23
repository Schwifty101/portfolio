import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-12', className)}
      {...props}
    >
      {children}
    </div>
  )
}
