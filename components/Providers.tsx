'use client'

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";
import { useAppStore } from "@/store/appStore";

// Rehydrates Zustand stores from localStorage, evicts expired JWTs,
// and loads followedDomains from D1 if the user is logged in.
function StoreRehydrator() {
  useEffect(() => {
    const init = async () => {
      await Promise.all([
        useAppStore.persist.rehydrate(),
        useAuthStore.persist.rehydrate(),
      ]);
      useAuthStore.getState().checkAndClearExpired();
      // followedDomains is D1-authoritative: load from server on every mount
      if (useAuthStore.getState().isLoggedIn) {
        useAppStore.getState().syncFollowsFromServer();
      }
    };
    init();
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <StoreRehydrator />
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
