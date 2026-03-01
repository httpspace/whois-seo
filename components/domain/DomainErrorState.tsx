'use client'

import { Globe, WifiOff, AlertCircle, Home, Search, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "@/lib/router-compat";
import { SectionCard } from "@/components/ui/section-card";
import { useLanguage } from "@/i18n/useLanguage";

interface Props {
  variant: 'not-registered' | 'fetch-failed' | 'invalid';
  domain: string;
  onRetry?: () => void;
}

export function DomainErrorState({ variant, domain, onRetry }: Props) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const config = {
    'not-registered': {
      icon: Globe,
      iconClass: 'text-muted-foreground',
      bgClass: 'bg-muted/30',
      title: t('domain.notRegistered'),
      hint: t('domain.notRegisteredHint'),
    },
    'fetch-failed': {
      icon: WifiOff,
      iconClass: 'text-amber-500',
      bgClass: 'bg-amber-500/10',
      title: t('domain.fetchFailed'),
      hint: t('domain.fetchFailedHint'),
    },
    'invalid': {
      icon: AlertCircle,
      iconClass: 'text-destructive',
      bgClass: 'bg-destructive/10',
      title: t('domain.invalid'),
      hint: t('domain.invalidHint'),
    },
  }[variant];

  const Icon = config.icon;

  return (
    <SectionCard className="text-center py-12">
      <div className={`w-20 h-20 rounded-full ${config.bgClass} flex items-center justify-center mx-auto mb-6`}>
        <Icon className={`w-10 h-10 ${config.iconClass}`} />
      </div>

      <h2 className="text-lg font-semibold mb-2">{config.title}</h2>
      <p className="text-sm text-muted-foreground mb-2 max-w-sm mx-auto font-mono">{domain}</p>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">{config.hint}</p>

      {variant === 'not-registered' && (
        <div className="inline-block bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-8">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            🟢 {t('domain.notRegisteredBadge')}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {variant === 'fetch-failed' && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t('domain.retry')}
          </button>
        )}
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <Home className="w-4 h-4" />
          {t('nav.home') || 'Home'}
        </Link>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <Search className="w-4 h-4" />
          {t('domain.searchAnother')}
        </button>
      </div>
    </SectionCard>
  );
}
