"use client";

import { Data, ImageItem } from "@/types/response";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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
      className="relative w-full aspect-video overflow-hidden bg-slate-900 rounded-none border-b-[6px] border-b-red-600 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group transition-all duration-700"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {slides?.map((slide, index) => (
        // <Link href={`/news/${slides[currentSlide].id}`} key={slide.id}>
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full">
            {slide && (
              <img
                src={slide.secure_url}
                alt={slide.caption}
                className="size-full object-cover"
                // width={1000}
                // height={1000}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/20 to-transparent opacity-90 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight drop-shadow-md">
              {slide.caption}
            </h2>

            {/* <p className="text-slate-200 text-base md:text-lg max-w-3xl line-clamp-3">
                {slide.body}
              </p> */}
          </div>
        </div>
        // </Link>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md border-2 border-white/50"
      >
        <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md border-2 border-white/50"
      >
        <ChevronRight className="h-6 w-6 stroke-[2.5]" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-none transition-all duration-500 ${
              index === currentSlide
                ? "w-12 bg-red-600 shadow-[0_0_15px_rgba(237,28,36,0.5)]"
                : "w-6 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
