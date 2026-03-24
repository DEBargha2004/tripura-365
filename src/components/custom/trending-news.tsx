import { cn, getViews, getYtThumbnail } from "@/lib/utils";
import { Data } from "@/types/response";
import { Eye, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrendingNews({
  data,
  hideViewAll,
}: {
  data?: Data[];
  hideViewAll?: boolean;
}) {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <TrendingUp className="h-8 w-8 text-rose-600 mr-3" />
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
            বর্তমানে জনপ্রিয়
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
          {!hideViewAll && (
            <div>
              <Link href={"/trending-news"}>
                <p className="group flex items-center gap-2 text-rose-600 font-semibold hover:text-rose-700 transition-colors">View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></p>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((post, index) => (
            <Link
              href={`/news/${post.id}`}
              key={post.id}
              className="group block h-full"
            >
              <article className="relative h-96 w-full rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.15)] transition-all duration-500 transform hover:-translate-y-1.5 group-hover:ring-2 ring-white/50">
                {/* Full Background Image */}
                {(post.photos?.length > 0 || post.videos?.length > 0) && (
                  <img
                    src={
                      post.photos?.length > 0
                        ? post.photos[0].secure_urls
                        : getYtThumbnail(post.videos[0])
                    }
                    alt={post.title}
                    // fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 size-full"
                  />
                )}

                {/* Strong Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className={cn("absolute top-4 left-4 flex flex-col gap-2 z-10", !post.category?.name && "hidden")}>
                  <span className="self-start px-4 py-1.5 bg-orange-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-[0_4px_10px_rgba(234,88,12,0.3)]">
                    {post.category?.name}
                  </span>
                </div>

                {/* Ranking / Trending Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 backdrop-blur-md border border-white/20 text-white font-bold rounded-full shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    #{index + 1}
                  </span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-3">
                  {/* Views */}
                  <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                    <Eye className="h-3.5 w-3.5" />
                    <span>
                      {getViews({
                        published_on: post.published_on,
                        seed: post.body,
                      })}{" "}
                      views
                    </span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span className="flex items-center gap-1 text-orange-400">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Read More Link */}
                  <div className="flex items-center text-white/90 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
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
