import { Skeleton, ListSkeleton } from "@/components/ui/Skeleton";

export default function SiralamaLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-80" />
      <ListSkeleton rows={8} />
    </div>
  );
}
