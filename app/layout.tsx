import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./index.css";

export const metadata: Metadata = {
  title: "Domain Vibe - WHOIS 查詢工具",
  description: "快速查詢域名 WHOIS 資訊、DNS 記錄、安全評估與域名歷史",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
