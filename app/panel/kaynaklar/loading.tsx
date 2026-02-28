import { Skeleton } from "@/components/ui/Skeleton";

export default function KaynaklarLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-12 w-80" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    </div>
  );
}
