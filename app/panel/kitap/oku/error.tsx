"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function KitapOkuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Kitap okuma hatası"
      message={error.message || "Kitap içeriği yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
