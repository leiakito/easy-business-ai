import { Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'

import NextAuthProvider from '@/components/session-provider'
import { ThemeProvider } from '@/components/theme-provider'

import type { Metadata, Viewport } from 'next'

import './globals.css'

const font = Space_Grotesk({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'LinkAI',
  description: 'An OpenAI based chat system',
  keywords: [
    'LinkAI',
    'business AI',
    'AI chatbot',
    'chatbot templates',
    'AI-powered communication',
    'business automation',
    'customer service AI',
    'AI templates',
    'conversational AI',
    'business intelligence',
    'AI solutions',
    'custom chatbots'
  ]
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
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 1500,
                className:
                  'border-none bg-white/90 text-black data-[type=warning]:bg-black/80 data-[type=warning]:text-white data-[type=success]:bg-white/90 data-[type=success]:text-black data-[type=error]:bg-black/80 data-[type=error]:text-white'
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  )
}
