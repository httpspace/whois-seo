'use client'

import { useState, useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { fetchRecent } from "@/lib/api";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

type RecentItem = { domain: string; updated: number };

function timeAgo(ts: number): string {
  const diff = Math.floor(Date.now() / 1000) - ts;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function RecentDomains() {
  const [items, setItems] = useState<RecentItem[] | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  useEffect(() => {
    fetchRecent(50).then(setItems);
  }, []);

  const DomainRow = ({ domain, updated }: RecentItem) => (
    <Link
      href={`/domain/${domain}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
    >
      <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
        <Clock className="w-4 h-4 text-blue-500" />
      </div>
      <span className="font-medium font-mono text-sm truncate flex-1 min-w-0">{domain}</span>
      <span className="text-xs text-muted-foreground shrink-0">{timeAgo(updated)}</span>
    </Link>
  );

  const Skeleton = () => (
    <div className="divide-y divide-border">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
          <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
          <div className="flex-1 h-3.5 bg-muted rounded" />
          <div className="w-10 h-3 bg-muted rounded" />
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Clock className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{t("recent.empty")}</p>
    </div>
  );

  const content = items === null ? <Skeleton /> : items.length === 0 ? <EmptyState /> : (
    <div className="divide-y divide-border">
      {items.map((item) => <DomainRow key={item.domain} {...item} />)}
    </div>
  );

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
              <SectionCard className="overflow-hidden p-0">
                {content}
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
          <div>{content}</div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
