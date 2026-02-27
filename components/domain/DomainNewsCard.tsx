import { Newspaper, ExternalLink, Clock } from "lucide-react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  sentiment: "positive" | "neutral" | "negative";
}

// 模擬新聞資料
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "該公司宣布重大產品更新，預計將影響全球用戶體驗",
    source: "科技新報",
    date: "2 小時前",
    url: "#",
    sentiment: "positive",
  },
  {
    id: "2",
    title: "市場分析師對該網站的流量增長表示樂觀",
    source: "商業周刊",
    date: "5 小時前",
    url: "#",
    sentiment: "positive",
  },
  {
    id: "3",
    title: "用戶反饋：最新功能更新帶來的使用體驗變化",
    source: "數位時代",
    date: "1 天前",
    url: "#",
    sentiment: "neutral",
  },
];

export function DomainNewsCard({ domain, className }: { domain: string; className?: string }) {
  const news = mockNews;

  return (
    <SectionCard className={className}>
      <SectionHeader 
        title="相關新聞" 
        action={
          <span className="text-xs text-muted-foreground">{news.length} 則</span>
        }
      />
      
      <div className="space-y-1">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 -mx-1 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <div className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
              item.sentiment === "positive" ? "bg-signal-active/10" :
              item.sentiment === "negative" ? "bg-destructive/10" :
              "bg-muted"
            )}>
              <Newspaper className={cn(
                "w-4 h-4",
                item.sentiment === "positive" ? "text-signal-active" :
                item.sentiment === "negative" ? "text-destructive" :
                "text-muted-foreground"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-muted-foreground">{item.source}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
          </a>
        ))}
      </div>

      {news.length === 0 && (
        <div className="py-8 text-center">
          <Newspaper className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">暫無相關新聞</p>
        </div>
      )}
    </SectionCard>
  );
}
