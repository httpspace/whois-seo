import type { WhoisData, DNSData, AISummaryData, FetchResult } from '@/types/domain';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? 'http://localhost:8787';

async function safeFetchWithStatus<T>(url: string): Promise<FetchResult<T>> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
    if (res.status === 400) return { ok: false, reason: 'invalid' };
    if (res.status >= 500) return { ok: false, reason: 'upstream-error' };
    if (!res.ok) return { ok: false, reason: 'upstream-error' };
    const data = await res.json() as T;
    return { ok: true, data };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'TimeoutError') {
      return { ok: false, reason: 'timeout' };
    }
    return { ok: false, reason: 'network' };
  }
}

export async function fetchAuthGoogleUrl(): Promise<string | null> {
  const result = await safeFetchWithStatus<{ url: string }>(`${WORKER_URL}/api/auth/google/url`);
  return result.ok ? (result.data.url ?? null) : null;
}

export async function exchangeGoogleCode(code: string): Promise<{ token: string; user: { email: string; name: string; avatar: string } } | null> {
  try {
    const res = await fetch(`${WORKER_URL}/api/auth/google/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchWhois(domain: string): Promise<FetchResult<WhoisData>> {
  return safeFetchWithStatus<WhoisData>(`${WORKER_URL}/api/whois?domain=${encodeURIComponent(domain)}`);
}

export async function fetchDNS(domain: string): Promise<FetchResult<DNSData>> {
  return safeFetchWithStatus<DNSData>(`${WORKER_URL}/api/dns?domain=${encodeURIComponent(domain)}`);
}

export async function fetchAISummary(domain: string): Promise<FetchResult<AISummaryData>> {
  return safeFetchWithStatus<AISummaryData>(`${WORKER_URL}/api/ai-summary?domain=${encodeURIComponent(domain)}`);
}

export async function fetchPopular(): Promise<{ domain: string; hits: number }[] | null> {
  const result = await safeFetchWithStatus<{ domain: string; hits: number }[]>(`${WORKER_URL}/api/popular`);
  return result.ok ? result.data : null;
}

export async function fetchRecent(limit = 50): Promise<{ domain: string; updated: number }[] | null> {
  const result = await safeFetchWithStatus<{ domain: string; updated: number }[]>(`${WORKER_URL}/api/recent?limit=${limit}`);
  return result.ok ? result.data : null;
}

export async function fetchStats(): Promise<{ total: number; queries: number; activeToday: number } | null> {
  const result = await safeFetchWithStatus<{ total: number; queries: number; activeToday: number }>(`${WORKER_URL}/api/stats`);
  return result.ok ? result.data : null;
}
