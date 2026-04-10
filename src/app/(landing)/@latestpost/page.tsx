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
    <section className="py-12 md:py-20 bg-slate-50/50" id="latest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16 border-b-2 border-slate-100 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
              <span className="w-3 h-10 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
              সর্বশেষ খবর
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-7">
              Janamat Real-time Coverage
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-2 border-slate-50 px-6 py-3">
            Live Updates{" "}
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping shadow-[0_0_10px_rgba(237,28,36,0.5)]" />
          </div>
        </div>

        <Link href={`/news/${post.id}`} className="group block w-full">
          <article className="flex flex-col lg:flex-row bg-white overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_120px_rgba(0,0,0,0.12)] transition-all duration-1000 group relative ring-1 ring-slate-100">
            {/* Image Side (68%) */}
            <div className="w-full lg:w-[68%] aspect-video lg:aspect-auto overflow-hidden relative">
              {(post.photos?.length > 0 || post.videos?.length > 0) && (
                <img
                  src={
                    post.photos?.length > 0
                      ? post.photos[0].secure_urls
                      : getYtThumbnail(post.videos[0])
                  }
                  alt={post.title}
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 size-full"
                />
              )}

              {/* Premium Floating Badges */}
              <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                <div className="px-5 py-2 bg-black/80 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(237,28,36,0.8)]" />
                  Live Breaking
                </div>
                <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                  Featured Story
                </div>
              </div>

              {/* Gradient Overlay for integration */}
              <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Content Side (32%) */}
            <div className="w-full lg:w-[32%] p-10 md:p-14 lg:p-16 flex flex-col justify-center relative bg-white">
              {/* Category & Order Flag */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.25em] relative">
                  {post?.category?.name || "LATEST"}
                  <span className="absolute -bottom-2 left-0 w-8 h-[3px] bg-red-600" />
                </span>
                <span className="text-[10px] font-bold text-slate-200">
                  #01 Headline
                </span>
              </div>

              {/* Title - Increased Authority */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8 group-hover:text-red-600 transition-colors duration-500">
                {post.title}
              </h3>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100 mb-8" />

              {/* Meta & Excerpt */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {post.created &&
                      format(new Date(post.created), "MMM d, yyyy")}
                  </span>
                </div>
                <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-4 font-medium italic">
                  "{post.body}"
                </p>
              </div>

              {/* Premium Footer Action */}
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Exclusive coverage
                  </span>
                  <span className="text-xs font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    JANAMAT NEWS
                  </span>
                </div>
                <div className="p-4 bg-slate-900 text-white group-hover:bg-red-600 transition-all duration-500 rotate-45 group-hover:rotate-0">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* Interactive Vertical Signal */}
            <div className="absolute top-0 right-0 w-1.5 h-0 bg-red-600 group-hover:h-full transition-all duration-700" />
          </article>
        </Link>
      </div>
    </section>
  );
}
