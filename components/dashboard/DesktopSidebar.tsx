import { Globe, Zap } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/useLanguage";

const globalStats = {
  totalDomains: "2.4M+",
  activeToday: "12,847",
};

export function DesktopSidebar({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={cn("space-y-6", className)}>
      <SectionCard>
        <div className="flex items-center gap-4 p-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{globalStats.totalDomains}</p>
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
            <p className="text-2xl font-bold">{globalStats.activeToday}</p>
            <p className="text-sm text-muted-foreground">{t("sidebar.activeToday")}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export function MobileStatsSummary({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <div className="text-center p-2 rounded-lg bg-muted/50">
        <p className="text-sm font-bold text-primary">{globalStats.totalDomains}</p>
        <p className="text-2xs text-muted-foreground">{t("sidebar.totalShort")}</p>
      </div>
      <div className="text-center p-2 rounded-lg bg-muted/50">
        <p className="text-sm font-bold text-signal-active">{globalStats.activeToday}</p>
        <p className="text-2xs text-muted-foreground">{t("sidebar.activeToday")}</p>
      </div>
    </div>
  );
}
