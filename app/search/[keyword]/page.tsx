"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "../../components/Spinner";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchHN } from "@/app/lib/hnApi";
import SkeletonCard from "@/app/components/SkeletonCard";

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

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>();
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchHN<HNResponse<Hit>>(
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

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-gray-100 mb-6 text-center"
      >
        Search Results for "{keyword}"
      </motion.h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((hit) => (
            <motion.article
              key={hit.objectID}
              className="rounded-lg border border-gray-700 bg-gray-900 p-4 hover:border-orange-500 transition"
              whileHover={{ scale: 1.02 }}
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
