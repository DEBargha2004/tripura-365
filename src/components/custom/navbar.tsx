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
        className="size-full rounded-full border-[3px] border-white shadow-[0_8px_25px_rgba(244,63,94,0.2)] object-cover hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-100/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="shrink-0 flex items-center relative">
            <Link href={"/"} className="group relative z-10">
              <Logo className="transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <div
              className={cn(
                "bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold tracking-wider h-fit my-auto px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]",
                "absolute left-14 whitespace-nowrap border border-white/20",
              )}
            >
              Test Run
            </div>
          </div>

          {/* Center: Title */}
          <div className="flex-1 flex justify-center items-end md:gap-8 pointer-events-none relative">
            <Link href={"/"} className="pointer-events-auto">
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-rose-600 via-red-500 to-orange-500 bg-clip-text text-transparent whitespace-nowrap tracking-tight hover:scale-105 transition-all duration-500 cursor-pointer drop-shadow-sm",
                  galanda.className,
                )}
              >
                News Record
              </h1>
            </Link>
            <EventBadge className="hidden md:block" />
          </div>

          {/* Right: Utilities */}
          <div className="hidden md:flex items-center gap-4 z-10">
            <div className="bg-white px-5 py-2.5 rounded-full border border-gray-100/80 flex items-center gap-4 text-sm font-medium text-slate-600 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
              <Timer />
              <div className="h-5 w-px bg-slate-200" />
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
