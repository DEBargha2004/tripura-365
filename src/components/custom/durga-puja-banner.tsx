"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Galada } from "next/font/google";
import { cn } from "@/lib/utils";
import { DURGA_PUJA_CONFIG, DURGA_PUJA_EVENT } from "@/constants/durga-puja";
import {
  getEventStatus,
  toBengaliNumber,
  toPaddedBengaliNumber,
} from "@/lib/durga-puja";
import { EventConfig, EventStatus } from "@/types/durga-puja";

const galada = Galada({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

interface DurgaPujaBannerProps {
  event?: EventConfig;
  imageSrc?: string;
  className?: string;
}

export default function DurgaPujaBanner({
  event = DURGA_PUJA_EVENT,
  imageSrc,
  className,
}: DurgaPujaBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [testDateOverride, setTestDateOverride] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<EventStatus>(() =>
    getEventStatus(event, new Date())
  );

  const bannerImageSrc = imageSrc || event.defaultImagePath || DURGA_PUJA_CONFIG.defaultImagePath;
  const bannerImageAlt = event.imageAlt || DURGA_PUJA_CONFIG.imageAlt;

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlDate = params.get("durga_date");
      if (urlDate) {
        setTestDateOverride(urlDate);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateStatus = () => {
      setStatus(getEventStatus(event, new Date(), testDateOverride));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, [mounted, testDateOverride, event]);

  // Automatically hide the banner after Dashami has ended
  if (status.stage === "PASSED") {
    return null;
  }

  const { countdown, isFestivalActive } = status;

  return (
    <aside
      role="banner"
      aria-label="শারদোৎসব ব্যানার"
      className={cn(
        "bg-[#5c0a0a] text-white border-b border-amber-500/20 select-none",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        {/* Left: Durga Image & Greetings */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative size-10 sm:size-11 shrink-0 rounded-full border border-amber-400/50 overflow-hidden shadow-sm">
            <Image
              src={bannerImageSrc}
              alt={bannerImageAlt}
              fill
              priority
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <h2
              className={cn(
                "text-lg sm:text-2xl text-amber-200 tracking-wide font-medium leading-tight truncate",
                galada.className
              )}
            >
              {status.title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/85 truncate">
              {status.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Live Countdown (if countdown period) */}
        {!isFestivalActive && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm bg-black/30 border border-amber-500/25 px-3 py-1 rounded-full text-amber-200 shrink-0">
            <span className="font-semibold text-amber-300" suppressHydrationWarning>
              {toBengaliNumber(countdown.days)}
            </span>
            <span>দিন</span>
            <span className="text-amber-400/50 font-mono">:</span>
            <span className="font-semibold text-amber-300" suppressHydrationWarning>
              {toPaddedBengaliNumber(countdown.hours)}
            </span>
            <span>ঘণ্টা</span>
            <span className="hidden sm:inline text-amber-400/50 font-mono">:</span>
            <span className="hidden sm:inline font-semibold text-amber-300" suppressHydrationWarning>
              {toPaddedBengaliNumber(countdown.minutes)}
            </span>
            <span className="hidden sm:inline">মিনিট</span>
            <span className="hidden md:inline text-amber-400/50 font-mono">:</span>
            <span className="hidden md:inline font-semibold text-amber-300" suppressHydrationWarning>
              {toPaddedBengaliNumber(countdown.seconds)}
            </span>
            <span className="hidden md:inline">সেকেন্ড</span>
          </div>
        )}
      </div>
    </aside>
  );
}
