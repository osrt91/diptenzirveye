import { Skeleton } from "@/components/ui/Skeleton";

export default function MotivasyonLoading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-56 mx-auto" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
      <Skeleton className="h-40 rounded-3xl" />
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}
