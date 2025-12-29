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
    <section className="py-12 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 justify-start mb-8">
          <h2 className="text-3xl font-bold">বিজ্ঞাপন</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                Disclaimer <Info />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <h3 className="font-bold">Disclaimer</h3>
              <p className="text-muted-foreground">
                Itegrity of any product/service/scheme is intelectual
                responsibility of the Advertiser itself. Tripura 365.com takes
                no responsibility related to commitments made by an advertiser
                to our readers.
              </p>
              <PopoverClose asChild>
                <Button>I Understood!</Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-2 auto gap-4">
          <section
            className={cn(
              "row-span-2 lg:row-start-1 lg:col-start-1 lg:h-full sm:col-span-1 col-span-2",
              "h-[550px] space-y-2",
              "flex flex-col"
            )}
          >
            <h2>Ad 1</h2>
            <AdCarousel data={tallData?.slice(0, 3)} />
          </section>
          <section
            className={cn(
              "h-60 lg:col-span-2 lg:row-start-1",
              "row-start-3 col-span-2 space-y-2",
              "flex flex-col"
            )}
          >
            <h2>Ad 2</h2>
            <AdCarousel data={wideData?.slice(0, 3)} />
          </section>
          <section
            className={cn(
              "h-60 lg:col-span-2 lg:row-start-2",
              "row-start-4 col-span-2 space-y-2",
              "flex flex-col"
            )}
          >
            <h2>Ad 3</h2>
            <AdCarousel data={wideData?.slice(3)} />
          </section>
          <section
            className={cn(
              "lg:row-span-2 lg:col-start-4 lg:h-full sm:col-span-1 col-span-2",
              "row-start-1 h-[550px] space-y-2",
              "flex flex-col"
            )}
          >
            <h2>Ad 4</h2>
            <AdCarousel data={tallData?.slice(3)} />
          </section>
        </div>
      </div>
    </section>
  );
}
