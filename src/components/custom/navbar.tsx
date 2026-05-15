import Link from "next/link";
import Logo from "./logo";
import Timer from "./timer";
import Weather from "./weather";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/actions/news";
import {
  FaApple,
  FaPlay,
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPrint,
  FaWhatsapp,
} from "react-icons/fa6";
import { Search } from "lucide-react";

export default async function Navbar() {
  const categories = await getAllCategories();

  return (
    <nav className="z-50 bg-white">
      {/* Top Tier: Utilities, Logo, User Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32 relative py-4">
          {/* Left: Icons + Time/Weather */}
          <div className="hidden lg:flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
              <FaPlay className="w-3 h-3 cursor-pointer hover:text-primary transition-colors" />
              <FaApple className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
            </div>
            <div className="flex items-center gap-4">
              <Timer />
              <div className="h-8 w-px bg-gray-200" />
              <Weather />
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2">
            <Link href="/" className="flex flex-col items-center group">
              <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-gray-900 leading-none">
                Bar<span className="text-primary font-serif italic mx-1 opacity-80">and</span>Bench
              </h1>
            </Link>
          </div>

          {/* Right: Social + Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4 border-r border-gray-200 pr-4 mr-2">
              <Link
                href="#"
                className="text-[11px] font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="#"
                className="text-[11px] font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors"
              >
                Subscribe
              </Link>
            </div>
            <div className="flex items-center gap-2.5 text-gray-500">
              <FaXTwitter className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
              <FaYoutube className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
              <FaFacebookF className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
              <FaLinkedinIn className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
              <FaInstagram className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
              <FaPrint className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
              <FaWhatsapp className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Mobile Menu Toggle (Simplified for now) */}
          <div className="lg:hidden flex items-center gap-4 ml-auto">
            <Search className="w-5 h-5 text-gray-600" />
            <button className="p-2 text-gray-600">
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Maroon Nav Links */}
      <div className="bg-primary text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              <Link
                href="/"
                className="text-[12px] font-bold uppercase tracking-[0.05em] whitespace-nowrap hover:opacity-75 transition-opacity"
              >
                Latest Legal News
              </Link>
              {categories.slice(0, 8).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="text-[12px] font-bold uppercase tracking-[0.05em] whitespace-nowrap hover:opacity-75 transition-opacity flex items-center gap-1"
                >
                  {cat.name}
                  <span className="text-[8px] ml-0.5 opacity-70">▼</span>
                </Link>
              ))}
              <Link
                href="#"
                className="text-[12px] font-bold uppercase tracking-[0.05em] whitespace-nowrap hover:opacity-75 transition-opacity"
              >
                Legal Jobs
              </Link>
            </div>
            
            {/* Right side Search icon in Maroon bar */}
            <div className="shrink-0 pl-6 ml-auto flex items-center">
              <Search className="w-4 h-4 cursor-pointer hover:opacity-75 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
