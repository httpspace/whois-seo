import type { Metadata } from 'next'
import Script from 'next/script'
import TrendingDomains from '@/page-components/TrendingDomains'
import { langAlternates } from '@/lib/i18n-config'

const TRENDING_META: Record<string, { title: string; description: string; h1: string; breadcrumbHome: string; breadcrumbPage: string }> = {
  'zh-tw': {
    title: '熱門網域排行 — Whoisvibe',
    description: '探索當前最受關注的熱門域名排行榜，了解各網域的查詢熱度、WHOIS 資訊與到期日。',
    h1: '熱門網域排行',
    breadcrumbHome: '首頁',
    breadcrumbPage: '熱門網域排行',
  },
  'en': {
    title: 'Trending Domains — Whoisvibe',
    description: 'Discover the most searched domain names right now, with WHOIS info, registration dates, and real-time popularity trends.',
    h1: 'Trending Domains',
    breadcrumbHome: 'Home',
    breadcrumbPage: 'Trending Domains',
  },
  'es': {
    title: 'Dominios Populares — Whoisvibe',
    description: 'Descubre los nombres de dominio más buscados ahora mismo, con información WHOIS, fechas de registro y tendencias de popularidad.',
    h1: 'Dominios Populares',
    breadcrumbHome: 'Inicio',
    breadcrumbPage: 'Dominios Populares',
  },
  'fr': {
    title: 'Domaines Tendance — Whoisvibe',
    description: "Découvrez les noms de domaine les plus recherchés en ce moment, avec les informations WHOIS, les dates d'enregistrement et les tendances de popularité.",
    h1: 'Domaines Tendance',
    breadcrumbHome: 'Accueil',
    breadcrumbPage: 'Domaines Tendance',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const meta = TRENDING_META[lang] ?? TRENDING_META['en']
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://whois-tracking.com/${lang}/trending`,
      languages: langAlternates('/trending'),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://whois-tracking.com/${lang}/trending`,
      type: 'website',
    },
  }
}

export default async function TrendingPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const meta = TRENDING_META[lang] ?? TRENDING_META['en']

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://whois-tracking.com/${lang}/trending`,
        url: `https://whois-tracking.com/${lang}/trending`,
        name: meta.title,
        description: meta.description,
        inLanguage: lang === 'zh-tw' ? 'zh-TW' : lang,
        isPartOf: { '@id': 'https://whois-tracking.com' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: meta.breadcrumbHome, item: `https://whois-tracking.com/${lang}` },
          { '@type': 'ListItem', position: 2, name: meta.breadcrumbPage, item: `https://whois-tracking.com/${lang}/trending` },
        ],
      },
    ],
  }
  return (
    <>
      <Script id="jsonld-trending" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrendingDomains />
    </>
  )
}
