import { Skeleton } from "@/components/ui/Skeleton";

export default function QuizLoading() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-4 w-72" />
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-5">
        <Skeleton className="h-6 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
