import { Skeleton } from "@/components/ui/Skeleton";

export default function PromptHubLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    </div>
  );
}
