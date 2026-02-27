import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "zh-TW" ? "en" : "zh-TW")}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
      title={locale === "zh-TW" ? "Switch to English" : "切換至中文"}
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{locale === "zh-TW" ? "EN" : "中"}</span>
    </button>
  );
}

export function LanguageToggleCompact({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "zh-TW" ? "en" : "zh-TW")}
      className={cn(
        "p-2 rounded-lg text-xs font-medium transition-colors",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
      title={locale === "zh-TW" ? "Switch to English" : "切換至中文"}
    >
      <span className="text-xs font-semibold">{locale === "zh-TW" ? "EN" : "中"}</span>
    </button>
  );
}
