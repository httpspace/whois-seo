import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://whoisvibe.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/trending`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/recent`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/expiring`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]
}
