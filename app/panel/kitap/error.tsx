"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function KitapError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Kitap sayfa hatası"
      message={error.message || "Kitaplar yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
