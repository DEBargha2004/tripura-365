"use client";

import { Data, ImageItem } from "@/types/response";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { generateThumbnail, stripHtml } from "@/lib/utils";

type SlideItem = ImageItem | Data;

export default function HeroCarousel({ data: slides }: { data: SlideItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    if (mouseOver || !slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides?.length, mouseOver]);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getSlideInfo = (slide: SlideItem) => {
    if ("secure_url" in slide) {
      return {
        id: slide.id,
        imageUrl: slide.secure_url,
        title: slide.caption,
        body: null,
        linkUrl: null,
      };
    } else {
      return {
        id: slide.id,
        imageUrl: generateThumbnail({
          thumbnail: slide.thumbnail,
          images: slide.images,
          videos: slide.videos,
        }),
        title: slide.title,
        body: slide.body,
        linkUrl: `/news/${slide.id}`,
      };
    }
  };

  return (
    <div
      className="relative h-96 md:min-h-125 md:h-full overflow-hidden bg-gray-900 rounded-lg"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {slides.map((slide, index) => {
        const { id, imageUrl, title, body, linkUrl } = getSlideInfo(slide);
        const SlideContent = (
          <div className="w-full h-full relative">
            <img
              src={imageUrl}
              alt={title}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h2
                title={title}
                className="text-base md:text-3xl font-bold text-white mb-2 leading-tight font-serif hover:text-accent transition-colors"
              >
                {title}
              </h2>
              {body && (
                <p
                  title={stripHtml(body)}
                  className="text-gray-200 text-sm md:text-base font-serif max-w-3xl line-clamp-2 md:line-clamp-3 leading-relaxed opacity-90 mt-2"
                >
                  {stripHtml(body)}
                </p>
              )}
            </div>
          </div>
        );

        return (
          <div
            key={id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {linkUrl ? (
              <Link href={linkUrl} className="block w-full h-full">
                {SlideContent}
              </Link>
            ) : (
              SlideContent
            )}
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-20 cursor-pointer"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
