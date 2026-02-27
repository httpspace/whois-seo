'use client'

import { useState } from "react";
import { Link } from "@/lib/router-compat";
import { Search, ChevronRight, Globe, TrendingUp, Clock, Timer, Activity, Grid3X3 } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { ListItem } from "@/components/ui/list-item";
import { TabSwitch } from "@/components/ui/tab-switch";
import { SearchSheet } from "@/components/search/SearchSheet";
import { DesktopSidebar, MobileStatsSummary } from "@/components/dashboard/DesktopSidebar";
import { trendingDomains, recentDomains, expiringDomains, categories, getDomainByName } from "@/data/mockDomains";
import { useAppStore } from "@/store/appStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

export default function Index() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { followedDomains } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t, locale } = useLanguage();

  const browseTabs = [t("nav.trending"), t("nav.recent"), t("nav.expiring")];
  const browseKeyMap: Record<string, "Trending" | "Recent" | "Expiring"> = {
    [t("nav.trending")]: "Trending",
    [t("nav.recent")]: "Recent",
    [t("nav.expiring")]: "Expiring",
  };
  const [browseTab, setBrowseTab] = useState(browseTabs[0]);

  const browseConfig = {
    Trending: { data: trendingDomains, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10", path: "/trending" },
    Recent: { data: recentDomains, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", path: "/recent" },
    Expiring: { data: expiringDomains, icon: Timer, color: "text-red-500", bg: "bg-red-500/10", path: "/expiring" },
  };

  const trackedDomains = followedDomains.map(d => getDomainByName(d)).filter(Boolean).slice(0, 3);
  const activeKey = browseKeyMap[browseTab] || "Trending";
  const { data, icon: BrowseIcon, color, bg, path } = browseConfig[activeKey];

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
                  </div>
                  <div className="w-24 h-24 rounded-full bg-primary-foreground/10 flex items-center justify-center glow-brand">
                    <Globe className="w-12 h-12 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Following Preview */}
              {trackedDomains.length > 0 && (
                <SectionCard>
                  <SectionHeader 
                    title={t("index.followingDomains")}
                    action={<Link href="/following" className="text-xs font-medium text-primary flex items-center gap-0.5">{t("index.viewAll")} <ChevronRight className="w-3.5 h-3.5" /></Link>}
                  />
                  <div className="space-y-1">
                    {trackedDomains.map(domain => domain && (
                      <ListItem key={domain.domain} icon={Globe} iconBg="bg-primary/10" iconColor="text-primary" title={domain.domain} subtitle={domain.vibe} href={`/domain/${domain.domain}`} />
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
                <div className="space-y-1">
                  {data.slice(0, 8).map(domain => (
                    <ListItem key={domain.domain} icon={BrowseIcon} iconBg={bg} iconColor={color} title={domain.domain} subtitle={domain.vibe || domain.summary?.slice(0, 40)} href={`/domain/${domain.domain}`} />
                  ))}
                </div>
                <Link href={path} className="flex items-center justify-center gap-1 mt-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {t("index.viewAllLower")} <ChevronRight className="w-4 h-4" />
                </Link>
              </SectionCard>

              {/* Categories */}
              <SectionCard>
                <SectionHeader 
                  title={t("index.categories")}
                  action={<Link href="/categories" className="text-xs font-medium text-primary flex items-center gap-0.5">{t("index.viewAll")} <ChevronRight className="w-3.5 h-3.5" /></Link>}
                />
                <div className="grid grid-cols-3 gap-3">
                  {categories.slice(0, 6).map(cat => (
                    <Link key={cat.id} href={`/categories/${cat.id}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{cat.label}</p>
                        <p className="text-xs text-muted-foreground">{cat.count}</p>
                      </div>
                    </Link>
                  ))}
                </div>
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
                <Link href="/following" className="text-xs font-medium text-primary flex items-center gap-0.5">
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
                  <h3 className="text-lg font-display font-semibold">{t("index.domainSearch")}</h3>
                  <p className="text-sm mt-1 opacity-70">{t("index.lookUpInstantly")}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center glow-brand-sm">
                  <Search className="w-6 h-6" />
                </div>
              </div>
            </button>

            {trackedDomains.length > 0 && (
              <SectionCard>
                <SectionHeader 
                  title={t("index.followingDomains")}
                  action={<Link href="/following" className="text-xs font-medium text-primary flex items-center gap-0.5">{t("index.viewAll")} <ChevronRight className="w-3.5 h-3.5" /></Link>}
                />
                <div className="space-y-1">
                  {trackedDomains.map(domain => domain && (
                    <ListItem key={domain.domain} icon={Globe} iconBg="bg-primary/10" iconColor="text-primary" title={domain.domain} subtitle={domain.vibe} href={`/domain/${domain.domain}`} />
                  ))}
                </div>
              </SectionCard>
            )}

            <SectionCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">{t("index.browseDomains")}</h2>
                <TabSwitch tabs={browseTabs} activeTab={browseTab} onTabChange={setBrowseTab} />
              </div>
              <div className="space-y-1">
                {data.slice(0, 5).map(domain => (
                  <ListItem key={domain.domain} icon={BrowseIcon} iconBg={bg} iconColor={color} title={domain.domain} subtitle={domain.vibe || domain.summary?.slice(0, 40)} href={`/domain/${domain.domain}`} />
                ))}
              </div>
              <Link href={path} className="flex items-center justify-center gap-1 mt-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("index.viewAllLower")} <ChevronRight className="w-4 h-4" />
              </Link>
            </SectionCard>

            <SectionCard>
              <SectionHeader 
                title={t("index.categories")}
                action={<Link href="/categories" className="text-xs font-medium text-primary flex items-center gap-0.5">{t("index.viewAll")} <ChevronRight className="w-3.5 h-3.5" /></Link>}
              />
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map(cat => (
                  <Link key={cat.id} href={`/categories/${cat.id}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">{cat.count}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </SectionCard>
          </div>
        )}
      </div>

      <SearchSheet open={searchOpen} onOpenChange={setSearchOpen} />
    </ResponsiveLayout>
  );
}
