import { DomainCard, DomainData } from "./DomainCard";
import { cn } from "@/lib/utils";

interface DomainListProps {
  domains: DomainData[];
  title?: string;
  showViewAll?: boolean;
  viewAllPath?: string;
  className?: string;
}

export function DomainList({ domains, title, showViewAll, viewAllPath, className }: DomainListProps) {
  return (
    <section className={cn("space-y-3", className)}>
      {(title || showViewAll) && (
        <div className="flex items-center justify-between">
          {title && (
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          )}
          {showViewAll && viewAllPath && (
            <a
              href={viewAllPath}
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View all →
            </a>
          )}
        </div>
      )}
      <div className="space-y-2">
        {domains.map((domain) => (
          <DomainCard key={domain.domain} domain={domain} />
        ))}
      </div>
    </section>
  );
}
