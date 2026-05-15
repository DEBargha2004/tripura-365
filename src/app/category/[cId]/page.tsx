import { getCategoryWiseNews, getCategoryNewsInfo } from "@/actions/news";
import GotoPrev from "@/components/custom/go-to-prev";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn, getYtThumbnail } from "@/lib/utils";

export async function generateStaticParams() {
  const res = await getCategoryWiseNews();

  return (
    res?.map((category) => ({
      cId: (category?.articles[0]?.category_id ?? "").toString(),
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cId: string }>;
}): Promise<Metadata> {
  const { cId } = await params;
  const res = await getCategoryWiseNews();

  const category = res?.find(
    (cat) => cat?.articles?.[0]?.category_id === Number(cId),
  );

  return {
    title: category?.name,
    openGraph: {
      title: category?.name,
      images: [
        {
          url:
            category?.articles?.[0]?.photos?.[0]?.secure_urls ||
            (category?.articles?.[0]?.videos?.[0]
              ? getYtThumbnail(category.articles[0].videos[0])
              : ""),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category?.name,
      images: [
        category?.articles?.[0]?.photos?.[0]?.secure_urls ||
          (category?.articles?.[0]?.videos?.[0]
            ? getYtThumbnail(category.articles[0].videos[0])
            : ""),
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ cId: string }>;
}) {
  const { cId } = await params;
  const res = await getCategoryNewsInfo(cId);
  const categoryName = res.data?.[0]?.category?.name || "Category";
  const newsList = res.data || [];

  if (!res.data || res.data?.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            No Articles Found
          </h2>
          <p className="text-gray-500">
            We couldn't find any articles in this category.
          </p>
          <GotoPrev>
            <button className="px-6 py-2 bg-primary text-white rounded-full hover:opacity-90 transition-colors">
              Go Back Home
            </button>
          </GotoPrev>
        </div>
      </div>
    );
  }

  const colCount = 4;
  const columns = Array.from({ length: colCount }, (_, i) =>
    newsList.filter((_, idx) => idx % colCount === i),
  );

  return (
    <div className="bg-white min-h-screen">
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h1 className="text-6xl md:text-7xl font-serif font-black text-gray-900 tracking-tighter uppercase mb-4">
              {categoryName}
            </h1>
            <div className="w-24 h-1 bg-primary" />
            <p className="mt-4 text-gray-500 font-serif italic">
              Showing {newsList.length} articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-12">
                {col.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.id}`}
                    className="group block space-y-4"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                      <img
                        src={
                          post.images?.length > 0
                            ? post.images[0]
                            : post.videos?.[0]
                              ? getYtThumbnail(post.videos[0])
                              : undefined
                        }
                        alt={post.title}
                        className="object-cover size-full group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl h-12 font-serif font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2 px-1">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
