import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

export default function KitapLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-4 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
