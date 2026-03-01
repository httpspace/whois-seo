import CategoryDetailPage from "@/page-components/CategoryDetail";

const CATEGORY_IDS = ["tech", "business", "media", "ecommerce", "finance", "social"];

export function generateStaticParams() {
  return CATEGORY_IDS.map(categoryId => ({ categoryId }));
}

export default function Page() {
  return <CategoryDetailPage />;
}
