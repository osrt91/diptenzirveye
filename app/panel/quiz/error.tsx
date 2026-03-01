"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function QuizError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Quiz hatası"
      message={error.message || "Quiz yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
