import { useAppStore } from "@/store/appStore";
import { translations, type Locale, type TranslationKey } from "./translations";

export function useLanguage() {
  const { locale, setLocale } = useAppStore();

  const t = (key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[locale] || entry["en"] || key;
  };

  return { t, locale, setLocale };
}

export type { Locale, TranslationKey };
