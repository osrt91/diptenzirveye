"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  }

  const icon = theme === "light" ? "\u2600" : theme === "dark" ? "\u263E" : "\u25D1";
  const label = theme === "light" ? "Açık" : theme === "dark" ? "Koyu" : "Sistem";

  return (
    <button
      type="button"
      onClick={cycle}
      className="flex items-center gap-1.5 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 px-2.5 py-1.5 text-sm text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
      aria-label={`Tema değiştir. Şu an: ${label}`}
      title={`Tema: ${label}`}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="hidden sm:inline text-xs">{label}</span>
    </button>
  );
}
