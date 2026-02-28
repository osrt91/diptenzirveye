"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body className="bg-white dark:bg-zinc-950">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-md space-y-6">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Bir şeyler ters gitti
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
