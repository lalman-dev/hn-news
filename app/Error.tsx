"use client";
import { motion } from "framer-motion";
import Background from "./components/Background";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
      role="alert"
      aria-live="assertive"
    >
      {/* Background image*/}
      <Background />
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-red-500"
      >
        Something went wrong
      </motion.h1>

      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 text-gray-600 dark:text-gray-300"
      >
        Failed to load Hacker News stories. Please try again.
      </motion.p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-orange-400 px-5 py-2 text-white hover:bg-orange-500"
      >
        Retry
      </button>
    </motion.main>
  );
}
