import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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

const siteUrl = 'https://exclusive-auto.kz'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Авточехлы в Алматы — Пошив из экокожи на заказ | Exclusive Auto',
    template: '%s | Exclusive Auto Алматы',
  },
  description: 'Пошив авточехлов на заказ в Алматы. Экокожа и алькантара под конкретную модель авто. Собственное производство 600 м², более 2000 лекал. Гарантия 12 месяцев. Бесплатная установка. Цены от 70 000 тг.',
  keywords: [
    'авточехлы алматы',
    'пошив чехлов на авто',
    'пошив чехлов на авто алматы',
    'авточехлы на заказ',
    'чехлы из экокожи',
    'чехлы для авто алматы',
    'авточехлы алматы цены',
    'пошив авточехлов алматы',
    'модельные авточехлы',
    'чехлы на сиденья авто алматы',
    'чехлы toyota camry',
    'чехлы kia k5',
    'авточехлы экокожа',
    'авточехлы алькантара',
    'Exclusive Auto',
  ],
  authors: [{ name: 'Exclusive Auto', url: siteUrl }],
  creator: 'Exclusive Auto',
  publisher: 'Exclusive Auto',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    url: siteUrl,
    siteName: 'Exclusive Auto',
    title: 'Авточехлы в Алматы — Пошив из экокожи на заказ',
    description: 'Пошив авточехлов на заказ в Алматы. Экокожа и алькантара под любую модель. Гарантия 12 мес. Бесплатная установка. Цены от 70 000 тг.',
    images: [
      {
        url: '/images/hero-interior.jpg',
        width: 1200,
        height: 630,
        alt: 'Авточехлы из экокожи на заказ в Алматы — Exclusive Auto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Авточехлы в Алматы — Пошив из экокожи | Exclusive Auto',
    description: 'Пошив авточехлов на заказ в Алматы. Гарантия 12 мес. Цены от 70 000 тг.',
    images: ['/images/hero-interior.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Exclusive Auto — Авточехлы',
  description: 'Пошив авточехлов на заказ в Алматы. Экокожа и алькантара. Собственное производство.',
  url: siteUrl,
  telephone: '+77079829824',
  priceRange: '₸₸',
  currenciesAccepted: 'KZT',
  paymentAccepted: 'Cash, Credit Card',
  image: `${siteUrl}/images/hero-interior.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Тимирязева 42 к15/5, БЦ Азия Мост',
    addressLocality: 'Алматы',
    addressCountry: 'KZ',
    postalCode: '050000',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.2165,
    longitude: 76.9044,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/exclusive.avtochehly/',
    'https://2gis.kz/almaty/firm/70000001039884402',
  ],
  hasMap: 'https://2gis.kz/almaty/firm/70000001039884402',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87',
    bestRating: '5',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
