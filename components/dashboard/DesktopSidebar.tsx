import { Globe, Zap } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/useLanguage";
import { useAuthStore } from "@/store/authStore";
import { fetchStats } from "@/lib/api";
import { useState, useEffect } from "react";

const STATS_SHOW_THRESHOLD = 50; // 公開顯示門檻（非管理員）

interface Stats { total: number; queries: number; activeToday: number }

function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => { fetchStats().then(setStats); }, []);
  return stats;
}

export function DesktopSidebar({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const stats = useStats();
  const isAdmin = user?.isAdmin === true;
  const showStats = isAdmin || (stats !== null && stats.total >= STATS_SHOW_THRESHOLD);

  if (!showStats) return <div className={cn("space-y-6", className)} />;

  const totalLabel = stats ? stats.total.toLocaleString() : "—";
  const activeLabel = stats ? stats.activeToday.toLocaleString() : "—";

  return (
    <div className={cn("space-y-6", className)}>
      <SectionCard>
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalLabel}</p>
            <p className="text-sm text-muted-foreground">{t("sidebar.totalDomains")}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-xl bg-signal-active/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-signal-active" />
          </div>
          <div>
            <p className="text-2xl font-bold">{activeLabel}</p>
            <p className="text-sm text-muted-foreground">{t("sidebar.activeToday")}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export function MobileStatsSummary({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const stats = useStats();
  const isAdmin = user?.isAdmin === true;
  const showStats = isAdmin || (stats !== null && stats.total >= STATS_SHOW_THRESHOLD);

  if (!showStats) return null;

  const totalLabel = stats ? stats.total.toLocaleString() : "—";
  const activeLabel = stats ? stats.activeToday.toLocaleString() : "—";

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <div className="text-center p-2 rounded-lg bg-muted/50">
        <p className="text-sm font-bold text-primary">{totalLabel}</p>
        <p className="text-2xs text-muted-foreground">{t("sidebar.totalShort")}</p>
      </div>
      <div className="text-center p-2 rounded-lg bg-muted/50">
        <p className="text-sm font-bold text-signal-active">{activeLabel}</p>
        <p className="text-2xs text-muted-foreground">{t("sidebar.activeToday")}</p>
      </div>
    </div>
  );
}
