import { getSlok } from "@/actions/news";

export default async function Layout({
  children,
  category,
  latestpost,
  topnews,
  trendingpost,
  videos,
  advideos,
  adimages,
}: {
  children: React.ReactNode;
  category: React.ReactNode;
  latestpost: React.ReactNode;
  topnews: React.ReactNode;
  trendingpost: React.ReactNode;
  videos: React.ReactNode;
  advideos: React.ReactNode;
  adimages: React.ReactNode;
}) {
  const slok = await getSlok();

  return (
    <main className="space-y-4">
      {/* 1. Marquee (children / page.tsx) */}
      {children}
      
      {/* 2. Top News */}
      {topnews}
      
      {/* 3. News (Interviews) */}
      {latestpost}
      
      {/* 4. Categories + Carousel */}
      {category}
      
      {/* Daily Shlok Section at the bottom */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="relative text-center space-y-8">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-serif text-primary/5 opacity-10 select-none">
            ❝
          </div>
          <h4 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 leading-relaxed italic">
            {slok.body}
          </h4>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-px bg-primary/20" />
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
              Chapter {slok.chapter}, Verse {slok.slok}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
