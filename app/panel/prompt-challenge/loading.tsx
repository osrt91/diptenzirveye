import { Skeleton } from "@/components/ui/Skeleton";

export default function PromptChallengeLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-56" />
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
