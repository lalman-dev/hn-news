"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchHN } from "@/app/lib/hnApi";
import SkeletonCard from "@/app/components/SkeletonCard";
import Background from "@/app/components/Background";

type Story = {
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

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>();
  const [results, setResults] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchHN<HNResponse<Story>>(
          `https://hn.algolia.com/api/v1/search?query=${keyword}&tags=story`
        );

        setResults(data.hits || []);
      } catch {
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  const decodedKeyword = decodeURIComponent(keyword);

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
    >
      <Background />
      <motion.h1
        aria-label={`Search results for ${keyword}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-gray-600 dark:text-gray-100 mb-6 text-center"
      >
        {decodedKeyword}
      </motion.h1>

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-label={`Loading search results for ${keyword}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      ) : results.length === 0 ? (
        <p role="alert" className="text-gray-400">
          No results found.
        </p>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((hit) => (
            <motion.article
              key={hit.objectID}
              className="rounded-lg border border-gray-500 dark:border-gray-700 backdrop-blur-3xl text-gray-800 dark:text-gray-200 p-4 hover:border-orange-500 transition"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                href={`/item/${hit.objectID}`}
                className="font-bold text-gray-700 dark:text-gray-100 hover:text-orange-400 transition focus:ring-2 focus:ring-orange-400 rounded"
              >
                {hit.title}
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
