import { ApiResponseWithoutPagination, Data } from "@/types/response";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopNews({
  data,
  hideViewAll,
}: {
  data?: Data[];
  hideViewAll?: boolean;
}) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">শীর্ষ খবর</h2>
          {hideViewAll || (
            <Link
              href="/top-news"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View All →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((news) => (
            <article key={news.id} className="group cursor-pointer">
              <Link href={`/news/${news.id}`}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <div className="w-full h-48">
                    {news.images.length && (
                      <Image
                        src={news.images[0]}
                        alt={news.title}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                        height={100}
                        width={250}
                      />
                    )}
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                    {news.category.name}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>
              </Link>

              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(news.created_on), "PPP")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
