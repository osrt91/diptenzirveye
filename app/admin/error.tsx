"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Admin paneli hatası"
      message={error.message || "Admin panelinde bir hata oluştu."}
      reset={reset}
    />
  );
}
