"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md space-y-6 relative z-10">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-dz-black dark:text-white">
          Bir Şeyler Ters Gitti
        </h2>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">
          Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-dz-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-dz-orange-600 shadow-lg shadow-dz-orange-500/20"
          >
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 px-6 py-3 font-bold text-dz-black dark:text-dz-white hover:bg-dz-grey-100 dark:hover:bg-dz-grey-900 transition-all"
          >
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
