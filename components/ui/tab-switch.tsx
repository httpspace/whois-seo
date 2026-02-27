import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabSwitchProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function TabSwitch({ tabs, activeTab, onTabChange, className }: TabSwitchProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeTab === tab
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
