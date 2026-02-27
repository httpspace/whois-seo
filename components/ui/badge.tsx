import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        // Category variants - uses CSS variables that adjust for dark mode
        tech: "border-transparent bg-category-tech/12 text-category-tech dark:bg-category-tech/15",
        business: "border-transparent bg-category-business/12 text-category-business dark:bg-category-business/15",
        media: "border-transparent bg-category-media/12 text-category-media dark:bg-category-media/15",
        ecommerce: "border-transparent bg-category-ecommerce/12 text-category-ecommerce dark:bg-category-ecommerce/15",
        finance: "border-transparent bg-category-finance/12 text-category-finance dark:bg-category-finance/15",
        social: "border-transparent bg-category-social/12 text-category-social dark:bg-category-social/15",
        // Signal variants
        signalHigh: "border-transparent bg-signal-high/12 text-signal-high dark:bg-signal-high/15",
        signalMedium: "border-transparent bg-signal-medium/12 text-signal-medium dark:bg-signal-medium/15",
        signalLow: "border-transparent bg-signal-low/12 text-signal-low dark:bg-signal-low/15",
        // Vibe variants - typographic differentiation, dark mode aware
        vibeAi: "border border-foreground/12 bg-transparent text-foreground font-semibold dark:border-foreground/10",
        vibeAttention: "border border-dashed border-foreground/15 bg-transparent text-foreground dark:border-foreground/12",
        vibeEstablished: "border-transparent bg-muted text-muted-foreground",
        vibeRadar: "border-transparent bg-transparent text-muted-foreground italic",
        vibeDormant: "border-transparent bg-transparent text-tertiary line-through decoration-tertiary/40",
        vibeSensitive: "border border-foreground/8 bg-transparent text-muted-foreground dark:border-foreground/6",
        vibeAging: "border-transparent bg-muted/60 text-muted-foreground dark:bg-muted/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };