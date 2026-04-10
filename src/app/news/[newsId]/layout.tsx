import { getImageGallery, getTopNews } from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import TopNewsSidebar from "@/components/custom/top-news-sidebar";
import TopNews from "@/components/custom/top-news";
import { getPortraitAdBannerImages } from "@/actions/news";
import AdCarousel from "@/components/custom/ad-carousel";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const topNews = await getTopNews();
  const imageGallery = await getImageGallery();
  const portraitAds = await getPortraitAdBannerImages();

  return (
    <>
      {children}

      {/* Footer Section: Ads + Carousel Matrix */}
      <section className="bg-white py-16 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main Carousel (75%) */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-2.5 h-8 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                  Spotlight Gallery
                </h3>
              </div>
              <HeroCarousel data={imageGallery ?? []} />
            </div>
            {/* Left Ad Section (25%) */}
            <div className="lg:col-span-1 h-[400px] md:h-[500px] hidden lg:block border-r-2 border-slate-50 pr-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-6 bg-slate-200 block" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  Sponsored
                </p>
              </div>
              <div className="size-full rounded-2xl overflow-hidden ring-1 ring-slate-100 shadow-sm">
                <AdCarousel data={portraitAds ?? []} />
              </div>
            </div>
            {/* Bottom News (Full Width) */}
            <div className="col-span-full pt-10 border-t border-slate-50 mt-10">
              <TopNewsSidebar data={topNews?.slice(0, 5) ?? []} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
