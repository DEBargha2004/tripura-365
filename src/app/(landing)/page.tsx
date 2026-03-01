import {
  getCategoryWiseNews,
  getTopNews,
  getLatestNews,
  getImageGallery,
  getAllCategories,
  getHeadline,
} from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import TopNewsSidebar from "@/components/custom/top-news-sidebar";
import Marquee from "@/components/custom/marquee";
import { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Globe, Plane, TramFront } from "lucide-react";
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
    title: "Tripura 365",
    description: `Tripura 365 is a dynamic and trusted Indian news website that brings you 
    the latest and most relevant news from the vibrant state of Tripura.`,
    metadataBase: new URL(`${protocol}://${origin}`),
    openGraph: {
      title: "Tripura 365",
      description: `Tripura 365 is a dynamic and trusted Indian news website that brings you 
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
          alt: "Tripura 365",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tripura 365",
      description: `Tripura 365 is a dynamic and trusted Indian news website that brings you 
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
  const imageGalleryData = imageGallery ?? [];
  const topNews = await getTopNews();
  const headlines = await getHeadline();

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Category Navigation - Enhanced Premium Bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-100 shadow-sm transition-all duration-500 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto py-5 no-scrollbar mask-gradient-x">
            {sortcategories(categories ?? [])
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.id}`}
                  className="shrink-0"
                >
                  <span className="px-6 py-2.5 rounded-full bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300 border border-gray-100 hover:border-black hover:shadow-xl hover:shadow-black/10 block">
                    {item.name}
                  </span>
                </Link>
              ))}
            <Link
              href={`https://ica.tripura.gov.in/press-release`}
              target="_blank"
              className="shrink-0"
            >
              <span className="px-6 py-2.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-red-700 transition-all duration-300 border border-red-500 shadow-lg shadow-red-600/20 block">
                তথ্য ও সংস্কৃতি
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Important Links: Elevated Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {impLinks.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              target="_blank"
              className="group flex flex-col items-center justify-center gap-5 p-10 bg-white rounded-4xl shadow-xl shadow-gray-200/40 border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="p-5 bg-gray-50 text-gray-900 rounded-3xl group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-600/30">
                <link.icon size={32} />
              </div>
              <span className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 group-hover:text-blue-600 transition-colors">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Breaking News: Modern Animated Marquee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-4xl shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden flex flex-col md:flex-row items-stretch min-h-[70px]">
          <div className="bg-red-600 text-white px-12 py-5 flex items-center justify-center gap-4 shrink-0 z-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-500" />
            <div className="relative flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-lg"></span>
              </span>
              <h1 className="text-xl font-black uppercase tracking-tighter whitespace-nowrap">
                শিরোনামে{" "}
                <span className={cn("text-2xl", galanda.className)}>৩৬৫</span>
              </h1>
            </div>
          </div>

          <Marquee items={headlines ?? []} />
        </div>
      </section>

      {/* Hero Section: Carousel + Top News Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-stretch">
          {/* Main Carousel */}
          <div className="lg:col-span-3 h-full min-h-[500px]">
            <HeroCarousel data={imageGalleryData} />
          </div>

          {/* Side News */}
          <div className="lg:col-span-1 h-full">
            <TopNewsSidebar data={topNews?.slice(0, 3) ?? []} />
          </div>
        </div>
      </section>
    </div>
  );
}
