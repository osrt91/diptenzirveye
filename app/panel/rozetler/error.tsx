"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function RozetlerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Rozetler hatası"
      message={error.message || "Rozetler yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
