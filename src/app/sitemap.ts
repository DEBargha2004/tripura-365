import {
  getAllCategories,
  getCategoryWiseNews,
  getLatestNews,
  getTopNews,
  getTrendingNews,
} from "@/actions/news";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripura365.com";

  // Fetch all necessary data
  const categories = await getAllCategories();
  const topNews = await getTopNews();
  const latestNews = await getLatestNews();
  const trendingNews = await getTrendingNews();
  const catWiseNews = await getCategoryWiseNews();

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1,
    },
  ];

  // Category routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Article routes - Collect unique IDs
  const newsSet = new Set<number>();
  topNews?.forEach((news) => newsSet.add(news.id));
  latestNews?.forEach((news) => newsSet.add(news.id));
  trendingNews?.forEach((news) => newsSet.add(news.id));
  catWiseNews?.forEach((cat) =>
    cat.articles.forEach((news) => newsSet.add(news.id)),
  );

  const articleRoutes = Array.from(newsSet).map((id) => ({
    url: `${baseUrl}/news/${id}`,
    lastModified: new Date(), // Ideally we'd have the specific last modified date per article
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...articleRoutes];
}
