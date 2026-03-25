import { getLatestNews } from "@/actions/news";
import { cn, getYtThumbnail } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 600;

export default async function Page() {
  const data = await getLatestNews();
  const [post] = data ?? [];

  if (!post) return null;

  return (
    <section className="py-12 md:py-20 bg-white" id="latest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
            সর্বশেষ খবর
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
        </div>

        <Link href={`/news/${post.id}`} className="group block">
          <div className="@container relative w-full h-[500px] md:h-[600px] rounded-none border-t-8 border-t-red-600 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-700">
            {/* Background Image with Zoom Effect */}

            <img
              src={
                post.photos?.[0]
                  ? post.photos[0].secure_urls
                  : getYtThumbnail(post.videos[0])
              }
              alt={post.title}
              // fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 size-full"
              // priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6 z-10">
              <div className="max-w-3xl space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn("px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold rounded-none -skew-x-12 shadow-[0_4px_10px_rgba(0,0,0,0.1)]", !post.category?.name && "hidden")}>
                    <span className="skew-x-12 block">{post?.category?.name}</span>
                  </span>
                  <span className="px-6 py-2 bg-red-600 text-white text-sm font-bold tracking-wide rounded-none -skew-x-12 shadow-[0_0_15px_rgba(237,28,36,0.5)] animate-pulse border border-white/20">
                    <span className="skew-x-12 block">Latest</span>
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg @sm:line-clamp-3 line-clamp-1">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-slate-200 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {post.created && format(new Date(post.created), "PPP")}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-lg line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
                  {post.body}
                </p>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block shrink-0">
                <button className="text-nowrap flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-900 px-8 py-4 rounded-none border-b-4 border-b-red-600 font-bold transition-all duration-300 hover:bg-white hover:scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]">
                  Read Full Article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
