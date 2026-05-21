import { getTrendingNews } from "@/actions/news";
import TrendingNews from "@/components/custom/trending-news";

export default async function Page() {
  const { data } = await getTrendingNews();

  return <TrendingNews data={data} hideViewAll />;
}
