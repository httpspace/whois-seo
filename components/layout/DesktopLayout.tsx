import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { Compass, Bell, User, TrendingUp, Clock, Timer, Grid3X3, ChevronRight, Heart, LogOut, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/theme/LanguageToggle";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";
import { useLanguage } from "@/i18n/useLanguage";

export function DesktopLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { followedDomains } = useAppStore();
  const { user, isLoggedIn, logout, unreadCount } = useAuthStore();
  const { t } = useLanguage();
  const unread = unreadCount();

  const navItems = [
    { icon: Compass, label: t("nav.explore"), path: "/" },
    { icon: TrendingUp, label: t("nav.trending"), path: "/trending" },
    { icon: Clock, label: t("nav.recent"), path: "/recent" },
    { icon: Timer, label: t("nav.expiring"), path: "/expiring" },
    { icon: Grid3X3, label: t("nav.categories"), path: "/categories" },
  ];

  const userItems = [
    { icon: Heart, label: t("nav.following"), path: "/following" },
    { icon: Bell, label: t("nav.notifications"), path: "/notifications" },
    { icon: User, label: t("nav.settings"), path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex flex-col w-60 border-r border-border/40 bg-card/50 h-screen sticky top-0">
        <div className="p-5 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img src="/logo.webp" alt="Whoisvibe" className="w-8 h-8 rounded-xl object-contain" />
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
                const count = item.path === "/notifications" ? unread : item.path === "/following" ? followedDomains.length : 0;
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

        {/* User Profile */}
        <div className="p-3 border-t border-border/40">
          {isLoggedIn && user ? (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/30">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 ring-2 ring-primary/20">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-primary">{user.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title={t("user.signOut")}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{t("user.guest")}</p>
                <p className="text-xs text-muted-foreground">{t("user.guestDesc")}</p>
              </div>
              <LogIn className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </div>

        <div className="p-3 border-t border-border/40 flex items-center gap-2">
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
