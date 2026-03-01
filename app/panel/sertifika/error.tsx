"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function SertifikaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Sertifika hatası"
      message={error.message || "Sertifikalar yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
