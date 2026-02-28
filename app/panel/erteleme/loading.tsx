import { Skeleton } from "@/components/ui/Skeleton";

export default function ErtelemeLoading() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
