import React from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { productThemes, getThemeButtonStyles } from '@/lib/theme'

interface ThemedButtonProps extends React.ComponentProps<typeof Button> {
  theme?: keyof typeof productThemes
  gradient?: boolean
}

export const ThemedButton = React.forwardRef<
  HTMLButtonElement,
  ThemedButtonProps
>(({ className, theme = 'sonOrca', gradient = false, variant, ...props }, ref) => {
  if (gradient) {
    return (
      <Button
        ref={ref}
        className={cn(getThemeButtonStyles(theme), className)}
        {...props}
      />
    )
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      className={className}
      {...props}
    />
  )
})

ThemedButton.displayName = 'ThemedButton'