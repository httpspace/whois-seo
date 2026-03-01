'use client'

import { useState, useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowLeft, TrendingUp, Flame } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { fetchPopular } from "@/lib/api";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

type PopularItem = { domain: string; hits: number };

export default function TrendingDomains() {
  const [domains, setDomains] = useState<PopularItem[] | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  useEffect(() => {
    fetchPopular().then(setDomains);
  }, []);

  const SkeletonRow = () => (
    <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 bg-muted rounded w-32" />
        <div className="h-3 bg-muted rounded w-20" />
      </div>
    </div>
  );

  const DomainRow = ({ item, rank }: { item: PopularItem; rank: number }) => (
    <Link
      href={`/domain/${item.domain}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
    >
      <span className="w-7 text-center text-sm font-bold text-muted-foreground">#{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium font-mono text-sm truncate">{item.domain}</p>
        <p className="text-xs text-muted-foreground">{item.hits.toLocaleString()} 次查詢</p>
      </div>
    </Link>
  );

  return (
    <ResponsiveLayout>
      <div className={cn("mx-auto", isDesktop ? "max-w-6xl" : "max-w-2xl")}>
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h1 className="font-semibold text-foreground">{t("trending.title")}</h1>
                </div>
                <p className="text-xs text-muted-foreground">{t("trending.subtitle")}</p>
              </div>
            </div>
          </header>
        )}

        {isDesktop ? (
          <div className="grid grid-cols-3 gap-6 px-6 py-8">
            <div className="col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">{t("trending.title")}</h1>
                    <p className="text-sm text-muted-foreground">{t("trending.subtitle")}</p>
                  </div>
                </div>
              </div>
              <SectionCard className="divide-y divide-border">
                {domains === null
                  ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                  : domains.map((item, i) => <DomainRow key={item.domain} item={item} rank={i + 1} />)
                }
              </SectionCard>
            </div>
            <div className="space-y-6">
              <SectionCard className="bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold">{t("trending.hotThisWeek")}</h3>
                </div>
                <div className="space-y-2">
                  {(domains ?? []).slice(0, 3).map((item, i) => (
                    <Link key={item.domain} href={`/domain/${item.domain}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-sm font-medium font-mono">{item.domain}</span>
                    </Link>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {domains === null
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
              : domains.map((item, i) => <DomainRow key={item.domain} item={item} rank={i + 1} />)
            }
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
