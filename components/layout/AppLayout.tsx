import { ReactNode } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { TrendingUp, Clock, Timer, Grid3X3, Bookmark, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { ThemeToggle, ThemeToggleCompact } from "@/components/theme/ThemeToggle";
import { LanguageToggle, LanguageToggleCompact } from "@/components/theme/LanguageToggle";
import { useLanguage } from "@/i18n/useLanguage";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: TrendingUp, label: t("nav.trending"), path: "/" },
    { icon: Clock, label: t("nav.recent"), path: "/recent" },
    { icon: Timer, label: t("nav.expiring"), path: "/expiring" },
    { icon: Grid3X3, label: t("nav.categories"), path: "/categories" },
  ];

  const secondaryNavItems = [
    { icon: Bookmark, label: t("nav.saved"), path: "/saved" },
    { icon: Settings, label: t("nav.settings"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container h-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">Whoisvibe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-md ml-auto">
            <GlobalSearch />
          </div>

          {/* Language Toggle */}
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Mobile toggles */}
          <div className="sm:hidden flex items-center gap-0.5">
            <LanguageToggleCompact />
            <ThemeToggleCompact />
          </div>

          {/* Secondary Nav */}
          <div className="hidden sm:flex items-center gap-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                title={item.label}
              >
                <item.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 z-50">
        <div className="flex items-center justify-around h-full px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px]",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-2xs font-medium">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/saved"
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px]",
              location.pathname === "/saved"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-2xs font-medium">{t("nav.saved")}</span>
          </Link>
        </div>
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}
