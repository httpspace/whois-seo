import type { FAQItem, SupportedLocale } from '@/types/faq';

const sectionTitles: Record<SupportedLocale, { title: string; subtitle: string }> = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Common questions about this domain based on WHOIS & DNS data',
  },
  'zh-TW': {
    title: '常見問題',
    subtitle: '根據 WHOIS 與 DNS 資料整理的常見域名問題',
  },
  es: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Preguntas comunes sobre este dominio basadas en datos WHOIS y DNS',
  },
  fr: {
    title: 'Questions Fréquentes',
    subtitle: 'Questions courantes sur ce domaine basées sur les données WHOIS et DNS',
  },
};

interface DomainFAQProps {
  items: FAQItem[];
  locale: SupportedLocale;
  domain: string;
  updatedAt?: number;
}

export default function DomainFAQ({ items, locale, domain }: DomainFAQProps) {
  if (items.length === 0) return null;

  const { title, subtitle } = sectionTitles[locale] ?? sectionTitles.en;

  return (
    <section
      aria-label={`${domain} FAQ`}
      className="mx-auto max-w-3xl px-4 py-10"
    >
      <h2 className="text-xl font-bold mb-1 text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-card px-5 py-4"
          >
            <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">
              {item.question}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
