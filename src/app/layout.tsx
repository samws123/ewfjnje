import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Providers } from './providers'
import "../index.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pixel-perfect-playbook-66',
  description: 'Lovable Generated Project',
  authors: [{ name: 'Lovable' }],
  openGraph: {
    title: 'pixel-perfect-playbook-66',
    description: 'Lovable Generated Project',
    type: 'website',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lovable_dev',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
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