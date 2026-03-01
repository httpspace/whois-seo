import { useState } from "react";
import { Bot, FileText, Loader2 } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { TabSwitch } from "@/components/ui/tab-switch";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/useLanguage";
import type { AISummaryData } from "@/types/domain";

export function DomainAIReview({ domain, data, description, className }: {
  domain: string;
  data?: AISummaryData | null;
  description?: string;
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ai" | "description">("ai");
  const tabs = [t("ai.review"), t("ai.description")];

  const summary = data
    ? (locale === 'zh-TW' ? data.summary_zh : data.summary_en)
    : null;

  return (
    <SectionCard className={className}>
      <div className="flex items-center justify-between mb-4">
        <TabSwitch
          tabs={tabs}
          activeTab={activeTab === "ai" ? t("ai.review") : t("ai.description")}
          onTabChange={(tab) => setActiveTab(tab === t("ai.review") ? "ai" : "description")}
        />
      </div>
      {activeTab === "ai" ? (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            {data === undefined ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Bot className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {data === undefined && (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            )}
            {data === null && (
              <p className="text-sm text-muted-foreground">{t("ai.noDescription")}</p>
            )}
            {summary && (
              <p className="text-sm leading-relaxed text-foreground">{summary}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">{description || t("ai.noDescription")}</p>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
