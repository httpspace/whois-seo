import { Link } from "@/lib/router-compat";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DomainData, VibeLevel } from "./DomainCard";

interface CompactDomainCardProps {
  domain: DomainData;
  rank?: number;
  showVibe?: boolean;
  className?: string;
}

const vibeConfig: Record<VibeLevel, { label: string; variant: "vibeAi" | "vibeAttention" | "vibeEstablished" | "vibeRadar" | "vibeDormant" | "vibeSensitive" | "vibeAging" }> = {
  "ai-native": { label: "AI-native", variant: "vibeAi" },
  "high-attention": { label: "High Attention", variant: "vibeAttention" },
  "established": { label: "Established", variant: "vibeEstablished" },
  "under-radar": { label: "Under Radar", variant: "vibeRadar" },
  "dormant": { label: "Dormant", variant: "vibeDormant" },
  "brand-sensitive": { label: "Brand-sensitive", variant: "vibeSensitive" },
  "aging-influential": { label: "Aging Influence", variant: "vibeAging" },
};

export function CompactDomainCard({ domain, rank, showVibe = true, className }: CompactDomainCardProps) {
  const vibe = vibeConfig[domain.vibe];

  return (
    <Link
      href={`/domain/${domain.domain}`}
      className={cn(
        "group flex items-start gap-3 p-3 rounded-lg bg-card border border-border",
        "hover:shadow-subtle hover:border-border/80 transition-all duration-200",
        "active:scale-[0.995]",
        className
      )}
    >
      {rank && (
        <span className="text-sm font-medium text-tertiary w-5 text-center shrink-0 pt-0.5">
          {rank}
        </span>
      )}
      
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
        {domain.favicon ? (
          <img src={domain.favicon} alt="" className="w-5 h-5" />
        ) : (
          <span className="text-sm font-semibold text-muted-foreground">
            {domain.domain.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {domain.domain}
          </span>
          {showVibe && (
            <Badge variant={vibe.variant} className="text-2xs py-0 shrink-0">
              {vibe.label}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {domain.summary}
        </p>
      </div>
    </Link>
  );
}