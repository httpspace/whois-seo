import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { useRouter } from "next/navigation";
import { Search, Bell, User, ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSheet } from "@/components/search/SearchSheet";
import { ThemeToggleCompact } from "@/components/theme/ThemeToggle";
import { LanguageToggleCompact } from "@/components/theme/LanguageToggle";
import { useAppStore } from "@/store/appStore";
import { useLanguage } from "@/i18n/useLanguage";

interface MobileLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
}

export function MobileLayout({ children, showHeader = false, headerTitle }: MobileLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const { followedDomains } = useAppStore();
  const { t } = useLanguage();

  const isHomePage = location.pathname === "/";
  const canGoBack = typeof window !== "undefined" ? window.history.length > 1 && !isHomePage : false;

  const tabs = [
    { icon: ArrowLeft, label: t("tab.back"), action: "back" as const },
    { icon: Home, label: t("tab.home"), path: "/" },
    { icon: Search, label: t("tab.search"), action: "search" as const },
    { icon: Bell, label: t("tab.follow"), path: "/following" },
    { icon: User, label: t("tab.me"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/40 safe-area-pt">
          <div className="flex items-center justify-between px-4 h-14">
            <span className="font-display font-semibold text-gradient-brand">{headerTitle || "Whoisvibe"}</span>
            <div className="flex items-center gap-1">
              <LanguageToggleCompact />
              <ThemeToggleCompact />
              <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-brand-violet" />
                {followedDomains.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gradient rounded-full glow-brand-sm" />}
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 pb-20 lg:pb-0">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background/95 backdrop-blur-lg z-50 lg:hidden safe-area-pb">
        <div className="flex items-stretch justify-around h-16 max-w-lg mx-auto">
          {tabs.map(tab => {
            const isSearch = "action" in tab && tab.action === "search";
            const isBack = "action" in tab && tab.action === "back";
            const isActive = !isSearch && !isBack && "path" in tab && location.pathname === tab.path;
            const hasNotification = "path" in tab && tab.path === "/following" && followedDomains.length > 0;

            if (isBack) {
              return (
                <button
                  key="back"
                  onClick={() => canGoBack ? router.back() : navigate("/")}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 flex-1 transition-colors",
                    canGoBack ? "text-foreground" : "text-muted-foreground/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                    canGoBack 
                      ? "border-border bg-background shadow-sm hover:bg-muted" 
                      : "border-border/30 bg-muted/30"
                  )}>
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                </button>
              );
            }

            if (isSearch) {
              return (
                <button key="search" onClick={() => setSearchOpen(true)} className="flex flex-col items-center justify-center gap-1 flex-1 text-muted-foreground">
                  <div className="p-2.5 rounded-2xl bg-brand-gradient shadow-lg glow-brand-sm">
                    <Search className="w-5 h-5 text-primary-foreground" />
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={tab.label}
               href={"path" in tab ? tab.path! : "/"}
                className={cn("relative flex flex-col items-center justify-center gap-1 flex-1 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}
              >
                <tab.icon className={cn("w-6 h-6", "path" in tab && tab.path === "/" && isActive && "fill-current")} />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {hasNotification && <span className="absolute top-3 right-1/4 w-1.5 h-1.5 bg-primary rounded-full" />}
              </Link>
            );
          })}
        </div>
      </nav>

      <SearchSheet open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
