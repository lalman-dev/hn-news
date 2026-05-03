"use client";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="page"
      role="alert"
      aria-live="assertive"
    >
      <div className="error-panel" style={{ maxWidth: 480 }}>
        <div className="error-code">ERR</div>
        <p className="error-title">Something went wrong</p>
        <p className="error-msg">
          Failed to load Hacker News stories. The API may be temporarily
          unavailable.
        </p>
        <button onClick={reset} className="error-btn">
          <RefreshCw size={12} /> Retry
        </button>
      </div>
    </motion.main>
  );
}
