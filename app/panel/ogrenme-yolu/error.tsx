"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function OgrenmeYoluError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Öğrenme yolu hatası"
      message={error.message || "Öğrenme yolu yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
