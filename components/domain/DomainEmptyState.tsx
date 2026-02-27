import { Link } from "@/lib/router-compat";
import { Search, Globe, Loader2, AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DomainLoadingStateProps {
  domain: string;
  className?: string;
}

// 正在搜尋/載入中的狀態
export function DomainLoadingState({ domain, className }: DomainLoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">正在搜尋網域資料</h2>
      <p className="text-muted-foreground mb-4 font-mono">{domain}</p>
      
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>查詢 WHOIS 資訊...</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
          <span>分析網站狀態...</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
          <span>取得安全評分...</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-8">
        首次查詢可能需要較長時間，請稍候...
      </p>
    </div>
  );
}

interface DomainNotFoundStateProps {
  domain: string;
  reason?: "not-registered" | "fetch-failed" | "invalid";
  className?: string;
}

// 查無此網域 / 資料取得失敗
export function DomainNotFoundState({ domain, reason = "fetch-failed", className }: DomainNotFoundStateProps) {
  const messages = {
    "not-registered": {
      title: "此網域尚未註冊",
      description: "這個網域目前沒有被註冊，您可以考慮購買它！",
      icon: Globe,
    },
    "fetch-failed": {
      title: "無法取得網域資料",
      description: "我們暫時無法取得這個網域的資訊，這可能是網路問題或該網站封鎖了我們的查詢。",
      icon: AlertCircle,
    },
    "invalid": {
      title: "無效的網域格式",
      description: "請確認輸入的網域格式正確，例如：example.com",
      icon: AlertCircle,
    },
  };

  const { title, description, icon: Icon } = messages[reason];

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="font-mono text-sm bg-muted px-4 py-2 rounded-lg mb-4">{domain}</p>
      <p className="text-muted-foreground text-sm max-w-sm mb-8">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首頁
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          重新嘗試
        </button>
      </div>
      
      {reason === "not-registered" && (
        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl max-w-sm">
          <p className="text-sm text-green-700 dark:text-green-300">
            💡 這可能是一個好機會！未註冊的網域可以透過域名註冊商購買。
          </p>
        </div>
      )}
    </div>
  );
}

// 首次搜尋的空狀態
export function FirstSearchState({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 px-6 text-center", className)}>
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-primary/60" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-3">探索網域世界</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        輸入任何網域名稱，我們將為您分析網站資訊、安全狀態、DNS 設定等詳細資料。
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm max-w-lg">
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <Globe className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <p className="font-medium">網站分析</p>
          <p className="text-xs text-muted-foreground mt-1">完整的網域資訊</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <Search className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <p className="font-medium">WHOIS 查詢</p>
          <p className="text-xs text-muted-foreground mt-1">註冊與到期資訊</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <AlertCircle className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <p className="font-medium">安全評估</p>
          <p className="text-xs text-muted-foreground mt-1">SSL 與威脅分析</p>
        </div>
      </div>
    </div>
  );
}
