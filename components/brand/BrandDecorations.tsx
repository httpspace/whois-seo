import { Globe, Sparkles, Shield, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// 品牌吉祥物 - 可愛的域名小精靈
export function BrandMascot({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClass = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  }[size];

  return (
    <div className={cn("relative", sizeClass, className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/50 rounded-full animate-pulse-subtle" />
      <div className="absolute inset-1 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
        <Globe className={cn("text-primary-foreground", size === "lg" ? "w-12 h-12" : size === "md" ? "w-8 h-8" : "w-5 h-5")} />
      </div>
      <Sparkles className={cn("absolute -top-1 -right-1 text-amber-400", size === "lg" ? "w-6 h-6" : "w-4 h-4")} />
    </div>
  );
}

// 品牌特色卡片 - 漸層風格
export function FeatureCard({ 
  icon: Icon, 
  title, 
  subtitle, 
  variant = "primary",
  onClick,
  className 
}: { 
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  variant?: "primary" | "accent" | "success" | "warning";
  onClick?: () => void;
  className?: string;
}) {
  const variants = {
    primary: "from-primary to-primary/70 text-primary-foreground",
    accent: "from-violet-500 to-purple-600 text-white",
    success: "from-emerald-500 to-teal-600 text-white",
    warning: "from-amber-500 to-orange-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 text-left bg-gradient-to-br transition-all active:scale-[0.98]",
        variants[variant],
        className
      )}
    >
      {/* 裝飾性圓點 */}
      <div className="absolute top-4 right-4 flex gap-1.5 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-sm opacity-70 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </button>
  );
}

// 統計徽章 - 帶有動畫效果
export function StatBadge({ 
  icon: Icon, 
  value, 
  label,
  trend,
  className 
}: { 
  icon: React.ElementType;
  value: string | number;
  label: string;
  trend?: "up" | "down" | "stable";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50", className)}>
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{value}</span>
          {trend && (
            <TrendingUp className={cn(
              "w-4 h-4",
              trend === "up" && "text-signal-active",
              trend === "down" && "text-destructive rotate-180",
              trend === "stable" && "text-muted-foreground rotate-90"
            )} />
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{label}</p>
      </div>
    </div>
  );
}

// 安全狀態指示器
export function SecurityIndicator({ 
  status, 
  className 
}: { 
  status: "safe" | "warning" | "danger" | "unknown";
  className?: string;
}) {
  const config = {
    safe: { color: "bg-signal-active", text: "text-signal-active", label: "安全", icon: Shield },
    warning: { color: "bg-signal-stale", text: "text-signal-stale", label: "警告", icon: Shield },
    danger: { color: "bg-destructive", text: "text-destructive", label: "危險", icon: Shield },
    unknown: { color: "bg-muted", text: "text-muted-foreground", label: "未知", icon: Shield },
  }[status];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse-subtle", config.color)} />
      <config.icon className={cn("w-4 h-4", config.text)} />
      <span className={cn("text-sm font-medium", config.text)}>{config.label}</span>
    </div>
  );
}

// 閃電動作按鈕
export function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  className
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors",
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

// 裝飾性背景波紋
export function WaveDecoration({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 400 100" 
      className={cn("w-full h-auto opacity-10", className)}
      preserveAspectRatio="none"
    >
      <path 
        d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" 
        fill="currentColor"
        className="text-primary"
      />
    </svg>
  );
}

// 網域健康度進度條
export function HealthBar({
  value,
  label,
  className
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const getColor = () => {
    if (value >= 80) return "bg-signal-active";
    if (value >= 50) return "bg-signal-stale";
    return "bg-destructive";
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", getColor())}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-xs font-medium text-right">{value}%</p>
    </div>
  );
}
