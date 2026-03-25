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
    title: "Rastriya Samachar",
    description: `Rastriya Samachar is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant news from the vibrant state of Tripura.`,
    metadataBase: new URL(`${protocol}://${origin}`),
    openGraph: {
      title: "Rastriya Samachar",
      description: `Rastriya Samachar is a dynamic and trusted Indian news website that brings you 
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
          alt: "Rastriya Samachar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rastriya Samachar",
      description: `Rastriya Samachar is a dynamic and trusted Indian news website that brings you 
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
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-red-50/40 to-transparent pointer-events-none" />
      
      {/* Category Navigation - Sticky & Horizontal Scroll */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto py-3.5 no-scrollbar mask-gradient-x">
            {sortcategories(categories ?? [])
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.id}`}
                  className="shrink-0 group"
                >
                  <div className="px-6 py-2.5 -skew-x-12 bg-white text-slate-700 text-sm font-bold tracking-wide group-hover:bg-red-50 group-hover:text-red-700 transition-all duration-300 border border-slate-200 border-b-[3px] group-hover:border-b-red-600 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:shadow-[0_4px_12px_rgba(237,28,36,0.1)] flex items-center justify-center min-w-[100px]">
                    <span className="skew-x-12 block group-hover:-translate-y-0.5 transition-transform duration-300">{item.name}</span>
                  </div>
                </Link>
              ))}
            <Link
              href={`https://ica.tripura.gov.in/press-release`}
              target="_blank"
              className="shrink-0 group"
            >
              <div className="px-6 py-2.5 -skew-x-12 bg-red-600 group-hover:bg-red-700 text-white text-sm font-bold tracking-wide transition-all duration-300 border-b-[3px] border-b-red-900 shadow-[0_4px_12px_rgba(237,28,36,0.25)] flex items-center justify-center min-w-[120px]">
                <span className="skew-x-12 block group-hover:-translate-y-0.5 transition-transform duration-300">তথ্য ও সংস্কৃতি</span>
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
            <span className="skew-x-12">{slok.chapter} অধ্যায়, {slok.slok} শ্লোক</span>
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


      {/* Hero Section: Carousel + Top News Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Main Carousel */}
          <div className="lg:col-span-3">
            <HeroCarousel data={imageGallery ?? []} />
          </div>

          {/* Side News */}
          <div className="lg:col-span-1 h-full overflow-hidden">
            <TopNewsSidebar data={topNews?.slice(0, 3) ?? []} />
          </div>
        </div>
      </section>
    </div>
  );
}
