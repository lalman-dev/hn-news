"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      type="button"
      aria-label={`Switch to ${
        currentTheme === "dark" ? "light" : "dark"
      } theme`}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-lg p-2 border border-gray-500 dark:border-gray-700
        bg-slate-300 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        hover:bg-gray-100 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-orange-400
        transition-colors"
    >
      {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
