import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Back Button Skeleton */}
          <div className="absolute top-8 left-4 sm:left-8 flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-none border-l-2 border-slate-600 bg-slate-800" />
            <Skeleton className="h-6 w-16 rounded-none bg-slate-800 hidden sm:block" />
          </div>

          <div className="space-y-6">
            {/* Metadata Pills Skeleton */}
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-10 w-28 rounded-none -skew-x-12 bg-slate-800" />
              <Skeleton className="h-10 w-40 rounded-none -skew-x-12 bg-slate-800" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4 max-w-4xl">
              <Skeleton className="h-12 w-full rounded-none bg-gray-800" />
              <Skeleton className="h-12 w-3/4 rounded-none bg-gray-800" />
            </div>

            {/* Views Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-32 rounded-none border-l-4 border-slate-600 bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Card Skeleton */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-none border-t-8 border-t-slate-200 p-8 md:p-14 shadow-[0_-10px_50px_rgba(0,0,0,0.1)]">
          {/* Share Bar Skeleton */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-none border-l-4 border-slate-200" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-none" />
                <Skeleton className="h-3 w-20 rounded-none" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-none border-b-2 border-slate-200" />
              <Skeleton className="h-10 w-10 rounded-none border-b-2 border-slate-200" />
              <Skeleton className="h-10 w-10 rounded-none border-b-2 border-slate-200" />
            </div>
          </div>

          {/* Body Text Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="h-8" /> {/* Spacer */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Tags Skeleton */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5 rounded-none" />
              <Skeleton className="h-5 w-32 rounded-none" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-10 w-24 rounded-none border-b-2 border-slate-200" />
              <Skeleton className="h-10 w-32 rounded-none border-b-2 border-slate-200" />
              <Skeleton className="h-10 w-28 rounded-none border-b-2 border-slate-200" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
