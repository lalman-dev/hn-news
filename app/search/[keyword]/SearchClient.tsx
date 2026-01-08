"use client";

import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchHN } from "@/app/lib/hnApi";
import SkeletonCard from "@/app/components/SkeletonCard";

type Story = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

type HNResponse<T> = {
  hits: T[];
};

type Props = {
  keyword: string;
};

export default function SearchClient({ keyword }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", keyword],
    queryFn: () =>
      fetchHN<HNResponse<Story>>(
        `https://hn.algolia.com/api/v1/search?query=${keyword}&tags=story`
      ),
    enabled: !!keyword,
  });

  const results = data?.hits ?? [];

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
    >
      {/* Heading animation preserved */}
      <motion.h1
        aria-label={`Search results for ${keyword}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-gray-600 dark:text-gray-100 mb-6 text-center"
      >
        Search Results for "{keyword}"
      </motion.h1>

      {isLoading ? (
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
      ) : isError ? (
        (() => {
          throw new Error("Failed to load search results");
        })()
      ) : results.length === 0 ? (
        <p role="status" className="text-gray-400 text-center">
          No results found.
        </p>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item) => (
            <motion.article
              key={item.objectID}
              className="rounded-lg border border-gray-500 dark:border-gray-700 backdrop-blur-3xl text-gray-800 dark:text-gray-200 p-4 hover:border-orange-500 transition"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                href={`/item/${item.objectID}`}
                className="font-bold text-gray-700 dark:text-gray-100 hover:text-orange-400 transition focus:ring-2 focus:ring-orange-400 rounded"
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
