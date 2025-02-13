import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { QueryProvider } from '@/components/query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Héroes',
  description: 'Héroes'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang='en'
    suppressHydrationWarning
  >
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        disableTransitionOnChange
      >
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
      <Toaster />
    </body>
  </html>
)

export default RootLayout
