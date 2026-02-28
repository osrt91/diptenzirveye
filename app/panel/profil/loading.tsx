import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

export default function ProfilLoading() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Skeleton className="h-8 w-24" />
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
      <Skeleton className="h-6 w-28" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
