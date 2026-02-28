"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function ProfilError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Profil hatası"
      message={error.message || "Profil yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
