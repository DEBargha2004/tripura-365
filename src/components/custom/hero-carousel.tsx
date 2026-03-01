"use client";

import { Data, ImageItem } from "@/types/response";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroCarousel({ data: slides }: { data: ImageItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    if (mouseOver) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, mouseOver]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative h-96 md:h-[500px] lg:h-full overflow-hidden bg-gray-900 rounded-4xl shadow-2xl group/carousel"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {slides?.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="w-full h-full">
            {slide && (
              <img
                src={slide.secure_url}
                alt={slide.caption}
                className={`size-full object-cover transition-transform duration-[5s] ease-linear ${
                  index === currentSlide ? "scale-110" : "scale-100"
                }`}
              />
            )}
          </div>

          {/* Refined Cinematic Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
            {/* Featured Badge */}
            {/* <div className="mb-4">
              <span className="px-4 py-1.5 bg-blue-600/80 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
                Spotlight
              </span>
            </div> */}

            <h2 className="text-2xl md:text-4xl lg:text-5xl line-clamp-3 font-black text-white mb-4 leading-[1.1] tracking-tight max-w-4xl drop-shadow-2xl">
              {slide.caption}
            </h2>
          </div>
        </div>
      ))}

      {/* Navigation Buttons: Premium Glassmorphism */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-4 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 shadow-2xl"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-4 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 shadow-2xl"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators: Refined dots */}
      <div className="absolute bottom-8 right-12 z-30 flex items-center gap-3">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? "w-10 h-2 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
