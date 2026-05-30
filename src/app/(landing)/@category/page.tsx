import {
  getAllCategories,
  getCategoryWiseNews,
  getImageGallery,
  getTopNews,
} from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import { format } from "date-fns";
import Link from "next/link";
import { getYtThumbnail, stripHtml } from "@/lib/utils";
import { categoriesOrder } from "@/constants/categories-order";
import { Data } from "@/types/response";

type CategoryWiseNews = {
  name: string;
  articles: Data[];
};

const sortCategories = (cat: CategoryWiseNews[]) => {
  return categoriesOrder.reduce<CategoryWiseNews[]>((acc, name) => {
    const found = cat.find((c) => c.name === name);
    if (found && found.articles.length >= 6) {
      acc.push(found);
    }
    return acc;
  }, []);
};

export default async function Page() {
  const res = await getCategoryWiseNews();
  const sorted = sortCategories(res?.data ?? []);
  const topNews = await getTopNews();

  const firstCategory = sorted.slice(0, 1);
  const remainingCategories = sorted.slice(1);

  return (
    <section className="py-12 bg-white space-y-10">
      {/* 3. Categories Section Start */}
      {firstCategory.map((category) => (
        <CategoryPattern key={category.name} category={category} />
      ))}

      {/* 4. Carousel Only */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroCarousel data={topNews?.data ?? []} />
      </div>

      {/* 5. Categories Section Continues (All remaining) */}
      {remainingCategories.map((category) => (
        <CategoryPattern key={category.name} category={category} />
      ))}
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center mb-10">
      <h2 className="text-5xl font-serif font-black text-gray-900 border-b-[4px] border-accent pb-1 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function CategoryPattern({ category }: { category: CategoryWiseNews }) {
  const col1 = category.articles.slice(0, 1);
  const col2 = category.articles.slice(1, 4);
  const col3 = category.articles.slice(4, 7);

  // console.log(category);

  if (col1.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 lg:px-8">
      <SectionHeader title={category.name} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* Column 1: One Big News (Image + Title + 3-line Description) */}
        <div className="flex flex-col">
          {col1.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.id}`}
              className="group block space-y-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={
                    post.images?.[0] ||
                    post.thumbnail ||
                    getYtThumbnail(post.videos?.[0])
                  }
                  alt={post.title}
                  className="object-cover size-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-black text-gray-900 leading-[1.1] group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-base font-serif line-clamp-3 leading-relaxed italic">
                  {stripHtml(post.body)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Column 2: Image + Title Only */}
        <div className="flex flex-col gap-8">
          {col2.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.id}`}
              className="group flex gap-4 items-start"
            >
              <div className="relative w-36 aspect-[16/10] shrink-0 overflow-hidden rounded-sm bg-gray-100 shadow-sm">
                <img
                  src={
                    post.images?.[0] ||
                    post.thumbnail ||
                    getYtThumbnail(post.videos?.[0])
                  }
                  alt={post.title}
                  className="object-cover size-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight group-hover:text-accent transition-colors line-clamp-3">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Column 3: Image + Title Only */}
        <div className="flex flex-col gap-8">
          {col3.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.id}`}
              className="group flex gap-4 items-start"
            >
              <div className="relative w-36 aspect-[16/10] shrink-0 overflow-hidden rounded-sm bg-gray-100 shadow-sm">
                <img
                  src={
                    post.images?.[0] ||
                    post.thumbnail ||
                    getYtThumbnail(post.videos?.[0])
                  }
                  alt={post.title}
                  className="object-cover size-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight group-hover:text-accent transition-colors line-clamp-3">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Centered Load More Button */}
      <div className="mt-12 flex justify-center">
        <Link
          href={`/category/${category.articles[0].category?.id}`}
          className="border border-accent px-12 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-white transition-all duration-300"
        >
          View More {category.name}
        </Link>
      </div>
    </div>
  );
}
