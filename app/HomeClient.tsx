"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import NewsLetter from "./components/Newsletter";

/* ---------- Types ---------- */

type Story = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

type Props = {
  stories: Story[];
};

/* ---------- Component ---------- */

export default function HomeClient({ stories }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const value = searchTerm.trim();
    if (!value) return;
    router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
    >
      {/* Background image (decorative) */}
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full"
      />
      {/* Branding */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center bg-linear-to-r from-orange-300 via-orange-700 to-orange-300 bg-clip-text text-transparent"
      >
        Hacker News Portal
      </motion.h1>

      {/* Search */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 flex gap-4 justify-center"
      >
        <label htmlFor="search" className="sr-only">
          Search Hacker News articles
        </label>

        <motion.input
          aria-describedby="search-help"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          id="search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search Hacker News"
          className="w-full max-w-xl rounded-xl px-5 py-3 border border-gray-500 dark:border-gray-700 bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <span id="search-help" className="sr-only">
          Enter a keyword and press search to view results
        </span>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          type="button"
          onClick={handleSearch}
          aria-label="Search Hacker News articles"
          className="rounded-xl px-5 py-3 bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
        >
          Search
        </motion.button>
      </motion.div>
      {/* NewsLetter */}
      <NewsLetter />

      {/* Trending */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-10 mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Currently Trending
      </motion.h2>

      {stories.length === 0 ? (
        <p role="status" aria-live="polite">
          No trending stories available.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stories.map((item) => (
            <motion.article
              key={item.objectID}
              whileHover={{ scale: 1.02 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-gray-500 dark:border-gray-700 p-4 backdrop-blur-3xl transition hover:border-orange-500"
            >
              <Link
                href={`/item/${item.objectID}`}
                className="font-bold text-gray-800 dark:text-gray-100 hover:text-orange-400 focus:ring-2 focus:ring-orange-400 rounded"
              >
                {item.title}
              </Link>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {item.points ?? 0} points • {item.num_comments ?? 0} comments •
                by {item.author}
              </p>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}
