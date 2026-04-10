import { Data } from "@/types/response";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Image from "next/image";
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
    <div className={cn("flex flex-col gap-4 h-full", className)}>
      <div className="flex items-center justify-between pb-6 border-b-2 border-slate-100 mb-8">
        <div className="space-y-1">
          <h3 className="font-black text-2xl lg:text-3xl text-slate-900 tracking-tighter flex items-center gap-3">
            <span className="w-2 h-7 bg-red-600 block" />
            শীর্ষ খবর
          </h3>
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] ml-5">
            Editor's Choice
          </p>
        </div>
        <Link
          href="/top-news"
          className="text-[9px] font-black text-slate-400 hover:text-red-600 transition-all uppercase tracking-[0.2em]"
        >
          View All
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((news, index) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="group flex gap-4 p-6 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 items-start relative overflow-hidden"
          >
            {/* Elite Numbering */}
            <div className="text-6xl font-black text-slate-50 group-hover:text-red-500/5 transition-colors duration-700 absolute -top-2 -left-2 select-none leading-none z-0">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>

            <div className="flex-1 flex flex-col gap-3 relative z-10 pl-4 border-l-2 border-slate-50 group-hover:border-red-600/20 transition-colors">
              {/* "Live" Category Badge */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(237,28,36,0.6)]" />
                <span
                  className={cn(
                    "text-[10px] uppercase font-black text-red-600 tracking-[0.15em]",
                    !news.category?.name && "hidden",
                  )}
                >
                  {news.category?.name}
                </span>
              </div>

              <h4 className="text-sm md:text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors duration-300 tracking-tight">
                {news.title}
              </h4>

              <div className="flex items-center gap-2 text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-auto">
                <Calendar className="w-3 h-3 text-slate-200" />
                <span>
                  {format(new Date(news.created ?? ""), "MMM d, yyyy")}
                </span>
              </div>
            </div>

            {/* Elite Thumbnail Wrap */}
            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden relative shadow-inner ring-1 ring-slate-100 bg-slate-50">
              {news.photos?.length > 0 || news.videos?.length > 0 ? (
                <img
                  src={
                    news.photos?.length > 0
                      ? news.photos[0]?.secure_urls
                      : getYtThumbnail(news.videos[0])
                  }
                  alt={news.title}
                  className="size-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-slate-100" />
              )}
              {/* Thumbnail Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Interactive Vertical Signal */}
            <div className="absolute top-0 right-0 w-1 h-0 bg-red-600 group-hover:h-full transition-all duration-700" />
          </Link>
        ))}
      </div>
    </div>
  );
}
