"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NewsLetter from "./components/Newsletter";
import { fetchHN } from "./lib/hnApi";
import SkeletonCard from "./components/SkeletonCard";

type Hit = {
  objectID: string;
  title: string;
  url?: string;
  points?: number;
  author?: string;
  num_comments?: number;
};
type HNResponse<T> = {
  hits: T[];
};

export default function HomePage() {
  const [trending, setTrending] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchHN<HNResponse<Hit>>(
          "https://hn.algolia.com/api/v1/search?tags=front_page"
        );
        setTrending(data.hits || []);
      } catch {
        setError("Failed to load trending stories");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
    >
      {/* Background Image */}
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        className="absolute inset-0 -z-10 size-full opacity"
        alt=""
      />
      {/* Branding */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-extrabold bg-linear-to-r from-orange-700 via-orange-300 to-orange-700 bg-clip-text text-transparent text-center"
      >
        Hacker News Portal
      </motion.h1>

      {/* Search */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 flex gap-5 justify-center"
      >
        <motion.input
          placeholder="Search Hacker News"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl rounded-xl px-5 py-3 border border-gray-700 bg-gray-900 text-gray-200 
               focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (searchTerm.trim()) {
              router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
            }
          }}
          className="rounded-xl px-5 py-3 bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
        >
          Search
        </motion.button>
      </motion.div>
      {/* Newsletter */}
      <NewsLetter />
      {/* Trending */}
      <h2 className="mt-10 mb-4 text-xl font-semibold text-gray-200">
        Currently Trending
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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
          {trending.map((hit) => (
            <motion.article
              key={hit.objectID}
              className="rounded-lg border border-gray-700 bg-gray-900 p-4 hover:border-orange-500 transition"
              whileHover={{ scale: 1.02 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/item/${hit.objectID}`}
                className="font-bold text-gray-100 hover:text-orange-400 transition"
              >
                {hit.title}
              </Link>
              <p className="mt-2 text-sm text-gray-400">
                {hit.points ?? 0} points • {hit.num_comments ?? 0} comments • by{" "}
                {hit.author}
              </p>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}
