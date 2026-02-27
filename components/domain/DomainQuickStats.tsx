import { Globe, Clock, Shield, Activity, Users, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface BasicMetrics {
  domainAge: string;
  registrar: string;
  serverLocation: string;
  sslValid: boolean;
  isActive: boolean;
  popularity: "high" | "medium" | "low";
}

// 模擬基本資訊
const getBasicMetrics = (domain: string): BasicMetrics => ({
  domainAge: "8 年",
  registrar: "Cloudflare",
  serverLocation: "美國",
  sslValid: true,
  isActive: true,
  popularity: "high",
});

export function DomainQuickStats({ domain, className }: { domain: string; className?: string }) {
  const metrics = getBasicMetrics(domain);
  
  const popularityLabels = {
    high: "高關注",
    medium: "中等",
    low: "低",
  };

  return (
    <div className={cn("grid grid-cols-3 gap-2 text-center", className)}>
      <div className="p-3 rounded-xl bg-muted/50">
        <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-semibold">{metrics.domainAge}</p>
        <p className="text-2xs text-muted-foreground">網齡</p>
      </div>

      <div className="p-3 rounded-xl bg-muted/50">
        <Server className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-semibold">{metrics.serverLocation}</p>
        <p className="text-2xs text-muted-foreground">伺服器</p>
      </div>

      <div className="p-3 rounded-xl bg-muted/50">
        <Activity className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-semibold">{popularityLabels[metrics.popularity]}</p>
        <p className="text-2xs text-muted-foreground">熱度</p>
      </div>
    </div>
  );
}

// 狀態指示燈
export function StatusIndicator({ 
  status, 
  label,
  size = "md" 
}: { 
  status: "good" | "warning" | "danger";
  label: string;
  size?: "sm" | "md";
}) {
  const colors = {
    good: "bg-signal-active",
    warning: "bg-signal-stale",
    danger: "bg-destructive",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "rounded-full animate-pulse",
        colors[status],
        size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5"
      )} />
      <span className={cn(
        "font-medium",
        size === "sm" ? "text-xs" : "text-sm"
      )}>{label}</span>
    </div>
  );
}
