import type { Metadata } from 'next'
import DomainDetailClient from './DomainDetailClient'
import { fetchWhois, fetchDNS, fetchAISummary } from '@/lib/api'
import type { WhoisData } from '@/types/domain'
import { langAlternates } from '@/lib/i18n-config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; domain: string }>
}): Promise<Metadata> {
  const { lang, domain } = await params
  if (domain === '_') {
    return {
      title: 'WHOIS 查詢 | WhoisVibe',
      description: 'Free WHOIS lookup & domain tracker — 查詢任何網域的 WHOIS、DNS 資訊與到期日。',
      robots: { index: false, follow: false },
    }
  }

  const aiResult = await fetchAISummary(domain)
  const ai = aiResult.ok ? aiResult.data : null
  const summaryMap: Record<string, string | undefined> = {
    'zh-tw': ai?.summary_zh,
    en: ai?.summary_en,
    es: ai?.summary_es,
    fr: ai?.summary_fr,
  }
  const aiDesc = summaryMap[lang] || ai?.summary_en || ''

  const i18nMeta = {
    'zh-tw': {
      titleSuffix: `WHOIS 查詢 — 域名資訊、到期日與 DNS | Whoisvibe`,
      fallbackDesc: `查詢 ${domain} 的 WHOIS 資訊、DNS 記錄、到期日、Registrar 與域名安全評估。`,
      descSuffix: `查詢 ${domain} 的 WHOIS 資訊、到期日與 DNS 記錄。`,
      ogTitle: `${domain} - WHOIS 資訊`,
      ogDesc: `${domain} 的詳細 WHOIS 資料、DNS 記錄與安全狀態`,
    },
    en: {
      titleSuffix: `WHOIS Lookup — Domain Info, Expiry & DNS | Whoisvibe`,
      fallbackDesc: `Free WHOIS lookup for ${domain} — registration info, DNS records, expiry date and registrar details.`,
      descSuffix: `Free WHOIS lookup for ${domain}.`,
      ogTitle: `${domain} - WHOIS Info`,
      ogDesc: `Detailed WHOIS data, DNS records and security status for ${domain}`,
    },
    es: {
      titleSuffix: `Consulta WHOIS — Información, Vencimiento & DNS | Whoisvibe`,
      fallbackDesc: `Consulta WHOIS gratuita para ${domain} — información de registro, DNS, fecha de vencimiento y registrador.`,
      descSuffix: `Consulta WHOIS gratuita para ${domain}.`,
      ogTitle: `${domain} - Información WHOIS`,
      ogDesc: `Datos WHOIS detallados, registros DNS y estado de seguridad de ${domain}`,
    },
    fr: {
      titleSuffix: `Recherche WHOIS — Infos, Expiration & DNS | Whoisvibe`,
      fallbackDesc: `Recherche WHOIS gratuite pour ${domain} — informations d'enregistrement, DNS, date d'expiration et registrar.`,
      descSuffix: `Recherche WHOIS gratuite pour ${domain}.`,
      ogTitle: `${domain} - Informations WHOIS`,
      ogDesc: `Données WHOIS détaillées, enregistrements DNS et statut de sécurité pour ${domain}`,
    },
  } as const
  const tMeta = i18nMeta[lang as keyof typeof i18nMeta] ?? i18nMeta.en

  const title = `${domain} ${tMeta.titleSuffix}`
  const fallbackDesc = tMeta.fallbackDesc
  const description = aiDesc ? `${aiDesc} — ${tMeta.descSuffix}` : fallbackDesc

  return {
    title,
    description,
    alternates: {
      canonical: `https://whois-tracking.com/${lang}/domain/${domain}`,
      languages: langAlternates(`/domain/${domain}`),
    },
    openGraph: {
      title: tMeta.ogTitle,
      description: aiDesc || tMeta.ogDesc,
      url: `https://whois-tracking.com/${lang}/domain/${domain}`,
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  // Only pre-generate the '_' shell. Real domain pages are served via the
  // _redirects rewrite → '_' shell → client-side URL detection.
  // Generating all popular × 4 langs at build time would require 120+ API
  // calls and times out. ISR can be added later if needed.
  return [{ domain: '_' }]
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; domain: string }>
}) {
  const { lang, domain } = await params

  if (domain === '_') return <DomainDetailClient />

  const i18nPage = {
    'zh-tw': { h1: `${domain} WHOIS 查詢 — 域名資訊、到期日與 DNS`, jsonLdName: `${domain} WHOIS 查詢` },
    en:      { h1: `${domain} WHOIS Lookup — Domain Info, Expiry & DNS`, jsonLdName: `${domain} WHOIS Lookup` },
    es:      { h1: `${domain} Consulta WHOIS — Información, Vencimiento & DNS`, jsonLdName: `${domain} Consulta WHOIS` },
    fr:      { h1: `${domain} Recherche WHOIS — Infos, Expiration & DNS`, jsonLdName: `${domain} Recherche WHOIS` },
  } as const
  const tPage = i18nPage[lang as keyof typeof i18nPage] ?? i18nPage.en
  const h1Text = tPage.h1

  const [whoisResult, dnsResult, aiResult] = await Promise.all([
    fetchWhois(domain),
    fetchDNS(domain),
    fetchAISummary(domain),
  ])

  const whois = whoisResult.ok ? whoisResult.data : null
  const dns = dnsResult.ok ? dnsResult.data : null
  const ai = aiResult.ok ? aiResult.data : null

  const summaryText =
    (lang === 'zh-tw' ? ai?.summary_zh : null) ||
    (lang === 'en' ? ai?.summary_en : null) ||
    (lang === 'es' ? ai?.summary_es : null) ||
    (lang === 'fr' ? ai?.summary_fr : null) ||
    ai?.summary_en ||
    null

  const jsonLd = buildDomainJsonLd(domain, whois, ai?.summary_en, tPage.jsonLdName)

  return (
    <>
      <h1 className="sr-only">{h1Text}</h1>
      {jsonLd && (
        <script
          id="domain-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {summaryText && (
        <p
          id="domain-ai-summary"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
          }}
        >
          {summaryText}
        </p>
      )}
      <DomainDetailClient initialData={{ whois, dns, ai }} />
    </>
  )
}

function buildDomainJsonLd(domain: string, whois: WhoisData | null, aiSummaryEn?: string, jsonLdName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: jsonLdName ?? `${domain} WHOIS Lookup`,
    url: `https://whois-tracking.com/domain/${domain}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Whoisvibe', item: 'https://whois-tracking.com' },
        { '@type': 'ListItem', position: 2, name: domain, item: `https://whois-tracking.com/domain/${domain}` },
      ],
    },
    mainEntity: {
      '@type': 'Dataset',
      name: `${domain} WHOIS Data`,
      description: aiSummaryEn || `WHOIS registration data for ${domain}`,
      ...(whois
        ? {
            dateModified: whois.update_date ?? whois.create_date,
            variableMeasured: [
              whois.domain_registrar?.registrar_name && { '@type': 'PropertyValue', name: 'Registrar', value: whois.domain_registrar.registrar_name },
              whois.domain_registrar?.website_url && { '@type': 'PropertyValue', name: 'Registrar URL', value: whois.domain_registrar.website_url },
              whois.create_date && { '@type': 'PropertyValue', name: 'Registration Date', value: whois.create_date },
              whois.expiry_date && { '@type': 'PropertyValue', name: 'Expiry Date', value: whois.expiry_date },
              whois.registrant_contact?.country_name && { '@type': 'PropertyValue', name: 'Registrant Country', value: whois.registrant_contact.country_name },
              whois.name_servers?.length && { '@type': 'PropertyValue', name: 'Name Servers', value: whois.name_servers.join(', ') },
              whois.domain_status?.length && { '@type': 'PropertyValue', name: 'Domain Status', value: whois.domain_status.join(', ') },
            ].filter(Boolean),
          }
        : {}),
    },
  }
}
