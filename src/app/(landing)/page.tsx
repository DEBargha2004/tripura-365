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
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Category Navigation - Sticky & Horizontal Scroll */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto py-3 no-scrollbar mask-gradient-x">
            {sortcategories(categories ?? [])
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${item.id}`}
                  className="shrink-0"
                >
                  <span className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-red-50 hover:text-red-600 transition-all duration-300 border border-transparent hover:border-red-200 block">
                    {item.name}
                  </span>
                </Link>
              ))}
            <Link
              href={`https://ica.tripura.gov.in/press-release`}
              target="_blank"
              className="shrink-0"
            >
              <span className="px-5 py-2 rounded-full bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition-all duration-300 border border-red-100 block">
                তথ্য ও সংস্কৃতি
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Shlok Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-4 py-6">
        <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 text-center overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />

          <h4 className="relative text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-relaxed font-serif">
            <span className="text-4xl text-orange-500 opacity-50 absolute -top-4 -left-2">
              ❝
            </span>
            {slok.body}
            <span className="text-4xl text-orange-500 opacity-50 absolute -bottom-8 -right-2">
              ❞
            </span>
          </h4>
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium mt-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
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
              className="group flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <link.icon size={20} />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
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
