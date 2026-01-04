"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { fetchHN } from "../lib/hnApi";
import SkeletonCard from "../components/SkeletonCard";

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

export default function CategoryPage() {
  const { category } = useParams();
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) return;

    const fetchCategoryNews = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchHN<HNResponse<Hit>>(
          `https://hn.algolia.com/api/v1/search?query=${category}&tags=story`
        );
        setResults(data.hits || []);
      } catch {
        setError(`Failed to load ${category} news`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [category]);

  return (
    <motion.main
      id="main-content"
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
      <motion.h1
      aria-label={`News category: ${category}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-gray-600 dark:text-gray-100 mb-6 text-center capitalize"
      >
        {category} News
      </motion.h1>

      {loading ? (
        <div
        role="status"
        aria-live="polite"
        aria-label={`Loading ${category} news`}
        className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p role="alert" className="text-red-500">{error}</p>
      ) : results.length === 0 ? (
        <p role="status" className="text-gray-400">No results found for this category.</p>
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
          {results.map((hit) => (
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
                className="font-bold text-gray-100 hover:text-orange-400 transition focus:outline-none focus:ring focus:ring-orange-400 rounded"
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
