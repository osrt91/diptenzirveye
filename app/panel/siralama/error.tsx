"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function SiralamaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Sıralama hatası"
      message={error.message || "Liderlik tablosu yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
