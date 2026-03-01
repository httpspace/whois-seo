import type { Metadata } from 'next'
import Script from 'next/script'
import RecentDomains from "@/page-components/RecentDomains";

export const metadata: Metadata = {
  title: "最新查詢網域 — Whoisvibe",
  description: "瀏覽最近被查詢的域名，掌握最新域名動態，追蹤感興趣的網域即時變化。",
  alternates: { canonical: "https://whoisvibe.com/recent" },
  openGraph: {
    title: "最新查詢網域 — Whoisvibe",
    description: "瀏覽最近被查詢的域名，掌握最新域名動態，追蹤感興趣的網域即時變化。",
    url: "https://whoisvibe.com/recent",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://whoisvibe.com/recent",
      "url": "https://whoisvibe.com/recent",
      "name": "最新查詢網域 — Whoisvibe",
      "description": "瀏覽最近被查詢的域名，掌握最新域名動態，追蹤感興趣的網域即時變化。",
      "inLanguage": "zh-TW",
      "isPartOf": { "@id": "https://whoisvibe.com" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://whoisvibe.com" },
        { "@type": "ListItem", "position": 2, "name": "最新查詢網域", "item": "https://whoisvibe.com/recent" },
      ],
    },
  ],
};

export default function RecentPage() {
  return (
    <>
      <Script id="jsonld-recent" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RecentDomains />
    </>
  );
}
