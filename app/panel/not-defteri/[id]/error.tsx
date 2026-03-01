"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function NotDetayError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Not detayı hatası"
      message={error.message || "Not yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
