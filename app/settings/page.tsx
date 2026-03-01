import type { Metadata } from 'next'
import Settings from "@/page-components/Settings";

export const metadata: Metadata = {
  title: "設定",
  description: "調整 Domain Vibe 的語言、顯示與通知設定",
  robots: { index: false },
};

export default Settings;
