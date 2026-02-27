'use client'

import { Link } from "@/lib/router-compat";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { DomainListItem } from "@/components/domain/DomainListItem";
import { recentDomains, allDomains } from "@/data/mockDomains";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

export default function RecentDomains() {
  const domains = [...recentDomains, ...allDomains.slice(0, 6)];
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
                <h1 className="font-semibold text-foreground">{t("recent.title")}</h1>
                <p className="text-xs text-muted-foreground">{t("recent.subtitle")}</p>
              </div>
            </div>
          </header>
        )}

        {isDesktop ? (
          <div className="grid grid-cols-3 gap-6 px-6 py-8">
            <div className="col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">{t("recent.title")}</h1>
                    <p className="text-sm text-muted-foreground">{t("recent.subtitle")}</p>
                  </div>
                </div>
              </div>
              <SectionCard className="divide-y divide-border">
                {domains.map((domain) => (
                  <DomainListItem key={domain.domain} domain={domain} showFollowButton subtitle="lastActive" />
                ))}
              </SectionCard>
            </div>
            <div className="space-y-6">
              <SectionCard className="bg-gradient-to-br from-blue-500/5 to-primary/10">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{t("recent.realtime")}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t("recent.realtimeDesc")}</p>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {domains.map((domain) => (
              <DomainListItem key={domain.domain} domain={domain} showFollowButton subtitle="lastActive" />
            ))}
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
