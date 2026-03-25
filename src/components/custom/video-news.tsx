import { getViews } from "@/lib/utils";
import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar, Eye } from "lucide-react";
import Link from "next/link";

export default function VideoNews({
  data,
  hideShowAll,
}: {
  data?: Data[];
  hideShowAll?: boolean;
}) {
  return (
    <section className="py-12 md:py-20 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
            ভিডিও সংবাদ
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
          {!hideShowAll && (
            <Link
              href={"video-news"}
              className="group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Watch All
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
              <article className="relative h-96 w-full rounded-none overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_-15px_rgb(0,0,0,0.15)] transition-all duration-500 transform hover:-translate-y-1.5 bg-slate-900 group-hover:ring-2 ring-white/30 border-l-4 border-l-red-600">
                {/* Full Background Video (Iframe) */}
                {news.videos?.[0] && (
                  <iframe
                    src={`https://www.youtube.com/embed/${news.videos[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${news.videos[0]}`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {/* Strong Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500" />

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-3">
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-gray-300 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>
                        {getViews({
                          published_on: news.published_on,
                          seed: news.body,
                        })}{" "}
                        views
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-none transform rotate-45" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{format(new Date(news.published_on), "PPP")}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                    {news.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
