export type FAQCategory = 'basic' | 'geo' | 'security' | 'dns' | 'management';
export type SupportedLocale = 'en' | 'zh-TW' | 'es' | 'fr';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  tags: string[];
  priority: number;
}

export interface DomainFAQContext {
  domain: string;
  tld: string;
  registrar: string;
  expiryDate: string;
  createDate: string;
  domainAgeYears: number;
  registrantCountry: string;
  nameServers: string[];
  mxRecords: string[];
  domainStatus: string[];
  hasGoogleMX: boolean;
  hasMicrosoftMX: boolean;
  hasServerLock: boolean;
  hasClientLock: boolean;
  daysUntilExpiry: number;
  locale: SupportedLocale;
}
