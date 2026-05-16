import { getCategoryWiseNews } from "@/actions/news";
import { getYtThumbnail } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 600;

export default async function NewsPage() {
  const categories = await getCategoryWiseNews();

  // Flatten all articles and remove duplicates by ID
  const allArticles = Array.from(
    new Map(
      categories.flatMap((cat) => cat.articles).map((art) => [art.id, art]),
    ).values(),
  );

  const colCount = 4;
  const columns = Array.from({ length: colCount }, (_, i) =>
    allArticles.filter((_, idx) => idx % colCount === i),
  );

  return (
    <div className="bg-white min-h-screen">
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h1 className="text-6xl md:text-7xl font-serif font-black text-gray-900 tracking-tighter uppercase mb-4">
              All News
            </h1>
            <div className="w-24 h-1 bg-accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-12">
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
                    <div className="space-y-2">
                      <h3 className="text-xl h-12 font-serif font-bold text-gray-900 leading-tight group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
