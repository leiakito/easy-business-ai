import { Space_Grotesk } from 'next/font/google'

import NextAuthProvider from '@/components/session-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import type { Metadata, Viewport } from 'next'
import './globals.css'

const font = Space_Grotesk({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'LinkAI',
  description: 'An OpenAI based chat system'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextAuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${font.className} flex min-h-screen flex-col`} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  )
}
