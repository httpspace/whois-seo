'use client'

import { Link } from "@/lib/router-compat";
import { ArrowLeft, ChevronRight, Grid3X3 } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { categories } from "@/data/mockDomains";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/i18n/useLanguage";

export default function Categories() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="max-w-2xl mx-auto">
        {!isDesktop && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-pt">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted"><ArrowLeft className="w-5 h-5" /></Link>
              <div>
                <h1 className="font-semibold text-foreground">{t("categories.title")}</h1>
                <p className="text-xs text-muted-foreground">{t("categories.browseByIndustry")}</p>
              </div>
            </div>
          </header>
        )}

        {isDesktop && (
          <div className="px-6 py-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Grid3X3 className="w-5 h-5 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">{t("categories.title")}</h1>
                <p className="text-sm text-muted-foreground">{t("categories.browseByIndustry")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="divide-y divide-border">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`} className="flex items-center justify-between px-4 lg:px-6 py-4 hover:bg-muted/50 active:bg-muted transition-colors">
              <div>
                <p className="font-medium text-foreground">{category.label}</p>
                <p className="text-sm text-muted-foreground">{category.count} {t("categories.domains")}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
