import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

export const viewport: Viewport = {
  themeColor: '#1a1a1f',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Exclusive Auto — Пошив авточехлов на заказ в Алматы',
  description: 'Авточехлы на заказ под вашу модель авто. Экокожа, алькантара, комбинированные. Идеальная посадка, изготовление за 1-2 дня. Более 10 000 установок в Алматы.',
  keywords: 'авточехлы Алматы, пошив авточехлов, чехлы на Camry, чехлы на K5, авточехлы на заказ',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
