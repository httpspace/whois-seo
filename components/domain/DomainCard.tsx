import { Link } from "@/lib/router-compat";
import { ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type VibeLevel = "ai-native" | "high-attention" | "established" | "under-radar" | "dormant" | "brand-sensitive" | "aging-influential";

export interface DomainData {
  domain: string;
  category: "tech" | "business" | "media" | "ecommerce" | "finance" | "social";
  vibe: VibeLevel;
  summary: string;
  popularity: "high" | "medium" | "low";
  age: string;
  lastActive: string;
  favicon?: string;
}

interface DomainCardProps {
  domain: DomainData;
  className?: string;
  variant?: "default" | "featured";
}

const categoryLabels: Record<DomainData["category"], string> = {
  tech: "Tech",
  business: "Business",
  media: "Media",
  ecommerce: "Commerce",
  finance: "Finance",
  social: "Social",
};

const vibeConfig: Record<VibeLevel, { label: string; variant: "vibeAi" | "vibeAttention" | "vibeEstablished" | "vibeRadar" | "vibeDormant" | "vibeSensitive" | "vibeAging" }> = {
  "ai-native": { label: "AI-native", variant: "vibeAi" },
  "high-attention": { label: "High Attention", variant: "vibeAttention" },
  "established": { label: "Established", variant: "vibeEstablished" },
  "under-radar": { label: "Under the Radar", variant: "vibeRadar" },
  "dormant": { label: "Dormant", variant: "vibeDormant" },
  "brand-sensitive": { label: "Brand-sensitive", variant: "vibeSensitive" },
  "aging-influential": { label: "Aging but Influential", variant: "vibeAging" },
};

export function DomainCard({ domain, className, variant = "default" }: DomainCardProps) {
  const vibe = vibeConfig[domain.vibe];

  return (
    <Link
      href={`/domain/${domain.domain}`}
      className={cn(
        "group block rounded-xl bg-card border border-border shadow-subtle",
        "hover:shadow-card hover:border-border/80 transition-all duration-200",
        "active:scale-[0.995]",
        variant === "featured" ? "p-5" : "p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Favicon */}
        <div className={cn(
          "rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden",
          variant === "featured" ? "w-12 h-12" : "w-10 h-10"
        )}>
          {domain.favicon ? (
            <img src={domain.favicon} alt="" className="w-6 h-6" />
          ) : (
            <span className={cn(
              "font-semibold text-muted-foreground",
              variant === "featured" ? "text-xl" : "text-lg"
            )}>
              {domain.domain.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Domain name */}
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className={cn(
              "font-semibold text-foreground truncate group-hover:text-primary transition-colors",
              variant === "featured" && "text-lg"
            )}>
              {domain.domain}
            </h3>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>

          {/* Tags row */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
            <Badge variant={vibe.variant} className="text-2xs">
              {vibe.label}
            </Badge>
            <span className="text-muted-foreground text-2xs">·</span>
            <span className="text-2xs text-tertiary">{categoryLabels[domain.category]}</span>
          </div>

          {/* Summary - natural height */}
          <p className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            variant === "default" && "line-clamp-2"
          )}>
            {domain.summary}
          </p>

          {/* Meta footer */}
          <div className="flex items-center gap-3 mt-3 text-2xs text-tertiary">
            <span>{domain.age} old</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {domain.lastActive}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}