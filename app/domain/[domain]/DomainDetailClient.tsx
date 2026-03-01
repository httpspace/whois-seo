'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DomainDetail from '@/page-components/DomainDetail'
import { Loader2 } from 'lucide-react'
import type { WhoisData, DNSData, AISummaryData } from '@/types/domain'

type InitialDomainData = {
  whois: WhoisData | null
  dns: DNSData | null
  ai: AISummaryData | null
}

export default function DomainDetailClient({ initialData }: { initialData?: InitialDomainData }) {
  const params = useParams()
  const paramDomain = (params?.domain as string) ?? ''

  // When Cloudflare serves the '_' shell for an unknown domain,
  // read the actual domain from the browser URL instead of the baked-in param.
  const [domain, setDomain] = useState<string>(paramDomain === '_' ? '' : paramDomain)

  useEffect(() => {
    if (paramDomain === '_' || !paramDomain) {
      const match = window.location.pathname.match(/^\/domain\/([^/?#]+)/)
      if (match) setDomain(decodeURIComponent(match[1]))
    }
  }, [paramDomain])

  if (!domain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <DomainDetail domain={domain} initialData={initialData} />
}
