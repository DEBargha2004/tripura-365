import {
  getCategoryWiseNews,
  getLatestNews,
  getNewsInfo,
  getTopNews,
  getTrendingNews,
} from "@/actions/news";
import GotoPrev from "@/components/custom/go-to-prev";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Facebook,
  Share2,
  Tag,
} from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import FbShare from "./_components/fb-share";
import WaShare from "./_components/wa-share";
import { getViews, getYtThumbnail } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsId: string }>;
}): Promise<Metadata> {
  const { newsId } = await params;
  const article = await getNewsInfo(newsId);
  const headerInfo = await headers();
  const protocol = headerInfo.get("x-forwarded-proto") ?? "http";
  const host = headerInfo.get("host");

  if (!article || (article as any).error) return {};

  return {
    title: article?.title,
    description: article?.body.slice(0, 200),
    openGraph: {
      title: article?.title,
      description: article?.body.slice(0, 200),
      url: `${protocol}://${host}/news/${newsId}`,
      images: [
        {
          url:
            article?.images?.[0] ||
            (article?.videos?.[0] ? getYtThumbnail(article.videos[0]) : ""),
          width: 1200,
          height: 630,
          alt: article?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.body.slice(0, 200),
      images: [
        article?.images?.[0] ||
          (article?.videos?.[0] ? getYtThumbnail(article.videos[0]) : ""),
      ],
    },
  };
}

export async function generateStaticParams() {
  const newsSet = new Set<number>();

  (await getTopNews())?.forEach((news) => newsSet.add(news.id));
  (await getLatestNews())?.forEach((news) => newsSet.add(news.id));
  (await getTrendingNews())?.forEach((news) => newsSet.add(news.id));
  (await getCategoryWiseNews())?.forEach((cat) =>
    cat.articles.forEach((news) => newsSet.add(news.id)),
  );

  return Array.from(newsSet).map((id) => ({ newsId: id.toString() }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  const headerList = await headers();

  const protocol = headerList.get("x-forwarded-proto");
  const origin = headerList.get("host");
  const basePath = `${protocol}://${origin}`;

  const article = await getNewsInfo(newsId);

  if (!article || (article as any)?.error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="text-center flex flex-col items-center space-y-6 bg-white p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border-t-8 border-t-red-600">
          <div className="w-16 h-16 bg-red-100 flex items-center justify-center text-red-600 font-extrabold text-3xl border-l-4 border-l-red-600">
            !
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Article Not Found
            </h2>
            <p className="text-slate-500 max-w-sm">
              The article you are looking for does not exist or has been removed.
            </p>
          </div>
          <div className="flex justify-center pt-2">
            <GotoPrev>
              <button className="px-8 py-3 bg-red-600 text-white font-bold tracking-wide hover:bg-black transition-colors border-b-4 border-b-red-800 hover:border-b-black shadow-md">
                Go Back Home
              </button>
            </GotoPrev>
          </div>
        </div>
      </div>
    );

  const image = article.images?.[0]
    ? article.images[0]
    : article.videos?.[0]
      ? getYtThumbnail(article.videos[0])
      : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax-like effect */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {image && (
          <img
            src={image}
            alt={article.title}
            // fill
            className="object-cover size-full"
            // priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent opacity-90" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GotoPrev className="absolute top-8 left-4 sm:left-8 text-white/80 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer">
            <div className="p-2 rounded-none bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors border-l-2 border-l-red-500">
              <ArrowLeft className="h-6 w-6" />
            </div>
            <span className="font-medium hidden sm:block">Back</span>
          </GotoPrev>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold rounded-none -skew-x-12 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <span className="skew-x-12 block">{article?.category?.name}</span>
              </span>
              <div className="flex items-center gap-2 text-slate-100 font-medium text-sm bg-black/30 backdrop-blur-md border border-white/20 px-5 py-2 rounded-none -skew-x-12 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <div className="skew-x-12 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-400" />
                  <span>
                    {article.published_on && format(article.published_on, "PPP")}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-200 mt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-none border-l-4 border-l-red-500 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <Eye className="h-5 w-5 text-red-400" />
                <span className="font-medium tracking-wide">
                  {getViews({
                    published_on: article.published_on,
                    seed: article.body,
                  })}{" "}
                  views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-none border-t-8 border-t-red-600 p-8 md:p-14 shadow-[0_-10px_50px_rgba(0,0,0,0.1)]">
          {/* Share Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-none flex items-center justify-center text-white bg-black border-l-4 border-l-red-600 shadow-sm">
                <span className="font-bold text-xl">R</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Rastriya Samachar</p>
                <p className="text-sm text-gray-500">Editorial Team</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FbShare url={`${basePath}/news/${newsId}`}>
                <button
                  className="p-3 rounded-none bg-blue-50/80 text-blue-600 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-b-2 border-b-blue-600 hover:border-b-blue-400"
                  title="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
              </FbShare>
              <WaShare url={`${basePath}/news/${newsId}`} title={article.title}>
                <button
                  className="p-3 rounded-none bg-green-50/80 text-green-600 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-b-2 border-b-green-600 hover:border-b-green-400"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </button>
              </WaShare>
              <button
                className="p-3 rounded-none bg-slate-50 text-slate-600 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-b-2 border-b-slate-400 hover:border-b-slate-300"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Video Section */}
          {article.videos?.length > 0 && (
            <div className="mb-8 w-full aspect-video rounded-none border-b-[6px] border-b-red-600 overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${article.videos[0]}`}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={article.title}
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg md:prose-xl max-w-none text-slate-800 leading-relaxed font-serif">
            <p className="first-letter:text-[5rem] first-letter:-mt-2 first-letter:font-extrabold first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] mb-6">
              {article.body}
            </p>
          </div>

          {/* Tags Section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
              <Tag className="h-5 w-5" />
              <span>Related Topics</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-6 py-2.5 bg-slate-50 text-slate-700 rounded-none border-b-2 border-transparent hover:border-red-600 transition-colors cursor-pointer font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transform">
                {article?.category?.name}
              </span>
              <span className="px-6 py-2.5 bg-slate-50 text-slate-700 rounded-none border-b-2 border-transparent hover:border-red-600 transition-colors cursor-pointer font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transform">
                Tripura News
              </span>
              <span className="px-6 py-2.5 bg-slate-50 text-slate-700 rounded-none border-b-2 border-transparent hover:border-red-600 transition-colors cursor-pointer font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transform">
                Latest Updates
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
