"use client";

export default function ErrorState({
  title = "Bir hata oluştu",
  message = "Sayfa yüklenirken beklenmeyen bir hata oluştu.",
  reset,
}: {
  title?: string;
  message?: string;
  reset?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-8 text-center space-y-4 max-w-md mx-auto">
      <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mx-auto">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="font-display text-lg font-bold text-red-700 dark:text-red-400">
        {title}
      </h2>
      <p className="text-sm text-red-600/80 dark:text-red-400/70 leading-relaxed">{message}</p>
      {reset && (
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Tekrar dene
        </button>
      )}
    </div>
  );
}
