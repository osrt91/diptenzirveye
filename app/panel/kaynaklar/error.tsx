"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function KaynaklarError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Kaynaklar hatası"
      message={error.message || "Kaynaklar yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
