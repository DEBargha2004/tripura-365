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
  CheckCircle2,
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
      <div className="min-h-[70vh] flex items-center justify-center bg-white p-6">
        <div className="text-center flex flex-col items-center space-y-8 max-w-xl">
          <div className="relative inline-block px-12 py-6 border-4 border-slate-100">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600 -ml-1" />
            <h2 className="text-4xl md:text-6xl font-black text-slate-200 uppercase tracking-tighter">
              Article Lost
            </h2>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm leading-relaxed">
            The article you are looking for does not exist or has been removed
            from our archive.
          </p>
          <div className="flex justify-center pt-2">
            <GotoPrev>
              <button className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-red-600 transition-all duration-500 shadow-2xl">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                Return to Home
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
      {/* Article Hero - Cinematic Elite */}
      <div className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden bg-slate-900">
        {image && (
          <img
            src={image}
            alt={article.title}
            className="object-cover size-full opacity-80 scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/10 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GotoPrev className="absolute top-10 left-4 sm:left-8 text-white/60 hover:text-white transition-all flex items-center gap-4 group cursor-pointer uppercase text-[10px] font-black tracking-widest">
            <div className="p-3 border border-white/10 bg-white/5 backdrop-blur-md group-hover:bg-red-600 group-hover:border-red-600 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="hidden sm:block">Back to Portal</span>
          </GotoPrev>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-6 py-2.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(237,28,36,0.3)]">
                {article?.category?.name || "LATEST"}
              </div>
              <div className="flex items-center gap-3 text-white/90 text-[11px] font-bold bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2.5 uppercase tracking-[0.2em]">
                <Clock className="h-4 w-4 text-red-500" />
                <span>
                  {article.published_on &&
                    format(new Date(article.published_on), "HH:mm")}{" "}
                  IST
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-5xl tracking-tighter uppercase drop-shadow-2xl">
              {article.title}
            </h1>

            <div className="flex items-center gap-10">
              <div className="flex items-center gap-3 text-white/70">
                <Eye className="h-5 w-5 text-red-500" />
                <span className="text-sm font-black uppercase tracking-widest">
                  {getViews({
                    published_on: article.published_on,
                    seed: article.body,
                  }).toLocaleString()}{" "}
                  Readers
                </span>
              </div>
              <div className="h-px w-20 bg-white/20 hidden sm:block" />
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.5em] hidden sm:block">
                JANAMAT VERIFIED NEWS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Matrix */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-32">
        <div className="bg-white border-t-8 border-t-red-600 p-8 md:p-16 lg:p-24 shadow-[0_50px_150px_rgba(0,0,0,0.12)]">
          {/* Elite Author & Share Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b-2 border-slate-50 pb-12 mb-12">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="h-16 w-16 rounded-none flex items-center justify-center text-white bg-slate-900 border-l-4 border-l-red-600 shadow-xl font-black text-2xl">
                  J
                </div>
                <div className="absolute -bottom-1 -right-1 bg-red-600 text-white p-1 shadow-lg">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-black text-slate-900 uppercase tracking-tighter text-lg leading-none">
                  Janamat News Desk
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Expert Editorial Team{" "}
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  {article.published_on &&
                    format(new Date(article.published_on), "MMM d, yyyy")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mr-2">
                Share Report
              </span>
              <FbShare url={`${basePath}/news/${newsId}`}>
                <button className="p-4 bg-slate-50 text-slate-400 hover:bg-black hover:text-white transition-all duration-500 border border-slate-100 hover:border-black flex items-center justify-center">
                  <Facebook className="h-5 w-5" />
                </button>
              </FbShare>
              <WaShare url={`${basePath}/news/${newsId}`} title={article.title}>
                <button className="p-4 bg-slate-50 text-slate-400 hover:bg-black hover:text-white transition-all duration-500 border border-slate-100 hover:border-black flex items-center justify-center">
                  <FaWhatsapp className="h-5 w-5" />
                </button>
              </WaShare>
              <button className="p-4 bg-slate-50 text-slate-400 hover:bg-black hover:text-white transition-all duration-500 border border-slate-100 hover:border-black flex items-center justify-center">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Elite Featured Video */}
          {article.videos?.length > 0 && (
            <div className="mb-16 w-full aspect-video rounded-none border-b-8 border-b-red-600 overflow-hidden shadow-2xl relative group">
              <iframe
                src={`https://www.youtube.com/embed/${article.videos[0]}`}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={article.title}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
            </div>
          )}

          {/* Premium Typography Body */}
          <div className="prose prose-xl max-w-none text-slate-900 leading-relaxed font-serif tracking-normal">
            <p className="first-letter:text-8xl first-letter:font-black first-letter:text-red-600 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] mb-10 text-xl font-medium text-slate-800 antialiased italic border-l-4 border-slate-100 pl-8 md:pl-12 py-4">
              {article.body}
            </p>
            {/* If there were more body parts they would go here */}
          </div>

          {/* Elite Tags Section */}
          <div className="mt-20 pt-12 border-t-2 border-slate-50">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-1.5 h-6 bg-slate-900" />
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em]">
                Report Metadata
              </h4>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="px-6 py-3 bg-slate-50 text-slate-600 border border-slate-100 font-bold text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all cursor-pointer">
                # {article?.category?.name}
              </span>
              <span className="px-6 py-3 bg-slate-50 text-slate-600 border border-slate-100 font-bold text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all cursor-pointer">
                # JANAMAT EXCLUSIVE
              </span>
              <span className="px-6 py-3 bg-slate-50 text-slate-600 border border-slate-100 font-bold text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all cursor-pointer">
                # TRIPURA NEWS
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
