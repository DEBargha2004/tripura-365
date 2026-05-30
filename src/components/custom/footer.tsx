import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import { getCategoryWiseNews } from "@/actions/news";
import { Data } from "@/types/response";

const legalInfos = [
  { name: "Terms of Use", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Advertise with us", href: "#" },
  { name: "About us", href: "#" },
];

export default async function Footer() {
  const categoryResponse = await getCategoryWiseNews();
  const categories = (categoryResponse?.data ?? []).sort(
    (a: { articles: Data[] }, b: { articles: Data[] }) => (b.articles?.length ?? 0) - (a.articles?.length ?? 0),
  );

  const socialAccounts = [
    {
      icon: <FaXTwitter className="w-3.5 h-3.5" />,
      href: "#",
    },
    {
      icon: <FaYoutube className="w-3.5 h-3.5" />,
      href: "#",
    },
    {
      icon: <FaFacebookF className="w-3.5 h-3.5" />,
      href: "#",
    },
    {
      icon: <FaLinkedinIn className="w-3.5 h-3.5" />,
      href: "#",
    },
    {
      icon: <FaInstagram className="w-3.5 h-3.5" />,
      href: "#",
    },
    {
      icon: <span className="text-[10px] font-bold">G</span>,
      href: "#",
    },
    {
      icon: <FaWhatsapp className="w-3.5 h-3.5" />,
      href: "#",
    },
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Centered Logo */}
        <div className="flex flex-col items-center select-none mb-20">
          <span className="text-[9px] font-sans font-bold tracking-[0.35em] text-white/60 uppercase mb-1">
            Tripura's Leading Voice
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-white leading-none">
            <span>Tripura</span>
            <span className="text-white/80 font-serif italic font-medium mx-1.5">News</span>
            <span className="text-accent font-serif font-black drop-shadow">Time</span>
          </h1>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-10 gap-y-12 pb-20">
          {/* Column 1: Follow Us */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[18px] font-serif font-black text-white">
              Follow Us
            </h4>
            {/* Social Icons */}
            <div className="grid grid-cols-4 gap-3 max-w-[120px]">
              {socialAccounts.map((account, idx) => (
                <Link
                  key={idx}
                  href={account.href}
                  className="w-6 h-6 rounded-full bg-black/20 text-white flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {account.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Category Columns */}
          {categories.slice(0, 5).map((category: { name: string; articles: Data[] }) => (
            <div key={category.name} className="flex flex-col gap-5">
              <h4 className="text-xl font-serif font-bold text-white tracking-wide">
                {category.name}
              </h4>

              {category.articles.length > 0 && (
                <ul className="space-y-3">
                  {category.articles.slice(0, 5).map((article: Data) => (
                    <li key={article.id}>
                      <Link
                        href={`/news/${article.id}`}
                        className="text-[16px] font-serif text-white/90 hover:text-white transition-colors block"
                      >
                        <span className="line-clamp-1">{article.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col items-center gap-6 text-[14px] font-serif text-white/90 text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            {legalInfos.map((legalInfo, index) => (
              <div
                key={legalInfo.name}
                className="flex items-center gap-4 text-base"
              >
                <Link
                  href={legalInfo.href}
                  className="hover:text-white transition-colors"
                >
                  {legalInfo.name}
                </Link>
                {index < legalInfos.length - 1 && (
                  <span className="text-white/40">|</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/70">
            <span>
              Copyright © {new Date().getFullYear()} Tripura News Time. All Rights
              Reserved
            </span>
            <span>Powered by Patrakar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
