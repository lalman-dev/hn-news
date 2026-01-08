"use client";

import { motion } from "motion/react";
import Link from "next/link";

type Hit = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

type Props = {
  category: string;
  results: Hit[];
};

export default function CategoryClient({ category, results }: Props) {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto max-w-3xl px-6 py-10"
    >
      {/* Background Image */}
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full"
      />

      {/* Heading animation preserved */}
      <motion.h1
        aria-label={`News category: ${category}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-gray-600 dark:text-gray-100 mb-6 text-center capitalize"
      >
        {category} News
      </motion.h1>

      {results.length === 0 ? (
        <p role="status" className="text-gray-400 text-center">
          No results found for this category.
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
          {results.map((item) => (
            <motion.article
              key={item.objectID}
              className="rounded-lg border border-gray-500 dark:border-gray-700 backdrop-blur-3xl text-gray-800 dark:text-gray-200 p-4 hover:border-orange-500 transition"
              whileHover={{ scale: 1.02 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
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
