import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://exclusive-auto.kz'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/konfigurator`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
