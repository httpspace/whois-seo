import { MetadataRoute } from 'next'
import { fetchPopular } from '@/lib/api'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://whoisvibe.com'
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/trending`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/recent`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/expiring`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/following`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]
  const popular = await fetchPopular();
  const domainRoutes: MetadataRoute.Sitemap = (popular ?? []).map(({ domain }) => ({
    url: `${base}/domain/${domain}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  return [...staticRoutes, ...domainRoutes]
}
