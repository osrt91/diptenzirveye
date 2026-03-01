"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  }

  const label = theme === "light" ? "Açık" : theme === "dark" ? "Koyu" : "Sistem";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={cycle}
      className="flex items-center gap-1.5 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 px-2.5 py-1.5 text-sm text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
      aria-label={`Tema değiştir. Şu an: ${label}`}
      title={`Tema: ${label}`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline text-xs">{label}</span>
    </button>
  );
}
