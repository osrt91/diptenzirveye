"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function PromptChallengeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Prompt Challenge hatası"
      message={error.message || "Challenge yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
