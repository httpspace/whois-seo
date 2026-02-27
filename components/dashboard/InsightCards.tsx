import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/router-compat";

const insights = [
  {
    statement: "AI domains are eating the internet",
    detail: "156 new AI-related domains indexed this week alone",
    trend: "up",
    link: "/categories/tech",
  },
  {
    statement: "The .io gold rush is slowing",
    detail: "First decline in premium .io registrations since 2019",
    trend: "down",
    link: "/expiring",
  },
  {
    statement: "Dormant domains outnumber active 3:1",
    detail: "Most registered domains never see meaningful traffic",
    trend: "neutral",
    link: "/categories",
  },
];

export function InsightCards() {
  return (
    <div className="space-y-2">
      {insights.map((insight, i) => (
        <Link
          key={i}
          href={insight.link}
          className="group block p-4 rounded-lg bg-card border border-border hover:shadow-subtle transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {insight.statement}
              </p>
              <p className="text-xs text-muted-foreground">
                {insight.detail}
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}