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
import siteLogo from "@/../public/logo.png";

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
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Article Not Found
          </h2>
          <p className="text-gray-500">
            The article you are looking for does not exist or has been removed.
          </p>
          <div className="flex justify-center">
            <GotoPrev>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-black uppercase tracking-widest text-[10px]">
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
      {/* Hero Section: Cinematic Vibe News style */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        {image && (
          <img
            src={image}
            alt={article.title}
            className="object-cover size-full scale-105"
          />
        )}

        {/* Deeper cinematic gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-95" />

        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GotoPrev className="absolute top-10 left-4 sm:left-8 text-white/80 hover:text-white transition-all flex items-center gap-2 group cursor-pointer lg:scale-110">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft className="h-6 w-6" />
            </div>
            <span className="font-black uppercase tracking-widest text-xs hidden sm:block">
              Return
            </span>
          </GotoPrev>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-5 py-2 bg-blue-600/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-2xl">
                {article?.category?.name}
              </span>
              <div className="flex items-center gap-3 text-white/60 text-[10px] font-black uppercase tracking-widest bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span>
                  {article.published_on &&
                    format(article.published_on, "MMMM dd, yyyy")}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter max-w-5xl drop-shadow-2xl">
              {article.title}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-white/50 text-xs font-black uppercase tracking-[0.15em]">
                <Eye className="h-5 w-5 text-blue-400" />
                <span>
                  {getViews({
                    published_on: article.published_on,
                    seed: article.body,
                  })}{" "}
                  readers reached
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-32">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100">
          {/* Share & Author Bar: More sophisticated */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b-2 border-gray-100 pb-12 mb-12">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-gray-900 shadow-sm overflow-hidden p-2">
                <img
                  src={siteLogo.src}
                  alt="Tripura 365 Logo"
                  className="size-full object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
                  Published By
                </p>
                <p className="font-black text-xl text-gray-900 tracking-tight">
                  Tripura 365 Editorial
                </p>
                <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold uppercase tracking-widest mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>8 Min Read</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2">
                Spread the word
              </p>
              <div className="flex items-center gap-3">
                <FbShare url={`${basePath}/news/${newsId}`}>
                  <button
                    className="p-4 rounded-2xl bg-gray-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                    title="Share on Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </button>
                </FbShare>
                <WaShare
                  url={`${basePath}/news/${newsId}`}
                  title={article.title}
                >
                  <button
                    className="p-4 rounded-2xl bg-gray-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                  </button>
                </WaShare>
                <button
                  className="p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  title="Share Link"
                >
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Section: Same rounding logic */}
          {article.videos?.length > 0 && (
            <div className="mb-12 w-full aspect-video rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10">
              <iframe
                src={`https://www.youtube.com/embed/${article.videos[0]}`}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={article.title}
              />
            </div>
          )}

          {/* Article Body: Premium Editorial Typography */}
          <div className="prose prose-lg md:prose-2xl max-w-none text-gray-800 leading-relaxed font-medium">
            <p className="first-letter:text-7xl first-letter:font-black first-letter:text-gray-900 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
              {article.body}
            </p>
          </div>

          {/* Tags Section: Premium Pills */}
          <div className="mt-20 pt-12 border-t-2 border-gray-100">
            <div className="flex items-center gap-3 mb-6 text-gray-900 font-black uppercase tracking-tighter text-lg">
              <Tag className="h-6 w-6 text-blue-600" />
              <span>Explore More</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-6 py-2.5 bg-gray-50 text-gray-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer font-black text-xs uppercase tracking-widest border border-gray-100 hover:border-blue-600 shadow-sm">
                {article?.category?.name}
              </span>
              <span className="px-6 py-2.5 bg-gray-50 text-gray-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer font-black text-xs uppercase tracking-widest border border-gray-100 hover:border-blue-600 shadow-sm">
                Tripura 365 Original
              </span>
              <span className="px-6 py-2.5 bg-gray-50 text-gray-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer font-black text-xs uppercase tracking-widest border border-gray-100 hover:border-blue-600 shadow-sm">
                In-Depth News
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
