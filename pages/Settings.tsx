'use client'

import { Sun, Moon, Monitor } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t, locale, setLocale } = useLanguage();

  useEffect(() => { setMounted(true); }, []);

  const themeOptions = [
    { value: "light", icon: Sun, label: t("settings.light") },
    { value: "dark", icon: Moon, label: t("settings.dark") },
    { value: "system", icon: Monitor, label: t("settings.system") },
  ] as const;

  const languageOptions = [
    { value: "zh-TW" as const, label: "繁體中文", flag: "🇹🇼" },
    { value: "en" as const, label: "English", flag: "🇺🇸" },
  ];

  return (
    <ResponsiveLayout>
      <div className="max-w-2xl mx-auto">
        <header className={cn(
          "bg-background/95 backdrop-blur-xl border-b border-border",
          !isDesktop && "sticky top-0 z-40 safe-area-pt"
        )}>
          <div className="px-4 lg:px-6 py-4 lg:py-6">
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">{t("settings.title")}</h1>
          </div>
        </header>

        <div className="divide-y divide-border">
          {/* Language */}
          <section className="py-4">
            <div className="px-4 lg:px-6 mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("settings.language")}</h2>
            </div>
            <div className="px-4 lg:px-6 flex gap-2">
              {languageOptions.map((option) => {
                const isActive = locale === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setLocale(option.value)}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors",
                      isActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    )}
                  >
                    <span className="text-lg">{option.flag}</span>
                    <span className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Appearance */}
          <section className="py-4">
            <div className="px-4 lg:px-6 mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("settings.appearance")}</h2>
            </div>
            {mounted && (
              <div className="px-4 lg:px-6 flex gap-2">
                {themeOptions.map((option) => {
                  const isActive = theme === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors",
                        isActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                      )}
                    >
                      <option.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                      <span className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Account */}
          <section className="py-4">
            <div className="px-4 lg:px-6 mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("settings.account")}</h2>
            </div>
            <div className="px-4 lg:px-6">
              <p className="text-sm text-muted-foreground mb-3">{t("settings.accountDesc")}</p>
              <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium">{t("settings.signIn")}</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="py-4">
            <div className="px-4 lg:px-6 mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("settings.notifications")}</h2>
            </div>
            <div className="px-4 lg:px-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t("settings.expirationAlerts")}</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t("settings.followedUpdates")}</span>
                <Switch />
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="py-4">
            <div className="px-4 lg:px-6 mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("settings.privacy")}</h2>
            </div>
            <div className="px-4 lg:px-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t("settings.analytics")}</span>
                <Switch defaultChecked />
              </div>
            </div>
          </section>

          {/* About */}
          <section className="py-4">
            <div className="px-4 lg:px-6 mb-3">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("settings.about")}</h2>
            </div>
            <div className="px-4 lg:px-6">
              <p className="text-sm text-muted-foreground">{t("settings.aboutDesc")}</p>
              <p className="text-xs text-muted-foreground mt-2">Version 1.0.0</p>
            </div>
          </section>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
