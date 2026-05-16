import { getCategoryWiseNews } from "@/actions/news";
import { getYtThumbnail } from "@/lib/utils";
import Link from "next/link";

export default async function Page() {
  const categories = await getCategoryWiseNews();

  // Flatten all articles and remove duplicates by ID
  const allArticles = Array.from(
    new Map(
      categories.flatMap((cat) => cat.articles).map((art) => [art.id, art]),
    ).values(),
  );

  const totalArticles = allArticles.slice(0, 16);
  const columns = [
    totalArticles.slice(0, 4),
    totalArticles.slice(4, 8),
    totalArticles.slice(8, 12),
    totalArticles.slice(12, 16),
  ];

  return (
    <section className="py-12 pb-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-10">
          <h2 className="text-4xl font-serif font-black text-gray-900 border-b-[4px] border-accent pb-1 tracking-tight">
            News
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-8">
              {col.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.id}`}
                  className="group block space-y-4"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                    <img
                      src={
                        post.photos?.[0]
                          ? post.photos[0].secure_urls
                          : getYtThumbnail(post.videos?.[0])
                      }
                      alt={post.title}
                      className="object-cover size-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl h-12 font-serif font-bold text-gray-900 leading-tight group-hover:text-accent transition-colors line-clamp-3 px-1">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Centered View More Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/news"
            className="border border-accent px-12 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
