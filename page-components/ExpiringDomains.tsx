'use client'

import { Link } from "@/lib/router-compat";
import { ArrowLeft, Timer, Construction } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

export default function ExpiringDomains() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className={cn("mx-auto", isDesktop ? "max-w-6xl" : "max-w-2xl")}>
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-destructive" />
                  <h1 className="font-semibold text-foreground">{t("expiring.title")}</h1>
                </div>
              </div>
            </div>
          </header>
        )}

        <div className={cn("px-4 py-8", isDesktop && "px-6")}>
          <SectionCard className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Construction className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="font-semibold text-foreground mb-2">尚待完成</h2>
            <p className="text-sm text-muted-foreground">此功能正在開發中，敬請期待。</p>
          </SectionCard>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
