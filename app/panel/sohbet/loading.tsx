import { Skeleton } from "@/components/ui/Skeleton";

export default function SohbetLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-4 w-72" />
      <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-4 space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="space-y-3 min-h-[200px]">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-2/3" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
