// Product-themed color system for The Mantle
export const productThemes = {
  sonOrca: {
    name: 'SonOrca',
    description: 'Intelligence & Analytics',
    colors: {
      primary: '#0A1628',
      secondary: '#1E3A5F',
      accent: '#2E5090',
      light: '#4A6FA5',
      background: 'from-[#0A1628] to-[#1E3A5F]',
      text: 'text-white',
      border: 'border-[#1E3A5F]/20',
      bgLight: 'bg-[#0A1628]/10',
      bgDark: 'bg-[#0A1628]/80'
    }
  },
  turtleMoves: {
    name: 'TurtleMoves',
    description: 'Steady Progress',
    colors: {
      primary: '#2D6A4F',
      secondary: '#89D4CF',
      accent: '#52B788',
      light: '#B5E6D3',
      background: 'from-[#2D6A4F] to-[#89D4CF]',
      text: 'text-white',
      border: 'border-[#2D6A4F]/20',
      bgLight: 'bg-[#2D6A4F]/10',
      bgDark: 'bg-[#2D6A4F]/80'
    }
  },
  turingXai: {
    name: 'TuringXai',
    description: 'Problem Solving',
    colors: {
      primary: '#F4A261',
      secondary: '#FED9A6',
      accent: '#F7B267',
      light: '#FFECD1',
      background: 'from-[#F4A261] to-[#FED9A6]',
      text: 'text-[#0A1628]',
      border: 'border-[#F4A261]/20',
      bgLight: 'bg-[#F4A261]/10',
      bgDark: 'bg-[#F4A261]/80'
    }
  },
  pitchPerfect: {
    name: 'PitchPerfect',
    description: 'Presentation & Awards',
    colors: {
      primary: '#7209B7',
      secondary: '#B5179E',
      accent: '#9A0FC7',
      light: '#E0B1E5',
      background: 'from-[#7209B7] to-[#B5179E]',
      text: 'text-white',
      border: 'border-[#7209B7]/20',
      bgLight: 'bg-[#7209B7]/10',
      bgDark: 'bg-[#7209B7]/80'
    }
  }
}

// Badge styles for each product theme
export const getThemeBadgeStyles = (theme: keyof typeof productThemes) => {
  const colors = productThemes[theme].colors
  return {
    className: `bg-gradient-to-r ${colors.background} text-white border-0`,
    variant: 'default' as const
  }
}

// Card styles for each product theme
export const getThemeCardStyles = (theme: keyof typeof productThemes, variant: 'light' | 'dark' = 'light') => {
  const colors = productThemes[theme].colors
  if (variant === 'light') {
    return `${colors.bgLight} ${colors.border} border`
  }
  return `bg-gradient-to-br ${colors.background} ${colors.text}`
}

// Button styles for each product theme
export const getThemeButtonStyles = (theme: keyof typeof productThemes) => {
  const colors = productThemes[theme].colors
  return `bg-gradient-to-r ${colors.background} ${colors.text} hover:opacity-90 transition-opacity`
}

// Icon wrapper styles for each product theme
export const getThemeIconStyles = (theme: keyof typeof productThemes) => {
  const colors = productThemes[theme].colors
  return `bg-gradient-to-br ${colors.background} ${colors.text}`
}

// Get contrasting text color based on background
export const getContrastText = (theme: keyof typeof productThemes, isGradient: boolean = false) => {
  if (isGradient) {
    return productThemes[theme].colors.text
  }
  // For light backgrounds, use dark text
  return theme === 'turingXai' ? 'text-[#0A1628]' : 'text-white'
}

// Semantic color mappings
export const semanticColors = {
  success: '#2D6A4F', // TurtleMoves green
  warning: '#F4A261', // TuringXai gold
  error: '#DC2626',   // Standard red
  info: '#0A1628',    // SonOrca blue
  primary: '#7209B7', // PitchPerfect purple
}

// Export color constants for direct use
export const SONORCA_BLUE = '#0A1628'
export const SONORCA_BLUE_LIGHT = '#1E3A5F'
export const TURTLEMOVES_GREEN = '#2D6A4F'
export const TURTLEMOVES_GREEN_LIGHT = '#89D4CF'
export const TURINGXAI_GOLD = '#F4A261'
export const TURINGXAI_GOLD_LIGHT = '#FED9A6'
export const PITCHPERFECT_PURPLE = '#7209B7'
export const PITCHPERFECT_PURPLE_LIGHT = '#B5179E'