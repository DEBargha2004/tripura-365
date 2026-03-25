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
    title: "News Record",
    description: `News Record is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant news from the vibrant state of Tripura.`,
    metadataBase: new URL(`${protocol}://${origin}`),
    openGraph: {
      title: "News Record",
      description: `News Record is a dynamic and trusted Indian news website that brings you 
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
          alt: "News Record",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "News Record",
      description: `News Record is a dynamic and trusted Indian news website that brings you 
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
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-rose-50/50 to-transparent pointer-events-none" />
      
      {/* Category Navigation - Sticky & Horizontal Scroll */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex lg:justify-center items-center gap-3 overflow-x-auto py-3.5 no-scrollbar mask-gradient-x">
            {sortcategories(categories ?? [])
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.id}`}
                  className="shrink-0"
                >
                  <span className="px-5 py-2.5 rounded-full bg-white text-slate-600 text-sm font-medium hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50 hover:text-rose-700 transition-all duration-300 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_16px_rgba(244,63,94,0.08)] block hover:-translate-y-0.5">
                    {item.name}
                  </span>
                </Link>
              ))}
            <Link
              href={`https://ica.tripura.gov.in/press-release`}
              target="_blank"
              className="shrink-0"
            >
              <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-semibold hover:shadow-[0_8px_20px_rgba(244,63,94,0.25)] hover:-translate-y-0.5 transition-all duration-300 border border-transparent block">
                তথ্য ও সংস্কৃতি
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Shlok Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-4 py-8 relative">
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 text-center overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] transition-all duration-700 hover:-translate-y-1">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 via-red-500 to-orange-500 opacity-90" />
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-rose-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-orange-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <h4 className="relative text-xl md:text-2xl font-medium text-slate-800 mb-6 leading-relaxed font-serif px-4">
            <span className="text-5xl text-rose-500/20 absolute -top-4 left-0 select-none">
              ❝
            </span>
            {slok.body}
            <span className="text-5xl text-rose-500/20 absolute -bottom-6 right-0 select-none">
              ❞
            </span>
          </h4>
          <div className="relative inline-flex items-center gap-2.5 px-5 py-2 bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 rounded-full text-sm font-semibold mt-2 border border-rose-100/50 shadow-sm">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            {slok.chapter} অধ্যায়, {slok.slok} শ্লোক
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
              className="group flex items-center justify-center gap-3 p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-slate-200 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="p-2.5 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 rounded-xl group-hover:text-rose-600 group-hover:scale-110 group-hover:shadow-sm transition-all duration-500 border border-slate-200/50">
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
