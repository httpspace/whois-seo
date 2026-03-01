export interface WhoisData {
  domain_name?: string;
  create_date?: string;
  expiry_date?: string;
  update_date?: string;
  domain_registrar?: {
    registrar_name?: string;
    website_url?: string;
    whois_server?: string;
  };
  registrant_contact?: {
    company?: string;
    country_name?: string;
    country_code?: string;
    name?: string;
  };
  name_servers?: string[];
  domain_status?: string[];
  _cached?: boolean;
  _age?: number;
}

export interface DNSRecord {
  type: string;
  value: string;
  ttl: string;
}

export interface DNSData {
  nameservers?: string[];
  // WhoisFreaks 實際回傳格式（camelCase）
  dnsRecords?: Array<{
    dnsType: string;
    address?: string;
    target?: string;
    strings?: string[];
    singleName?: string;
    ttl?: number;
  }>;
  // 舊格式保留
  name_servers?: string[];
  dns_records?: Array<{ dns_type: string; address?: string; target?: string; strings?: string[]; ttl?: number }>;
  registrar?: string;
  registrar_url?: string;
  registrant_org?: string;
  registrant_country?: string;
  create_date?: string;
  expiry_date?: string;
  update_date?: string;
  domain_status?: string[];
  _cached?: boolean;
  _age?: number;
}

export interface AISummaryData {
  summary_zh: string;
  summary_en: string;
  _cached?: boolean;
  _age?: number;
}

export type FetchFailReason = 'invalid' | 'upstream-error' | 'timeout' | 'network';

export type FetchResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: FetchFailReason }

export type FetchState =
  | { status: 'fetching' }
  | { status: 'success'; whoisData: WhoisData; dnsData: DNSData; aiData: AISummaryData | null }
  | { status: 'not-registered'; domain: string }
  | { status: 'fetch-failed'; domain: string; retryCount: number }
  | { status: 'invalid'; domain: string }
