import type { Metadata } from 'next'
import Script from 'next/script'
import Index from '@/page-components/Index'
import { fetchPopular, fetchRecent } from '@/lib/api'
import { langAlternates } from '@/lib/i18n-config'

const PAGE_META: Record<string, { title: string; description: string; intro: string }> = {
  'zh-tw': {
    title: 'Whoisvibe — 域名智能 & WHOIS 查詢',
    description: '免費 WHOIS 查詢與域名監控工具 — 查詢任何網域的 WHOIS 資訊、DNS 記錄、到期日與安全評估。設定監控警報，掌握域名變更。',
    intro: '免費 WHOIS 查詢工具 — 輸入任何網域名稱，立即獲取 WHOIS 資訊、DNS 記錄、到期日與域名安全評估。支援全球主要 TLD，資料每日更新，幫助企業與個人監控域名狀態、追蹤到期時間與識別潛在安全風險。',
  },
  'en': {
    title: 'Whoisvibe — Domain Intelligence & WHOIS Lookup',
    description: 'Free WHOIS lookup & whois monitoring tool — track domain expiration, registrar changes, DNS records and SSL status. Set up alerts for any domain.',
    intro: 'Free WHOIS lookup tool — enter any domain name to instantly retrieve WHOIS records, DNS data, expiration dates, and security assessments. Supports all major TLDs with daily data updates, helping businesses and individuals monitor domain status, track renewals, and identify security risks.',
  },
  'es': {
    title: 'Whoisvibe — Inteligencia de Dominios & Búsqueda WHOIS',
    description: 'Búsqueda WHOIS gratuita — consulta información WHOIS, registros DNS y fechas de vencimiento de dominios.',
    intro: 'Herramienta gratuita de búsqueda WHOIS — consulta registros WHOIS, datos DNS, fechas de vencimiento y evaluaciones de seguridad de cualquier dominio. Compatible con todos los TLD principales con actualizaciones diarias.',
  },
  'fr': {
    title: 'Whoisvibe — Intelligence de Domaine & Recherche WHOIS',
    description: "Recherche WHOIS gratuite — consultez les informations WHOIS, enregistrements DNS et dates d'expiration.",
    intro: "Outil de recherche WHOIS gratuit — consultez les enregistrements WHOIS, les données DNS, les dates d'expiration et les évaluations de sécurité de n'importe quel domaine. Compatible avec tous les TLD principaux avec des mises à jour quotidiennes.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const meta = PAGE_META[lang] ?? PAGE_META['en']
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://whois-tracking.com/${lang}`,
      type: 'website',
      images: [{ url: 'https://whois-tracking.com/logo.webp', width: 1200, height: 630, alt: 'Whoisvibe' }],
    },
    alternates: {
      canonical: `https://whois-tracking.com/${lang}`,
      languages: langAlternates('/'),
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const meta = PAGE_META[lang] ?? PAGE_META['en']
  const [popular, recent] = await Promise.all([fetchPopular(), fetchRecent(8)])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://whois-tracking.com/${lang}`,
        url: `https://whois-tracking.com/${lang}`,
        name: meta.title,
        description: meta.description,
        inLanguage: lang === 'zh-tw' ? 'zh-TW' : lang,
        isPartOf: { '@id': 'https://whois-tracking.com' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Whoisvibe', item: `https://whois-tracking.com/${lang}` },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Whoisvibe',
        url: `https://whois-tracking.com/${lang}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        inLanguage: lang === 'zh-tw' ? 'zh-TW' : lang,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: meta.description,
        featureList: 'WHOIS lookup, whois monitoring, domain expiration tracking, DNS record lookup, registrar info, SSL status, domain change alerts',
      },
    ],
  }

  return (
    <>
      <Script id="jsonld-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Index initialPopular={popular ?? undefined} initialRecent={recent ?? undefined} />
    </>
  )
}
