import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn, getYtThumbnail } from "@/lib/utils";

export default function TopNews({
  data,
  hideViewAll,
}: {
  data?: Data[];
  hideViewAll?: boolean;
}) {
  return (
    <section className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
            শীর্ষ খবর
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
          {!hideViewAll && (
            <Link
              href="/top-news"
              className="group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((news) => (
            <Link
              href={`/news/${news.id}`}
              key={news.id}
              className="group block h-full"
            >
              <article className="relative h-96 w-full rounded-none overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.15)] transition-all duration-500 transform hover:-translate-y-1.5 group-hover:ring-2 ring-white/50 border-l-4 border-l-red-600">
                {(news.photos?.length > 0 || news.videos?.length > 0) && (
                  <img
                    src={
                      news.photos?.length > 0
                        ? news.photos[0]?.secure_urls
                        : getYtThumbnail(news.videos[0])
                    }
                    alt={news.title}
                    // fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 size-full"
                  />
                )}

                {/* Strong Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className={cn("absolute top-4 left-4 z-10", !news.category?.name && "hidden")}>
                  <span className="px-4 py-1.5 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-none -skew-x-12 shadow-[0_4px_10px_rgba(237,28,36,0.3)] inline-block">
                    <span className="skew-x-12 block">{news.category?.name}</span>
                  </span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(news.created), "PPP")}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                    {news.title}
                  </h3>

                  {/* Read More Link */}
                  <div className="flex items-center text-white/90 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
