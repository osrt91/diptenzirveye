import { Skeleton, ListSkeleton } from "@/components/ui/Skeleton";

export default function NotDefteriLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-10 w-full" />
      <ListSkeleton rows={4} />
    </div>
  );
}
