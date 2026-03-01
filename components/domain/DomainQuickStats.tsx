import { Clock, Server, Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DNSData } from "@/types/domain";

function calcDomainAge(createDate?: string): string | null {
  if (!createDate) return null;
  const created = new Date(createDate);
  if (isNaN(created.getTime())) return null;
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

  const domainAge = calcDomainAge(data?.create_date);
  const country = data?.registrant_country || null;
  const registrar = data?.registrar || null;

  const stats = [
    domainAge  && { icon: Clock,     value: domainAge,  label: "網齡" },
    country    && { icon: Server,    value: country,    label: "國家" },
    registrar  && { icon: Building2, value: registrar,  label: "註冊商" },
  ].filter(Boolean) as { icon: React.ElementType; value: string; label: string }[];

  if (stats.length === 0) return null;

  return (
    <div className={cn("grid gap-2 text-center", `grid-cols-${stats.length}`, className)}>
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="p-3 rounded-xl bg-muted/50">
          <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-sm font-semibold truncate">{value}</p>
          <p className="text-2xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}

// 狀態指示燈
export function StatusIndicator({
  status,
  label,
  size = "md"
}: {
  status: "good" | "warning" | "danger" | "checking";
  label: string;
  size?: "sm" | "md";
}) {
  const colors = {
    good: "bg-signal-active",
    warning: "bg-signal-stale",
    danger: "bg-destructive",
    checking: "bg-muted-foreground",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "rounded-full",
        status !== "checking" && "animate-pulse",
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
