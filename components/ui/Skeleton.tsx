function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-dz-grey-200/60 dark:bg-dz-grey-800/60 ${className}`}
      {...props}
    />
  );
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-3 ${className}`}
    >
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-3"
        >
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4 ${className}`}
    >
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

function ListSkeleton({
  rows = 3,
  className = "",
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-4"
        >
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonStats, CardSkeleton, ListSkeleton };
