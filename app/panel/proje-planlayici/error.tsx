"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function ProjePlanlayiciError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Proje Planlayıcı hatası"
      message={error.message || "Proje planlayıcı yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
