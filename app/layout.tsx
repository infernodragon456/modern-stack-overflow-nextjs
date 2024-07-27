
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import '../styles/prism.css'
import {Inter, Space_Grotesk} from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeProvider'

const inter = Inter({
  subsets: ['latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin-ext'],
  weight: [ '300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})

export const metadata : Metadata = {
  title: 'Modern Stack Overflow',
  description: 'A community driven platform for asking programming questions. Built using Next.js, and features AI driven solutions for user queries with a modern & responsive UI.',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider appearance={{
      elements: {
        formButtonPrimary: 'primary-gradient',
        footerActionLink: 'primary-text-gradient hover:text-primary-500'
      }
    }}>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          <ThemeProvider>
          {children}
          </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
    
  )
}