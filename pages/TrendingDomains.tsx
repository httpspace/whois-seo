'use client'

import { Link } from "@/lib/router-compat";
import { ArrowLeft, TrendingUp, Flame } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { DomainListItem } from "@/components/domain/DomainListItem";
import { trendingDomains, allDomains } from "@/data/mockDomains";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

export default function TrendingDomains() {
  const domains = [...trendingDomains, ...allDomains.filter(d => d.popularity === "high").slice(0, 10)];
  const uniqueDomains = domains.filter((d, i, arr) => arr.findIndex(x => x.domain === d.domain) === i);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

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
                {uniqueDomains.map((domain) => (
                  <DomainListItem key={domain.domain} domain={domain} showFollowButton />
                ))}
              </SectionCard>
            </div>
            <div className="space-y-6">
              <SectionCard className="bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold">{t("trending.hotThisWeek")}</h3>
                </div>
                <div className="space-y-2">
                  {uniqueDomains.slice(0, 3).map((d, i) => (
                    <Link key={d.domain} href={`/domain/${d.domain}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-background/50 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-sm font-medium font-mono">{d.domain}</span>
                    </Link>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {uniqueDomains.map((domain) => (
              <DomainListItem key={domain.domain} domain={domain} showFollowButton />
            ))}
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
