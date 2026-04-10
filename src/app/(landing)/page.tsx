import React from "react";
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
import { Dot, Globe, Plane, TramFront } from "lucide-react";
import { IconType } from "react-icons";
import { Galada } from "next/font/google";
import { cn, getYtThumbnail } from "@/lib/utils";
import siteLogo from "@/../public/logo.png";
import { Category } from "@/types/response";
import { categoriesOrder } from "@/constants/categories-order";

// export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const origin = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const res = await getTopNews();

  return {
    title: "Janamat News",
    description: `Janamat News is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant news from the vibrant state of Tripura.`,
    metadataBase: new URL(`${protocol}://${origin}`),
    openGraph: {
      title: "Janamat News",
      description: `Janamat News is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant news from the vibrant state of Tripura.`,
      url: `${protocol}://${origin}`,
      images: [
        {
          url:
            res?.[0]?.photos?.[0]?.secure_urls ||
            (res?.[0]?.videos?.[0]
              ? getYtThumbnail(res[0].videos[0])
              : siteLogo.src),
          width: 210,
          height: 70,
          alt: "Janamat News",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Janamat News",
      description: `Janamat News is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant news from the vibrant state of Tripura.`,
      images: [
        res?.[0]?.photos?.[0]?.secure_urls ||
          (res?.[0]?.videos?.[0]
            ? getYtThumbnail(res?.[0].videos[0])
            : siteLogo.src),
      ],
    },
  };
}

type ImpLink = {
  icon: IconType;
  title: string;
  url: string;
};
const impLinks: ImpLink[] = [
  { icon: Globe, title: "আপৎকালীন নম্বর", url: "https://www.tripura.gov.in/" },
  {
    icon: TramFront,
    title: "রেলওয়ের সময়সূচি",
    url: "https://www.makemytrip.com/railways/agartala-agtl-railway-station.html",
  },
  {
    icon: Plane,
    title: "বিমানের সময়সূচি",
    url: "https://www.skyscanner.co.in/flights/arrivals-departures/ixa/agartala-arrivals-departures",
  },
];

const galanda = Galada({ subsets: ["latin"], weight: ["400"] });

const sortcategories = (data: Category[]) => {
  return categoriesOrder.reduce<Category[]>((acc, curr) => {
    const found = data.find((c) => c.name === curr);
    if (found) {
      acc.push(found);
    }
    return acc;
  }, []);
};

export default async function Home() {
  const imageGallery = await getImageGallery();
  const categories = await getAllCategories();
  const slok = await getSlok();
  const latestNews = await getLatestNews();
  const topNews = await getTopNews();
  const headlines = await getHeadline();

  return (
    <div className="bg-slate-50/50 min-h-screen pb-12 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-linear-to-b from-red-50/40 to-transparent pointer-events-none" />

      {/* Category Navigation - Sticky & Horizontal Scroll */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto py-3.5 no-scrollbar mask-gradient-x">
            {sortcategories(categories ?? [])
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/category/${item.id}`}
                  className="shrink-0 group"
                >
                  <div className="px-6 py-2.5 -skew-x-12 bg-white text-slate-700 text-sm font-bold tracking-wide group-hover:bg-red-50 group-hover:text-red-700 transition-all duration-300 border border-slate-200 border-b-4 group-hover:border-b-red-600 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:shadow-[0_4px_12px_rgba(237,28,36,0.1)] flex items-center justify-center min-w-[100px] relative">
                    <span className="skew-x-12 flex items-center gap-1.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative">
                      {item.name}
                      {idx < 2 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-[#ED1C24] text-white tracking-widest uppercase">
                          New
                        </span>
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            <Link
              href={`https://ica.tripura.gov.in/press-release`}
              target="_blank"
              className="shrink-0 group"
            >
              <div className="px-6 py-2.5 -skew-x-12 bg-red-600 group-hover:bg-red-700 text-white text-sm font-bold tracking-wide transition-all duration-300 border-b-[3px] border-b-red-900 shadow-[0_4px_12px_rgba(237,28,36,0.25)] flex items-center justify-center min-w-[120px]">
                <span className="skew-x-12 block group-hover:-translate-y-0.5 transition-transform duration-300">
                  তথ্য ও সংস্কৃতি
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Shlok Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-4 py-8 relative">
        <div className="relative bg-white/95 backdrop-blur-xl rounded-none p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 border-l-12 border-l-red-600 text-center overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.15)] transition-all duration-700">
          {/* Angled Background Accents */}
          <div className="absolute top-0 right-0 w-32 h-full bg-slate-50 -skew-x-12 translate-x-16 opacity-50" />
          <div className="absolute bottom-0 left-0 w-24 h-full bg-red-50/50 -skew-x-12 -translate-x-12 opacity-50" />

          <h4 className="relative text-xl md:text-2xl font-medium text-slate-800 mb-6 leading-relaxed font-serif px-4">
            <span className="text-5xl text-red-500/20 absolute -top-4 left-0 select-none">
              ❝
            </span>
            {slok.body}
            <span className="text-5xl text-red-500/20 absolute -bottom-6 right-0 select-none">
              ❞
            </span>
          </h4>
          <div className="relative inline-flex items-center gap-2.5 px-6 py-2 -skew-x-12 bg-black text-white text-sm font-bold tracking-widest uppercase mt-4 border-b-[3px] border-b-red-600 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <span className="w-2 h-2 bg-red-600 rounded-none animate-pulse shadow-[0_0_8px_rgba(237,28,36,0.6)] skew-x-12" />
            <span className="skew-x-12">
              {slok.chapter} অধ্যায়, {slok.slok} শ্লোক
            </span>
          </div>
        </div>
      </section>

      {/* Important Links */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {impLinks.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              target="_blank"
              className="group flex items-center justify-center gap-3 p-5 bg-white/90 backdrop-blur-sm rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-200 border-b-4 border-b-slate-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-b-red-600 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-2.5 bg-slate-50 text-slate-600 rounded-none group-hover:bg-black group-hover:text-white group-hover:scale-110 shadow-sm transition-all duration-300 border-l-[3px] border-l-red-600">
                <link.icon size={22} />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-100 rounded-2xl overflow-hidden mx-auto">
          <img
            src={event.src}
            className="w-full aspect-square object-contain"
          />
        </div>
      </section> */}

      {/* Breaking News Marquee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-none border-l-[6px] border-l-[#ED1C24] shadow-sm flex items-center h-12 overflow-hidden font-sans border-y border-r border-slate-200">
          <div className="bg-[#ED1C24] text-white px-5 h-full flex items-center shrink-0 z-10 relative">
            <h2 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              TRENDING
            </h2>
            <div className="absolute top-0 right-auto left-full border-l-12 border-l-[#ED1C24] border-t-24 border-t-transparent border-b-24 border-b-transparent"></div>
          </div>
          <div className="flex-1 overflow-hidden relative ml-6 h-full flex items-center justify-start">
            {React.createElement(
              "marquee" as any,
              {
                className:
                  "text-sm font-bold text-slate-800 h-full flex items-center",
                scrollamount: "6",
              },
              headlines?.map((hl) => (
                <span
                  key={hl.id}
                  className="mr-8 hover:text-[#ED1C24] transition-colors cursor-pointer"
                >
                  {hl.content}
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* Hero Section: 70/30 Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
          {/* Main Rail (70%) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <HeroCarousel data={imageGallery ?? []} />
          </div>

          {/* Side Rail (30%) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-slate-100 flex-1 min-h-[250px] max-h-[300px] border border-slate-200 flex flex-col items-center justify-center text-slate-400 text-xs font-bold tracking-widest uppercase relative p-4 group">
              <span className="mb-2">Advertisement</span>
              <span className="px-3 py-1 bg-slate-200 rounded text-slate-500">
                300 x 250
              </span>
              <div className="absolute inset-0 bg-linear-to-tr from-slate-200/50 to-transparent pointer-events-none group-hover:opacity-70 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Trending News Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <TopNewsSidebar data={topNews?.slice(0, 3) ?? []} />
      </section>
    </div>
  );
}
