"use client";
import { motion } from "motion/react";

export default function Spinner() {
  return (
    <motion.div
      className="w-12 h-12 rounded-full bg-linear-to-r from-orange-500 to-pink-500 mx-auto"
      animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
