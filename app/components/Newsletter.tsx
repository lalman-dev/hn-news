import { SparkleIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  setTimeout(() => {
    setShowModal(false);
  }, 3000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
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
      <motion.h3
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="font-extrabold text-3xl"
      >
        Get updated
      </motion.h3>
      <motion.h5
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        Subscribe to our newsletter & get the latest news
      </motion.h5>
      <motion.form
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        onSubmit={handleSubmit}
        className="flex items-center justify-center mt-10 border border-slate-400 text-sm rounded-lg h-14 max-w-md w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent outline-none rounded-lg px-4 h-full flex-1"
          placeholder="Enter your email address"
        />
        <span
          aria-hidden="true"
          className="border-r text-gray-400 h-11 mr-1.5"
        ></span>
        <motion.button
          type="submit"
          className="relative bg-orange-400 bg-clip-text text-transparent 
             border border-orange-400 text-sm rounded-lg h-11 mr-1.5 px-3 flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          Subscribe now
        </motion.button>
      </motion.form>
      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
              <h2 className="text-xl text-gray-600 font-semibold mb-2">
                🎉 Subscription Successful 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                Thanks for Subscribing! You will receive updates soon.
              </p>
              <motion.button
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="bg-green-400 rounded-full p-3"
              >
                <SparkleIcon />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
