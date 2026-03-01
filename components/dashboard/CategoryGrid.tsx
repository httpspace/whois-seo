import { Link } from "@/lib/router-compat";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { id: "tech", label: "Technology", count: 156, color: "tech" as const },
  { id: "business", label: "Business", count: 89, color: "business" as const },
  { id: "media", label: "Media", count: 67, color: "media" as const },
  { id: "ecommerce", label: "E-commerce", count: 45, color: "ecommerce" as const },
  { id: "finance", label: "Finance", count: 34, color: "finance" as const },
  { id: "social", label: "Social", count: 28, color: "social" as const },
];

export function CategoryGrid() {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-medium text-tertiary uppercase tracking-wide">Browse by space</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={cn(
              "group p-3 rounded-lg bg-card border border-border",
              "hover:shadow-subtle hover:border-border/80 transition-all duration-200",
              "active:scale-[0.98]"
            )}
          >
            <Badge variant={category.color} className="text-2xs mb-2">
              {category.label}
            </Badge>
            <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.count}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}