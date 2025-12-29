import { getCategoryWiseNews } from "@/actions/news";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const res = await getCategoryWiseNews();

  return (
    <section className="py-12 bg-white" id="category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          বিভাগভিত্তিক খবর
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {res.data?.map((category) => (
            <div key={category.name} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <span
                    className={`text-gray-800 px-3 py-1 rounded-full font-semibold mr-3`}
                  >
                    {category.name}
                  </span>
                </div>
                <Link
                  href={`/category/${category.articles[0].category.id}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium group"
                  prefetch
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                {category.articles?.slice(0, 4)?.map((article) => (
                  <Link
                    href={`/news/${article.id}`}
                    key={article.id}
                    className="block"
                  >
                    <article className="flex space-x-4 group cursor-pointer">
                      <div className="w-24 h-20">
                        {article.images.length && (
                          <Image
                            src={article.images[0]}
                            alt={article.title}
                            width={100}
                            height={80}
                            className="size-full object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-0">
                          {article.body}
                        </p>
                        <span className="text-xs text-gray-500">
                          {format(article.published_on, "PPP")}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
