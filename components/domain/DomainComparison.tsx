import { useState } from "react";
import { Globe, Clock, Server, Shield, Activity, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/useLanguage";

interface ComparisonDomain {
  domain: string;
  vibe: string;
  category: string;
  age: string;
  registrar: string;
  sslStatus: "valid" | "expiring" | "expired";
  sslExpiry: string;
  uptime: string;
  lastChange: string;
  techStack: string[];
}

const getComparisonData = (domain: string): ComparisonDomain => {
  const mockData: Record<string, Partial<ComparisonDomain>> = {
    "openai.com": { age: "8y", registrar: "Cloudflare", sslStatus: "valid", sslExpiry: "284d", uptime: "99.9%", lastChange: "2d", techStack: ["React", "Next.js", "Vercel"] },
    "stripe.com": { age: "14y", registrar: "Cloudflare", sslStatus: "valid", sslExpiry: "312d", uptime: "99.99%", lastChange: "12h", techStack: ["Ruby", "React", "AWS"] },
    "notion.so": { age: "8y", registrar: "GoDaddy", sslStatus: "valid", sslExpiry: "156d", uptime: "99.8%", lastChange: "1d", techStack: ["React", "Node.js", "AWS"] },
    "linear.app": { age: "5y", registrar: "Cloudflare", sslStatus: "valid", sslExpiry: "245d", uptime: "99.95%", lastChange: "6h", techStack: ["React", "GraphQL", "Vercel"] },
    "figma.com": { age: "12y", registrar: "MarkMonitor", sslStatus: "valid", sslExpiry: "198d", uptime: "99.9%", lastChange: "3d", techStack: ["TypeScript", "C++", "AWS"] },
    "perplexity.ai": { age: "2y", registrar: "Cloudflare", sslStatus: "valid", sslExpiry: "320d", uptime: "99.7%", lastChange: "4h", techStack: ["Python", "React", "GCP"] },
    "anthropic.com": { age: "3y", registrar: "Cloudflare", sslStatus: "valid", sslExpiry: "290d", uptime: "99.8%", lastChange: "1d", techStack: ["Python", "React", "AWS"] },
    "vercel.com": { age: "8y", registrar: "Cloudflare", sslStatus: "valid", sslExpiry: "340d", uptime: "99.99%", lastChange: "3h", techStack: ["Next.js", "Go", "AWS"] },
    "spotify.com": { age: "18y", registrar: "MarkMonitor", sslStatus: "valid", sslExpiry: "267d", uptime: "99.95%", lastChange: "5d", techStack: ["Java", "React", "GCP"] },
    "shopify.com": { age: "18y", registrar: "MarkMonitor", sslStatus: "valid", sslExpiry: "301d", uptime: "99.98%", lastChange: "8h", techStack: ["Ruby", "React", "GCP"] },
  };

  const data = mockData[domain] || { age: "3y", registrar: "Namecheap", sslStatus: "valid" as const, sslExpiry: "180d", uptime: "99.5%", lastChange: "7d", techStack: ["HTML", "CSS", "JS"] };
  return { domain, vibe: "", category: "", ...data } as ComparisonDomain;
};

interface ComparisonRowProps {
  label: string;
  icon: React.ElementType;
  currentValue: string;
  compareValue: string;
  hint?: "same" | "similar" | "different";
}

function ComparisonRow({ label, icon: Icon, currentValue, compareValue, hint }: ComparisonRowProps) {
  const hintColors = { same: "text-signal-active", similar: "text-signal-stale", different: "text-muted-foreground" };
  return (
    <div className="grid grid-cols-3 gap-2 py-2 text-xs">
      <div className="flex items-center gap-1.5 text-muted-foreground"><Icon className="w-3 h-3" /><span>{label}</span></div>
      <div className="text-center font-medium">{currentValue}</div>
      <div className={cn("text-center font-medium", hint && hintColors[hint])}>{compareValue}</div>
    </div>
  );
}

function SimilarDomainCard({ domain, vibeLabel, currentDomain, isExpanded, onToggle }: { domain: string; vibeLabel: string; currentDomain: string; isExpanded: boolean; onToggle: () => void }) {
  const { t } = useLanguage();
  const currentData = getComparisonData(currentDomain);
  const compareData = getComparisonData(domain);

  const getHint = (current: string, compare: string): "same" | "similar" | "different" => {
    if (current === compare) return "same";
    if (current.toLowerCase().includes(compare.toLowerCase().split(" ")[0]) || compare.toLowerCase().includes(current.toLowerCase().split(" ")[0])) return "similar";
    return "different";
  };

  const getSimilarityReason = (): string => {
    const reasons: string[] = [];
    if (currentData.registrar === compareData.registrar) reasons.push(t("compare.sameRegistrar"));
    if (currentData.techStack.some(tech => compareData.techStack.includes(tech))) reasons.push(t("compare.similarTech"));
    if (Math.abs(parseInt(currentData.age) - parseInt(compareData.age)) <= 2) reasons.push(t("compare.similarAge"));
    return reasons.length > 0 ? reasons.join(" · ") : t("compare.sameType");
  };

  return (
    <div className={cn("rounded-xl transition-all duration-200", isExpanded ? "bg-muted/50" : "hover:bg-muted/30")}>
      <div className="flex items-center gap-3 p-3 cursor-pointer" onClick={onToggle}>
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0"><Globe className="w-4 h-4 text-muted-foreground" /></div>
        <div className="flex-1 min-w-0">
          <Link href={`/domain/${domain}`} className="font-mono text-sm font-medium hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>{domain}</Link>
          <p className="text-2xs text-muted-foreground mt-0.5">{vibeLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xs text-muted-foreground hidden sm:block">{getSimilarityReason()}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 pb-3 animate-fade-in">
          <div className="pt-2 border-t border-border/40">
            <div className="grid grid-cols-3 gap-2 py-2 text-2xs text-muted-foreground mb-1">
              <div>{t("compare.dimension")}</div>
              <div className="text-center font-medium text-foreground">{currentDomain.split(".")[0]}</div>
              <div className="text-center font-medium text-foreground">{domain.split(".")[0]}</div>
            </div>
            <div className="divide-y divide-border/30">
              <ComparisonRow label={t("compare.age")} icon={Clock} currentValue={currentData.age} compareValue={compareData.age} hint={getHint(currentData.age, compareData.age)} />
              <ComparisonRow label={t("compare.registrar")} icon={Server} currentValue={currentData.registrar} compareValue={compareData.registrar} hint={getHint(currentData.registrar, compareData.registrar)} />
              <ComparisonRow label={t("compare.sslValid")} icon={Shield} currentValue={currentData.sslExpiry} compareValue={compareData.sslExpiry} />
              <ComparisonRow label={t("compare.uptime")} icon={Activity} currentValue={currentData.uptime} compareValue={compareData.uptime} />
              <ComparisonRow label={t("compare.lastChange")} icon={Activity} currentValue={currentData.lastChange} compareValue={compareData.lastChange} />
            </div>
            <div className="mt-3 pt-3 border-t border-border/30">
              <div className="flex items-center gap-1.5 text-2xs text-muted-foreground mb-2"><Layers className="w-3 h-3" /><span>{t("compare.techStack")}</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-wrap gap-1">
                  {currentData.techStack.slice(0, 3).map(tech => (<span key={tech} className="text-2xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tech}</span>))}
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {compareData.techStack.slice(0, 3).map(tech => (<span key={tech} className={cn("text-2xs px-1.5 py-0.5 rounded", currentData.techStack.includes(tech) ? "bg-signal-active/20 text-signal-active" : "bg-muted text-muted-foreground")}>{tech}</span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface DomainComparisonProps {
  currentDomain: string;
  relatedDomains: Array<{ domain: string; vibe: string }>;
  vibeLabels: Record<string, string>;
  className?: string;
}

export function DomainComparison({ currentDomain, relatedDomains, vibeLabels, className }: DomainComparisonProps) {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const { t } = useLanguage();

  if (relatedDomains.length === 0) return null;

  return (
    <SectionCard className={className}>
      <SectionHeader title={t("compare.similarDomains")} subtitle={t("compare.clickToExpand")} />
      <div className="space-y-1">
        {relatedDomains.map(d => (
          <SimilarDomainCard key={d.domain} domain={d.domain} vibeLabel={vibeLabels[d.vibe] || d.vibe} currentDomain={currentDomain} isExpanded={expandedDomain === d.domain} onToggle={() => setExpandedDomain(prev => prev === d.domain ? null : d.domain)} />
        ))}
      </div>
    </SectionCard>
  );
}
