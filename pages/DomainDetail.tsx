'use client'

import { useState, useEffect } from "react";
import { useParams, Link } from "@/lib/router-compat";
import { ArrowLeft, ExternalLink, Share2, Plus, Check, Globe, Loader2, Database, Shield, Server, Clock, RefreshCw } from "lucide-react";
import { ExternalLinkWarning } from "@/components/domain/ExternalLinkWarning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { ListItem } from "@/components/ui/list-item";
import { getDomainByName, allDomains } from "@/data/mockDomains";
import { useAppStore } from "@/store/appStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

// Components
import { DomainSecurityCard } from "@/components/domain/DomainSecurityCard";
import { DomainHealthCard } from "@/components/domain/DomainHealthCard";
import { DomainDNSCard } from "@/components/domain/DomainDNSCard";
import { DomainTimeline } from "@/components/domain/DomainTimeline";
import { DomainQuickStats, StatusIndicator } from "@/components/domain/DomainQuickStats";
import { DomainAIReview } from "@/components/domain/DomainAIReview";
import { DomainComparison } from "@/components/domain/DomainComparison";

type VibeLevel = "ai-native" | "high-attention" | "established" | "under-radar" | "dormant" | "brand-sensitive" | "aging-influential";
type Category = "tech" | "business" | "media" | "ecommerce" | "finance" | "social";

function DataCollectingState({ domain }: { domain: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useLanguage();
  
  const collectingSteps = [
    { icon: Database, label: t("domain.stepWhois"), status: "loading" as const },
    { icon: Server, label: t("domain.stepDNS"), status: "pending" as const },
    { icon: Shield, label: t("domain.stepSecurity"), status: "pending" as const },
    { icon: Clock, label: t("domain.stepHistory"), status: "pending" as const },
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < collectingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionCard className="text-center py-12">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      <h2 className="text-lg font-semibold mb-2">{t("domain.firstQuery")}</h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
        {t("domain.collectingInfo").replace("...", "")} <span className="font-mono text-foreground">{domain}</span>...
      </p>
      
      <div className="max-w-xs mx-auto space-y-3">
        {collectingSteps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          const isPending = i > currentStep;
          
          return (
            <div
              key={step.label}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                isActive && "bg-primary/10",
                isDone && "bg-muted/50",
                isPending && "opacity-40"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                isActive && "bg-primary text-primary-foreground",
                isDone && "bg-signal-active/20 text-signal-active",
                isPending && "bg-muted text-muted-foreground"
              )}>
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              <span className={cn(
                "text-sm font-medium",
                isActive && "text-foreground",
                isDone && "text-muted-foreground",
                isPending && "text-muted-foreground"
              )}>
                {step.label}
              </span>
              {isActive && (
                <span className="ml-auto text-xs text-primary">{t("domain.collectingLabel")}</span>
              )}
              {isDone && (
                <span className="ml-auto text-xs text-signal-active">{t("domain.done")}</span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        {t("domain.autoUpdate")}
      </p>
    </SectionCard>
  );
}

export default function DomainDetail() {
  const params = useParams();
  const domainName = params?.domain as string | undefined;
  const { isFollowing, followDomain, unfollowDomain, addRecentSearch } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  const vibeLabels: Record<VibeLevel, string> = {
    "ai-native": t("vibe.ai-native"), "high-attention": t("vibe.high-attention"), "established": t("vibe.established"),
    "under-radar": t("vibe.under-radar"), "dormant": t("vibe.dormant"), "brand-sensitive": t("vibe.brand-sensitive"),
    "aging-influential": t("vibe.aging-influential"),
  };
  const categoryLabels: Record<Category, string> = {
    tech: t("category.tech"), business: t("category.business"), media: t("category.media"),
    ecommerce: t("category.ecommerce"), finance: t("category.finance"), social: t("category.social"),
  };

  // Get domain from mock data - if not found, it's a new domain being collected
  const foundDomain = domainName ? getDomainByName(domainName) : null;
  const isNewDomain = !foundDomain;
  const domain = foundDomain || { 
    domain: domainName || "example.com",
    category: "tech" as Category,
    vibe: "under-radar" as VibeLevel,
    summary: "",
    popularity: "low" as const,
    age: "",
    lastActive: "",
  };

  // Add to recent searches
  useEffect(() => {
    if (domainName) addRecentSearch(domainName);
  }, [domainName, addRecentSearch]);

  const following = isFollowing(domain.domain);
  const relatedDomains = allDomains.filter(d => d.category === domain.category && d.domain !== domain.domain).slice(0, 4);

  const handleFollow = () => {
    following ? unfollowDomain(domain.domain) : followDomain(domain.domain);
  };

  return (
    <ResponsiveLayout>
      <div className={cn("mx-auto", isDesktop ? "max-w-6xl" : "max-w-2xl")}>
        {/* Mobile Header */}
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40 safe-area-pt">
            <div className="flex items-center justify-between px-4 py-3">
              <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
              <div className="flex items-center gap-1">
                <a href={`https://${domain.domain}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Desktop: Two-column layout */}
        {isDesktop ? (
          <div className="px-6 py-8 grid grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="col-span-2 space-y-6">
              {/* Hero Card */}
              <SectionCard className="relative overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-1">
                  <ExternalLinkWarning url={`https://${domain.domain}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </ExternalLinkWarning>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex items-start gap-5">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                    isNewDomain ? "bg-muted" : "bg-brand-gradient animate-glow"
                  )}>
                    {isNewDomain ? (
                      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                    ) : (
                      <Globe className="w-8 h-8 text-primary-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="font-mono text-2xl font-semibold tracking-tight truncate">{domain.domain}</h1>
                    {isNewDomain ? (
                      <p className="text-sm text-muted-foreground mt-2">{t("domain.collecting")}</p>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mt-2">
                          <StatusIndicator status="good" label={t("domain.sslOk")} size="sm" />
                          <StatusIndicator status="good" label={t("domain.running")} size="sm" />
                        </div>
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">{vibeLabels[domain.vibe]}</span>
                          <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">{categoryLabels[domain.category]}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={handleFollow}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2",
                      following ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {following ? <><Check className="w-4 h-4" />{t("domain.following")}</> : <><Plus className="w-4 h-4" />{t("domain.follow")}</>}
                  </button>
                  <ExternalLinkWarning
                    url={`https://${domain.domain}`}
                    className="px-6 py-3 rounded-xl text-sm font-medium bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit
                  </ExternalLinkWarning>
                </div>
              </SectionCard>

              {/* 資料蒐集中狀態 或 正常內容 */}
              {isNewDomain ? (
                <DataCollectingState domain={domain.domain} />
              ) : (
                <>
                  <DomainQuickStats domain={domain.domain} />
                  <DomainAIReview domain={domain.domain} description={domain.summary} />
                </>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* 只有有資料時才顯示 Tabs */}
              {!isNewDomain && (
                <SectionCard>
                  <Tabs defaultValue="dns" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 mb-4">
                      <TabsTrigger value="dns" className="text-xs">{t("domain.tabDNS")}</TabsTrigger>
                      <TabsTrigger value="health" className="text-xs">{t("domain.tabHealth")}</TabsTrigger>
                      <TabsTrigger value="security" className="text-xs">{t("domain.tabSecurity")}</TabsTrigger>
                      <TabsTrigger value="timeline" className="text-xs">{t("domain.tabTimeline")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="dns">
                      <DomainDNSCard domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                    <TabsContent value="health">
                      <DomainHealthCard domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                    <TabsContent value="security">
                      <DomainSecurityCard domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                    <TabsContent value="timeline">
                      <DomainTimeline domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                  </Tabs>
                </SectionCard>
              )}

              {/* Related Domains with Comparison - 只有有資料時才顯示 */}
              {!isNewDomain && relatedDomains.length > 0 && (
                <DomainComparison
                  currentDomain={domain.domain}
                  relatedDomains={relatedDomains.map(d => ({ domain: d.domain, vibe: d.vibe }))}
                  vibeLabels={vibeLabels}
                />
              )}
            </div>
          </div>
        ) : (
          /* Mobile: Single Column Layout */
          <div className="px-4 py-6 space-y-5">
            {/* Hero Card */}
            <SectionCard className="relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                  isNewDomain ? "bg-muted" : "bg-brand-gradient"
                )}>
                  {isNewDomain ? (
                    <Loader2 className="w-7 h-7 text-muted-foreground animate-spin" />
                  ) : (
                    <Globe className="w-7 h-7 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-mono text-xl font-semibold tracking-tight truncate">{domain.domain}</h1>
                  {isNewDomain ? (
                    <p className="text-sm text-muted-foreground mt-1">{t("domain.collecting")}</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusIndicator status="good" label={t("domain.normal")} size="sm" />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{vibeLabels[domain.vibe]}</span>
                        <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{categoryLabels[domain.category]}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleFollow}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2",
                    following ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {following ? <><Check className="w-4 h-4" />{t("domain.following")}</> : <><Plus className="w-4 h-4" />{t("domain.follow")}</>}
                </button>
                <ExternalLinkWarning
                  url={`https://${domain.domain}`}
                  className="px-4 py-3 rounded-xl text-sm font-medium bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                </ExternalLinkWarning>
              </div>
            </SectionCard>

            {/* 資料蒐集中狀態 或 正常內容 */}
            {isNewDomain ? (
              <DataCollectingState domain={domain.domain} />
            ) : (
              <>
                {/* AI 點評 */}
                <DomainAIReview domain={domain.domain} description={domain.summary} />

                {/* 技術資訊 Tabs */}
                <SectionCard>
                  <Tabs defaultValue="dns" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 mb-4">
                      <TabsTrigger value="dns" className="text-xs">{t("domain.tabDNS")}</TabsTrigger>
                      <TabsTrigger value="health" className="text-xs">{t("domain.tabHealth")}</TabsTrigger>
                      <TabsTrigger value="security" className="text-xs">{t("domain.tabSecurity")}</TabsTrigger>
                      <TabsTrigger value="timeline" className="text-xs">{t("domain.tabTimeline")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="dns">
                      <DomainDNSCard domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                    <TabsContent value="health">
                      <DomainHealthCard domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                    <TabsContent value="security">
                      <DomainSecurityCard domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                    <TabsContent value="timeline">
                      <DomainTimeline domain={domain.domain} className="border-0 p-0 bg-transparent" />
                    </TabsContent>
                  </Tabs>
                </SectionCard>

                {/* Related Domains with Comparison */}
                {relatedDomains.length > 0 && (
                  <DomainComparison
                    currentDomain={domain.domain}
                    relatedDomains={relatedDomains.map(d => ({ domain: d.domain, vibe: d.vibe }))}
                    vibeLabels={vibeLabels}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
