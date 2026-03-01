'use client'

import { Construction } from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SectionCard } from "@/components/ui/section-card";

export default function RegistrantDomains() {
  return (
    <ResponsiveLayout showMobileHeader mobileHeaderTitle="註冊者資訊">
      <div className="max-w-2xl mx-auto px-4 py-8 lg:px-6">
        <SectionCard className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Construction className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-foreground mb-2">尚待完成</h2>
          <p className="text-sm text-muted-foreground">此功能正在開發中，敬請期待。</p>
        </SectionCard>
      </div>
    </ResponsiveLayout>
  );
}
