"use client";

import { cn } from "@/lib/utils";
import durga from "@/../public/durga.webp";
import dhaki from "@/../public/dhaki.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const englishToBanglaDigits: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

type Tithi = {
  title: string;
  date_start: Date;
  date_end: Date;
};

const tithi_list: Tithi[] = [
  {
    title: "শুভ ষষ্ঠী",
    date_start: new Date("2025-09-28"),
    date_end: new Date("2025-09-29"),
  },
  {
    title: "শুভ সপ্তমী",
    date_start: new Date("2025-09-29"),
    date_end: new Date("2025-09-30"),
  },
  {
    title: "শুভ অষ্টমী",
    date_start: new Date("2025-09-30"),
    date_end: new Date("2025-10-01"),
  },
  {
    title: "শুভ নবমী",
    date_start: new Date("2025-09-28"),
    date_end: new Date("2025-10-02"),
  },
  {
    title: "শুভ বিজয়া দশমী",
    date_start: new Date("2025-10-02"),
    date_end: new Date("2025-10-03"),
  },
];
tithi_list.sort((a, b) => a.date_start.getTime() - b.date_start.getTime());

type Status = "upcoming" | "ongoing" | "completed";

export default function DurgaBanner() {
  const [pujaStatus, setPujaStatus] = useState<Status | null>(null);
  const [currentTithi, setCurrentTithi] = useState<Tithi | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const lastTithi = tithi_list[tithi_list.length - 1];
    const firstTithi = tithi_list[0];
    const currentDate = new Date();

    if (currentDate.getTime() > lastTithi.date_end.getTime()) {
      setPujaStatus("completed");
    } else if (currentDate.getTime() < firstTithi.date_start.getTime()) {
      setPujaStatus("upcoming");
    } else {
      setPujaStatus("ongoing");
      setCurrentTithi(
        tithi_list.find(
          (tithi) => tithi.date_start.getDate() === currentDate.getDate()
        )!
      );
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pujaStatus === "upcoming") {
      const minDate = tithi_list[0].date_start;
      const currentDate = new Date();

      setTimer(minDate.getTime() - currentDate.getTime());
      interval = setInterval(() => {
        setTimer((prev) => prev! - 1000);
      }, 1000 * 60);
    }

    return () => interval && clearInterval(interval);
  }, [pujaStatus]);

  return (
    pujaStatus !== "completed" && (
      <section className="py-12 bg-white">
        <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
          <div
            className={cn(
              "bg-gradient-to-tr from-orange-400 to-yellow-400 p-5 overflow-hidden rounded-lg",
              "flex md:flex-row flex-col items-center gap-10"
            )}
          >
            <div>
              <Image src={durga} alt="surga-image" height={200} width={200} />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-white flex-1">
              <h1 className="text-4xl font-bold whitespace-nowrap">
                {pujaStatus === "upcoming" ? "মা আসছেন" : currentTithi?.title}
              </h1>
              {timer && <Timer time={timer} />}
            </div>
            <div className="md:block hidden">
              <Image
                src={dhaki}
                alt="surga-image"
                height={200}
                width={200}
                className="scale-125"
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
}

function Timer({ time }: { time: number }) {
  const days = Math.ceil(time / (1000 * 60 * 60 * 24));
  return (
    <div className="flex justify-start items-center gap-2 text-2xl font-semibold">
      <span className="whitespace-nowrap">
        {englishToBanglaDigits[days.toString()]} দিনের অপেক্ষা
      </span>
    </div>
  );
}
