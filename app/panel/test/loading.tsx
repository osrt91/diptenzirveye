import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

export default function TestLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <CardSkeleton />
    </div>
  );
}
