"use client";

import { AdBannerImageData } from "@/types/response";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AdCarousel from "./ad-carousel";

export default function AdImages({
  wideData,
  tallData,
}: {
  wideData?: AdBannerImageData[];
  tallData?: AdBannerImageData[];
}) {
  return (
    <section className="py-12 md:py-20 bg-slate-50/50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">বিজ্ঞাপন</h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                Disclaimer <Info className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <h3 className="font-bold">Disclaimer</h3>
              <p className="text-muted-foreground text-sm">
                Integrity of any product/service/scheme is intellectual
                responsibility of the Advertiser itself. News Record.com takes
                no responsibility related to commitments made by an advertiser
                to our readers.
              </p>
              <PopoverClose asChild>
                <Button size="sm">I Understood!</Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-2 auto gap-6">
          <section
            className={cn(
              "row-span-2 lg:row-start-1 lg:col-start-1 lg:h-full sm:col-span-1 col-span-2",
              "h-[550px]",
              "rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white ring-1 ring-slate-100"
            )}
          >
            <AdCarousel data={tallData?.slice(0, 3)} />
          </section>
          <section
            className={cn(
              "h-60 lg:col-span-2 lg:row-start-1",
              "row-start-3 col-span-2",
              "rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white ring-1 ring-slate-100"
            )}
          >
            <AdCarousel data={wideData?.slice(0, 3)} />
          </section>
          <section
            className={cn(
              "h-60 lg:col-span-2 lg:row-start-2",
              "row-start-4 col-span-2",
              "rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white ring-1 ring-slate-100"
            )}
          >
            <AdCarousel data={wideData?.slice(3)} />
          </section>
          <section
            className={cn(
              "lg:row-span-2 lg:col-start-4 lg:h-full sm:col-span-1 col-span-2",
              "row-start-1 h-[550px]",
              "rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white ring-1 ring-slate-100"
            )}
          >
            <AdCarousel data={tallData?.slice(3)} />
          </section>
        </div>
      </div>
    </section>
  );
}
