import { getAllCategories, getCategoryWiseNews } from "@/actions/news";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getYtThumbnail, cn } from "@/lib/utils";
import { categoriesOrder } from "@/constants/categories-order";
import { Data } from "@/types/response";
import { LiveScorecardWidget } from "@/components/custom/live-scorecard-widget";

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
        <div className="flex items-center justify-between mb-16 border-b-2 border-slate-100 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
              <span className="w-3 h-10 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
              বিভাগভিত্তিক খবর
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-7">
              Janamat Category Network
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
          {sortCategories(res ?? [])?.map((category) => {
            const isSports =
              category.name === "Sports" || category.name === "খেলাধুলা";
            return (
              <div
                key={category.name}
                className={cn(
                  "flex flex-col gap-8",
                  isSports &&
                    "bg-slate-900 p-8 lg:p-12 -mx-4 lg:-mx-12 text-white shadow-2xl relative overflow-hidden",
                )}
              >
                {isSports && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
                )}

                {/* Category Header */}
                <div
                  className={cn(
                    "flex items-center justify-between border-b pb-6",
                    isSports ? "border-white/10" : "border-slate-100",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-8 bg-red-600" />
                    <h3
                      className={cn(
                        "text-2xl md:text-3xl font-black tracking-tight",
                        isSports ? "text-white" : "text-slate-900",
                      )}
                    >
                      {category.name}
                    </h3>
                  </div>
                  <Link
                    href={`/category/${getCategoryByName(category.name).id}`}
                    className={cn(
                      "group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                      isSports
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-400 hover:text-red-600",
                    )}
                  >
                    View All
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {isSports && (
                  <div className="mb-4">
                    <LiveScorecardWidget />
                  </div>
                )}

                {/* Articles Feed */}
                <div className="flex flex-col gap-10">
                  {/* Elite Featured Card (Stacked) */}
                  {category.articles?.[0] && (
                    <Link
                      href={`/news/${category.articles[0].id}`}
                      className="group block"
                    >
                      <article className="flex flex-col bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700 group relative ring-1 ring-slate-100">
                        {/* Image Wrap */}
                        <div className="aspect-video overflow-hidden relative">
                          {(category.articles[0]?.photos?.length > 0 ||
                            category.articles[0]?.videos?.length > 0) && (
                            <img
                              src={
                                category.articles[0]?.photos?.length > 0
                                  ? category.articles[0].photos[0]?.secure_urls
                                  : getYtThumbnail(
                                      category.articles[0].videos[0],
                                    )
                              }
                              alt={category.articles[0].title}
                              className="object-cover transition-transform duration-1000 group-hover:scale-105 size-full grayscale-[0.2] group-hover:grayscale-0"
                            />
                          )}

                          {/* Glassmorphism Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <div className="px-4 py-1.5 bg-black/80 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                              Featured Story
                            </div>
                          </div>

                          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
                        </div>

                        {/* Content Area */}
                        <div
                          className={cn(
                            "p-8 flex flex-col items-start bg-white relative",
                            isSports && "text-slate-900",
                          )}
                        >
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-l-2 border-red-600 pl-4">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {format(
                                new Date(category.articles[0].published_on),
                                "MMM d, yyyy",
                              )}
                            </span>
                          </div>

                          <h4 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-2 leading-tight tracking-tight mb-6 group-hover:text-red-600 transition-colors duration-300">
                            {category.articles[0].title}
                          </h4>

                          <div className="mt-auto pt-6 border-t border-slate-50 w-full flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                              Janamat Digital
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 group-hover:text-red-600 transition-all">
                              PLAY <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>

                        {/* Signal Strip */}
                        <div className="absolute top-0 right-0 w-1.5 h-0 bg-red-600 group-hover:h-full transition-all duration-700" />
                      </article>
                    </Link>
                  )}

                  {/* List of sub-stories */}
                  <div className="space-y-4">
                    {category.articles?.slice(1, 4).map((article) => (
                      <Link
                        href={`/news/${article.id}`}
                        key={article.id}
                        className="group block"
                      >
                        <article
                          className={cn(
                            "flex gap-6 items-center p-4 border-b border-transparent hover:border-slate-100 transition-all duration-500 relative overflow-hidden group/item",
                            isSports
                              ? "hover:bg-white/5 border-white/5"
                              : "hover:bg-slate-50 border-slate-50",
                          )}
                        >
                          {/* Small Thumbnail */}
                          <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-slate-100 ring-1 ring-slate-100 group-hover/item:ring-red-600/30 transition-all">
                            {(article.photos?.length > 0 ||
                              article.videos?.length > 0) && (
                              <img
                                src={
                                  article.photos?.length > 0
                                    ? article.photos[0]?.secure_urls
                                    : getYtThumbnail(article.videos[0])
                                }
                                alt={article.title}
                                className="object-cover grayscale-[0.5] group-hover/item:grayscale-0 transition-all duration-700 size-full"
                              />
                            )}
                          </div>

                          {/* Text content */}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={cn(
                                "text-base font-bold line-clamp-2 leading-snug tracking-tight mb-2 transition-colors",
                                isSports
                                  ? "text-slate-100 group-hover/item:text-red-400"
                                  : "text-slate-900 group-hover/item:text-red-600",
                              )}
                            >
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <Clock className="w-3 h-3" />
                              <span>
                                {format(
                                  new Date(article.published_on),
                                  "MMM d",
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Horizontal Signal Strip for List */}
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 group-hover/item:w-full transition-all duration-500" />
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
