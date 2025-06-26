import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const OrcaIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2 9c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" />
  </svg>
)

export const TurtleIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3C8.5 3 5.5 5.5 5 8.5c-2.5.5-4 2-4 4.5 0 2 1.5 3.5 3.5 3.5h.5c0 1.5 1.5 3 3 3s2.5-1 2.5-2.5V16h2v1.5c0 1.5 1 2.5 2.5 2.5s3-1.5 3-3h.5c2 0 3.5-1.5 3.5-3.5 0-2.5-1.5-4-4-4.5C17.5 5.5 15.5 3 12 3zm0 2c2.5 0 4.5 2 4.5 4.5S14.5 14 12 14s-4.5-2-4.5-4.5S9.5 5 12 5z" />
  </svg>
)

export const TuringIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v9.82c0 4.34-2.88 8.36-7 9.68V12h-2v11.68C6.88 22.36 4 18.34 4 14V8.18l8-4zM11 8v6h2V8h-2z" />
  </svg>
)

export const MusicNoteIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
)

// Product theme icon wrapper component
interface ProductIconProps extends IconProps {
  product: 'sonOrca' | 'turtleMoves' | 'turingXai' | 'pitchPerfect'
}

export const ProductIcon: React.FC<ProductIconProps> = ({ product, ...props }) => {
  switch (product) {
    case 'sonOrca':
      return <OrcaIcon {...props} />
    case 'turtleMoves':
      return <TurtleIcon {...props} />
    case 'turingXai':
      return <TuringIcon {...props} />
    case 'pitchPerfect':
      return <MusicNoteIcon {...props} />
    default:
      return null
  }
}