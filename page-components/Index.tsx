'use client'

import { useState, useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { Search, ChevronRight, Globe, TrendingUp, Clock, Timer, Activity } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { ListItem } from "@/components/ui/list-item";
import { TabSwitch } from "@/components/ui/tab-switch";
import { SearchSheet } from "@/components/search/SearchSheet";
import { DesktopSidebar, MobileStatsSummary } from "@/components/dashboard/DesktopSidebar";
import { useAppStore } from "@/store/appStore";
import { fetchPopular, fetchRecent, fetchExpiring } from "@/lib/api";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { useLangPath } from "@/lib/useLangPath";
import { cn } from "@/lib/utils";

type PopularItem = { domain: string; hits: number };
type RecentItem = { domain: string; updated: number };
type ExpiringItem = { domain: string; expiry_date: string };

interface IndexProps {
  initialPopular?: PopularItem[];
  initialRecent?: RecentItem[];
}

export default function Index({ initialPopular, initialRecent }: IndexProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  // Initialise with build-time data so crawlers see real content immediately
  const [popularDomains, setPopularDomains] = useState<PopularItem[] | null>(initialPopular ?? null);
  const [recentDomains, setRecentDomains] = useState<RecentItem[] | null>(initialRecent ?? null);
  const [expiringDomains, setExpiringDomains] = useState<ExpiringItem[] | null>(null);
  const { followedDomains } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();
  const langPath = useLangPath();

  // Refresh with live data after mount (keeps content fresh beyond build snapshot)
  useEffect(() => {
    fetchPopular().then(data => { if (data) setPopularDomains(data); });
    fetchRecent(isDesktop ? 8 : 5).then(data => { if (data) setRecentDomains(data); });
    fetchExpiring(60).then(data => { if (data) setExpiringDomains(data); });
  }, [isDesktop]);

  const browseTabs = [t("nav.trending"), t("nav.recent"), t("nav.expiring")];
  const browseKeyMap: Record<string, "Trending" | "Recent" | "Expiring"> = {
    [t("nav.trending")]: "Trending",
    [t("nav.recent")]: "Recent",
    [t("nav.expiring")]: "Expiring",
  };
  const [browseTab, setBrowseTab] = useState(browseTabs[0]);
  const activeKey = browseKeyMap[browseTab] || "Trending";

  const BrowseContent = () => {
    if (activeKey === "Trending") {
      if (popularDomains === null) {
        return (
          <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
                <div className="flex-1 h-3.5 bg-muted rounded" />
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="space-y-1">
          {popularDomains.slice(0, isDesktop ? 8 : 5).map((item) => (
            <ListItem key={item.domain} icon={TrendingUp} iconBg="bg-amber-500/10" iconColor="text-amber-500" title={item.domain} subtitle={`${item.hits.toLocaleString()} 次查詢`} href={langPath(`/domain/${item.domain}`)} />
          ))}
        </div>
      );
    }
    if (activeKey === "Recent") {
      if (recentDomains === null) {
        return (
          <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
                <div className="flex-1 h-3.5 bg-muted rounded" />
              </div>
            ))}
          </div>
        );
      }
      if (recentDomains.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-6">{t("recent.empty")}</p>;
      }
      return (
        <div className="space-y-1">
          {recentDomains.map(({ domain }) => (
            <ListItem key={domain} icon={Clock} iconBg="bg-blue-500/10" iconColor="text-blue-500" title={domain} href={langPath(`/domain/${domain}`)} />
          ))}
        </div>
      );
    }
    // Expiring
    if (expiringDomains === null) {
      return (
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
              <div className="flex-1 h-3.5 bg-muted rounded" />
            </div>
          ))}
        </div>
      );
    }
    if (expiringDomains.length === 0) {
      return <p className="text-sm text-muted-foreground text-center py-6">{t("expiring.noDomains")}</p>;
    }
    return (
      <div className="space-y-1">
        {expiringDomains.slice(0, isDesktop ? 8 : 5).map((item) => {
          const days = Math.ceil((new Date(item.expiry_date).getTime() - Date.now()) / 86400000);
          return (
            <ListItem
              key={item.domain}
              icon={Timer}
              iconBg="bg-destructive/10"
              iconColor="text-destructive"
              title={item.domain}
              subtitle={`${days}d · ${item.expiry_date}`}
              href={langPath(`/domain/${item.domain}`)}
            />
          );
        })}
      </div>
    );
  };

  const browsePath = activeKey === "Trending" ? langPath("/trending") : activeKey === "Recent" ? langPath("/recent") : langPath("/expiring");

  return (
    <ResponsiveLayout showMobileHeader mobileHeaderTitle="Whoisvibe">
      <div className={cn(
        "mx-auto",
        isDesktop ? "max-w-6xl px-6 py-8" : "max-w-2xl px-4 py-5"
      )}>
        {isDesktop ? (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Welcome Banner */}
              <div className="rounded-2xl p-6 bg-brand-gradient text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <h1 className="text-2xl font-display font-bold mb-2">{t("index.welcome")}</h1>
                    <p className="opacity-80">{t("index.welcomeDesc")}</p>
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="mt-4 px-5 py-2.5 rounded-xl bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm transition-all text-sm font-medium flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Search className="w-4 h-4" />
                      {t("index.searchDomain")}
                    </button>
                    <p className="text-xs opacity-60 mt-3">{t("index.featureList")}</p>
                  </div>
                  <div className="w-24 h-24 rounded-full bg-primary-foreground/10 flex items-center justify-center glow-brand">
                    <Globe className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Following Preview */}
              {followedDomains.length > 0 && (
                <SectionCard>
                  <SectionHeader
                    title={t("index.followingDomains")}
                    action={<Link href={langPath("/following")} className="text-xs font-medium text-primary flex items-center gap-0.5">{t("index.viewAll")} <ChevronRight className="w-3.5 h-3.5" /></Link>}
                  />
                  <div className="space-y-1">
                    {followedDomains.slice(0, 3).map(domain => (
                      <ListItem key={domain} icon={Globe} iconBg="bg-primary/10" iconColor="text-primary" title={domain} href={langPath(`/domain/${domain}`)} />
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Browse Domains */}
              <SectionCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold">{t("index.browseDomains")}</h2>
                  <TabSwitch tabs={browseTabs} activeTab={browseTab} onTabChange={setBrowseTab} />
                </div>
                <BrowseContent />
                <Link href={browsePath} className="flex items-center justify-center gap-1 mt-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t("index.viewAllLower")} <ChevronRight className="w-4 h-4" />
                </Link>
              </SectionCard>
            </div>
            <DesktopSidebar />
          </div>
        ) : (
          <div className="space-y-5">
            <MobileStatsSummary />

            <SectionCard className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <p className="flex-1 text-sm font-semibold">{followedDomains.length} {t("index.domainsTracked")}</p>
              {followedDomains.length > 0 && (
                <Link href={langPath("/following")} className="text-xs font-medium text-primary flex items-center gap-0.5">
                  {t("common.view")} <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </SectionCard>

            <button
              onClick={() => setSearchOpen(true)}
              className="w-full rounded-2xl p-5 text-left bg-brand-gradient text-primary-foreground hover:shadow-lg transition-all active:scale-[0.99] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h1 className="text-lg font-display font-semibold">{t("index.welcome")}</h1>
                  <p className="text-sm mt-1 opacity-70">{t("index.welcomeDesc")}</p>
                  <p className="text-xs opacity-50 mt-2">{t("index.featureList")}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center glow-brand-sm">
                  <Search className="w-6 h-6" />
                </div>
              </div>
            </button>

            {followedDomains.length > 0 && (
              <SectionCard>
                <SectionHeader
                  title={t("index.followingDomains")}
                  action={<Link href={langPath("/following")} className="text-xs font-medium text-primary flex items-center gap-0.5">{t("index.viewAll")} <ChevronRight className="w-3.5 h-3.5" /></Link>}
                />
                <div className="space-y-1">
                  {followedDomains.slice(0, 3).map(domain => (
                    <ListItem key={domain} icon={Globe} iconBg="bg-primary/10" iconColor="text-primary" title={domain} href={langPath(`/domain/${domain}`)} />
                  ))}
                </div>
              </SectionCard>
            )}

            <SectionCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">{t("index.browseDomains")}</h2>
                <TabSwitch tabs={browseTabs} activeTab={browseTab} onTabChange={setBrowseTab} />
              </div>
              <BrowseContent />
              <Link href={browsePath} className="flex items-center justify-center gap-1 mt-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("index.viewAllLower")} <ChevronRight className="w-4 h-4" />
              </Link>
            </SectionCard>
          </div>
        )}
      </div>

      <SearchSheet open={searchOpen} onOpenChange={setSearchOpen} />
    </ResponsiveLayout>
  );
}
