import { cn } from '@/lib/utils'

type DividerProps = {
  dashed?: boolean
  className?: string
}

export function Divider({ dashed = false, className }: DividerProps) {
  return (
    <hr
      className={cn(
        'border-0',
        dashed
          ? 'h-0 border-t border-dashed border-border-2 my-5'
          : 'h-px bg-border my-8',
        className,
      )}
    />
  )
}
