import { getViews, getYtThumbnail } from "@/lib/utils";
import { Data } from "@/types/response";
import { Eye, TrendingUp, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function TrendingNews({
  data,
  hideViewAll,
}: {
  data?: Data[];
  hideViewAll?: boolean;
}) {
  return (
    <section className="py-16 md:py-24 bg-white" id="trending">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Aligned with the rest of the landing page */}
        <div className="flex items-center mb-16">
          <TrendingUp className="h-10 w-10 text-red-600 mr-4" />
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            বর্তমানে জনপ্রিয়
          </h2>
          <div className="h-1 flex-1 mx-8 bg-gray-100 rounded-full hidden md:block" />
          {!hideViewAll && (
            <Link
              href={"/trending-news"}
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((post, index) => (
            <Link
              href={`/news/${post.id}`}
              key={post.id}
              className="group block h-full"
            >
              <article className="relative h-[380px] w-full rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-black/10 transition-all duration-500 transform hover:-translate-y-2">
                {/* Full Background Media */}
                {(post.photos?.length > 0 || post.videos?.length > 0) && (
                  <img
                    src={
                      post.photos?.length > 0
                        ? post.photos[0].secure_urls
                        : getYtThumbnail(post.videos[0])
                    }
                    alt={post.title}
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 size-full"
                  />
                )}

                {/* Smoother Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Top Badges: Glassmorphism */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  <span className="self-start px-4 py-1.5 bg-red-600/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                    {post.category?.name}
                  </span>
                </div>

                {/* Ranking Badge: Premium Glass */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-lg rounded-full shadow-2xl">
                    #{index + 1}
                  </span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col gap-4">
                  {/* Meta Row: Polished typography */}
                  <div className="flex items-center gap-4 text-gray-200 text-[11px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-400" />
                      <span>
                        {getViews({
                          published_on: post.published_on,
                          seed: post.body,
                        })}{" "}
                        views
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <div className="flex items-center gap-2 text-orange-400 group-hover:animate-pulse">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending</span>
                    </div>
                  </div>

                  {/* Title: Massively High Contrast */}
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight line-clamp-2 transition-colors group-hover:text-red-400 tracking-tight">
                    {post.title}
                  </h3>

                  {/* Date Metadata */}
                  <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest pt-1 border-t border-white/10">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(post.published_on), "PPP")}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
