import { useState } from "react";
import { Bot, FileText, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { TabSwitch } from "@/components/ui/tab-switch";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/useLanguage";
import { useAuthStore } from "@/store/authStore";
import { generateAdminAISummary } from "@/lib/api";
import type { AISummaryData } from "@/types/domain";

export function DomainAIReview({ domain, data: initialData, description, className }: {
  domain: string;
  data?: AISummaryData | null;
  description?: string;
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const { user } = useAuthStore();
  const isAdmin = user?.isAdmin === true;

  const [activeTab, setActiveTab] = useState<"ai" | "description">("ai");
  const [data, setData] = useState(initialData);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [t("ai.review"), t("ai.description")];

  const summary = data
    ? (locale === 'zh-TW' ? data.summary_zh : data.summary_en)
    : null;

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    const result = await generateAdminAISummary(domain);
    if (result) {
      setData(result);
    } else {
      setError("生成失敗，請稍後再試");
    }
    setGenerating(false);
  };

  return (
    <SectionCard className={className}>
      <div className="flex items-center justify-between mb-4">
        <TabSwitch
          tabs={tabs}
          activeTab={activeTab === "ai" ? t("ai.review") : t("ai.description")}
          onTabChange={(tab) => setActiveTab(tab === t("ai.review") ? "ai" : "description")}
        />
        {/* Admin: generate / refresh button */}
        {isAdmin && activeTab === "ai" && (
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50",
              data
                ? "text-muted-foreground hover:bg-muted"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {generating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : data ? (
              <RefreshCw className="w-3.5 h-3.5" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {generating ? "生成中…" : data ? "重新生成" : "生成 AI 講評"}
          </button>
        )}
      </div>

      {activeTab === "ai" ? (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            {(data === undefined || generating) ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Bot className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {data === undefined && !generating && (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            )}
            {generating && (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            )}
            {!generating && data === null && !error && (
              <p className="text-sm text-muted-foreground">{t("ai.noDescription")}</p>
            )}
            {!generating && error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            {!generating && summary && (
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
