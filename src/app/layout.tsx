import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Providers } from './providers'
import "../index.css";
import '@/lib/init-db'; // Initialize database on app startup

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DuNorth',
  description: 'DuNorth - Your Academic Assistant',
  authors: [{ name: 'DuNorth' }],
  icons: {
    icon: '/dunorth_fav.png',
    shortcut: '/dunorth_fav.png',
    apple: '/dunorth_fav.png',
  },
  openGraph: {
    title: 'DuNorth',
    description: 'DuNorth - Your Academic Assistant',
    type: 'website',
    images: ['/dunorth_fav.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dunorth',
    images: ['/dunorth_fav.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}