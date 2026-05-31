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
  Mail,
  Link2,
  Volume2,
} from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import FbShare from "./_components/fb-share";
import WaShare from "./_components/wa-share";
import { getViews, getYtThumbnail, stripHtml } from "@/lib/utils";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import Link from "next/link";

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

  (await getTopNews())?.data?.forEach((news) => newsSet.add(news.id));
  (await getLatestNews())?.data?.forEach((news) => newsSet.add(news.id));
  (await getTrendingNews())?.data?.forEach((news) => newsSet.add(news.id));
  (await getCategoryWiseNews())?.data?.forEach((cat) =>
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
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            Article Not Found
          </h2>
          <p className="text-gray-500 font-serif">
            The article you are looking for does not exist or has been removed.
          </p>
          <div className="flex justify-center">
            <GotoPrev>
              <button className="px-8 py-2.5 bg-primary text-white font-serif rounded-sm hover:opacity-90 transition-all">
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

  const readingTime = Math.ceil(article.body.split(/\s+/).length / 200);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="flex gap-12">
          {/* Left Sticky Social Bar (Desktop) */}
          {/* <aside className="hidden lg:flex flex-col gap-2 sticky top-32 h-fit shrink-0">
            <WaShare url={`${basePath}/news/${newsId}`} title={article.title}>
              <button className="w-10 h-10 flex items-center justify-center bg-[#25D366] text-white rounded-sm hover:opacity-90 transition-opacity">
                <FaWhatsapp className="w-5 h-5" />
              </button>
            </WaShare>
            <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-sm hover:opacity-90 transition-opacity">
              <FaXTwitter className="w-4 h-4" />
            </button>
            <FbShare url={`${basePath}/news/${newsId}`}>
              <button className="w-10 h-10 flex items-center justify-center bg-[#1877F2] text-white rounded-sm hover:opacity-90 transition-opacity">
                <FaFacebookF className="w-5 h-5" />
              </button>
            </FbShare>
            <button className="w-10 h-10 flex items-center justify-center bg-[#0077B5] text-white rounded-sm hover:opacity-90 transition-opacity">
              <FaLinkedinIn className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-[#EA4335] text-white rounded-sm hover:opacity-90 transition-opacity">
              <Mail className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded-sm hover:opacity-90 transition-opacity">
              <Link2 className="w-5 h-5" />
            </button>
          </aside> */}

          {/* Main Content Area */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              {/* Category & Title Section */}
              <div className="space-y-6 mb-8">
                <Link
                  href={`/category/${article.category?.id}`}
                  className="text-accent font-serif font-bold text-sm uppercase tracking-wider hover:underline"
                >
                  {article.category?.name || "News"}
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-[44px] font-serif font-black text-gray-900 leading-[1.1] tracking-tight">
                  {article.title}
                </h1>

                {/* Optional Subtitle (using first part of body if no excerpt) */}
                <p className="text-xl text-gray-600 font-serif italic leading-relaxed border-l-4 border-accent/40 pl-6 py-1">
                  {stripHtml(article.body).slice(0, 150)}...
                </p>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-[16/9] w-full mb-6 group">
                {image && (
                  <img
                    src={image}
                    alt={article.title}
                    className="object-cover size-full rounded-sm shadow-sm"
                  />
                )}
              </div>

              {/* Metadata */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-wrap items-center gap-2 text-gray-900 font-serif font-bold text-sm uppercase tracking-tight">
                  <span className="text-gray-500">By</span>
                  <span className="hover:text-accent transition-colors cursor-pointer border-b-2 border-accent/20">
                    {"Tripura Law Times Desk"}
                  </span>
                </div>

                <div className="text-[13px] text-gray-500 font-serif">
                  <span>Published on: </span>
                  <span className="text-gray-900">
                    {article.published_on &&
                      format(article.published_on, "d MMMM yyyy, h:mm a")}
                  </span>
                  <span className="mx-2 opacity-30">·</span>
                  <span className="text-gray-900">{readingTime} min read</span>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors">
                      Follow Us
                    </span>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-all">
                      <span className="text-[14px] font-black tracking-tighter text-[#4285F4]">
                        G
                      </span>
                      <span className="text-[14px] font-black tracking-tighter text-[#EA4335]">
                        o
                      </span>
                      <span className="text-[14px] font-black tracking-tighter text-[#FBBC05]">
                        o
                      </span>
                      <span className="text-[14px] font-black tracking-tighter text-[#4285F4]">
                        g
                      </span>
                      <span className="text-[14px] font-black tracking-tighter text-[#34A853]">
                        l
                      </span>
                      <span className="text-[14px] font-black tracking-tighter text-[#EA4335]">
                        e
                      </span>
                      <span className="text-[8px] font-black tracking-widest text-gray-400 ml-1">
                        NEWS
                      </span>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-all text-xs font-serif font-bold text-gray-700">
                    <Volume2 className="w-4 h-4 text-accent" />
                    Listen to this article
                  </button>
                </div>
              </div>

              {/* Video Section (if any) */}
              {article.videos?.length > 0 && (
                <div className="mb-10 aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${article.videos[0]}`}
                    className="w-full h-full rounded-sm shadow-md"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Main Body */}
              <div
                className="prose prose-lg max-w-none prose-serif prose-headings:font-black prose-p:text-gray-800 prose-p:leading-[1.8] prose-p:mb-8"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />

              {/* Related Tags */}
              <div className="mt-16 pt-10 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-600 font-serif text-sm rounded hover:bg-gray-100 transition-colors cursor-pointer">
                    #{article.category?.name || "News"}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-600 font-serif text-sm rounded hover:bg-gray-100 transition-colors cursor-pointer">
                    #TripuraLawTimes
                  </span>
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-600 font-serif text-sm rounded hover:bg-gray-100 transition-colors cursor-pointer">
                    #LatestUpdates
                  </span>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              {/* Ad Widget Placeholder */}
              <div className="bg-gray-900 aspect-square w-full rounded-sm flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden group">
                <div className="absolute top-2 right-2 text-[8px] opacity-30">
                  ADVERTISEMENT
                </div>
                <h4 className="text-3xl font-serif font-black mb-2">LawLens</h4>
                <p className="text-sm opacity-60 mb-6 font-serif italic">
                  Search the law like you think
                </p>
                <div className="w-full max-w-xs relative">
                  <input
                    type="text"
                    placeholder="Today's SC cases about arbitration"
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-xs font-serif"
                    disabled
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                    🔍
                  </div>
                </div>
                <button className="mt-8 px-6 py-2 bg-white text-gray-900 text-xs font-black uppercase tracking-widest rounded-sm hover:opacity-90 transition-all">
                  Search Now →
                </button>
              </div>

              {/* Trending Section could go here */}
              <div className="border-t-2 border-accent pt-6">
                <h3 className="text-lg font-serif font-black uppercase tracking-tight mb-6">
                  Recommended for you
                </h3>
                {/* ... trending items ... */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
