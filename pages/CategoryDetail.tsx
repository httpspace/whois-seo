'use client'

import { useParams, Link } from "@/lib/router-compat";
import { ArrowLeft } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { DomainListItem } from "@/components/domain/DomainListItem";
import { allDomains, categories } from "@/data/mockDomains";
import { DomainData } from "@/components/domain/DomainCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";

export default function CategoryDetail() {
  const params = useParams();
  const categoryId = params?.categoryId as string | undefined;
  const category = categories.find(c => c.id === categoryId);
  const domains = allDomains.filter(d => d.category === categoryId);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  const categoryLabels: Record<DomainData["category"], string> = {
    tech: t("category.tech"), business: t("category.business"), media: t("category.media"),
    ecommerce: t("category.ecommerce"), finance: t("category.finance"), social: t("category.social"),
  };

  if (!category) {
    return (
      <ResponsiveLayout>
        <div className="max-w-2xl mx-auto">
          {!isDesktop && (
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
              <div className="flex items-center gap-3 px-4 py-3">
                <Link href="/categories" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
                <span className="font-medium text-foreground">{t("common.notFound")}</span>
              </div>
            </header>
          )}
          <div className="px-6 py-20 text-center"><p className="text-muted-foreground">{t("categories.notFound")}</p></div>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout>
      <div className="max-w-2xl mx-auto">
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link href="/categories" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <h1 className="font-semibold text-foreground">{categoryLabels[categoryId as DomainData["category"]] || category.label}</h1>
                <p className="text-xs text-muted-foreground">{domains.length} {t("categories.domains")}</p>
              </div>
            </div>
          </header>
        )}
        {isDesktop && (
          <div className="px-6 py-6 border-b border-border">
            <h1 className="text-xl font-semibold text-foreground">{categoryLabels[categoryId as DomainData["category"]] || category.label}</h1>
            <p className="text-sm text-muted-foreground">{domains.length} {t("categories.domains")}</p>
          </div>
        )}
        <div className="divide-y divide-border">
          {domains.map((domain) => (<DomainListItem key={domain.domain} domain={domain} showFollowButton subtitle="vibe" />))}
        </div>
        {domains.length === 0 && (
          <div className="px-6 py-20 text-center"><p className="text-muted-foreground">{t("categories.noDomains")}</p></div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
