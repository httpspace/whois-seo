import { useState } from "react";
import { Activity, Zap, Server, Wifi, Code, Database, Cloud, Layers } from "lucide-react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { TabSwitch } from "@/components/ui/tab-switch";
import { HealthBar } from "@/components/brand/BrandDecorations";
import { cn } from "@/lib/utils";

interface HealthMetrics {
  overall: number;
  uptime: number;
  speed: number;
  seo: number;
  security: number;
  lastCheck: string;
  responseTime: string;
  serverLocation: string;
}

interface TechStack {
  frameworks: { name: string; icon: string; confidence: number }[];
  cms: string | null;
  server: string;
  cdn: string;
  analytics: string[];
  hosting: string;
  ssl: string;
  httpVersion: string;
}

// 模擬健康資料
const mockHealth: HealthMetrics = {
  overall: 92,
  uptime: 99.9,
  speed: 85,
  seo: 88,
  security: 95,
  lastCheck: "5 分鐘前",
  responseTime: "120ms",
  serverLocation: "美國",
};

// 模擬技術堆疊
const mockTechStack: TechStack = {
  frameworks: [
    { name: "React", icon: "⚛️", confidence: 95 },
    { name: "Next.js", icon: "▲", confidence: 90 },
    { name: "TypeScript", icon: "📘", confidence: 88 },
    { name: "Tailwind CSS", icon: "🎨", confidence: 92 },
  ],
  cms: null,
  server: "Cloudflare",
  cdn: "Cloudflare CDN",
  analytics: ["Google Analytics", "Segment", "Mixpanel"],
  hosting: "Vercel",
  ssl: "Let's Encrypt",
  httpVersion: "HTTP/3",
};

export function DomainHealthCard({ domain, className }: { domain: string; className?: string }) {
  const [activeTab, setActiveTab] = useState<"health" | "tech">("health");
  const health = mockHealth;
  const tech = mockTechStack;

  const getStatusColor = (value: number) => {
    if (value >= 90) return "text-signal-active";
    if (value >= 70) return "text-signal-stale";
    return "text-destructive";
  };

  const tabs = ["健康度", "技術堆疊"];

  return (
    <SectionCard className={className}>
      <div className="flex items-center justify-between mb-4">
        <TabSwitch 
          tabs={tabs} 
          activeTab={activeTab === "health" ? "健康度" : "技術堆疊"} 
          onTabChange={(t) => setActiveTab(t === "健康度" ? "health" : "tech")} 
        />
      </div>

      {activeTab === "health" ? (
        <>
          {/* 總體評分 */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 mb-5">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${health.overall} ${100 - health.overall}`}
                  className={getStatusColor(health.overall)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn("text-lg font-bold", getStatusColor(health.overall))}>
                  {health.overall}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium">整體健康度</p>
              <p className="text-sm text-muted-foreground">
                {health.overall >= 90 ? "優秀" : health.overall >= 70 ? "良好" : "需要改善"}
              </p>
            </div>
            <Activity className={cn("w-6 h-6", getStatusColor(health.overall))} />
          </div>

          {/* 詳細指標 */}
          <div className="space-y-4">
            <HealthBar value={health.uptime} label="運行時間 (Uptime)" />
            <HealthBar value={health.speed} label="速度評分" />
            <HealthBar value={health.seo} label="SEO 評分" />
            <HealthBar value={health.security} label="安全評分" />
          </div>

          {/* 快速資訊 */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border/40">
            <div className="text-center">
              <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium">{health.responseTime}</p>
              <p className="text-2xs text-muted-foreground">回應時間</p>
            </div>
            <div className="text-center">
              <Server className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium">{health.serverLocation}</p>
              <p className="text-2xs text-muted-foreground">伺服器位置</p>
            </div>
            <div className="text-center">
              <Wifi className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium">{health.uptime}%</p>
              <p className="text-2xs text-muted-foreground">可用率</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 技術框架 */}
          <div className="mb-5">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-3 flex items-center gap-2">
              <Code className="w-3.5 h-3.5" />
              偵測到的技術
            </p>
            <div className="space-y-2">
              {tech.frameworks.map((fw, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-lg">{fw.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{fw.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${fw.confidence}%` }}
                        />
                      </div>
                      <span className="text-2xs text-muted-foreground">{fw.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 基礎設施 */}
          <div className="space-y-3 py-4 border-t border-border/40">
            <p className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              基礎設施
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <Cloud className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xs text-muted-foreground">Hosting</span>
                </div>
                <p className="text-sm font-medium">{tech.hosting}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <Server className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xs text-muted-foreground">Server</span>
                </div>
                <p className="text-sm font-medium">{tech.server}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xs text-muted-foreground">CDN</span>
                </div>
                <p className="text-sm font-medium">{tech.cdn}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 mb-1">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xs text-muted-foreground">Protocol</span>
                </div>
                <p className="text-sm font-medium">{tech.httpVersion}</p>
              </div>
            </div>
          </div>

          {/* 分析工具 */}
          <div className="py-4 border-t border-border/40">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              分析工具
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tech.analytics.map((tool, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* SSL */}
          <div className="py-3 border-t border-border/40">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">SSL 憑證</span>
              <span className="text-sm font-medium">{tech.ssl}</span>
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
}
