"use client";
import { cn, getViews } from "@/lib/utils";
import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar, Eye, PlayCircle, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function VideoCard({ news }: { news: Data }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/news/${news.id}`}
      className="group block h-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="flex flex-col bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group relative ring-1 ring-slate-100">
        {/* Visual Component (Stacked Top) */}
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          {isHovered && news.videos?.[0] ? (
            <iframe
              src={`https://www.youtube.com/embed/${news.videos[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${news.videos[0]}`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.35]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={`https://img.youtube.com/vi/${news.videos?.[0]}/maxresdefault.jpg`}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                alt="Video Thumbnail"
              />
              <div className="relative z-10 p-5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 group-hover:bg-red-600 transition-all duration-500 shadow-2xl">
                <PlayCircle className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          )}

          {/* Elite Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="px-4 py-1.5 bg-black/80 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(237,28,36,0.6)]" />
              Watch Now
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Content Component (Stacked Bottom) */}
        <div className="p-8 lg:p-10 flex flex-col flex-1 relative bg-white">
          {/* Metadata Sidebar Line */}
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-4">
            <span className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-red-600" />
              Exclusive Video
            </span>
            <span className="w-1 h-1 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {news.published_on &&
                format(new Date(news.published_on), "MMM dd")}
            </span>
          </div>

          {/* Title - Line Clamped for Grid consistency */}
          <h3 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-2 h-16 leading-tight tracking-tight mb-8 group-hover:text-red-600 transition-colors duration-300">
            {news.title}
          </h3>

          {/* Elite Footer */}
          <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-slate-200" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {getViews({
                  published_on: news.published_on,
                  seed: news.body,
                }).toLocaleString()}{" "}
                views
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 group-hover:text-red-600 transition-all">
              PLAY NOW <ArrowRight className="w-3 h-3 translate-y-px" />
            </div>
          </div>
        </div>

        {/* Interactive Vertical Signal */}
        <div className="absolute top-0 right-0 w-1.5 h-0 bg-red-600 group-hover:h-full transition-all duration-700" />
      </article>
    </Link>
  );
}

export default function VideoNews({
  data,
  hideShowAll,
}: {
  data?: Data[];
  hideShowAll?: boolean;
}) {
  return (
    <section
      className="py-12 md:py-24 bg-white relative overflow-hidden"
      id="video-news"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elite Section Header */}
        <div className="flex items-center justify-between mb-16 border-b-2 border-slate-100 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
              <span className="w-3 h-10 bg-red-600 block" />
              ভিডিও সংবাদ
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-7">
              Janamat Digital Network
            </p>
          </div>
          {!hideShowAll && (
            <Link
              href={"video-news"}
              className="group flex items-center gap-3 text-xs font-black text-slate-400 hover:text-red-600 transition-all uppercase tracking-widest border-2 border-slate-100 px-6 py-3 hover:border-red-600"
            >
              Watch All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((news) => (
            <VideoCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
}
