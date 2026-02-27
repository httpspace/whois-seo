import { Link } from "@/lib/router-compat";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DomainData, VibeLevel } from "@/components/domain/DomainCard";
import { useAppStore } from "@/store/appStore";

interface DomainRowProps {
  domain: DomainData;
  showFollowButton?: boolean;
  showVibe?: boolean;
  variant?: "default" | "compact" | "prominent";
}

const vibeLabels: Record<VibeLevel, string> = {
  "ai-native": "AI-native",
  "high-attention": "High attention",
  "established": "Established",
  "under-radar": "Under radar",
  "dormant": "Dormant",
  "brand-sensitive": "Brand-sensitive",
  "aging-influential": "Aging influential",
};

/**
 * DomainRow - Universal domain list item
 * Multiple variants for different contexts
 */
export function DomainRow({ 
  domain, 
  showFollowButton = false, 
  showVibe = false,
  variant = "default" 
}: DomainRowProps) {
  const { isFollowing, followDomain, unfollowDomain } = useAppStore();
  const following = isFollowing(domain.domain);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (following) {
      unfollowDomain(domain.domain);
    } else {
      followDomain(domain.domain);
    }
  };

  if (variant === "compact") {
    return (
      <Link
        href={`/domain/${domain.domain}`}
        className="flex items-center gap-2.5 py-2 px-3 -mx-3 rounded-md hover:bg-surface-interactive active:bg-muted transition-colors"
      >
        <span className="font-mono text-sm text-foreground">{domain.domain}</span>
        {showVibe && (
          <span className="text-2xs text-tertiary">{vibeLabels[domain.vibe]}</span>
        )}
      </Link>
    );
  }

  if (variant === "prominent") {
    return (
      <Link
        href={`/domain/${domain.domain}`}
        className="block py-3 px-4 -mx-4 hover:bg-surface-interactive active:bg-muted transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-base font-medium text-foreground">{domain.domain}</p>
            <p className="text-sm text-secondary-foreground mt-1 line-clamp-2">{domain.summary}</p>
            {showVibe && (
              <p className="text-xs text-primary mt-1.5">{vibeLabels[domain.vibe]}</p>
            )}
          </div>
          {showFollowButton && (
            <button
              onClick={handleFollowClick}
              className={cn(
                "shrink-0 p-1.5 rounded-full transition-colors",
                following 
                  ? "bg-muted text-muted-foreground" 
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              {following ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          )}
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/domain/${domain.domain}`}
      className="flex items-center gap-3 py-2.5 px-4 -mx-4 hover:bg-surface-interactive active:bg-muted transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-medium text-foreground truncate">{domain.domain}</p>
        <p className="text-xs text-tertiary mt-0.5 truncate">
          {showVibe ? vibeLabels[domain.vibe] : domain.summary}
        </p>
      </div>
      {showFollowButton && (
        <button
          onClick={handleFollowClick}
          className={cn(
            "shrink-0 text-xs font-medium px-2.5 py-1 rounded-full transition-colors",
            following 
              ? "bg-muted text-muted-foreground" 
              : "text-primary hover:bg-primary/10"
          )}
        >
          {following ? "Following" : "Follow"}
        </button>
      )}
    </Link>
  );
}