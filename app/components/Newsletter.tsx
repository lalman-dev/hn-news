"use client";

import { SparkleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    const timer = setTimeout(() => {
      setShowModal(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setShowModal(true);
    setEmail("");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
      className="w-full bg-transparent pt-10 text-center text-white flex flex-col items-center justify-center"
    >
      <motion.h3 className="font-extrabold text-3xl">Get updated</motion.h3>

      <motion.h5>Subscribe to our newsletter & get the latest news</motion.h5>

      <motion.form
        onSubmit={handleSubmit}
        className="flex items-center justify-center mt-10 border border-slate-400 text-sm rounded-lg h-14 max-w-md w-full"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent outline-none rounded-lg px-4 h-full flex-1"
          placeholder="Enter your email address"
          required
        />

        <span
          aria-hidden="true"
          className="border-r text-gray-400 h-11 mr-1.5"
        />

        <motion.button
          type="submit"
          className="relative bg-orange-400 bg-clip-text text-transparent 
                     border border-orange-400 text-sm rounded-lg h-11 mr-1.5 px-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe now
        </motion.button>
      </motion.form>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            role="dialog"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
              <h2 className="text-xl text-gray-600 font-semibold mb-2">
                🎉 Subscription Successful
              </h2>
              <p className="text-gray-600 mb-4">
                Thanks for subscribing! You’ll receive updates soon.
              </p>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="bg-green-400 rounded-full p-3 inline-flex"
              >
                <SparkleIcon />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
