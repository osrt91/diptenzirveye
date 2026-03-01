"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function CoinShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="DZ Coin Mağazası hatası"
      message={error.message || "Mağaza yüklenirken bir hata oluştu."}
      reset={reset}
    />
  );
}
