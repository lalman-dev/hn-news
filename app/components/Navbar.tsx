"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const newsCategories = [
  "Tech",
  "Science",
  "Games",
  "Business",
  "Ai",
  "Programming",
  "Startups",
  "Cybersecurity",
  "Design",
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
      className={`sticky top-0 left-0 w-full px-6 py-4 border-b border-gray-700 bg-gray-700/30 backdrop-blur-lg flex justify-between items-center z-50 shadow-lg shadow-slate-400/30 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Branding */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link href="/" className="text-xl font-bold text-orange-400">
          HN News
        </Link>
      </motion.div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
        {newsCategories.map((item) => (
          <div key={item} className="relative overflow-hidden h-6">
            <div className="transition-transform duration-400 hover:-translate-y-full">
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
              <Link
                href={`/${item.toLowerCase()}`}
                className="absolute top-full left-0"
              >
                {item}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Hamburger (mobile only) */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 flex flex-col items-center py-4 md:hidden"
        >
          {newsCategories.map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1, color: "#f97316" }}
              className="py-2 text-gray-300"
            >
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
