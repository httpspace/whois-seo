import Index from "@/page-components/Index";
import { fetchPopular, fetchRecent } from "@/lib/api";

export default async function Page() {
  const [popular, recent] = await Promise.all([
    fetchPopular(),
    fetchRecent(8),
  ]);
  return (
    <Index
      initialPopular={popular ?? undefined}
      initialRecent={recent ?? undefined}
    />
  );
}
