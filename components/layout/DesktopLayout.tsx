import { ReactNode } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { Compass, Bell, User, TrendingUp, Clock, Timer, Grid3X3, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/theme/LanguageToggle";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useAppStore } from "@/store/appStore";
import { useLanguage } from "@/i18n/useLanguage";

export function DesktopLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { followedDomains } = useAppStore();
  const { t } = useLanguage();

  const navItems = [
    { icon: Compass, label: t("nav.explore"), path: "/" },
    { icon: TrendingUp, label: t("nav.trending"), path: "/trending" },
    { icon: Clock, label: t("nav.recent"), path: "/recent" },
    { icon: Timer, label: t("nav.expiring"), path: "/expiring" },
    { icon: Grid3X3, label: t("nav.categories"), path: "/categories" },
  ];

  const userItems = [
    { icon: Bell, label: t("nav.following"), path: "/following" },
    { icon: User, label: t("nav.settings"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex flex-col w-60 border-r border-border/40 bg-card/50">
        <div className="p-5 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center glow-brand-sm group-hover:animate-glow transition-all">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <span className="font-display font-semibold text-lg text-gradient-brand">Whoisvibe</span>
          </Link>
        </div>

        <div className="p-4">
          <GlobalSearch />
        </div>

        <nav className="flex-1 px-3 py-2">
          <div className="space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border/40">
            <p className="px-3 mb-2 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">{t("nav.personal")}</p>
            <div className="space-y-1">
              {userItems.map(item => {
                const isActive = location.pathname === item.path;
                const count = item.path === "/following" ? followedDomains.length : 0;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {count > 0 && <span className="ml-auto px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">{count}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-border/40 flex items-center gap-2">
          <div className="flex-1"><ThemeToggle /></div>
          <LanguageToggle />
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}
