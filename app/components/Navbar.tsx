"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const cats = [
  { label: "Tech", slug: "tech" },
  { label: "Science", slug: "science" },
  { label: "Games", slug: "games" },
  { label: "Business", slug: "business" },
  { label: "AI", slug: "ai" },
  { label: "Programming", slug: "programming" },
  { label: "Startups", slug: "startups" },
  { label: "Security", slug: "cybersecurity" },
  { label: "Design", slug: "design" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    };
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`navbar ${scrolled ? " scrolled" : ""}`}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="HN Portal home">
            <span className="nav-logo-accent">HN</span>
            <span className="nav-logo-slash">/</span>
            <span>PORTAL</span>
          </Link>

          {/* Desktop categories */}
          {!isMobile && (
            <nav className="nav-cats" aria-label="News categories">
              {cats.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="nav-cat">
                  {c.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right controls */}
          <div className="nav-right">
            <ThemeToggle />
            {/* Hamburger menu */}
            {isMobile && (
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                style={{
                  color: "var(--ink-2)",
                  display: "flex",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      {isMobile && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mobile-menu"
            >
              {cats.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="mobile-cat"
                  onClick={() => setOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
