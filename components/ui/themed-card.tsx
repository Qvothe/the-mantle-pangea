import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'
import { productThemes, getThemeCardStyles } from '@/lib/theme'

interface ThemedCardProps extends React.ComponentProps<typeof Card> {
  theme?: keyof typeof productThemes
  variant?: 'light' | 'dark' | 'gradient'
  children: React.ReactNode
}

export const ThemedCard = React.forwardRef<
  HTMLDivElement,
  ThemedCardProps
>(({ className, theme = 'sonOrca', variant = 'light', ...props }, ref) => {
  const getStyles = () => {
    if (variant === 'gradient') {
      const colors = productThemes[theme].colors
      return cn(
        `bg-gradient-to-br ${colors.background} ${colors.text} border-0`,
        className
      )
    }
    return cn(getThemeCardStyles(theme, variant), className)
  }

  return (
    <Card
      ref={ref}
      className={getStyles()}
      {...props}
    />
  )
})

ThemedCard.displayName = 'ThemedCard'

// Export themed versions of card components
export const ThemedCardHeader = CardHeader
export const ThemedCardContent = CardContent
export const ThemedCardDescription = CardDescription
export const ThemedCardFooter = CardFooter
export const ThemedCardTitle = CardTitle