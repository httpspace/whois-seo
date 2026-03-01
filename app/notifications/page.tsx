'use client'

import { useRouter } from "next/navigation";
import { Link } from "@/lib/router-compat";
import { Bell, BellOff, ArrowLeft, Timer, AlertTriangle, CheckCircle2, RefreshCw, Check } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";
import { useAuthStore } from "@/store/authStore";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

const typeConfig = {
  expiring: { icon: Timer, color: "text-signal-stale", bg: "bg-signal-stale/10" },
  expired: { icon: AlertTriangle, color: "text-signal-danger", bg: "bg-signal-danger/10" },
  renewed: { icon: CheckCircle2, color: "text-signal-active", bg: "bg-signal-active/10" },
  change: { icon: RefreshCw, color: "text-primary", bg: "bg-primary/10" },
};

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markAsRead, markAllAsRead, unreadCount, isLoggedIn } = useAuthStore();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const unread = unreadCount();

  if (!isLoggedIn) {
    return (
      <ResponsiveLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
            <BellOff className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold mb-2">{t("notifications.loginRequired")}</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">{t("notifications.loginRequiredDesc")}</p>
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
            {t("settings.signIn")}
          </Link>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout>
      <div className="max-w-2xl mx-auto">
        {/* Mobile Header */}
        {isMobile && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-muted">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <h1 className="font-semibold">{t("notifications.title")}</h1>
                  {unread > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-medium">{unread}</span>
                  )}
                </div>
              </div>
              {unread > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-primary font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {t("notifications.markAllRead")}
                </button>
              )}
            </div>
          </header>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <div className="px-6 py-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <h1 className="text-xl font-semibold">{t("notifications.title")}</h1>
                <p className="text-sm text-muted-foreground">
                  {unread > 0 ? `${unread} ${t("notifications.unread")}` : t("notifications.allRead")}
                </p>
              </div>
            </div>
            {unread > 0 && (
              <button onClick={markAllAsRead} className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                {t("notifications.markAllRead")}
              </button>
            )}
          </div>
        )}

        {/* Notification list */}
        <div className="px-4 py-5 space-y-3 lg:px-6 lg:py-8">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                <BellOff className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold mb-2">{t("notifications.empty")}</h2>
              <p className="text-sm text-muted-foreground">{t("notifications.emptyDesc")}</p>
            </div>
          ) : (
            notifications.map(notification => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              return (
                <SectionCard
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 py-3 cursor-pointer transition-all hover:shadow-sm",
                    !notification.read && "ring-1 ring-primary/20 bg-primary/[0.02]"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
                    <Icon className={cn("w-5 h-5", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link href={`/domain/${notification.domain}`} className="text-sm font-semibold hover:text-primary transition-colors truncate">
                        {notification.domain}
                      </Link>
                      {!notification.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                    <p className="text-2xs text-muted-foreground/60 mt-1">{notification.date}</p>
                  </div>
                </SectionCard>
              );
            })
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
