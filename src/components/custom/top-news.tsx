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
        <div className="flex items-center justify-between mb-16 border-b-2 border-slate-100 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
              <span className="w-3 h-10 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
              শীর্ষ খবর
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-7">
              Executive Editorial Feed
            </p>
          </div>
          {!hideViewAll && (
            <Link
              href="/top-news"
              className="group flex items-center gap-3 text-xs font-black text-slate-400 hover:text-red-600 transition-all uppercase tracking-widest border-2 border-slate-100 px-6 py-3 hover:border-red-600"
            >
              View Full Feed
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <article className="flex flex-col bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group relative ring-1 ring-slate-100">
                {/* Visual Component */}
                <div className="aspect-video overflow-hidden relative">
                  {(news.photos?.length > 0 || news.videos?.length > 0) && (
                    <img
                      src={
                        news.photos?.length > 0
                          ? news.photos[0]?.secure_urls
                          : getYtThumbnail(news.videos[0])
                      }
                      alt={news.title}
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 size-full grayscale-[0.2] group-hover:grayscale-0"
                    />
                  )}

                  {/* Glassmorphism Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-4 py-1.5 bg-black/80 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(237,28,36,0.6)]" />
                      {news.category?.name || "EDITORIAL"}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Content Component */}
                <div className="p-8 lg:p-10 flex flex-col flex-1 relative bg-white">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      {news.created &&
                        format(new Date(news.created), "MMM d, yyyy")}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-2 h-16 leading-tight tracking-tight mb-8 group-hover:text-red-600 transition-colors duration-300">
                    {news.title}
                  </h3>

                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-widest">
                      Read Story
                    </span>
                    <div className="p-3 bg-slate-900 text-white group-hover:bg-red-600 transition-all duration-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Interactive Signal Strip */}
                <div className="absolute top-0 right-0 w-1.5 h-0 bg-red-600 group-hover:h-full transition-all duration-700" />
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
