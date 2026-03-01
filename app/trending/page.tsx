import type { Metadata } from 'next'
import Script from 'next/script'
import TrendingDomains from "@/page-components/TrendingDomains";

export const metadata: Metadata = {
  title: "熱門網域排行 — Whoisvibe",
  description: "探索當前最受關注的熱門域名排行榜，了解各網域的查詢熱度與 WHOIS 資訊。",
  alternates: { canonical: "https://whoisvibe.com/trending" },
  openGraph: {
    title: "熱門網域排行 — Whoisvibe",
    description: "探索當前最受關注的熱門域名排行榜，了解各網域的查詢熱度與 WHOIS 資訊。",
    url: "https://whoisvibe.com/trending",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://whoisvibe.com/trending",
      "url": "https://whoisvibe.com/trending",
      "name": "熱門網域排行 — Whoisvibe",
      "description": "探索當前最受關注的熱門域名排行榜，了解各網域的查詢熱度與 WHOIS 資訊。",
      "inLanguage": "zh-TW",
      "isPartOf": { "@id": "https://whoisvibe.com" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://whoisvibe.com" },
        { "@type": "ListItem", "position": 2, "name": "熱門網域排行", "item": "https://whoisvibe.com/trending" },
      ],
    },
  ],
};

export default function TrendingPage() {
  return (
    <>
      <Script id="jsonld-trending" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrendingDomains />
    </>
  );
}
