"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function TestError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Test hatası"
      message={error.message || "Test sayfası yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
