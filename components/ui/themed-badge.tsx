import React from 'react'
import { Badge } from './badge'
import { cn } from '@/lib/utils'
import { productThemes, getThemeBadgeStyles } from '@/lib/theme'

interface ThemedBadgeProps extends React.ComponentProps<typeof Badge> {
  theme?: keyof typeof productThemes
}

export const ThemedBadge = React.forwardRef<
  HTMLDivElement,
  ThemedBadgeProps
>(({ className, theme = 'sonOrca', variant, ...props }, ref) => {
  const styles = getThemeBadgeStyles(theme)

  return (
    <Badge
      ref={ref}
      className={cn(styles.className, className)}
      {...props}
    />
  )
})

ThemedBadge.displayName = 'ThemedBadge'