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
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
        <h3 className="font-extrabold text-xl lg:text-2xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">শীর্ষ খবর</h3>
        <Link
          href="/top-news"
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-all hover:translate-x-0.5 uppercase tracking-wider"
        >
          View All
        </Link>
      </div>

      <div className="flex-1 grid lg:grid-rows-3 lg:grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="@container group relative w-full lg:h-full aspect-video rounded-none overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-1 ring-1 ring-slate-200 border-l-4 border-l-red-600 hover:ring-red-500"
          >
            {/* Background Image */}
            {news.photos?.length > 0 || news.videos?.length > 0 ? (
              <img
                src={
                  news.photos?.length > 0
                    ? news.photos[0]?.secure_urls
                    : getYtThumbnail(news.videos[0])
                }
                alt={news.title}
                // fill
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-slate-100" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className={"absolute bottom-0 left-0 w-full p-4 lg:p-5 z-10 flex flex-col gap-1.5"}>
              {/* Category Badge */}
              <span className={cn("inline-block px-3 py-1 bg-black text-white text-[10px] uppercase font-bold rounded-none w-fit shadow-[0_2px_10px_rgba(0,0,0,0.1)] mb-1 -skew-x-12", !news.category?.name && "hidden")}>
                <span className="skew-x-12 block">{news.category?.name}</span>
              </span>

              <h4 className="lg:text-base font-bold text-white line-clamp-1 @sm:line-clamp-2 leading-tight group-hover:text-red-400 transition-colors drop-shadow-sm">
                {news.title}
              </h4>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium mt-0.5">
                <Calendar className="w-3 h-3" />
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
