import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ThemeOption = "light" | "dark" | "system";

const themeOptions: { value: ThemeOption; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted">
        {themeOptions.map((option) => (
          <div
            key={option.value}
            className="p-1.5 rounded-md"
          >
            <option.icon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-lg bg-muted">
      {themeOptions.map((option) => {
        const isActive = theme === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "p-1.5 rounded-md transition-all duration-150",
              isActive
                ? "bg-card shadow-subtle text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            title={option.label}
          >
            <option.icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}

// Compact version for mobile
export function ThemeToggleCompact() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-md text-muted-foreground">
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;
  const isSystem = theme === "system";

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "p-2 rounded-md transition-colors",
        "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
      title={`Theme: ${theme}`}
    >
      <div className="relative">
        <CurrentIcon className="w-4 h-4" />
        {isSystem && (
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
        )}
      </div>
    </button>
  );
}