import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '~/utilities/cn'

export type TitleProps = {
  children: ReactNode
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'p-3 text-3xl text-slate-50 font-bold border-b border-b-glass-1',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
)
Title.displayName = 'Title'
