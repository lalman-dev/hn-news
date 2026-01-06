"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const newsCategories = [
  { label: "Tech", slug: "tech" },
  { label: "Science", slug: "science" },
  { label: "Games", slug: "games" },
  { label: "Business", slug: "business" },
  { label: "Ai", slug: "ai" },
  { label: "Programming", slug: "programming" },
  { label: "Startups", slug: "startups" },
  { label: "Cybersecurity", slug: "cybersecurity" },
  { label: "Design", slug: "design" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 left-0 w-full px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-700/30 backdrop-blur-lg flex justify-between items-center z-50 shadow-lg shadow-slate-400/30 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Branding */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          href="/"
          className="text-xl font-bold text-orange-500 dark:text-orange-400"
        >
          HN News
        </Link>
      </motion.div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
        {newsCategories.map((item) => (
          <div key={item.label} className="relative overflow-hidden h-6">
            <div className="transition-transform duration-400 hover:-translate-y-full">
              <Link href={`/${item.slug}`}>{item.label}</Link>
              <Link href={`/${item.slug}`} className="absolute top-full left-0">
                {item.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Hamburger (mobile only) */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ y: -100, x: 30, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, x: 30, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="absolute top-full left-0 w-full bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 flex flex-col items-center py-4  rounded-lg md:hidden"
        >
          {newsCategories.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.1 }}
              className="py-2 text-gray-600 dark:text-gray-300"
            >
              <Link href={`/${item.slug}`}>{item.label}</Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
