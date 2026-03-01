import { Data } from "@/types/response";
import { format } from "date-fns";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn, getYtThumbnail } from "@/lib/utils";

interface TopNewsSidebarProps {
  data: Data[];
  className?: string;
}

export default function TopNewsSidebar({
  data,
  className,
}: TopNewsSidebarProps) {
  return (
    <div className={cn("flex flex-col gap-6 h-full", className)}>
      {/* Sidebar Header: Aligned with global landing page headers */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
        <h3 className="font-black text-2xl text-gray-900 tracking-tighter">
          শীর্ষ খবর
        </h3>
        <Link
          href="/top-news"
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 hover:text-red-700 transition-colors"
        >
          All
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex-1 grid lg:grid-rows-3 lg:grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="@container group relative w-full lg:h-full aspect-video rounded-3xl md:rounded-4xl overflow-hidden shadow-lg hover:shadow-black/10 transition-all duration-500 transform hover:-translate-y-1.5"
          >
            {/* Background Image / Placeholder */}
            {news.photos?.length > 0 || news.videos?.length > 0 ? (
              <img
                src={
                  news.photos?.length > 0
                    ? news.photos[0]?.secure_urls
                    : getYtThumbnail(news.videos[0])
                }
                alt={news.title}
                className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}

            {/* Refined Cinematic Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Glassmorphism Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 bg-red-600/80 backdrop-blur-xl border border-white/20 text-white text-[9px] font-black tracking-widest uppercase rounded-full shadow-lg">
                {news.category?.name}
              </span>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-2">
              <h4 className="text-base md:text-lg font-black text-white line-clamp-2 leading-[1.15] tracking-tight group-hover:text-red-400 transition-colors">
                {news.title}
              </h4>

              {/* Date Metadata: Polished typography */}
              <div className="flex items-center gap-2 text-[10px] text-white/60 font-black uppercase tracking-[0.15em] mt-1 transition-colors group-hover:text-white/80">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {format(new Date(news.created ?? ""), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
