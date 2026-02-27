import { Shield, Lock, AlertTriangle, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";

interface SecurityData {
  sslValid: boolean;
  sslExpiry?: string;
  isScam: boolean;
  scamScore: number;
  malwareDetected: boolean;
  phishingRisk: "low" | "medium" | "high";
  domainAge: string;
}

// 模擬資料
const mockSecurityData: SecurityData = {
  sslValid: true,
  sslExpiry: "2025-06-15",
  isScam: false,
  scamScore: 12,
  malwareDetected: false,
  phishingRisk: "low",
  domainAge: "5 years",
};

export function DomainSecurityCard({ domain, className }: { domain: string; className?: string }) {
  const security = mockSecurityData;
  
  const overallStatus = security.isScam || security.malwareDetected 
    ? "danger" 
    : security.phishingRisk === "high" || !security.sslValid
    ? "warning"
    : "safe";

  const statusConfig = {
    safe: { color: "text-signal-active", bg: "bg-signal-active/10", icon: CheckCircle2, label: "安全" },
    warning: { color: "text-signal-stale", bg: "bg-signal-stale/10", icon: AlertTriangle, label: "注意" },
    danger: { color: "text-destructive", bg: "bg-destructive/10", icon: XCircle, label: "危險" },
  }[overallStatus];

  return (
    <SectionCard className={className}>
      <SectionHeader 
        title="安全性分析" 
        action={
          <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium", statusConfig.bg, statusConfig.color)}>
            <statusConfig.icon className="w-3.5 h-3.5" />
            {statusConfig.label}
          </div>
        }
      />
      
      <div className="space-y-4">
        {/* SSL 憑證 */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", security.sslValid ? "bg-signal-active/10" : "bg-destructive/10")}>
              <Lock className={cn("w-4 h-4", security.sslValid ? "text-signal-active" : "text-destructive")} />
            </div>
            <div>
              <p className="text-sm font-medium">SSL 憑證</p>
              <p className="text-xs text-muted-foreground">
                {security.sslValid ? `有效至 ${security.sslExpiry}` : "憑證無效或已過期"}
              </p>
            </div>
          </div>
          {security.sslValid ? (
            <CheckCircle2 className="w-5 h-5 text-signal-active" />
          ) : (
            <XCircle className="w-5 h-5 text-destructive" />
          )}
        </div>

        {/* 詐騙偵測 */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", security.isScam ? "bg-destructive/10" : "bg-signal-active/10")}>
              <Shield className={cn("w-4 h-4", security.isScam ? "text-destructive" : "text-signal-active")} />
            </div>
            <div>
              <p className="text-sm font-medium">詐騙風險</p>
              <p className="text-xs text-muted-foreground">
                風險評分：{security.scamScore}/100
              </p>
            </div>
          </div>
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            security.scamScore < 30 ? "bg-signal-active/10 text-signal-active" :
            security.scamScore < 60 ? "bg-signal-stale/10 text-signal-stale" :
            "bg-destructive/10 text-destructive"
          )}>
            {security.scamScore < 30 ? "低" : security.scamScore < 60 ? "中" : "高"}
          </span>
        </div>

        {/* 惡意軟體 */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", security.malwareDetected ? "bg-destructive/10" : "bg-signal-active/10")}>
              <AlertTriangle className={cn("w-4 h-4", security.malwareDetected ? "text-destructive" : "text-signal-active")} />
            </div>
            <div>
              <p className="text-sm font-medium">惡意軟體</p>
              <p className="text-xs text-muted-foreground">
                {security.malwareDetected ? "偵測到威脅" : "未偵測到威脅"}
              </p>
            </div>
          </div>
          {security.malwareDetected ? (
            <XCircle className="w-5 h-5 text-destructive" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-signal-active" />
          )}
        </div>

        {/* 釣魚風險 */}
        <div className="flex items-center justify-between py-2 border-t border-border/40 pt-4">
          <span className="text-sm text-muted-foreground">釣魚風險等級</span>
          <span className={cn(
            "text-sm font-medium",
            security.phishingRisk === "low" ? "text-signal-active" :
            security.phishingRisk === "medium" ? "text-signal-stale" :
            "text-destructive"
          )}>
            {security.phishingRisk === "low" ? "低風險" : security.phishingRisk === "medium" ? "中度風險" : "高風險"}
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
