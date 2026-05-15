"use client";

import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function Timer() {
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const dayOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formattedDate = now.toLocaleDateString("en-IN", dayOptions);
      const formattedTime = now.toLocaleTimeString("en-IN", timeOptions);

      setDay(formattedDate);
      setTime(formattedTime);
    });

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col w-full items-end">
      <div className="flex justify-start w-full items-center gap-2">
        <Calendar size={16} />
        <h3 className="font-bold">{day}</h3>
      </div>
      <div className="flex justify-start w-full items-center gap-2">
        <Clock size={16} />
        <h4 className="font-medium">{time}</h4>
      </div>
    </div>
  );
}
