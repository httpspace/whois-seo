'use client'

import { useEffect, useState } from "react";
import { Link } from "@/lib/router-compat";
import { BellOff, Search, Globe, ArrowLeft, Bell, Clock, Loader2 } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { ListItem } from "@/components/ui/list-item";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { fetchWhois } from "@/lib/api";
import { cn } from "@/lib/utils";

interface DomainMeta {
  domain: string;
  expiresAt?: string;
}

function ExpiryBadge({ expiresAt }: { expiresAt?: string }) {
  if (!expiresAt) return null;
  const days = differenceInDays(parseISO(expiresAt), new Date());
  if (days < 0) return <span className="text-[10px] font-medium text-destructive">已過期</span>;
  const urgent = days <= 7;
  const warning = days <= 30;
  return (
    <span className={cn(
      "inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full",
      urgent ? "bg-destructive/10 text-destructive" :
      warning ? "bg-amber-500/10 text-amber-500" :
      "bg-muted text-muted-foreground"
    )}>
      <Clock className="w-3 h-3" />
      {days}天
    </span>
  );
}

export default function FollowingPage() {
  const { followedDomains, unfollowDomain } = useAppStore();
  const { isLoggedIn } = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  const [metas, setMetas] = useState<Record<string, DomainMeta>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || followedDomains.length === 0) return;

    setLoading(true);
    Promise.all(
      followedDomains.map(async (d) => {
        if (metas[d]) return; // already loaded
        const result = await fetchWhois(d);
        if (!result.ok) return;
        const data = result.data;
        setMetas(prev => ({
          ...prev,
          [d]: {
            domain: d,
            expiresAt: data.expiry_date ?? undefined,
          },
        }));
      })
    ).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, followedDomains.join(',')]);

  return (
    <ResponsiveLayout>
      <div className="max-w-2xl mx-auto">
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <h1 className="font-semibold text-foreground">{t("following.title")}</h1>
                </div>
                <p className="text-xs text-muted-foreground">{followedDomains.length} {t("following.domainsTracked")}</p>
              </div>
            </div>
          </header>
        )}

        {isDesktop && (
          <div className="px-6 py-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">{t("following.title")}</h1>
                <p className="text-sm text-muted-foreground">{followedDomains.length} {t("following.domainsTracked")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-5 space-y-5 lg:py-8 lg:px-6">
          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                <Bell className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">{t("following.loginRequired")}</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">{t("following.loginRequiredDesc")}</p>
              <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                {t("following.loginBtn")}
              </Link>
            </div>
          ) : followedDomains.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                <BellOff className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">{t("following.noDomainsTitle")}</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">{t("following.noDomainsDesc")}</p>
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                <Search className="w-4 h-4" />
                {t("following.findDomains")}
              </Link>
            </div>
          ) : (
            <>
              <SectionCard className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-foreground">{followedDomains.length}</p>
                  <p className="text-xs text-muted-foreground">{t("following.beingTracked")}</p>
                </div>
                {loading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
              </SectionCard>

              <SectionCard>
                <SectionHeader title={t("following.trackedDomains")} />
                <div className="space-y-1">
                  {followedDomains.map((d) => {
                    const meta = metas[d];
                    return (
                      <ListItem
                        key={d}
                        icon={Globe}
                        iconBg="bg-primary/10"
                        iconColor="text-primary"
                        title={d}
                        href={`/domain/${d}`}
                        rightElement={
                          <div className="flex items-center gap-2">
                            {meta?.expiresAt && <ExpiryBadge expiresAt={meta.expiresAt} />}
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); unfollowDomain(d); }}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="取消追蹤"
                            >
                              <BellOff className="w-4 h-4" />
                            </button>
                          </div>
                        }
                      />
                    );
                  })}
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
