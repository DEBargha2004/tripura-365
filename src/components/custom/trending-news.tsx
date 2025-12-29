import { getViews } from "@/lib/utils";
import { Data } from "@/types/response";
import { Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrendingNews({ data }: { data?: Data[] }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-8 w-8 text-red-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            বর্তমানে জনপ্রিয়
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data?.map((post, index) => (
            <article key={post.id} className="group cursor-pointer">
              <Link href={`/news/${post.id}`}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <div className="w-full h-56">
                    {!!post.images.length && (
                      <Image
                        src={post.images[0]}
                        alt={post.title}
                        height={100}
                        width={200}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                      {post.category.name}
                    </span>

                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    <Eye className="h-3 w-3" />
                    <span>
                      {getViews({
                        published_on: post.published_on,
                        seed: post.body,
                      })}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
