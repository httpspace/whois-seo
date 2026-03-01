'use client'

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/authStore";
import { useAppStore } from "@/store/appStore";

// Rehydrates Zustand stores from localStorage and evicts expired JWTs.
// Must be a child component so it runs after client hydration.
function StoreRehydrator() {
  useEffect(() => {
    useAppStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
    // After rehydrating, evict any expired session
    useAuthStore.getState().checkAndClearExpired();
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
