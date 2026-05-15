import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex flex-col items-center mb-16 text-center">
            <Skeleton className="h-16 md:h-20 w-3/4 md:w-1/2 mb-4" />
            <Skeleton className="w-24 h-1 rounded-full" />
            <Skeleton className="mt-4 h-4 w-32" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[1, 2, 3, 4].map((col) => (
              <div key={col} className="flex flex-col gap-12">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-4">
                    {/* Thumbnail Skeleton */}
                    <Skeleton className="relative aspect-video w-full rounded-lg" />
                    {/* Title Skeleton */}
                    <div className="space-y-2 px-1">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
