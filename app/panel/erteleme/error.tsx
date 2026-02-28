"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function ErtelemeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Eylem İvmesi hatası"
      message={error.message || "Modül yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
