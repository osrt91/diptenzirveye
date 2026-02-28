"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function PomodoroError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Pomodoro hatası"
      message={error.message || "Pomodoro yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
