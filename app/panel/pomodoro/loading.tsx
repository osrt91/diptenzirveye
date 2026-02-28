import { Skeleton } from "@/components/ui/Skeleton";

export default function PomodoroLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-36" />
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 text-center space-y-4">
        <Skeleton className="h-4 w-20 mx-auto" />
        <Skeleton className="h-16 w-40 mx-auto" />
        <div className="flex justify-center gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
