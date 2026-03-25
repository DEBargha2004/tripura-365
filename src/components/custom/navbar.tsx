import Link from "next/link";
import Logo from "./logo";
import Timer from "./timer";
import Weather from "./weather";
import { Galada } from "next/font/google";
import { cn } from "@/lib/utils";

const galanda = Galada({ subsets: ["latin"], weight: ["400"] });

function EventBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("size-16", className)} {...props}>
      <img
        src={"https://d2ros3ibvdm942.cloudfront.net/tripura365/event.jpeg"}
        alt="Event"
        className="size-full rounded-none border-[3px] border-slate-100 shadow-[4px_4px_0px_rgba(237,28,36,1)] object-cover hover:scale-105 hover:border-red-600 transition-all duration-300"
      />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b-[3px] border-b-red-600 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="shrink-0 flex items-center relative">
            <Link href={"/"} className="group relative z-10">
              <Logo className="transition-transform duration-300 group-hover:scale-105" />
            </Link>
            {/* <div className="absolute left-16 flex items-center gap-1.5 bg-black text-white px-2.5 py-1 -skew-x-12 h-fit my-auto border-l-4 border-red-600 shadow-[0_2px_10px_rgba(0,0,0,0.2)] z-20 pointer-events-none">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-none animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest skew-x-12 uppercase pt-0.5">Live</span>
            </div> */}
          </div>

          {/* Center: Title */}
          <div className="flex-1 flex justify-center items-end md:gap-8 pointer-events-none relative">
            <Link href={"/"} className="pointer-events-auto">
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-extrabold bg-linear-to-r from-red-600 to-red-700 bg-clip-text text-transparent whitespace-nowrap tracking-tight hover:scale-105 hover:drop-shadow-[0_4px_12px_rgba(237,28,36,0.3)] transition-all duration-500 cursor-pointer drop-shadow-sm",
                  galanda.className,
                )}
              >
                Rastriya Samachar
              </h1>
            </Link>
            <EventBadge className="hidden md:block" />
          </div>

          {/* Right: Utilities */}
          <div className="hidden lg:flex items-center gap-4 z-10">
            <div className="bg-white px-5 py-2.5 rounded-none border border-slate-200 border-b-[3px] border-b-red-600 flex items-center gap-4 text-sm font-medium text-slate-800 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
              <Timer />
              <div className="h-5 w-px bg-slate-300" />
              <Weather />
            </div>
          </div>
          <EventBadge className="block md:hidden" />

          {/* Mobile Spacer to keep title centered if utilities are hidden */}
          {/* <div className="md:hidden w-16" /> */}
        </div>
      </div>
    </nav>
  );
}
