import { getLatestNews } from "@/actions/news";
import { getYtThumbnail } from "@/lib/utils";
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
    <section className="py-16 md:py-24 bg-white" id="latest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            সর্বশেষ খবর
          </h2>
          <div className="h-1 flex-1 mx-8 bg-gray-100 rounded-full hidden md:block" />
        </div>

        <Link href={`/news/${post.id}`} className="group block">
          <div className="@container relative w-full h-[550px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-black/20">
            {/* Background Image with Zoom Effect */}
            <img
              src={
                post.photos?.[0]
                  ? post.photos[0].secure_urls
                  : getYtThumbnail(post.videos[0])
              }
              alt={post.title}
              className="object-cover transition-transform duration-1000 group-hover:scale-105 size-full"
            />

            {/* Smoother Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 lg:p-16 flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="max-w-4xl space-y-6">
                {/* Refined Badges: Glassmorphism */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-2 bg-blue-600/80 backdrop-blur-xl text-white text-[11px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/20">
                    {post?.category?.name}
                  </span>
                  <span className="px-5 py-2 bg-red-600/80 backdrop-blur-xl text-white text-[11px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/20 animate-pulse">
                    Live Updates
                  </span>
                </div>

                {/* Powerful Title */}
                <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl @sm:line-clamp-3 line-clamp-2">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-gray-100 text-sm md:text-base font-bold tracking-tight">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>
                      {post.created &&
                        format(new Date(post.created), "MMMM dd, yyyy")}
                    </span>
                  </div>
                </div>

                {/* Description: Higher legibility */}
                <p className="text-gray-100 text-lg md:text-xl line-clamp-2 md:line-clamp-3 max-w-3xl leading-relaxed font-medium">
                  {post.body}
                </p>
              </div>

              {/* Polished CTA Button */}
              <div className="hidden md:block">
                <div className="flex items-center gap-4 bg-white hover:bg-yellow-400 text-gray-900 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] group-hover:shadow-yellow-400/20 active:scale-95 leading-none">
                  Read Case Study
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
