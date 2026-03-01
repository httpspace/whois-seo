'use client'

import { Link } from "@/lib/router-compat";
import { BellOff, Search, Globe, ArrowLeft, Bell } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { ListItem } from "@/components/ui/list-item";
import { useAppStore } from "@/store/appStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";

export default function FollowingPage() {
  const { followedDomains } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="max-w-2xl mx-auto">
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <h1 className="font-semibold text-foreground">{t("following.title")}</h1>
                </div>
                <p className="text-xs text-muted-foreground">{followedDomains.length} {t("following.domainsTracked")}</p>
              </div>
            </div>
          </header>
        )}

        {isDesktop && (
          <div className="px-6 py-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">{t("following.title")}</h1>
                <p className="text-sm text-muted-foreground">{followedDomains.length} {t("following.domainsTracked")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-5 space-y-5 lg:py-8 lg:px-6">
          {followedDomains.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                <BellOff className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">{t("following.noDomainsTitle")}</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">{t("following.noDomainsDesc")}</p>
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                <Search className="w-4 h-4" />
                {t("following.findDomains")}
              </Link>
            </div>
          ) : (
            <>
              <SectionCard className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-foreground">{followedDomains.length}</p>
                  <p className="text-xs text-muted-foreground">{t("following.beingTracked")}</p>
                </div>
              </SectionCard>

              <SectionCard>
                <SectionHeader title={t("following.trackedDomains")} />
                <div className="space-y-1">
                  {followedDomains.map((domain) => (
                    <ListItem key={domain} icon={Globe} iconBg="bg-primary/10" iconColor="text-primary" title={domain} href={`/domain/${domain}`} />
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          <SectionCard className="bg-muted/30">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold mb-1">{t("following.suggested")}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t("following.suggestedDesc")}</p>
                <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  {t("following.findDomains")}
                </Link>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
