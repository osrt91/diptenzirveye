import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjePlanlayiciLoading() {
  return (
    <div className="flex h-[80vh]">
      <Skeleton className="w-56 h-full rounded-none" />
      <div className="flex-1 p-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="space-y-4 mt-8">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
