"use client";

const LABELS: Record<string, { text: string; className: string }> = {
  saving: { text: "Kaydediliyor...", className: "text-dz-grey-500" },
  saved: { text: "Kaydedildi", className: "text-green-600 dark:text-green-400" },
  error: { text: "Kaydetme hatası", className: "text-red-600 dark:text-red-400" },
};

export default function AutoSaveIndicator({ status }: { status: string }) {
  if (status === "idle") return null;
  const info = LABELS[status];
  if (!info) return null;
  return <span className={`text-xs ${info.className}`}>{info.text}</span>;
}
