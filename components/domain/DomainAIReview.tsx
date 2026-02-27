import { useState } from "react";
import { Bot, FileText, RefreshCw } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { TabSwitch } from "@/components/ui/tab-switch";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/useLanguage";

interface AIReviewData {
  summary: string;
  category: string;
  purpose: string;
  lastUpdated: string;
}

const getMockAIReview = (domain: string, locale: string): AIReviewData => {
  const reviews: Record<string, Record<string, AIReviewData>> = {
    "stripe.com": {
      "zh-TW": { summary: "線上支付處理平台，提供企業收款、訂閱管理、發票等金流服務。", category: "金融科技", purpose: "幫助企業接受網路付款", lastUpdated: "2 小時前" },
      en: { summary: "Online payment processing platform offering business billing, subscription management, and invoicing services.", category: "FinTech", purpose: "Help businesses accept online payments", lastUpdated: "2 hours ago" },
    },
    "notion.so": {
      "zh-TW": { summary: "多功能筆記與協作工具，結合文件、資料庫、看板等功能於一體。", category: "生產力工具", purpose: "團隊知識管理與協作", lastUpdated: "3 小時前" },
      en: { summary: "All-in-one workspace combining notes, databases, kanban boards, and more.", category: "Productivity", purpose: "Team knowledge management & collaboration", lastUpdated: "3 hours ago" },
    },
  };

  const domainReviews = reviews[domain];
  if (domainReviews) return domainReviews[locale] || domainReviews["en"];

  return locale === "zh-TW"
    ? { summary: "一個功能完整的網站，提供特定領域的服務或資訊內容。", category: "一般網站", purpose: "提供資訊或服務", lastUpdated: "1 小時前" }
    : { summary: "A fully functional website providing services or information in a specific domain.", category: "General", purpose: "Information or services", lastUpdated: "1 hour ago" };
};

export function DomainAIReview({ domain, description, className }: { domain: string; description?: string; className?: string }) {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"ai" | "description">("ai");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const review = getMockAIReview(domain, locale);

  const handleRefresh = () => { setIsRefreshing(true); setTimeout(() => setIsRefreshing(false), 1500); };
  const tabs = [t("ai.review"), t("ai.description")];

  return (
    <SectionCard className={className}>
      <div className="flex items-center justify-between mb-4">
        <TabSwitch tabs={tabs} activeTab={activeTab === "ai" ? t("ai.review") : t("ai.description")} onTabChange={(tab) => setActiveTab(tab === t("ai.review") ? "ai" : "description")} />
        {activeTab === "ai" && (
          <button onClick={handleRefresh} disabled={isRefreshing} className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50">
            <RefreshCw className={cn("w-4 h-4 text-muted-foreground", isRefreshing && "animate-spin")} />
          </button>
        )}
      </div>
      {activeTab === "ai" ? (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Bot className="w-5 h-5 text-primary" /></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed text-foreground">{review.summary}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded bg-muted">{review.category}</span>
              <span>{t("ai.updatedAt")} {review.lastUpdated}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-muted-foreground" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">{description || t("ai.noDescription")}</p>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
