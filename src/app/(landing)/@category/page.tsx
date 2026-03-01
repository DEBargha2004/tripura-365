import { getAllCategories, getCategoryWiseNews } from "@/actions/news";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { getYtThumbnail } from "@/lib/utils";
import { categoriesOrder } from "@/constants/categories-order";
import { Data } from "@/types/response";

type CategoryWiseNews = {
  name: string;
  articles: Data[];
};
const sortCategories = (cat: CategoryWiseNews[]) => {
  return categoriesOrder.reduce<CategoryWiseNews[]>((acc, name) => {
    const found = cat.find((c) => c.name === name);
    if (found) {
      acc.push(found);
    }
    return acc;
  }, []);
};

export default async function Page() {
  const res = await getCategoryWiseNews();
  const category_res = await getAllCategories();

  const getCategoryByName = (name: string) => {
    return category_res.find((cat) => cat.name === name)!;
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header: Aligned with Latest post */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            বিভাগভিত্তিক খবর
          </h2>
          <div className="h-1 flex-1 mx-8 bg-gray-100 rounded-full hidden md:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
          {sortCategories(res ?? [])?.map((category) => (
            <div key={category.name} className="flex flex-col gap-8">
              {/* Category Header: More sophisticated border */}
              <div className="flex items-center justify-between border-b-2 border-gray-100 pb-5">
                <div className="flex items-center gap-4">
                  <span className="w-2 h-8 bg-blue-600 rounded-full" />
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                    {category.name}
                  </h3>
                </div>
                <Link
                  href={`/category/${getCategoryByName(category.name).id}`}
                  className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

              {/* Articles Grid */}
              <div className="space-y-8">
                {/* Featured Article Card: Mirroring Latest Post style */}
                {category.articles?.[0] && (
                  <Link
                    href={`/news/${category.articles[0].id}`}
                    className="group block"
                  >
                    <article className="relative h-[380px] w-full rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-black/10 transition-all duration-500 transform hover:-translate-y-1">
                      {(category.articles[0]?.photos?.length > 0 ||
                        category.articles[0]?.videos?.length > 0) && (
                        <img
                          src={
                            category.articles[0]?.photos?.length > 0
                              ? category.articles[0].photos[0]?.secure_urls
                              : getYtThumbnail(category.articles[0].videos[0])
                          }
                          alt={category.articles[0].title}
                          className="object-cover transition-transform duration-1000 group-hover:scale-105 size-full"
                        />
                      )}

                      {/* Gradient Overlay for card */}
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Glassmorphism Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                          Featured
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h4 className="text-2xl font-black text-white line-clamp-2 mb-3 group-hover:text-blue-400 transition-colors leading-[1.15] tracking-tight">
                          {category.articles[0].title}
                        </h4>
                        <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-white/80">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>
                            {format(
                              new Date(category.articles[0].published_on),
                              "MMMM dd, yyyy",
                            )}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* List of other articles: Cleaned up and polished */}
                <div className="space-y-6">
                  {category.articles?.slice(1, 4).map((article) => (
                    <Link
                      href={`/news/${article.id}`}
                      key={article.id}
                      className="group block"
                    >
                      <article className="flex gap-6 items-center p-2 -mx-2 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                        <div className="relative w-32 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                          {(article.photos?.length > 0 ||
                            article.videos?.length > 0) && (
                            <img
                              src={
                                article.photos?.length > 0
                                  ? article.photos[0]?.secure_urls
                                  : getYtThumbnail(article.videos[0])
                              }
                              alt={article.title}
                              className="object-cover group-hover:scale-110 transition-transform duration-700 size-full"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-lg font-black text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-all duration-300 mb-2 leading-[1.2] tracking-tight">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                              {format(
                                new Date(article.published_on),
                                "MMM d, yyyy",
                              )}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
