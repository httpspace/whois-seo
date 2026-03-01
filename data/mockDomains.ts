import type { DomainData as DomainCardData } from "@/components/domain/DomainCard";

export type DomainData = DomainCardData & { expiresAt?: string };


export const trendingDomains: DomainData[] = [
  {
    domain: "openai.com",
    category: "tech",
    vibe: "ai-native",
    summary: "The company everyone's watching. Moves fast, breaks things, occasionally terrifies regulators.",
    popularity: "high",
    age: "8 years",
    lastActive: "Active now",
  },
  {
    domain: "stripe.com",
    category: "finance",
    vibe: "established",
    summary: "Quietly powers half the internet's checkout flows. Developers love it. Banks tolerate it.",
    popularity: "high",
    age: "14 years",
    lastActive: "Active now",
  },
  {
    domain: "linear.app",
    category: "tech",
    vibe: "high-attention",
    summary: "Made project management cool again. Somehow. The darling of teams who care about software craft.",
    popularity: "high",
    age: "5 years",
    lastActive: "Active now",
  },
  {
    domain: "notion.so",
    category: "business",
    vibe: "established",
    summary: "Started as notes, became everything. Your company's second brain, for better or worse.",
    popularity: "high",
    age: "8 years",
    lastActive: "Active now",
  },
  {
    domain: "figma.com",
    category: "tech",
    vibe: "established",
    summary: "Killed desktop design tools. Adobe tried to buy it. Now it's the default.",
    popularity: "high",
    age: "12 years",
    lastActive: "Active now",
  },
];

export const recentDomains: DomainData[] = [
  {
    domain: "perplexity.ai",
    category: "tech",
    vibe: "ai-native",
    summary: "Trying to make Google nervous. Search, but it actually answers your question.",
    popularity: "high",
    age: "2 years",
    lastActive: "2 hours ago",
  },
  {
    domain: "anthropic.com",
    category: "tech",
    vibe: "ai-native",
    summary: "The 'safety-first' AI lab. Built by OpenAI alumni who wanted guardrails.",
    popularity: "high",
    age: "3 years",
    lastActive: "1 hour ago",
  },
  {
    domain: "replicate.com",
    category: "tech",
    vibe: "under-radar",
    summary: "Run ML models without the PhD. Quietly becoming essential infrastructure.",
    popularity: "medium",
    age: "4 years",
    lastActive: "3 hours ago",
  },
  {
    domain: "vercel.com",
    category: "tech",
    vibe: "high-attention",
    summary: "Deploy anything in seconds. The developer experience gold standard.",
    popularity: "high",
    age: "8 years",
    lastActive: "30 min ago",
  },
];

export const expiringDomains: DomainData[] = [
  {
    domain: "techstartup.io",
    category: "tech",
    vibe: "dormant",
    summary: "The dream died quietly. Generic name, zero follow-through.",
    popularity: "low",
    age: "6 years",
    lastActive: "6 months ago",
    expiresAt: "2026-03-06",
  },
  {
    domain: "cryptomarket.net",
    category: "finance",
    vibe: "dormant",
    summary: "2021 called. Left voicemail. Never answered.",
    popularity: "low",
    age: "5 years",
    lastActive: "1 year ago",
    expiresAt: "2026-03-13",
  },
  {
    domain: "socialapp.co",
    category: "social",
    vibe: "dormant",
    summary: "Ambitions of grandeur, reality of abandonment. A cautionary placeholder.",
    popularity: "low",
    age: "8 years",
    lastActive: "2 years ago",
    expiresAt: "2026-03-29",
  },
  {
    domain: "ecomstore.shop",
    category: "ecommerce",
    vibe: "dormant",
    summary: "Registered, never launched. The graveyard of weekend project ideas.",
    popularity: "low",
    age: "3 years",
    lastActive: "1 year ago",
    expiresAt: "2026-04-15",
  },
];

export const allDomains: DomainData[] = [
  ...trendingDomains,
  ...recentDomains,
  ...expiringDomains,
  {
    domain: "spotify.com",
    category: "media",
    vibe: "established",
    summary: "Won the streaming war. Now fighting with artists, podcasters, and everyone else.",
    popularity: "high",
    age: "18 years",
    lastActive: "Active now",
  },
  {
    domain: "shopify.com",
    category: "ecommerce",
    vibe: "established",
    summary: "Made everyone a merchant. For better or worse, your aunt has a store now.",
    popularity: "high",
    age: "18 years",
    lastActive: "Active now",
  },
  {
    domain: "twitter.com",
    category: "social",
    vibe: "brand-sensitive",
    summary: "Still exists. Still chaotic. The town square nobody asked for but everyone uses.",
    popularity: "high",
    age: "19 years",
    lastActive: "Active now",
  },
  {
    domain: "medium.com",
    category: "media",
    vibe: "aging-influential",
    summary: "Where thought leaders go to thought-lead. Peak 2018 energy, still somehow relevant.",
    popularity: "high",
    age: "12 years",
    lastActive: "Active now",
  },
];

export const categories = [
  { id: "tech", label: "Technology", count: 156, color: "tech" as const },
  { id: "business", label: "Business", count: 89, color: "business" as const },
  { id: "media", label: "Media", count: 67, color: "media" as const },
  { id: "ecommerce", label: "E-commerce", count: 45, color: "ecommerce" as const },
  { id: "finance", label: "Finance", count: 34, color: "finance" as const },
  { id: "social", label: "Social", count: 28, color: "social" as const },
];

export function getDomainByName(name: string): DomainData | undefined {
  return allDomains.find(d => d.domain.toLowerCase() === name.toLowerCase());
}