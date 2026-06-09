import { getTopNews } from "@/actions/news";
import TopNews from "@/components/custom/top-news";

export const revalidate = 600;

export default async function Page() {
  const data = await getTopNews();

  return <TopNews data={data?.data?.slice(0, 7)} />;
}
