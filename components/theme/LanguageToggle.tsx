import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeOptions: { value: Locale; label: string; flag: string }[] = [
  { value: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
];

const shortLabels: Record<Locale, string> = {
  "zh-TW": "中文",
  en: "EN",
  es: "ES",
  fr: "FR",
};

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            className
          )}
        >
          <span>{shortLabels[locale]}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {localeOptions.map(opt => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setLocale(opt.value)}
            className={cn("flex items-center gap-2 cursor-pointer", locale === opt.value && "text-primary font-medium")}
          >
            <span>{opt.flag}</span>
            <span>{opt.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageToggleCompact({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-0.5 p-2 rounded-lg text-xs font-medium transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            className
          )}
        >
          <span className="text-xs font-semibold">{shortLabels[locale]}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {localeOptions.map(opt => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setLocale(opt.value)}
            className={cn("flex items-center gap-2 cursor-pointer", locale === opt.value && "text-primary font-medium")}
          >
            <span>{opt.flag}</span>
            <span>{opt.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
