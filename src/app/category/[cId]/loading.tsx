import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section Skeleton */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-none border-l-4 border-slate-300" />
            <Skeleton className="h-6 w-24 rounded-none" />
          </div>
          
          <div className="flex items-baseline gap-4">
            <Skeleton className="h-12 w-64 rounded-none" />
            <Skeleton className="h-6 w-20 rounded-none" />
          </div>
          <Skeleton className="h-[2px] w-24 rounded-none mt-6 bg-slate-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article Skeleton */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-1.5 rounded-none bg-slate-300" />
            <Skeleton className="h-8 w-48 bg-slate-200 rounded-none" />
          </div>
          
          <div className="relative w-full h-[500px] md:h-[600px] rounded-none border-l-[6px] border-slate-300 overflow-hidden bg-slate-200">
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4 w-full">
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-24 rounded-none -skew-x-12" />
                  <Skeleton className="h-8 w-24 rounded-none -skew-x-12" />
                </div>
                <Skeleton className="h-12 w-3/4 rounded-none" />
                <Skeleton className="h-6 w-48 rounded-none" />
                <Skeleton className="h-20 w-full rounded-none" />
              </div>
              <Skeleton className="h-14 w-48 rounded-none border-b-4 border-slate-300 hidden md:block" />
            </div>
          </div>
        </section>

        {/* News Grid Skeleton */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-1.5 rounded-none bg-slate-300" />
            <Skeleton className="h-8 w-48 bg-slate-200 rounded-none" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative h-96 w-full rounded-none border-l-4 border-slate-300 overflow-hidden bg-slate-200">
                <div className="absolute top-4 left-4">
                  <Skeleton className="h-6 w-24 rounded-none -skew-x-12" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 space-y-3">
                  <Skeleton className="h-4 w-32 rounded-none" />
                  <Skeleton className="h-8 w-full rounded-none" />
                  <Skeleton className="h-8 w-3/4 rounded-none" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
