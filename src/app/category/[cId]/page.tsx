import { getCategoryWiseNews, getCategoryNewsInfo } from "@/actions/news";
import GotoPrev from "@/components/custom/go-to-prev";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn, getYtThumbnail } from "@/lib/utils";

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            No Articles Found
          </h2>
          <p className="text-gray-500">
            We couldn't find any articles in this category.
          </p>
          <GotoPrev>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              Go Back Home
            </button>
          </GotoPrev>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <GotoPrev className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6 group cursor-pointer">
            <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="font-medium">Back to Home</span>
          </GotoPrev>

          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              {categoryName}
            </h1>
            <span className="text-slate-500 font-semibold tracking-wide">
              {newsList?.length} Articles
            </span>
          </div>
          <div className="h-[2px] w-24 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full mt-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article (Latest Post Style) */}
        {featuredNews && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-gradient-to-b from-rose-500 to-orange-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
              Featured Story
            </h2>
            <Link href={`/news/${featuredNews.id}`} className="group block">
              <div className="relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-700">
                {/* Background Image with Zoom Effect */}
                {(featuredNews.images?.length > 0 ||
                  featuredNews.videos?.length > 0) && (
                  <img
                    src={
                      featuredNews.images?.length > 0
                        ? featuredNews.images[0]
                        : getYtThumbnail(featuredNews.videos[0])
                    }
                    alt={featuredNews.title}
                    // fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 size-full"
                    // priority
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content Container */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6 z-10">
                  <div className="max-w-3xl space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                        {featuredNews.category?.name}
                      </span>
                      <span className="px-5 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-bold tracking-wide rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse border border-white/20">
                        Featured
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                      {featuredNews.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-slate-200 text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {featuredNews.created_on &&
                            format(new Date(featuredNews.created_on), "PPP")}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-lg line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
                      {featuredNews.body}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="hidden md:block shrink-0">
                    <button className="text-nowrap flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-900 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-white hover:scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]">
                      Read Full Article
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Latest News Grid (Top News Style) */}
        {otherNews?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-slate-800 rounded-full" />
              Latest Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherNews.map((news) => (
                <Link
                  href={`/news/${news.id}`}
                  key={news.id}
                  className="group block h-full @container"
                >
                  <article className="relative h-96 w-full rounded-[2.5rem] overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-1 ring-1 ring-slate-900/5 group-hover:ring-white/50">
                    {/* Full Background Image */}
                    {(news.images?.length > 0 || news.videos?.length > 0) && (
                      <img
                        src={
                          news.images?.length > 0
                            ? news.images[0]
                            : getYtThumbnail(news.videos[0])
                        }
                        alt={news.title}
                        // fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 size-full"
                      />
                    )}

                    {/* Strong Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] uppercase tracking-wider">
                        {news.category.name}
                      </span>
                    </div>

                    {/* Bottom Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-10 flex flex-col gap-2">
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-slate-300 text-[11px] font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{format(new Date(news.created_on), "PPP")}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-rose-400 transition-colors drop-shadow-sm">
                        {news.title}
                      </h3>

                      {/* Read More Link */}
                      <div className="flex items-center text-white/90 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 mt-2">
                        Read Article <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
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
