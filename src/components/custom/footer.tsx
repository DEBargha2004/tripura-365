import { getCategoryWiseNews } from "@/actions/news";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
  FaPrint,
} from "react-icons/fa6";
import Logo from "./logo";
import Link from "next/link";

export default async function Footer() {
  const categoryResponse = await getCategoryWiseNews();

  const footerLinks = [
    {
      title: "News",
      links: [
        { name: "Corporate & In-House News", href: "#" },
        { name: "Litigation", href: "#" },
        { name: "Law & Policy", href: "#" },
        { name: "Law Schools", href: "#" },
        { name: "Judges", href: "#" },
      ],
    },
    {
      title: "Interviews",
      links: [
        { name: "Corporate & In-House", href: "#" },
        { name: "Litigation", href: "#" },
        { name: "Law Schools", href: "#" },
        { name: "Law & Policy", href: "#" },
      ],
    },
    {
      title: "Columns",
      links: [
        { name: "Corporate & In-House", href: "#" },
        { name: "Law & Policy", href: "#" },
        { name: "Litigation", href: "#" },
        { name: "The Recruiters", href: "#" },
        { name: "Working Title", href: "#" },
      ],
    },
    {
      title: "Viewpoint",
      links: [],
    },
    {
      title: "Dealstreet",
      links: [],
    },
  ];

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Logo */}
        <div className="flex flex-col items-center mb-20">
          <Logo className="h-12 w-auto grayscale brightness-0 invert opacity-80" />
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-white/90 leading-none mt-4">
            Bar<span className="font-serif italic mx-0.5 text-white/60">and</span>
            Bench
          </h1>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 pb-16">
          {/* Column 1: Follow Us */}
          <div className="col-span-2 md:col-span-1 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-4">
                <FaXTwitter className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
                <FaYoutube className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
                <FaFacebookF className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
                <FaLinkedinIn className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
                <FaInstagram className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
                <FaPrint className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
                <FaWhatsapp className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              <Link href="#" className="block">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <Link href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>

            <Link
              href="#"
              className="inline-block border border-white/30 px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all"
            >
              Subscribe
            </Link>
          </div>

          {/* Dynamic Columns from Categories */}
          {categoryResponse.slice(0, 5).map((category) => (
            <div key={category.name} className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
                {category.name}
              </h4>
              <ul className="space-y-2.5">
                {category.articles.slice(0, 5).map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/news/${article.id}`}
                      className="text-xs font-bold leading-relaxed text-white/90 hover:text-white transition-colors block line-clamp-2"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.15em] text-white/40 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-white transition-colors">
              Terms Of Use
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Careers
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Advertise with us
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              About us
            </Link>
          </div>
          <div className="md:absolute md:right-8 opacity-60">
            Powered by Tripura 365
          </div>
        </div>
        <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          Copyright © {new Date().getFullYear()} Bar and Bench. All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
}
