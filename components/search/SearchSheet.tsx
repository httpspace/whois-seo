import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@/lib/router-compat";
import { Search, X, ArrowUpRight, Clock, TrendingUp, Globe } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { allDomains } from "@/data/mockDomains";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); else setQuery(""); }, [open]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onOpenChange(false); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const suggestions = query.length > 0 ? allDomains.filter(d => d.domain.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : [];

  const handleSearch = (q: string) => {
    const cleanDomain = q.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    if (cleanDomain) { addRecentSearch(cleanDomain); navigate(`/domain/${cleanDomain}`); onOpenChange(false); }
  };

  if (!open) return null;

  if (isDesktop) {
    return (
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={() => onOpenChange(false)} />
        <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="border-b border-border">
            <div className="flex items-center gap-3 px-5 py-4">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("search.placeholderFull")} className="flex-1 bg-transparent text-base placeholder:text-muted-foreground outline-none font-mono" autoComplete="off" autoCapitalize="off" spellCheck="false" />
              {query && <button type="button" onClick={() => setQuery("")} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>}
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded border border-border bg-muted text-xs text-muted-foreground font-mono">ESC</kbd>
            </div>
          </form>
          <div className="max-h-[400px] overflow-auto">
            {query.length > 0 ? (
              <div className="p-2">
                {suggestions.length > 0 ? suggestions.map(domain => (
                  <button key={domain.domain} onClick={() => handleSearch(domain.domain)} className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors text-left">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Globe className="w-5 h-5 text-primary" /></div>
                    <div className="flex-1 min-w-0"><p className="font-mono text-sm font-medium truncate">{domain.domain}</p><p className="text-xs text-muted-foreground truncate">{domain.vibe}</p></div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                )) : <div className="p-4 text-center text-sm text-muted-foreground">{t("search.noMatches")}</div>}
                {query.includes(".") && (
                  <button onClick={() => handleSearch(query)} className="w-full flex items-center justify-between p-3 mt-1 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Search className="w-5 h-5 text-primary-foreground" /></div>
                      <span className="text-sm">{t("search.lookUp")} <span className="font-mono font-semibold text-primary">{query}</span></span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </button>
                )}
              </div>
            ) : (
              <div className="p-2">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between px-3 py-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("search.recent")}</p>
                      <button onClick={clearRecentSearches} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t("search.clear")}</button>
                    </div>
                    {recentSearches.slice(0, 4).map(search => (
                      <button key={search} onClick={() => handleSearch(search)} className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors text-left">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Clock className="w-5 h-5 text-muted-foreground" /></div>
                        <span className="font-mono text-sm">{search}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("search.trending")}</p>
                  {allDomains.slice(0, 4).map((domain, i) => (
                    <button key={domain.domain} onClick={() => handleSearch(domain.domain)} className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors text-left">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-amber-500" /></div>
                      <p className="font-mono text-sm flex-1 truncate">{domain.domain}</p>
                      <span className="text-xs text-muted-foreground">#{i + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background animate-fade-in">
      <div className="sticky top-0 bg-background border-b border-border/40 safe-area-pt">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 flex items-center gap-2.5 px-4 h-12 rounded-2xl bg-muted border border-border/40 focus-within:border-primary/50 transition-colors">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("search.enterDomain")} className="flex-1 bg-transparent text-base placeholder:text-muted-foreground outline-none font-mono" autoComplete="off" autoCapitalize="off" spellCheck="false" />
            {query && <button type="button" onClick={() => setQuery("")} className="p-1.5 rounded-lg hover:bg-background transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>}
          </div>
          <button type="button" onClick={() => onOpenChange(false)} className="text-sm font-medium text-primary px-2">{t("search.cancel")}</button>
        </form>
      </div>
      <div className="overflow-auto h-[calc(100vh-80px)] px-4 py-4">
        {query.length > 0 ? (
          <>
            {suggestions.length > 0 && (
              <div className="space-y-1">
                {suggestions.map(domain => (
                  <button key={domain.domain} onClick={() => handleSearch(domain.domain)} className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors text-left">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Globe className="w-5 h-5 text-primary" /></div>
                    <div className="flex-1 min-w-0"><p className="font-mono text-sm font-medium truncate">{domain.domain}</p><p className="text-xs text-muted-foreground truncate">{domain.vibe}</p></div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
            {query.includes(".") && (
              <button onClick={() => handleSearch(query)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-primary/10 hover:bg-primary/15 transition-colors mt-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Search className="w-5 h-5 text-primary-foreground" /></div>
                  <div><span className="text-sm">{t("search.lookUp")} </span><span className="font-mono text-sm font-semibold text-primary">{query}</span></div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </button>
            )}
          </>
        ) : (
          <>
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("search.recent")}</p>
                  <button onClick={clearRecentSearches} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t("search.clear")}</button>
                </div>
                <div className="space-y-1">
                  {recentSearches.slice(0, 5).map(search => (
                    <button key={search} onClick={() => handleSearch(search)} className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors text-left">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Clock className="w-5 h-5 text-muted-foreground" /></div>
                      <span className="font-mono text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t("search.trending")}</p>
              <div className="space-y-1">
                {allDomains.slice(0, 5).map((domain, i) => (
                  <button key={domain.domain} onClick={() => handleSearch(domain.domain)} className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-xl transition-colors text-left">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-amber-500" /></div>
                    <p className="font-mono text-sm flex-1 truncate">{domain.domain}</p>
                    <span className="text-xs text-muted-foreground">#{i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
