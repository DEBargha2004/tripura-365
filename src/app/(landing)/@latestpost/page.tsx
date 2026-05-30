import { getLatestNews } from "@/actions/news";
import { getYtThumbnail, stripHtml } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

export const revalidate = 600;

export default async function Page() {
  const data = await getLatestNews();
  const [featured, ...others] = data?.data ?? [];

  if (!featured) return null;

  return (
    <section className="py-8 bg-white" id="latest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-10 border-b border-primary/20 pb-2">
          <h2 className="text-3xl font-serif font-black text-gray-900 border-b-2 border-primary pb-2 -mb-[10px] uppercase tracking-tight">
            Interviews
          </h2>
        </div>

        {/* Featured Article */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-7">
            <Link href={`/news/${featured.id}`} className="group block">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <img
                  src={
                    featured.images?.[0] ||
                    featured.thumbnail ||
                    getYtThumbnail(featured.videos[0])
                  }
                  alt={featured.title}
                  className="object-cover size-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <Link href={`/news/${featured.id}`} className="group block">
              <h1 className="text-4xl md:text-6xl font-serif font-black text-gray-900 leading-[1.05] group-hover:text-primary transition-colors">
                {featured.title}
              </h1>
            </Link>
            <p className="text-gray-600 text-xl font-serif line-clamp-4 leading-relaxed italic border-l-4 border-primary/10 pl-6 py-2">
              {stripHtml(featured.body)}
            </p>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary/60">
              <span>{"By Team Bar and Bench"}</span>
              <span className="text-gray-300">•</span>
              <span>
                {featured.published_on &&
                  format(new Date(featured.published_on), "PPP")}
              </span>
            </div>
          </div>
        </div>

        {/* Small Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {others.slice(0, 4).map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.id}`}
              className="group block space-y-4"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm">
                <img
                  src={
                    post.images?.[0] ||
                    post.thumbnail ||
                    getYtThumbnail(post.videos[0])
                  }
                  alt={post.title}
                  className="object-cover size-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {post.title}
                </h3>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary/50">
                  {"Team Bar and Bench"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/latest-news"
            className="border border-gray-200 px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all rounded"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
