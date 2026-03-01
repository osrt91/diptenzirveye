import { Skeleton } from "@/components/ui/Skeleton";

export default function OnboardingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Skeleton className="h-10 w-56 mx-auto" />
        <Skeleton className="h-4 w-72 mx-auto" />
        <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 space-y-5">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-10 w-32 ml-auto" />
        </div>
      </div>
    </div>
  );
}
