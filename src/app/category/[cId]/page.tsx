import { getCategoryWiseNews, getCategoryNewsInfo } from "@/actions/news";
import GotoPrev from "@/components/custom/go-to-prev";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Video,
  Clock,
  Eye,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn, getYtThumbnail, getViews } from "@/lib/utils";

export async function generateStaticParams() {
  const res = await getCategoryWiseNews();

  return (
    res?.map((category) => ({
      cId: (category?.articles[0]?.category?.id ?? "").toString(),
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cId: string }>;
}): Promise<Metadata> {
  const { cId } = await params;
  const res = await getCategoryWiseNews();

  const category = res?.find(
    (cat) => cat?.articles?.[0]?.category?.id === Number(cId),
  );

  return {
    title: category?.name,
    openGraph: {
      title: category?.name,
      images: [
        {
          url:
            category?.articles?.[0]?.photos?.[0]?.secure_urls ||
            (category?.articles?.[0]?.videos?.[0]
              ? getYtThumbnail(category.articles[0].videos[0])
              : ""),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category?.name,
      images: [
        category?.articles?.[0]?.photos?.[0]?.secure_urls ||
          (category?.articles?.[0]?.videos?.[0]
            ? getYtThumbnail(category.articles[0].videos[0])
            : ""),
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ cId: string }>;
}) {
  const { cId } = await params;
  const res = await getCategoryNewsInfo(cId);
  const categoryName = res.data?.[0]?.category?.name || "Category";
  const newsList = res.data || [];
  const featuredNews = newsList?.length > 0 ? newsList[0] : null;
  const otherNews = newsList?.length > 1 ? newsList.slice(1) : [];

  if (!res.data || res.data?.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white p-6">
        <div className="text-center space-y-8 max-w-xl">
          <div className="relative inline-block px-12 py-6 border-4 border-slate-100">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600 -ml-1" />
            <h2 className="text-4xl md:text-6xl font-black text-slate-200 uppercase tracking-tighter">
              Empty Archive
            </h2>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">
            We couldn't find any articles in this category.
          </p>
          <GotoPrev>
            <button className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-red-600 transition-all duration-500 shadow-2xl">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              Go Back Home
            </button>
          </GotoPrev>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Elite Standard Header */}
      <div className="bg-white border-b-2 border-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <GotoPrev className="inline-flex items-center gap-4 text-slate-400 hover:text-red-600 transition-all mb-6 group cursor-pointer uppercase text-[10px] font-black tracking-widest">
            <div className="p-2 border border-slate-100 group-hover:border-red-600 transition-colors">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Portal
          </GotoPrev>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-6">
                <span className="w-4 h-16 bg-red-600 block shadow-[0_0_20px_rgba(237,28,36,0.3)]" />
                {categoryName}
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.5em] ml-10">
                Executive Editorial Feed • {newsList?.length} Stories
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-px w-32 bg-slate-100 hidden lg:block" />
              <div className="px-6 py-3 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                Refined Coverage
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Elite Featured Story (Split-Hero Style) */}
        {featuredNews && (
          <section className="mb-24 md:mb-32">
            <div className="mb-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                Featured Coverage
              </h2>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <Link href={`/news/${featuredNews.id}`} className="group block">
              <article className="flex flex-col lg:flex-row bg-white overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_120px_rgba(0,0,0,0.12)] transition-all duration-1000 group relative ring-1 ring-slate-100">
                {/* Image Side (65%) */}
                <div className="w-full lg:w-[65%] aspect-video lg:aspect-auto overflow-hidden relative">
                  {(featuredNews.images?.length > 0 ||
                    featuredNews.videos?.length > 0) && (
                    <img
                      src={
                        featuredNews.images?.length > 0
                          ? featuredNews.images[0]
                          : getYtThumbnail(featuredNews.videos[0])
                      }
                      alt={featuredNews.title}
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 size-full grayscale-[0.1] group-hover:grayscale-0"
                    />
                  )}

                  {/* Glassmorphism Badges */}
                  <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                    <div className="px-5 py-2 bg-black/80 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-white/10">
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(237,28,36,0.8)]" />
                      Live Now
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Content Side (35%) */}
                <div className="w-full lg:w-[35%] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative bg-white">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-red-600 uppercase tracking-[0.3em] mb-10">
                    <span className="w-8 h-[2px] bg-red-600" />
                    Editor's Pick
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-10 group-hover:text-red-600 transition-colors duration-500">
                    {featuredNews.title}
                  </h3>

                  <div className="space-y-8 mb-12">
                    <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-widest border-l-2 border-red-600 pl-4">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>
                        {featuredNews.created_on &&
                          format(
                            new Date(featuredNews.created_on),
                            "MMM d, yyyy",
                          )}
                      </span>
                    </div>
                    <p className="text-slate-500 text-base leading-relaxed line-clamp-4 font-medium italic">
                      "{featuredNews.body}"
                    </p>
                  </div>

                  <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-900 group-hover:text-red-600 transition-colors">
                      READ FULL CASE
                    </span>
                    <div className="p-4 bg-slate-900 text-white group-hover:bg-red-600 transition-all duration-500 rotate-45 group-hover:rotate-0">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-2 h-0 bg-red-600 group-hover:h-full transition-all duration-1000" />
              </article>
            </Link>
          </section>
        )}

        {/* Elite News Grid */}
        {otherNews?.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-16 border-b-2 border-slate-100 pb-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
                  <span className="w-2.5 h-8 bg-red-600 block" />
                  Latest Stories
                </h2>
              </div>
              <div className="hidden sm:block text-[9px] font-black text-slate-300 uppercase tracking-widest">
                Updated {format(new Date(), "HH:mm")} IST
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherNews.map((news) => (
                <Link
                  href={`/news/${news.id}`}
                  key={news.id}
                  className="group block h-full"
                >
                  <article className="flex flex-col bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group relative ring-1 ring-slate-100">
                    {/* Visual Component */}
                    <div className="aspect-video overflow-hidden relative">
                      {(news.images?.length > 0 || news.videos?.length > 0) && (
                        <img
                          src={
                            news.images?.length > 0
                              ? news.images[0]
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
                          {categoryName}
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
                    </div>

                    {/* Content Component */}
                    <div className="p-8 lg:p-10 flex flex-col flex-1 relative bg-white">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-red-600" />
                          {news.created_on &&
                            format(new Date(news.created_on), "MMM d, yyyy")}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-2 h-16 leading-tight tracking-tight mb-8 group-hover:text-red-600 transition-colors duration-300">
                        {news.title}
                      </h3>

                      <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-slate-200" />
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            {getViews({
                              published_on: news.created_on,
                              seed: news.body,
                            }).toLocaleString()}{" "}
                            Views
                          </span>
                        </div>
                        <div className="p-3 bg-slate-900 text-white group-hover:bg-red-600 transition-all duration-500">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-1.5 h-0 bg-red-600 group-hover:h-full transition-all duration-700" />
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
