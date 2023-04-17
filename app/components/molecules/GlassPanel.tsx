import { forwardRef } from 'react'
import { cn } from '~/utilities/cn'
import { Panel, PanelProps } from '~/components/atoms/Panel'

export type GlassPanelProps = PanelProps

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, ...props }, ref) => (
    <Panel
      ref={ref}
      className={cn(
        'backdrop-blur-lg backdrop-saturate-200 bg-glass rounded-xl',
        className,
      )}
      {...props}
    >
      {children}
    </Panel>
  ),
)
GlassPanel.displayName = 'GlassPanel'
