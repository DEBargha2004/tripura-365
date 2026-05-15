import {
  getAllCategories,
  getCategoryWiseNews,
  getImageGallery,
} from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import { format } from "date-fns";
import Link from "next/link";
import { getYtThumbnail } from "@/lib/utils";
import { categoriesOrder } from "@/constants/categories-order";
import { Data } from "@/types/response";

type CategoryWiseNews = {
  name: string;
  articles: Data[];
};

const sortCategories = (cat: CategoryWiseNews[]) => {
  return categoriesOrder.reduce<CategoryWiseNews[]>((acc, name) => {
    const found = cat.find((c) => c.name === name);
    if (found) {
      acc.push(found);
    }
    return acc;
  }, []);
};

export default async function Page() {
  const res = await getCategoryWiseNews();
  const sorted = sortCategories(res ?? []);
  const imageGallery = await getImageGallery();

  const firstHalf = sorted.slice(0, 1);
  const secondHalf = sorted.slice(1, 3);

  return (
    <section className="py-12 bg-white space-y-24">
      {/* 3. Categories Section Start */}
      {firstHalf.map((category) => (
        <CategoryPattern key={category.name} category={category} />
      ))}

      {/* 4. Carousel Only */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroCarousel data={imageGallery ?? []} />
      </div>

      {/* 5. Categories Section Continues */}
      {secondHalf.map((category) => (
        <CategoryPattern key={category.name} category={category} />
      ))}
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center mb-10">
      <h2 className="text-3xl font-serif font-black text-gray-900 border-b-[4px] border-primary pb-1 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function CategoryPattern({ category }: { category: CategoryWiseNews }) {
  const [featured, ...others] = category.articles;
  if (!featured) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title={category.name} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Large Featured Article */}
        <div className="lg:col-span-7">
          <Link href={`/news/${featured.id}`} className="group block space-y-5">
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
            <div className="space-y-2 px-1">
              <h2 className="text-2xl font-serif font-bold text-gray-900 leading-[1.2] group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-primary text-xs font-serif font-medium italic opacity-80">
                {"Team Tripura 365"}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Column: List of 3 Articles */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {others.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.id}`}
              className="group flex gap-5 items-start"
            >
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
              <div className="space-y-1.5 flex-1">
                <h3 className="text-[15px] font-serif font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-[11px] font-serif font-medium italic">
                  {"Team Tripura 365"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Centered Load More Button */}
      <div className="mt-16 flex justify-center">
        <Link
          href={`/category/${category.name}`}
          className="border border-gray-900 px-10 py-2.5 text-xs font-serif text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          Load more
        </Link>
      </div>
    </div>
  );
}
