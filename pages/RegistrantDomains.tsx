'use client'

import { Link } from "@/lib/router-compat";
import { Building2, Globe, ExternalLink, ChevronRight, Users } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { ListItem } from "@/components/ui/list-item";
import { useParams } from "@/lib/router-compat";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// 模擬註冊者相關資料
const mockRegistrantData: Record<string, {
  name: string;
  country: string;
  type: "company" | "individual";
  registeredSince: string;
  totalDomains: number;
  domains: { domain: string; category: string; status: "active" | "parked" | "redirect" }[];
  relatedCompanies: { name: string; relationship: string; domains: number }[];
}> = {
  "OpenAI, Inc.": {
    name: "OpenAI, Inc.",
    country: "United States",
    type: "company",
    registeredSince: "2015",
    totalDomains: 28,
    domains: [
      { domain: "openai.com", category: "tech", status: "active" },
      { domain: "chatgpt.com", category: "tech", status: "active" },
      { domain: "gpt.com", category: "tech", status: "redirect" },
      { domain: "dalle.com", category: "tech", status: "redirect" },
      { domain: "openai.org", category: "tech", status: "redirect" },
      { domain: "openai.ai", category: "tech", status: "active" },
      { domain: "sora.com", category: "tech", status: "parked" },
      { domain: "openaiapi.com", category: "tech", status: "redirect" },
    ],
    relatedCompanies: [
      { name: "Microsoft Corporation", relationship: "投資者/合作夥伴", domains: 1250 },
      { name: "Y Combinator", relationship: "早期投資者", domains: 45 },
    ],
  },
  "default": {
    name: "Unknown Registrant",
    country: "Unknown",
    type: "individual",
    registeredSince: "N/A",
    totalDomains: 0,
    domains: [],
    relatedCompanies: [],
  }
};

export default function RegistrantDomains() {
  const params = useParams();
  const registrant = params?.registrant as string | undefined;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  const decodedRegistrant = registrant ? decodeURIComponent(registrant) : "";
  const data = mockRegistrantData[decodedRegistrant] || mockRegistrantData["default"];

  const statusColors = {
    active: "bg-signal-active/10 text-signal-active",
    parked: "bg-signal-stale/10 text-signal-stale",
    redirect: "bg-blue-500/10 text-blue-500",
  };

  const statusLabels = {
    active: "運作中",
    parked: "閒置中",
    redirect: "轉址",
  };

  return (
    <ResponsiveLayout showMobileHeader mobileHeaderTitle="註冊者資訊">
      <div className={cn("mx-auto px-4 py-6 lg:px-6 lg:py-8", isDesktop ? "max-w-5xl" : "max-w-2xl")}>
        
        {/* 註冊者資訊卡 */}
        <SectionCard className="mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold truncate">{data.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{data.country}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                  {data.type === "company" ? "企業" : "個人"}
                </span>
                <span className="text-xs text-muted-foreground">
                  自 {data.registeredSince} 年起註冊
                </span>
              </div>
            </div>
          </div>

          {/* 統計 */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border/40">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{data.totalDomains}</p>
              <p className="text-xs text-muted-foreground mt-0.5">擁有網域</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{data.domains.filter(d => d.status === "active").length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">運作中</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{data.relatedCompanies.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">關聯公司</p>
            </div>
          </div>
        </SectionCard>

        {isDesktop ? (
          <div className="grid grid-cols-3 gap-6">
            {/* 網域列表 - 佔 2 欄 */}
            <div className="col-span-2">
              <SectionCard>
                <SectionHeader title="擁有的網域" action={<span className="text-xs text-muted-foreground">{data.domains.length} 個</span>} />
                <div className="space-y-1">
                  {data.domains.map((d) => (
                    <Link
                      key={d.domain}
                      href={`/domain/${d.domain}`}
                      className="flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium font-mono group-hover:text-primary transition-colors">{d.domain}</p>
                        <p className="text-xs text-muted-foreground capitalize">{d.category}</p>
                      </div>
                      <span className={cn("text-2xs font-medium px-2 py-1 rounded-md", statusColors[d.status])}>
                        {statusLabels[d.status]}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* 關聯公司 - 佔 1 欄 */}
            <div className="space-y-6">
              <SectionCard>
                <SectionHeader title="關聯公司" />
                {data.relatedCompanies.length > 0 ? (
                  <div className="space-y-3">
                    {data.relatedCompanies.map((company, i) => (
                      <Link
                        key={i}
                        href={`/registrant/${encodeURIComponent(company.name)}`}
                        className="block p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{company.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{company.relationship}</p>
                        <div className="flex items-center gap-1.5 text-xs text-primary">
                          <Users className="w-3.5 h-3.5" />
                          <span>{company.domains} 個網域</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">無關聯公司資料</p>
                )}
              </SectionCard>

              {/* 發現提示 */}
              <SectionCard className="bg-gradient-to-br from-primary/5 to-accent/10">
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">發現關聯</h3>
                  <p className="text-sm text-muted-foreground">
                    透過註冊者資訊，發現網域間的隱藏關係
                  </p>
                </div>
              </SectionCard>
            </div>
          </div>
        ) : (
          /* Mobile Layout */
          <div className="space-y-6">
            {/* 網域列表 */}
            <SectionCard>
              <SectionHeader title="擁有的網域" action={<span className="text-xs text-muted-foreground">{data.domains.length} 個</span>} />
              <div className="space-y-1">
                {data.domains.slice(0, 5).map((d) => (
                  <ListItem
                    key={d.domain}
                    icon={Globe}
                    iconBg="bg-muted"
                    iconColor="text-muted-foreground"
                    title={d.domain}
                    subtitle={statusLabels[d.status]}
                    href={`/domain/${d.domain}`}
                  />
                ))}
              </div>
              {data.domains.length > 5 && (
                <button className="w-full mt-3 py-2.5 text-sm font-medium text-primary text-center">
                  查看全部 {data.domains.length} 個網域
                </button>
              )}
            </SectionCard>

            {/* 關聯公司 */}
            {data.relatedCompanies.length > 0 && (
              <SectionCard>
                <SectionHeader title="關聯公司" />
                <div className="space-y-2">
                  {data.relatedCompanies.map((company, i) => (
                    <Link
                      key={i}
                      href={`/registrant/${encodeURIComponent(company.name)}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{company.name}</p>
                        <p className="text-xs text-muted-foreground">{company.relationship}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
