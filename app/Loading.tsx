import Background from "./components/Background";
import SkeletonCard from "./components/SkeletonCard";
import { motion } from "motion/react";

export default function Loading() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
      role="status"
      aria-live="polite"
      aria-label="Loading Hacker News stories"
    >
      {/* Background image (decorative) */}
      <Background />
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center"
      >
        Hacker News Portal
      </motion.h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </motion.main>
  );
}
