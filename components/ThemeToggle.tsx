"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggle() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const label = theme === "light" ? "Açık" : "Koyu";
  const Icon = theme === "light" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-9 h-9 rounded-xl flex items-center justify-center text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
      aria-label={`Tema değiştir. Şu an: ${label}`}
      title={`Tema: ${label}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
