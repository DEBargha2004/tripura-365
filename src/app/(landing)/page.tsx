import {
  getCategoryWiseNews,
  getTopNews,
  getLatestNews,
  getSlok,
} from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import { Metadata } from "next";
import Link from "next/link";
import siteLogo from "@/../public/newsTopLinkLogo.webp";
import { headers } from "next/headers";
import { Dot, Globe, Plane, TramFront } from "lucide-react";
import { IconType } from "react-icons";
import { Galada } from "next/font/google";
import { cn } from "@/lib/utils";

export const relaidate = 60 * 10;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const origin = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

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
          url: siteLogo.src,
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
      images: [siteLogo.src],
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

export default async function Home() {
  const { data } = await getTopNews();
  const categories = await getCategoryWiseNews();
  const slok = await getSlok();
  const { data: latestNews } = await getLatestNews();
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-auto py-4 mb-0">
        <div className="flex space-x-4">
          {categories?.data?.map((item) => (
            <div
              key={item.name}
              className="min-w-max px-6 py-3 text-gray-800 rounded hover:bg-gray-200 transition border-1 border-red-600 cursor-pointer"
            >
              <Link
                href={`/category/${item.articles[0].category.id}`}
                target="_blank"
              >
                <span className="text-sm font-semibold">{item.name}</span>
              </Link>
            </div>
          ))}
          <div className="min-w-max px-6 py-3 text-gray-800 rounded hover:bg-gray-200 transition border-1 border-red-600 cursor-pointer">
            <Link
              href={`https://ica.tripura.gov.in/press-release`}
              target="_blank"
            >
              <span className="text-sm font-semibold">তথ্য ও সংস্কৃতি</span>
            </Link>
          </div>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h4 className="font-semibold text-xl">{slok.body}</h4>
        <p>
          {slok.chapter} অধ্যায়, {slok.slok} শ্লোক
        </p>
      </section>
      <section className="max-w-5xl mx-auto flex flex-col justify-start items-center gap-0">
        {impLinks.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className="flex items-center gap-2 text-blue-600 font-medium w-40"
            target="_blank"
          >
            <link.icon size={16} />
            <span className="transition-colors from-blue-200 to-blue-700 animate-pulse">
              {link.title}
            </span>
          </Link>
        ))}
      </section>
      <section className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-red-800">
            শিরোনামে{" "}
            <span className={cn("text-2xl font-bold", galanda.className)}>
              ৩৬৫
            </span>
          </h1>
        </div>

        <div className="border border-black">
          {/**@ts-ignore */}
          <marquee
            style={{ height: "30px", display: "flex", alignItems: "center" }}
          >
            <div className="flex items-center h-full">
              {!!latestNews &&
                `Headlines: ${latestNews?.[0]?.category.name}  ${latestNews?.[0]?.title}`}
            </div>
            {/**@ts-ignore */}
          </marquee>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroCarousel data={data ?? []} />
      </section>
    </div>
  );
}
