import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Elite Standard Header Skeleton */}
      <div className="bg-white border-b-2 border-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-10 w-10 border border-slate-100" />
            <Skeleton className="h-3 w-20" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                <Skeleton className="w-4 h-16 bg-slate-200" />
                <Skeleton className="h-14 w-64 md:w-96" />
              </div>
              <Skeleton className="h-3 w-64 ml-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Elite Featured Story Skeleton (Split-Hero Style) */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-50" />
            <Skeleton className="h-3 w-40" />
            <div className="h-px flex-1 bg-slate-50" />
          </div>

          <div className="flex flex-col lg:flex-row bg-white overflow-hidden shadow-sm ring-1 ring-slate-100">
            {/* Image Side (65%) */}
            <div className="w-full lg:w-[65%] aspect-video lg:aspect-auto bg-slate-100 relative">
              <Skeleton className="size-full" />
            </div>

            {/* Content Side (35%) */}
            <div className="w-full lg:w-[35%] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative bg-white">
              <Skeleton className="h-3 w-24 mb-10" />
              <Skeleton className="h-12 w-full mb-6" />
              <Skeleton className="h-12 w-3/4 mb-10" />

              <div className="space-y-6 mb-12">
                <Skeleton className="h-4 w-48" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              <div className="mt-auto pt-10 border-t border-slate-50 flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="size-14 bg-slate-100" />
              </div>
            </div>
          </div>
        </section>

        {/* Elite News Grid Skeleton */}
        <section>
          <div className="flex items-center justify-between mb-16 border-b-2 border-slate-100 pb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="w-2.5 h-8 bg-slate-200" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-3 w-32 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col bg-white overflow-hidden shadow-sm ring-1 ring-slate-100 h-full"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <Skeleton className="h-3 w-32 mb-6" />
                  <Skeleton className="h-16 w-full mb-8" />
                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="size-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
