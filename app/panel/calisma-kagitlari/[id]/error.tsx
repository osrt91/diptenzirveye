"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function CalismaKagidiDetayError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Çalışma kağıdı hatası"
      message={error.message || "Çalışma kağıdı yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
