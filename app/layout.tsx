import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/auth/authProviderWithMock'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Mantle - Pangea Tech',
  description: 'Where Legends Are Made - Pangea\'s Internal Culture Hub',
  generator: 'Next.js',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.svg',
    apple: '/icon-192x192.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A1628',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}