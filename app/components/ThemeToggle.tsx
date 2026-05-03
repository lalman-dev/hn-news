"use client";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="t-toggle" style={{ opacity: 0 }} />;

  const cur    = theme === "system" ? systemTheme : theme;
  const isDark = cur === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="t-toggle"
    >
      <Sun  size={10} className="t-icon" style={{ left: 6,  opacity: isDark ? .35 : 1 }} />
      <Moon size={10} className="t-icon" style={{ right: 6, opacity: isDark ? 1  : .35 }} />
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="t-thumb"
        style={{ left: isDark ? "calc(100% - 21px)" : 3 }}
      />
    </button>
  );
}
