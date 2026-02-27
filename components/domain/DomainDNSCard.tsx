import { useState } from "react";
import { Server, Globe, ChevronDown, ChevronUp, Copy, Check, Calendar, Shield, Building2, ExternalLink } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";

interface DNSRecord {
  type: string;
  value: string;
  ttl: string;
}

interface RegistrarInfo {
  registrar: string;
  registrarUrl: string;
  registrantOrg: string;
  registrantCountry: string;
  createdDate: string;
  expiresDate: string;
  updatedDate: string;
  status: string[];
  nameservers: string[];
  dnsRecords: DNSRecord[];
}

// 模擬 DNS 資料
const mockDNSInfo: RegistrarInfo = {
  registrar: "MarkMonitor Inc.",
  registrarUrl: "https://www.markmonitor.com",
  registrantOrg: "OpenAI, Inc.",
  registrantCountry: "US",
  createdDate: "2015-04-06",
  expiresDate: "2026-04-06",
  updatedDate: "2024-03-15",
  status: ["clientDeleteProhibited", "clientTransferProhibited", "clientUpdateProhibited"],
  nameservers: ["ns1.cloudflare.com", "ns2.cloudflare.com"],
  dnsRecords: [
    { type: "A", value: "104.18.7.192", ttl: "300" },
    { type: "AAAA", value: "2606:4700::6812:7c0", ttl: "300" },
    { type: "MX", value: "aspmx.l.google.com", ttl: "3600" },
    { type: "TXT", value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" },
  ],
};

export function DomainDNSCard({ domain, className }: { domain: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const info = mockDNSInfo;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const daysUntilExpiry = Math.ceil((new Date(info.expiresDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const expiryStatus = daysUntilExpiry < 30 ? "danger" : daysUntilExpiry < 90 ? "warning" : "safe";

  return (
    <SectionCard className={className}>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Server className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold">DNS / 註冊資訊</h3>
            <p className="text-xs text-muted-foreground">
              {info.registrar} · 到期 {info.expiresDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            expiryStatus === "safe" && "bg-signal-active/10 text-signal-active",
            expiryStatus === "warning" && "bg-signal-stale/10 text-signal-stale",
            expiryStatus === "danger" && "bg-destructive/10 text-destructive",
          )}>
            {daysUntilExpiry} 天
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      <div className={cn(
        "overflow-hidden transition-all duration-300",
        expanded ? "max-h-[1000px] mt-5" : "max-h-0"
      )}>
        {/* 註冊者資訊 - 可點擊查看相關網域 */}
        <div className="p-4 rounded-xl bg-muted/50 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">註冊者</span>
            <Link 
              href={`/registrant/${encodeURIComponent(info.registrantOrg)}`}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              查看相關網域 <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{info.registrantOrg}</p>
              <p className="text-xs text-muted-foreground">{info.registrantCountry}</p>
            </div>
          </div>
        </div>

        {/* 重要日期 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-muted/30 text-center">
            <Calendar className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-xs font-medium">{info.createdDate}</p>
            <p className="text-2xs text-muted-foreground">註冊日期</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30 text-center">
            <Calendar className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-xs font-medium">{info.updatedDate}</p>
            <p className="text-2xs text-muted-foreground">更新日期</p>
          </div>
          <div className={cn(
            "p-3 rounded-xl text-center",
            expiryStatus === "safe" && "bg-signal-active/10",
            expiryStatus === "warning" && "bg-signal-stale/10",
            expiryStatus === "danger" && "bg-destructive/10",
          )}>
            <Calendar className={cn(
              "w-4 h-4 mx-auto mb-1",
              expiryStatus === "safe" && "text-signal-active",
              expiryStatus === "warning" && "text-signal-stale",
              expiryStatus === "danger" && "text-destructive",
            )} />
            <p className="text-xs font-medium">{info.expiresDate}</p>
            <p className="text-2xs text-muted-foreground">到期日期</p>
          </div>
        </div>

        {/* 註冊商 */}
        <div className="py-3 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">註冊商</span>
            <a 
              href={info.registrarUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              {info.registrar}
            </a>
          </div>
        </div>

        {/* Name Servers */}
        <div className="py-3 border-t border-border/40">
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Name Servers</p>
          <div className="space-y-1.5">
            {info.nameservers.map((ns, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-muted/30">
                <code className="text-xs font-mono">{ns}</code>
                <button 
                  onClick={() => copyToClipboard(ns, `ns-${i}`)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  {copiedField === `ns-${i}` ? (
                    <Check className="w-3.5 h-3.5 text-signal-active" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DNS Records */}
        <div className="py-3 border-t border-border/40">
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">DNS Records</p>
          <div className="space-y-1.5">
            {info.dnsRecords.map((record, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/30">
                <span className={cn(
                  "text-2xs font-bold px-1.5 py-0.5 rounded",
                  record.type === "A" && "bg-blue-500/20 text-blue-600 dark:text-blue-400",
                  record.type === "AAAA" && "bg-purple-500/20 text-purple-600 dark:text-purple-400",
                  record.type === "MX" && "bg-green-500/20 text-green-600 dark:text-green-400",
                  record.type === "TXT" && "bg-amber-500/20 text-amber-600 dark:text-amber-400",
                  record.type === "CNAME" && "bg-pink-500/20 text-pink-600 dark:text-pink-400",
                )}>
                  {record.type}
                </span>
                <code className="text-xs font-mono flex-1 truncate">{record.value}</code>
                <span className="text-2xs text-muted-foreground">TTL: {record.ttl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Status */}
        <div className="py-3 border-t border-border/40">
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">狀態標籤</p>
          <div className="flex flex-wrap gap-1.5">
            {info.status.map((s, i) => (
              <span key={i} className="text-2xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
