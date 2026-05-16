import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getYtThumbnail } from "@/lib/utils";

export default function TopNews({
  data,
  hideViewAll,
}: {
  data?: Data[];
  hideViewAll?: boolean;
}) {
  const [featured, ...others] = data ?? [];
  if (!featured) return null;

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-10">
          <h2 className="text-3xl font-serif font-black text-gray-900 border-b-[4px] border-accent pb-1 tracking-tight">
            Today&apos;s Top Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Large Featured Item */}
          <div className="lg:col-span-5 flex flex-col">
            <Link
              href={`/news/${featured.id}`}
              className="group block space-y-5"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={
                    featured.photos?.[0]
                      ? featured.photos[0].secure_urls
                      : getYtThumbnail(featured.videos?.[0])
                  }
                  alt={featured.title}
                  className="object-cover size-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-serif font-black text-gray-900 leading-[1.1] group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-serif line-clamp-4">
                  {featured.body}
                </p>
              </div>
            </Link>
          </div>

          {/* Right Column: Two columns of small items */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* First Column of Small Items */}
            <div className="flex flex-col gap-6">
              {others.slice(0, 3).map((post) => (
                <SmallNewsItem key={post.id} post={post} />
              ))}
            </div>
            {/* Second Column of Small Items */}
            <div className="flex flex-col gap-6">
              {others.slice(3, 6).map((post) => (
                <SmallNewsItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        {/* Centered Load More Button */}
        {!hideViewAll && (
          <div className="mt-6 flex justify-center">
            <Link
              href="/top-news"
              className="border border-accent px-10 py-2.5 text-xs font-serif text-accent hover:bg-accent hover:text-white transition-all duration-300"
            >
              Load more
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function SmallNewsItem({ post }: { post: Data }) {
  return (
    <Link href={`/news/${post.id}`} className="group flex gap-4 items-start">
      <div className="relative w-40 aspect-[16/10] shrink-0 overflow-hidden rounded-md shadow-sm bg-gray-100">
        <img
          src={
            post.photos?.[0]
              ? post.photos[0].secure_urls
              : getYtThumbnail(post.videos?.[0])
          }
          alt={post.title}
          className="object-cover size-full group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-serif font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors line-clamp-3">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}
