import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, Shield, Server, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw, Calendar } from "lucide-react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "update" | "security" | "dns" | "milestone" | "alert" | "registration";
  details?: string;
}

// 模擬事件資料
const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2024-12-20",
    title: "SSL 憑證更新",
    description: "SSL 憑證已成功續期，有效期至 2026 年",
    type: "security",
    details: "憑證頒發機構：Let's Encrypt\n新到期日：2026-12-20\n加密強度：RSA 2048-bit\n驗證方式：DV (Domain Validation)",
  },
  {
    id: "2",
    date: "2024-11-15",
    title: "流量大幅增長",
    description: "網站流量較上月增長 150%，創歷史新高",
    type: "milestone",
    details: "月訪問量：1,250,000\n獨立訪客：890,000\n平均停留時間：4:32\n跳出率下降至 32%",
  },
  {
    id: "3",
    date: "2024-10-08",
    title: "DNS 記錄變更",
    description: "A 記錄已更新，指向新的伺服器 IP",
    type: "dns",
    details: "舊 IP：104.18.7.190\n新 IP：104.18.7.192\nTTL：300 秒\n變更原因：伺服器遷移",
  },
  {
    id: "4",
    date: "2024-09-01",
    title: "安全警告已解除",
    description: "先前偵測到的潛在威脅已確認為誤報",
    type: "alert",
    details: "警告類型：可疑重定向\n檢測來源：Google Safe Browsing\n狀態：已解除\n處理時間：2 小時",
  },
  {
    id: "5",
    date: "2024-06-15",
    title: "網站重大更新",
    description: "推出全新設計和功能，提升用戶體驗",
    type: "update",
    details: "更新內容：\n• 全新響應式設計\n• 改進的搜尋功能\n• 新增 API 文檔\n• 效能優化 40%",
  },
  {
    id: "6",
    date: "2015-04-06",
    title: "網域註冊",
    description: "網域首次註冊於 MarkMonitor Inc.",
    type: "registration",
    details: "註冊商：MarkMonitor Inc.\n註冊者：OpenAI, Inc.\n註冊國家：美國\n初始期限：10 年",
  },
];

const eventConfig = {
  update: { icon: RefreshCw, color: "text-blue-500", bg: "bg-blue-500", label: "更新" },
  security: { icon: Shield, color: "text-green-500", bg: "bg-green-500", label: "安全" },
  dns: { icon: Server, color: "text-purple-500", bg: "bg-purple-500", label: "DNS" },
  milestone: { icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500", label: "里程碑" },
  alert: { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500", label: "警告" },
  registration: { icon: Globe, color: "text-primary", bg: "bg-primary", label: "註冊" },
};

export function DomainTimeline({ domain, className }: { domain: string; className?: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const events = mockEvents;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SectionCard className={className}>
      <SectionHeader 
        title="事件時間軸" 
        action={<span className="text-xs text-muted-foreground">{events.length} 個事件</span>}
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-border" />

        <div className="space-y-1">
          {events.map((event, index) => {
            const config = eventConfig[event.type];
            const Icon = config.icon;
            const isExpanded = expandedId === event.id;
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="relative">
                {/* Timeline dot */}
                <div className={cn(
                  "absolute left-2.5 w-3 h-3 rounded-full border-2 border-background z-10",
                  config.bg
                )} style={{ top: "18px" }} />

                {/* Event card */}
                <button
                  onClick={() => toggleExpand(event.id)}
                  className={cn(
                    "w-full text-left ml-10 p-3 rounded-xl transition-colors",
                    isExpanded ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={cn("w-4 h-4 shrink-0", config.color)} />
                        <span className="text-sm font-medium truncate">{event.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-2xs text-muted-foreground">{event.date}</span>
                        <span className={cn(
                          "text-2xs px-1.5 py-0.5 rounded font-medium",
                          `${config.bg}/10 ${config.color}`
                        )}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 mt-1">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-200",
                    isExpanded ? "max-h-[300px] mt-3" : "max-h-0"
                  )}>
                    <div className="p-3 rounded-lg bg-background border border-border/50">
                      <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                        {event.details}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {events.length === 0 && (
        <div className="py-8 text-center">
          <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">尚無事件記錄</p>
        </div>
      )}
    </SectionCard>
  );
}
