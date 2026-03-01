import { Clock, Server, Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DNSData } from "@/types/domain";

function calcDomainAge(createDate?: string): string {
  if (!createDate) return '—';
  const created = new Date(createDate);
  if (isNaN(created.getTime())) return '—';
  const years = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));
  return years > 0 ? `${years} 年` : '< 1 年';
}

export function DomainQuickStats({ domain, data, className }: { domain: string; data?: DNSData | null; className?: string }) {
  if (data === undefined) {
    return (
      <div className={cn("grid grid-cols-3 gap-2 text-center", className)}>
        {[0, 1, 2].map(i => (
          <div key={i} className="p-3 rounded-xl bg-muted/50 flex flex-col items-center gap-1">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
            <div className="h-3 w-8 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const registrar = data?.registrar ?? '—';
  const country = data?.registrant_country ?? '—';
  const domainAge = calcDomainAge(data?.create_date);

  return (
    <div className={cn("grid grid-cols-3 gap-2 text-center", className)}>
      <div className="p-3 rounded-xl bg-muted/50">
        <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-semibold">{domainAge}</p>
        <p className="text-2xs text-muted-foreground">網齡</p>
      </div>

      <div className="p-3 rounded-xl bg-muted/50">
        <Server className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-semibold truncate">{country}</p>
        <p className="text-2xs text-muted-foreground">國家</p>
      </div>

      <div className="p-3 rounded-xl bg-muted/50">
        <Building2 className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
        <p className="text-sm font-semibold truncate">{registrar}</p>
        <p className="text-2xs text-muted-foreground">註冊商</p>
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
