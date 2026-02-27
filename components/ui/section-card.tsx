import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function SectionCard({ children, className, noPadding }: SectionCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border/40",
      !noPadding && "p-4",
      className
    )}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)}>
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
