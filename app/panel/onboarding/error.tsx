"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function OnboardingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Onboarding hatası"
      message={error.message || "Kurulum sihirbazı yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
