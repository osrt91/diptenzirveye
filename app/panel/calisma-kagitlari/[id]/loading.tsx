import { Skeleton } from "@/components/ui/Skeleton";

export default function CalismaKagidiDetayLoading() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-9/12" />
      </div>
    </div>
  );
}
