import Link from "next/link";
import Logo from "./logo";
import Timer from "./timer";
import Weather from "./weather";
import { Galada } from "next/font/google";
import { cn } from "@/lib/utils";

const galanda = Galada({ subsets: ["latin"], weight: ["400"] });

function EventBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("size-16 relative group cursor-pointer", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
      <img
        src={"https://d2ros3ibvdm942.cloudfront.net/tripura365/event.jpeg"}
        alt="Event"
        className="size-full rounded-full border-2 border-white/50 shadow-2xl object-cover relative z-10 scale-110 group-hover:scale-125 transition-transform duration-500"
      />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-100 bg-white/90 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left: Logo & Status */}
          <div className="shrink-0 flex items-center gap-6 relative">
            <Link
              href={"/"}
              className="group relative z-10 flex items-center gap-3"
            >
              <Logo className="transition-all duration-500 group-hover:scale-105 group-hover:rotate-2" />
              <div className="flex flex-col -gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
                  Live
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  Network
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Brand Title */}
          {/* <div className="flex-1 flex justify-center items-center gap-4 lg:gap-10 pointer-events-none relative">
            <Link href={"/"} className="pointer-events-auto group">
              <h1
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-black text-red-600 whitespace-nowrap tracking-tight group-hover:scale-105 transition-all duration-700 cursor-pointer drop-shadow-[0_5px_15px_rgba(220,38,38,0.15)] group-hover:drop-shadow-[0_10px_20px_rgba(220,38,38,0.25)]",
                  galanda.className,
                )}
              >
                ত্রিপুরা ৩৬৫
              </h1>
            </Link>
            <EventBadge className="hidden lg:block" />
          </div> */}

          {/* Right: Utilities - High Impact Glassmorphism */}
          <div className="hidden md:flex items-center gap-4 z-10">
            <div className="bg-gray-50/80 backdrop-blur-xl px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-900 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:border-blue-200 transition-all duration-500">
              <div className="flex items-center gap-2">
                <Timer />
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Weather />
              </div>
            </div>
          </div>

          {/* Mobile Event Badge */}
          <EventBadge className="block lg:hidden scale-75" />
        </div>
      </div>
    </nav>
  );
}
