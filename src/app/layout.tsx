import type { Metadata } from 'next'
// import { Comic_Neue } from 'next/font/google'

import { QueryProvider } from '@/components/query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

// const comicNeue = Comic_Neue({
//   variable: '--font-comic-neue',
//   subsets: ['latin'],
//   weight: ['300', '400', '700'],
//   display: "swap"
// })

export const metadata: Metadata = {
  title: 'Héroes',
  description: 'Héroes'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang='en'
    suppressHydrationWarning
  >
    {/* <body className={`${comicNeue.variable} antialiased`}> */}
    <body className='antialiased'>
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
