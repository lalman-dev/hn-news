"use client";

import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import Link from "next/link";

type Hit = {
  objectID: string;
  title: string;
  url?: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

export default function GamesPage() {
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGamesNews = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          "https://hn.algolia.com/api/v1/search?query=games&tags=story"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setResults(data.hits || []);
      } catch (err) {
        setError("Failed to load games news");
      } finally {
        setLoading(false);
      }
    };

    fetchGamesNews();
  }, []);

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
        Games News
      </motion.h1>

      {loading ? (
        <Spinner />
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
