"use client";

import { getWeatherInfo } from "@/actions/news";
import { WeatherData } from "@/types/response";
import { CloudSunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();

  useEffect(() => {
    getWeatherInfo().then((res) => {
      if (res && res.status) {
        setWeatherData(res.data);
      } else {
        setWeatherData(null);
      }
    });
  }, []);

  return (
    <section className="flex gap-2 items-center">
      <CloudSunIcon size={17} />
      <div>
        {weatherData === undefined ? (
          <Skeleton className="h-4 w-10" />
        ) : weatherData === null ? (
          "N/A"
        ) : (
          `${weatherData?.main.temp.toFixed()}° Celsius`
        )}
      </div>
    </section>
  );
}
