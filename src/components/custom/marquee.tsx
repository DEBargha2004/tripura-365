"use client";

import { cn } from "@/lib/utils";
import { Data, Headline } from "@/types/response";

interface MarqueeProps {
  items: Headline[];
  className?: string;
}

export default function Marquee({ items, className }: MarqueeProps) {
  if (!items || items.length === 0)
    return <span className="text-gray-400">Loading headlines...</span>;

  return (
    <div
      className={cn(
        "flex-1 flex items-center bg-white relative overflow-hidden group/marquee",
        className,
      )}
    >
      {/* Mask gradients for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white via-white/80 to-transparent z-10" />

      {/* Scrolling container */}
      <div className="flex whitespace-nowrap animate-marquee group-hover/marquee:paused">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-16 px-16">
            {items.map((item) => (
              <div
                key={`${i}-${item.id}`}
                className="flex items-center gap-12 whitespace-nowrap"
              >
                <span className="text-lg font-black text-gray-900 tracking-tight hover:text-red-600 transition-colors cursor-pointer">
                  {item.content}
                </span>
                <span className="text-gray-200 font-black text-2xl">/</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
