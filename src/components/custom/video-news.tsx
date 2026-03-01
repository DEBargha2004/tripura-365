import { getViews } from "@/lib/utils";
import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar, Eye, Play } from "lucide-react";
import Link from "next/link";

export default function VideoNews({
  data,
  hideShowAll,
}: {
  data?: Data[];
  hideShowAll?: boolean;
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Aligned with Latest/Category */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            ভিডিও সংবাদ
          </h2>
          <div className="h-1 flex-1 mx-8 bg-gray-100 rounded-full hidden md:block" />
          {!hideShowAll && (
            <Link
              href={"video-news"}
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
            >
              Watch All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((news) => (
            <Link
              href={`/news/${news.id}`}
              key={news.id}
              className="group block h-full"
            >
              <article className="relative h-[380px] w-full rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-black/10 transition-all duration-500 transform hover:-translate-y-2 bg-black">
                {/* Full Background Video (Iframe) */}
                {news.videos?.[0] && (
                  <iframe
                    src={`https://www.youtube.com/embed/${news.videos[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${news.videos[0]}`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Glassmorphism Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-red-600/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                    <Play className="w-3 h-3 fill-current" />
                    Video
                  </span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col gap-4">
                  {/* Metadata: Polished typography */}
                  <div className="flex items-center gap-4 text-gray-200 text-[11px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span>
                        {getViews({
                          published_on: news.published_on,
                          seed: news.body,
                        })}{" "}
                        views
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>
                        {format(new Date(news.published_on), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  {/* Title: Massively Impactful */}
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight line-clamp-2 transition-colors group-hover:text-red-400 tracking-tight">
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
