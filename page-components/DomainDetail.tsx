'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/lib/router-compat";
import { fetchDNS, fetchWhois, fetchAISummary } from "@/lib/api";
import { ArrowLeft, ExternalLink, Share2, Plus, Check, Globe, Loader2, Database, Shield, Server, Clock, RefreshCw } from "lucide-react";
import { ExternalLinkWarning } from "@/components/domain/ExternalLinkWarning";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";
import type { WhoisData, DNSData, AISummaryData, FetchState } from "@/types/domain";

// Components
import { DomainDNSCard } from "@/components/domain/DomainDNSCard";
import { DomainQuickStats, StatusIndicator } from "@/components/domain/DomainQuickStats";
import { DomainAIReview } from "@/components/domain/DomainAIReview";
import { DomainErrorState } from "@/components/domain/DomainErrorState";


function DataCollectingState({ domain, dnsData, aiData }: {
  domain: string;
  dnsData: DNSData | null | undefined;
  aiData: AISummaryData | null | undefined;
}) {
  const [timerStep, setTimerStep] = useState(0);
  const { t } = useLanguage();

  const step0Done = dnsData !== undefined;
  const step1Done = aiData !== undefined;
  const step2Done = timerStep >= 2;
  const step3Done = timerStep >= 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const collectingSteps = [
    { icon: Database, label: t("domain.stepWhois"), done: step0Done },
    { icon: Server, label: t("domain.stepDNS"), done: step1Done },
    { icon: Shield, label: t("domain.stepSecurity"), done: step2Done },
    { icon: Clock, label: t("domain.stepHistory"), done: step3Done },
  ];

  const currentStep = collectingSteps.findIndex(s => !s.done);

  return (
    <SectionCard className="text-center py-12">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      <h2 className="text-lg font-semibold mb-2">{t("domain.firstQuery")}</h2>
      <p className="text-sm text-muted-foreground mb-2 max-w-sm mx-auto">
        {t("domain.collectingInfo").replace("...", "")} <span className="font-mono text-foreground">{domain}</span>...
      </p>
      <p className="text-xs text-muted-foreground mb-8">{t("domain.takesSeconds")}</p>

      <div className="max-w-xs mx-auto space-y-3">
        {collectingSteps.map((step, i) => {
          const isDone = step.done;
          const isActive = !isDone && i === currentStep;
          const isPending = !isDone && !isActive;

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

type InitialDomainData = {
  whois: WhoisData | null
  dns: DNSData | null
  ai: AISummaryData | null
}

function buildInitialFetchState(initialData?: InitialDomainData): FetchState {
  if (!initialData) return { status: 'fetching' };
  const { whois, dns, ai } = initialData;
  if (!whois && !dns) return { status: 'fetching' };
  const merged: DNSData = {
    ...(dns ?? {}),
    registrar: whois?.domain_registrar?.registrar_name,
    registrar_url: whois?.domain_registrar?.website_url,
    registrant_org: whois?.registrant_contact?.company,
    registrant_country: whois?.registrant_contact?.country_name,
    create_date: whois?.create_date,
    expiry_date: whois?.expiry_date,
    update_date: whois?.update_date,
    domain_status: whois?.domain_status,
    name_servers: whois?.name_servers,
  };
  return { status: 'success', whoisData: whois ?? {}, dnsData: merged, aiData: ai ?? null };
}

export default function DomainDetail({ domain: domainProp, initialData }: { domain: string; initialData?: InitialDomainData }) {
  const [fetchState, setFetchState] = useState<FetchState>(() => buildInitialFetchState(initialData));
  const [retryTrigger, setRetryTrigger] = useState(0);
  // Intermediate DNS/AI for DataCollectingState progress (undefined = not returned yet)
  const [inProgressDns, setInProgressDns] = useState<DNSData | null | undefined>(undefined);
  const [inProgressAi, setInProgressAi] = useState<AISummaryData | null | undefined>(undefined);

  const { isFollowing, followDomain, unfollowDomain, addRecentSearch } = useAppStore();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  // Skip client-side fetch if SSR already provided valid data (D1 cache hit).
  // Only skip once on initial mount; subsequent domain changes or retries always fetch.
  const skipFetchRef = useRef(
    !!(initialData && (initialData.whois || initialData.dns))
  );

  useEffect(() => {
    // If SSR gave us valid data on initial load, use it directly — no loading state needed.
    if (skipFetchRef.current && retryTrigger === 0) {
      skipFetchRef.current = false;
      addRecentSearch(domainProp);
      return;
    }
    skipFetchRef.current = false;

    // Reset — prevents ghost data from previous domain (Scenario E)
    setFetchState({ status: 'fetching' });
    setInProgressDns(undefined);
    setInProgressAi(undefined);

    const dnsPromise = fetchDNS(domainProp).then(r => { setInProgressDns(r.ok ? r.data : null); return r; });
    const whoisPromise = fetchWhois(domainProp);
    const aiPromise = fetchAISummary(domainProp).then(r => { setInProgressAi(r.ok ? r.data : null); return r; });

    Promise.all([dnsPromise, whoisPromise, aiPromise]).then(([dnsResult, whoisResult, aiResult]) => {
      // Both WHOIS and DNS failed
      if (!dnsResult.ok && !whoisResult.ok) {
        if (whoisResult.reason === 'invalid') {
          setFetchState({ status: 'invalid', domain: domainProp });
        } else {
          setFetchState({ status: 'fetch-failed', domain: domainProp, retryCount: retryTrigger });
        }
        return;
      }

      const whoisData = whoisResult.ok ? whoisResult.data : null;
      const dnsData = dnsResult.ok ? dnsResult.data : null;

      // Check if domain appears unregistered
      const hasWhoisSignal = !!(whoisData?.create_date || whoisData?.domain_registrar?.registrar_name);
      const hasDnsSignal = !!(dnsData?.dnsRecords?.length || dnsData?.nameservers?.length || dnsData?.dns_records?.length);
      if (!hasWhoisSignal && !hasDnsSignal) {
        setFetchState({ status: 'not-registered', domain: domainProp });
        return;
      }

      // Merge whois fields into dnsData shape
      const merged: DNSData = {
        ...(dnsData ?? {}),
        registrar: whoisData?.domain_registrar?.registrar_name,
        registrar_url: whoisData?.domain_registrar?.website_url,
        registrant_org: whoisData?.registrant_contact?.company,
        registrant_country: whoisData?.registrant_contact?.country_name,
        create_date: whoisData?.create_date,
        expiry_date: whoisData?.expiry_date,
        update_date: whoisData?.update_date,
        domain_status: whoisData?.domain_status,
        name_servers: whoisData?.name_servers,
      };

      setFetchState({
        status: 'success',
        whoisData: whoisData ?? {},
        dnsData: merged,
        aiData: aiResult.ok ? aiResult.data : null,
      });
      addRecentSearch(domainProp);
    });
  }, [domainProp, retryTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const domain = { domain: domainProp };

  const following = isFollowing(domain.domain);

  const handleFollow = () => {
    if (!isLoggedIn) { router.push('/login'); return; }
    following ? unfollowDomain(domain.domain) : followDomain(domain.domain);
  };

  const isFetching = fetchState.status === 'fetching';
  const isSuccess = fetchState.status === 'success';

  // Real-time SSL check: fetch with no-cors; TLS failure throws TypeError
  const [sslStatus, setSslStatus] = useState<'checking' | 'ok' | 'fail' | null>(null);
  useEffect(() => {
    if (!isSuccess) { setSslStatus(null); return; }
    setSslStatus('checking');
    fetch(`https://${domainProp}`, { mode: 'no-cors', signal: AbortSignal.timeout(8000) })
      .then(() => setSslStatus('ok'))
      .catch(() => setSslStatus('fail'));
  }, [isSuccess, domainProp]);

  // Data for rendering — only valid in success state
  const dnsData = isSuccess ? fetchState.dnsData : null;
  const aiData = isSuccess ? fetchState.aiData : null;

  const heroIcon = isFetching ? (
    <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
  ) : (
    <Globe className="w-8 h-8 text-primary-foreground" />
  );

  const mainContent = (() => {
    switch (fetchState.status) {
      case 'fetching':
        return <DataCollectingState domain={domain.domain} dnsData={inProgressDns} aiData={inProgressAi} />;
      case 'success':
        return null; // rendered inline below
      case 'not-registered':
        return <DomainErrorState variant="not-registered" domain={fetchState.domain} />;
      case 'fetch-failed':
        return <DomainErrorState variant="fetch-failed" domain={fetchState.domain} onRetry={() => setRetryTrigger(n => n + 1)} />;
      case 'invalid':
        return <DomainErrorState variant="invalid" domain={fetchState.domain} />;
    }
  })();

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
                    isFetching ? "bg-muted" : "bg-brand-gradient animate-glow"
                  )}>
                    {heroIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="font-mono text-2xl font-semibold tracking-tight truncate">{domain.domain}</h1>
                    {isFetching ? (
                      <p className="text-sm text-muted-foreground mt-2">{t("domain.collecting")}</p>
                    ) : isSuccess ? (
                      <div className="flex items-center gap-3 mt-2">
                        {sslStatus === 'checking' && <StatusIndicator status="checking" label="SSL 檢測中" size="sm" />}
                        {sslStatus === 'ok'       && <StatusIndicator status="good"     label={t("domain.sslOk")} size="sm" />}
                        {sslStatus === 'fail'     && <StatusIndicator status="danger"   label="SSL 異常" size="sm" />}
                      </div>
                    ) : null}
                  </div>
                </div>

                {isSuccess && dnsData?.update_date && (
                  <p className="text-[11px] text-muted-foreground/50 mt-4 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    {t("domain.lastUpdated")}: {dnsData.update_date}
                  </p>
                )}

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

              {mainContent ?? (
                <>
                  <DomainQuickStats domain={domain.domain} data={dnsData} />
                  <DomainAIReview domain={domain.domain} data={aiData} description={undefined} />
                  <DomainDNSCard domain={domain.domain} data={dnsData} defaultExpanded />
                </>
              )}
            </div>

            {/* Right Column — reserved for future features */}
            <div className="space-y-6">
              {/* DomainComparison hidden — not yet released */}
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
                  isFetching ? "bg-muted" : "bg-brand-gradient"
                )}>
                  {isFetching ? (
                    <Loader2 className="w-7 h-7 text-muted-foreground animate-spin" />
                  ) : (
                    <Globe className="w-7 h-7 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-mono text-xl font-semibold tracking-tight truncate">{domain.domain}</h1>
                  {isFetching ? (
                    <p className="text-sm text-muted-foreground mt-1">{t("domain.collecting")}</p>
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2 mt-1">
                      {sslStatus === 'checking' && <StatusIndicator status="checking" label="SSL 檢測中" size="sm" />}
                      {sslStatus === 'ok'       && <StatusIndicator status="good"     label={t("domain.sslOk")} size="sm" />}
                      {sslStatus === 'fail'     && <StatusIndicator status="danger"   label="SSL 異常" size="sm" />}
                    </div>
                  ) : null}
                </div>
              </div>

              {isSuccess && dnsData?.update_date && (
                <p className="text-[11px] text-muted-foreground/50 mt-3 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  {t("domain.lastUpdated")}: {dnsData.update_date}
                </p>
              )}

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

            {mainContent ?? (
              <>
                <DomainAIReview domain={domain.domain} data={aiData} description={undefined} />
                <DomainDNSCard domain={domain.domain} data={dnsData} defaultExpanded />

              </>
            )}
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
