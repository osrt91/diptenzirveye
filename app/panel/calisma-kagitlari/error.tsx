"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function CalismaKagitlariError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Çalışma kağıtları hatası"
      message={error.message || "Çalışma kağıtları yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
