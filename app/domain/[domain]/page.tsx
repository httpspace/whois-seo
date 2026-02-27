import { Metadata } from 'next'
import DomainDetailClient from './DomainDetailClient'

export async function generateMetadata(
  { params }: { params: Promise<{ domain: string }> }
): Promise<Metadata> {
  const { domain } = await params
  return {
    title: `${domain} WHOIS 查詢 | Domain Vibe`,
    description: `查詢 ${domain} 的 WHOIS 資訊、DNS 記錄、安全評估與域名歷史`,
    openGraph: {
      title: `${domain} - Domain Vibe`,
      url: `/domain/${domain}`,
    }
  }
}

export default function Page({ params }: { params: Promise<{ domain: string }> }) {
  return <DomainDetailClient params={params} />
}
