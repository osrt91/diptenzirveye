"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function PanelError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Panel hatası"
      message={error.message || "Sayfa yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
