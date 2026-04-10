"use client";

import { useState, useEffect } from "react";

export function LiveNotificationPill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after some delay for demonstration
    const timeout = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-[150px] left-1/2 -translate-x-1/2 z-100 animate-in fade-in slide-in-from-top-4 duration-500">
      <div
        className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-full shadow-[0_8px_16px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer transition-colors border border-[#34D399] relative overflow-hidden group"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setVisible(false);
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

        {/* SVG Pulse Indicator */}
        <div className="relative flex items-center justify-center w-3 h-3 z-10">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 animate-ping"
          >
            <circle cx="6" cy="6" r="4" fill="#ffffff" opacity="0.8" />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <circle cx="6" cy="6" r="3" fill="#ffffff" />
          </svg>
        </div>

        <span className="font-bold tracking-wider text-[11px] whitespace-nowrap z-10 relative">
          1 NEW STORY
        </span>
      </div>
    </div>
  );
}
