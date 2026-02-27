'use client'

import { use } from 'react'
import DomainDetail from '@/pages/DomainDetail'

export default function DomainDetailClient({ params }: { params: Promise<{ domain: string }> }) {
  // params is resolved by Next.js before passing to client components
  return <DomainDetail />
}
