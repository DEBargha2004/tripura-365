import { AdVideoData } from "@/types/response";

export default function AdVideos({ data }: { data?: AdVideoData[] }) {
  return (
    <section className="py-12 md:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
            ভিডিও বিজ্ঞাপন
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-gradient-to-r from-slate-200 to-transparent rounded-full hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.slice(0, 6)?.map((ad) => (
            <div key={ad.id} className="group block h-full">
              <article className="relative h-96 w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] transition-all duration-500 transform hover:-translate-y-1.5 bg-slate-900 ring-1 ring-white/60">
                <iframe
                  src={`https://www.youtube.com/embed/${ad.link}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ad.link}`}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Gradient Overlay (optional, maybe not needed over video, but keeps style consistent if video doesn't load immediately or for aesthetics) 
                    Actually, overlaying a gradient over an active video might obscure it. 
                    I'll remove the strong gradient so the video is clearly visible, 
                    or make it very subtle at the bottom if we had text. 
                    Since there is no text, I will remove the gradient and play button overlay.
                */}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
