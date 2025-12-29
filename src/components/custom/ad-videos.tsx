import { AdVideoData } from "@/types/response";

export default function AdVideos({ data }: { data?: AdVideoData[] }) {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">ভিডিও সংবাদ</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data?.slice(0, 6)?.map((ad) => (
            <div
              className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-800"
              key={ad.id}
            >
              <iframe
                src={`https://www.youtube.com/embed/${ad.link}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
