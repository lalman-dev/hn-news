"use client";
import { motion } from "framer-motion";
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
    <motion.button
      type="button"
      aria-label={`Switch to ${
        currentTheme === "dark" ? "light" : "dark"
      } theme`}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={`relative flex items-center w-16 h-7 rounded-full transition-all duration-900 
    ${currentTheme === "dark" ? "bg-gray-600" : "bg-gray-500"}`}
    >
      <Sun
        size={16}
        className={`absolute left-2 transition-colors duration-300 `}
      />
      <Moon
        size={16}
        className={`absolute right-2 transition-colors duration-300`}
      />
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`absolute w-8 h-6 rounded-full 
      ${
        currentTheme === "dark" ? "bg-gray-900 right-0.5" : "bg-white left-0.5"
      }`}
      />
    </motion.button>
  );
}
