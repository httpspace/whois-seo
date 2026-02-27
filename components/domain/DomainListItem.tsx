import { Link } from "@/lib/router-compat";
import { ChevronRight, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DomainData, VibeLevel } from "@/components/domain/DomainCard";
import { useAppStore } from "@/store/appStore";
import { useLanguage } from "@/i18n/useLanguage";

interface DomainListItemProps {
  domain: DomainData;
  showFollowButton?: boolean;
  showChevron?: boolean;
  subtitle?: "summary" | "vibe" | "lastActive";
}

export function DomainListItem({ 
  domain, 
  showFollowButton = false, 
  showChevron = true,
  subtitle = "summary" 
}: DomainListItemProps) {
  const { isFollowing, followDomain, unfollowDomain } = useAppStore();
  const { t } = useLanguage();
  const following = isFollowing(domain.domain);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    following ? unfollowDomain(domain.domain) : followDomain(domain.domain);
  };

  const vibeKey = `vibe.${domain.vibe}` as const;

  const getSubtitle = () => {
    switch (subtitle) {
      case "vibe":
        return t(vibeKey as any);
      case "lastActive":
        return domain.lastActive;
      default:
        return domain.summary;
    }
  };

  return (
    <Link href={`/domain/${domain.domain}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 active:bg-muted transition-colors">
      <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0">
        <span className="text-lg font-semibold text-muted-foreground">{domain.domain.charAt(0).toUpperCase()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{domain.domain}</p>
        <p className="text-sm text-muted-foreground truncate">{getSubtitle()}</p>
      </div>
      {showFollowButton && (
        <button onClick={handleFollowClick} className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0", following ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground")}>
          {following ? (
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" />{t("domain.following")}</span>
          ) : (
            <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" />{t("domain.follow")}</span>
          )}
        </button>
      )}
      {showChevron && !showFollowButton && <ChevronRight className="w-5 h-5 text-muted-foreground/50 shrink-0" />}
    </Link>
  );
}
