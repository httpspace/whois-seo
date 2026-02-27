import { Link } from "@/lib/router-compat";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItemProps {
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  rightText?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  showChevron?: boolean;
  className?: string;
}

export function ListItem({
  icon: Icon,
  iconColor = "text-foreground",
  iconBg = "bg-muted",
  title,
  subtitle,
  rightText,
  rightElement,
  onClick,
  href,
  showChevron = true,
  className,
}: ListItemProps) {
  const content = (
    <>
      {Icon && (
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>}
      </div>
      {rightText && (
        <span className="text-xs text-muted-foreground shrink-0">{rightText}</span>
      )}
      {rightElement}
      {showChevron && <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />}
    </>
  );

  const baseClasses = cn(
    "flex items-center gap-3 py-3 px-1 hover:bg-muted/30 active:bg-muted/50 rounded-xl transition-colors -mx-1",
    className
  );

  if (href) {
    return <Link href={href} className={baseClasses}>{content}</Link>;
  }

  if (onClick) {
    return <button onClick={onClick} className={cn(baseClasses, "w-full text-left")}>{content}</button>;
  }

  return <div className={baseClasses}>{content}</div>;
}
