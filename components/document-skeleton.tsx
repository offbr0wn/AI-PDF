import { Skeleton } from "@/components/ui/skeleton"

export function DocumentSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Header skeleton */}
      <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-700 bg-linear-to-r from-white to-brand-primary/5 dark:from-slate-800 dark:to-brand-primary/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg bg-gradient-ocean opacity-20" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>

      {/* Search bar skeleton */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Page navigation skeleton */}
      <div className="p-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <div className="flex">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 md:p-8 bg-white dark:bg-slate-800 h-[calc(100vh-280px)] space-y-4">
        <Skeleton className="h-8 w-3/4 bg-linear-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 animate-shimmer bg-size-[200%_100%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-8 w-2/3 mt-8 bg-linear-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 animate-shimmer bg-size-[200%_100%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-32 w-full rounded-lg mt-6" />
      </div>
    </div>
  )
}
