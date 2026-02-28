"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function MotivasyonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Motivasyon hatası"
      message={error.message || "Günlük motivasyon yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
