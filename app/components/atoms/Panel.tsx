import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '~/utilities/cn'

export type PanelProps = {
  children: ReactNode
  border?: 'all' | 'b'
} & HTMLAttributes<HTMLDivElement>

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, border, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-slate-200',
        border === 'all' && 'border-glass-1 border',
        border === 'b' && 'border-b-glass-1 border-b',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
Panel.displayName = 'Panel'
