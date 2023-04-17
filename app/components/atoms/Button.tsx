import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '~/utilities/cn'

export type ButtonProps = {
  children: ReactNode
  backgroundClass?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, backgroundClass, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'p-2',
        'border border-slate-300 bg-slate-400 rounded-md',
        !backgroundClass &&
          '[&:not(:disabled)]:hover:bg-slate-200 [&:not(:disabled)]:active:bg-slate-50',
        backgroundClass,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)
Button.displayName = 'Button'
