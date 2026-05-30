import {
  getCategoryWiseNews,
  getTopNews,
  getLatestNews,
  getSlok,
  getImageGallery,
  getAllCategories,
  getHeadline,
} from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import TopNewsSidebar from "@/components/custom/top-news-sidebar";
import { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { getYtThumbnail } from "@/lib/utils";
import siteLogo from "@/../public/logo.png";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const origin = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const res = await getTopNews();
  const topStories = res?.data ?? [];

  return {
    title: "Bar and Bench",
    description: `Bar and Bench is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant legal news and updates.`,
    metadataBase: new URL(`${protocol}://${origin}`),
    openGraph: {
      title: "Bar and Bench",
      description: `Bar and Bench is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant legal news and updates.`,
      url: `${protocol}://${origin}`,
      images: [
        {
          url:
            topStories[0]?.images?.[0] ||
            topStories[0]?.thumbnail ||
            (topStories[0]?.videos?.[0]
              ? getYtThumbnail(topStories[0].videos[0])
              : siteLogo.src),
          width: 210,
          height: 70,
          alt: "Bar and Bench",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bar and Bench",
      description: `Bar and Bench is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant legal news and updates.`,
      images: [
        topStories[0]?.images?.[0] ||
          topStories[0]?.thumbnail ||
          (topStories[0]?.videos?.[0]
            ? getYtThumbnail(topStories[0].videos[0])
            : siteLogo.src),
      ],
    },
  };
}

export default async function Home() {
  const headlines = await getHeadline();

  return (
    <div className="bg-white pb-6">
      {/* Breaking News Marquee */}
      <section className="bg-gray-50 border-b border-gray-100 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap">
              Breaking News
            </span>
          </div>
          <div className="flex-1">
            {/**@ts-ignore */}
            <marquee scrollamount="6" className="flex items-center h-full">
              <div className="flex items-center gap-12 text-sm font-bold text-gray-800">
                {headlines?.map((hl) => (
                  <Link
                    key={hl.id}
                    href="#"
                    className="hover:text-accent transition-colors flex items-center gap-4"
                  >
                    <span>{hl.content}</span>
                    <span className="text-gray-300">|</span>
                  </Link>
                ))}
                {(!headlines || headlines.length === 0) && (
                  <span>Loading latest updates...</span>
                )}
              </div>
              {/**@ts-ignore */}
            </marquee>
          </div>
        </div>
      </section>
    </div>
  );
}
