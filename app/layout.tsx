import type { Metadata } from "next";

import { Providers } from "@/components/Providers";
import "./index.css";

export const metadata: Metadata = {
  title: {
    default: "Whoisvibe — Domain Intelligence & WHOIS Lookup",
    template: "%s | Whoisvibe",
  },
  description: "查詢任何網域的 WHOIS 資訊、DNS 記錄、安全評估與域名到期日",
  metadataBase: new URL("https://whoisvibe.com"),
  openGraph: {
    type: "website",
    siteName: "Whoisvibe",
    title: "Whoisvibe — Domain Intelligence & WHOIS Lookup",
    description: "查詢任何網域的 WHOIS 資訊、DNS 記錄、安全評估與域名到期日",
    url: "https://whoisvibe.com",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whoisvibe — Domain Intelligence & WHOIS Lookup",
    description: "查詢任何網域的 WHOIS 資訊、DNS 記錄、安全評估與域名到期日",
  },
  alternates: { canonical: "https://whoisvibe.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Domain Vibe",
    url: "https://whoisvibe.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://whoisvibe.com/domain/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
