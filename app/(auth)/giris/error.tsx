"use client";

import Link from "next/link";

export default function GirisError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-6 text-center">
      <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white">
        Giriş sayfası yüklenemedi
      </h2>
      <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400">
        {error.message || "Bir hata oluştu. Lütfen tekrar deneyin."}
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={reset}
          className="w-full rounded-lg bg-dz-orange-500 px-4 py-2 font-medium text-white hover:bg-dz-orange-600"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="text-sm text-dz-grey-500 hover:text-dz-orange-500"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
