import { ReactNode, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileLayout } from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

interface ResponsiveLayoutProps {
  children: ReactNode;
  mobileHeaderTitle?: string;
  showMobileHeader?: boolean;
}

export function ResponsiveLayout({ 
  children, 
  mobileHeaderTitle,
  showMobileHeader = false 
}: ResponsiveLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return <DesktopLayout>{children}</DesktopLayout>;
  }

  return (
    <MobileLayout showHeader={showMobileHeader} headerTitle={mobileHeaderTitle}>
      {children}
    </MobileLayout>
  );
}
