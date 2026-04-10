import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Article Hero Skeleton */}
      <div className="relative h-[65vh] md:h-[80vh] w-full bg-slate-900 overflow-hidden">
        <Skeleton className="size-full opacity-20" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="absolute top-10 left-4 sm:left-8 flex items-center gap-4">
            <Skeleton className="h-10 w-10 border border-white/10" />
            <Skeleton className="h-3 w-24 hidden sm:block" />
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 md:w-2/3" />
              <Skeleton className="h-16 w-1/2 md:w-1/3" />
            </div>

            <div className="flex items-center gap-10">
              <Skeleton className="h-6 w-48" />
              <div className="h-px w-20 bg-white/20 hidden sm:block" />
              <Skeleton className="h-3 w-40 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Matrix Skeleton */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-32">
        <div className="bg-white border-t-8 border-slate-100 p-8 md:p-14 lg:p-24 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b-2 border-slate-50 pb-12 mb-12">
            <div className="flex items-center gap-5">
              <Skeleton className="h-16 w-16" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-64" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>

          <div className="space-y-10">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </article>
    </div>
  );
}
