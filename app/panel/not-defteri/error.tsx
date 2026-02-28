"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function NotDefteriError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Not defteri hatası"
      message={error.message || "Not defteri yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
