import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="flex gap-12">
          {/* Left Sticky Social Bar Skeleton (Desktop) */}
          <aside className="hidden lg:flex flex-col gap-2 sticky top-32 h-fit shrink-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-sm" />
            ))}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              {/* Category & Title Section Skeleton */}
              <div className="space-y-6 mb-8">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-4">
                  <Skeleton className="h-12 md:h-16 w-full" />
                  <Skeleton className="h-12 md:h-16 w-3/4" />
                </div>
                <div className="border-l-4 border-gray-100 pl-6 py-1">
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>

              {/* Featured Image Skeleton */}
              <Skeleton className="relative aspect-[16/9] w-full mb-6 rounded-sm" />

              {/* Metadata Skeleton */}
              <div className="flex flex-col gap-4 mb-8">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
                <div className="flex items-center gap-6 pt-2">
                  <Skeleton className="h-8 w-32 rounded-sm" />
                  <Skeleton className="h-8 w-40 rounded-full" />
                </div>
              </div>

              {/* Body Text Skeleton */}
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Skeleton */}
            <aside className="lg:col-span-4 space-y-12">
              <Skeleton className="aspect-square w-full rounded-sm" />
              <div className="border-t-2 border-primary pt-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="w-24 h-16 shrink-0 rounded-sm" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
