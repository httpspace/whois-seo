import type { Metadata } from 'next'
import DomainDetailClient from './DomainDetailClient'
import { fetchWhois, fetchDNS, fetchAISummary, fetchPopular } from '@/lib/api'
import type { WhoisData } from '@/types/domain'

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const { domain } = await params;
  return {
    title: `${domain} WHOIS 查詢`,
    description: `查詢 ${domain} 的 WHOIS 資訊、DNS 記錄、安全評估與域名到期日`,
    alternates: { canonical: `https://whoisvibe.com/domain/${domain}` },
    openGraph: {
      title: `${domain} - WHOIS 資訊`,
      description: `${domain} 的詳細 WHOIS 資料、DNS 記錄與安全狀態`,
      url: `https://whoisvibe.com/domain/${domain}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const popular = await fetchPopular();
  const domains = popular?.map(({ domain }) => ({ domain })) ?? [];
  // '_' is the generic shell served for any unknown domain via _redirects rewrite
  return [{ domain: '_' }, ...domains];
}

export default async function Page({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params

  if (domain === '_') return <DomainDetailClient />

  const [whoisResult, dnsResult, aiResult] = await Promise.all([
    fetchWhois(domain),
    fetchDNS(domain),
    fetchAISummary(domain),
  ])

  const whois = whoisResult.ok ? whoisResult.data : null
  const dns = dnsResult.ok ? dnsResult.data : null
  const ai = aiResult.ok ? aiResult.data : null

  const jsonLd = buildDomainJsonLd(domain, whois)

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <DomainDetailClient initialData={{ whois, dns, ai }} />
    </>
  )
}

function buildDomainJsonLd(domain: string, whois: WhoisData | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${domain} WHOIS 查詢`,
    "url": `https://whoisvibe.com/domain/${domain}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Whoisvibe", "item": "https://whoisvibe.com" },
        { "@type": "ListItem", "position": 2, "name": domain, "item": `https://whoisvibe.com/domain/${domain}` }
      ]
    },
    "mainEntity": {
      "@type": "Dataset",
      "name": `${domain} WHOIS Data`,
      "description": `WHOIS registration data for ${domain}`,
      ...(whois ? {
        "dateModified": whois.update_date ?? whois.create_date,
        "variableMeasured": [
          whois.domain_registrar?.registrar_name && { "@type": "PropertyValue", "name": "Registrar", "value": whois.domain_registrar.registrar_name },
          whois.create_date && { "@type": "PropertyValue", "name": "Registration Date", "value": whois.create_date },
          whois.expiry_date && { "@type": "PropertyValue", "name": "Expiry Date", "value": whois.expiry_date },
          whois.registrant_contact?.country_name && { "@type": "PropertyValue", "name": "Registrant Country", "value": whois.registrant_contact.country_name },
        ].filter(Boolean)
      } : {})
    }
  }
}
