import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, Globe, Clock } from "lucide-react";
import { useNavigate } from "@/lib/router-compat";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { allDomains } from "@/data/mockDomains";
import { useLanguage } from "@/i18n/useLanguage";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { recentSearches, addRecentSearch } = useAppStore();
  const { t } = useLanguage();

  const suggestions = query.length > 0 ? allDomains.filter(d => d.domain.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

  const handleSearch = (q: string) => {
    const cleanDomain = q.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    if (cleanDomain) { addRecentSearch(cleanDomain); navigate(`/domain/${cleanDomain}`); setQuery(""); setIsFocused(false); }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) handleSearch(query); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); inputRef.current?.focus(); }
      if (e.key === "Escape" && isFocused) { setIsFocused(false); inputRef.current?.blur(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsFocused(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isFocused && (query.length > 0 || recentSearches.length > 0);

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className={cn("relative flex items-center gap-2 px-3 h-10 rounded-xl border transition-all duration-200", isFocused ? "border-primary bg-card shadow-sm ring-2 ring-primary/10" : "border-border bg-muted/50 hover:bg-muted")}>
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setIsFocused(true)} placeholder={t("search.placeholder")} className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground outline-none min-w-0 font-mono" />
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="p-0.5 rounded hover:bg-muted transition-colors"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 h-5 rounded border border-border bg-background text-2xs text-muted-foreground font-mono">⌘K</kbd>
          )}
          {query && (
            <button type="submit" className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"><ArrowRight className="w-3.5 h-3.5" /></button>
          )}
        </div>
      </form>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in">
          {query.length > 0 ? (
            <div className="p-2">
              {suggestions.length > 0 ? (
                suggestions.map(domain => (
                  <button key={domain.domain} onClick={() => handleSearch(domain.domain)} className="w-full flex items-center gap-3 p-2.5 hover:bg-muted rounded-lg transition-colors text-left">
                    <Globe className="w-4 h-4 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm truncate">{domain.domain}</p>
                      <p className="text-xs text-muted-foreground truncate">{domain.vibe}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-sm text-muted-foreground">{t("search.noMatches")}</div>
              )}
              {query.includes(".") && (
                <button onClick={() => handleSearch(query)} className="w-full flex items-center gap-3 p-2.5 mt-1 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-left border-t border-border/40">
                  <Search className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm">{t("search.lookUp")} <span className="font-mono font-medium text-primary">{query}</span></span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-2">
              <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("search.recent")}</p>
              {recentSearches.slice(0, 4).map(search => (
                <button key={search} onClick={() => handleSearch(search)} className="w-full flex items-center gap-3 p-2.5 hover:bg-muted rounded-lg transition-colors text-left">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-mono text-sm">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
