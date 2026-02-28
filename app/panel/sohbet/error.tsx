"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function SohbetError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Sohbet hatası"
      message={error.message || "Sohbet yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
