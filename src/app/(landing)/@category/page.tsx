import { getAllCategories, getCategoryWiseNews } from "@/actions/news";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
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
    <section className="py-12 md:py-20 bg-white" id="category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
            বিভাগভিত্তিক খবর
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {sortCategories(res ?? [])?.map((category) => (
            <div key={category.name} className="flex flex-col gap-6">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_10px_rgba(237,28,36,0.4)]" />
                  <h3 className="text-2xl font-bold text-slate-800">
                    {category.name}
                  </h3>
                </div>
                <Link
                  href={`/category/${getCategoryByName(category.name).id}`}
                  className="group flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Articles */}
              <div className="space-y-6">
                {/* Featured Article (First one) */}
                {category.articles?.[0] && (
                  <Link
                    href={`/news/${category.articles[0].id}`}
                    className="group block"
                  >
                    <article className="relative h-72 w-full rounded-none overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 transform hover:-translate-y-1.5 group group-hover:ring-2 ring-white/70 border-l-[6px] border-red-600">
                      {(category.articles[0]?.photos?.length > 0 ||
                        category.articles[0]?.videos?.length > 0) && (
                        <img
                          src={
                            category.articles[0]?.photos?.length > 0
                              ? category.articles[0].photos[0]?.secure_urls
                              : getYtThumbnail(category.articles[0].videos[0])
                          }
                          alt={category.articles[0].title}
                          // fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 size-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Optional Top Badge for Featured */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold rounded-none -skew-x-12 shadow-[0_2px_10px_rgba(0,0,0,0.1)] uppercase tracking-wider inline-block">
                          <span className="skew-x-12 block">Featured</span>
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10 flex flex-col gap-1">
                        <h4 className="text-xl font-bold text-white line-clamp-2 mb-3 group-hover:text-red-400 transition-colors leading-snug">
                          {category.articles[0].title}
                        </h4>
                        <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {format(
                              new Date(category.articles[0].published_on),
                              "PPP",
                            )}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* List of other articles */}
                <div className="space-y-5">
                  {category.articles?.slice(1, 4).map((article) => (
                    <Link
                      href={`/news/${article.id}`}
                      key={article.id}
                      className="group block"
                    >
                      <article className="group/item flex gap-5 items-center p-3.5 -mx-3.5 rounded-none hover:bg-slate-50 hover:shadow-[0_2px_15px_rgba(0,0,0,0.03)] transition-all duration-300 border-l-[3px] border-l-transparent hover:border-l-red-600 cursor-pointer">
                        <div className="relative w-32 h-20 shrink-0 rounded-none overflow-hidden shadow-sm group-hover/item:shadow-md transition-all duration-300 ring-1 ring-slate-900/5">
                          {(article.photos?.length > 0 ||
                            article.videos?.length > 0) && (
                            <img
                              src={
                                article.photos?.length > 0
                                  ? article.photos[0]?.secure_urls
                                  : getYtThumbnail(article.videos[0])
                              }
                              alt={article.title}
                              // fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300 size-full"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                          <h4 className="text-base font-bold text-slate-800 line-clamp-2 group-hover/item:text-red-600 transition-colors mb-1.5 leading-snug">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium group-hover/item:text-slate-700 transition-colors">
                            <Clock className="w-3.5 h-3.5" />
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
