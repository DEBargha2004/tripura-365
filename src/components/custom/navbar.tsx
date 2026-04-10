import Link from "next/link";
import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Galada } from "next/font/google";
import { cn } from "@/lib/utils";
import { ChevronDown, Crown } from "lucide-react";

const galanda = Galada({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  return (
    <header className="w-full flex flex-col z-50 transition-all duration-500 font-sans">
      {/* Tier 1: Top Bar */}
      <div className="bg-charcoal text-white/90 text-[11px] md:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          {/* Left: Extra links */}
          <div className="flex items-center gap-6 overflow-hidden">
            {/* Minimal Branding in Top Bar */}
            <Link href="/" className="flex items-center gap-2 group mr-4">
              <div className="bg-red-600 text-white px-2 py-0.5 font-black text-xs tracking-tighter">
                JANAMAT
              </div>
              <div className="font-black text-xs tracking-widest text-white/90">
                NEWS
              </div>
            </Link>

            {/* <div className="hidden lg:flex items-center gap-4 text-white/50 font-bold text-[10px] tracking-wider uppercase">
              <Link
                href="#"
                className="hover:text-white transition-colors pt-0.5"
              >
                Today's Paper
              </Link>
              <span className="w-1 h-1 bg-white/10 rounded-full"></span>
              <Link
                href="#"
                className="hover:text-white transition-colors pt-0.5"
              >
                E-Paper
              </Link>
            </div> */}
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            {/* Premium CTA */}
            {/* <Link
              href="/premium"
              className="flex items-center gap-1.5 text-[#F5C518] hover:text-yellow-300 transition-colors font-bold tracking-wide"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Premium</span>
            </Link> */}

            {/* Theme Toggle */}
            {/* <ThemeToggle /> */}

            {/* LIVE TV Button */}
            <Link
              href="/live"
              className="bg-[#ED1C24] text-white px-3 md:px-5 pb-[1px] h-10 flex items-center font-bold tracking-wider hover:bg-red-700 transition-colors shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE TV
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
