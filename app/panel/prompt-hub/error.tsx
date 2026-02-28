"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function PromptHubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Prompt Hub hatası"
      message={error.message || "Prompt Hub yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
