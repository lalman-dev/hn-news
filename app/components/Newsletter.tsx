"use client";
import { Rss } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    const t = setTimeout(() => setShowModal(false), 3000);
    return () => clearTimeout(t);
  }, [showModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setShowModal(true);
    setEmail("");
  };

  return (
    <>
      <div className="nl-wrap">
        <div>
          <p className="nl-label">Newsletter</p>
          <h3 className="nl-title">Stay ahead of the feed</h3>
          <p className="nl-sub">Top stories. No noise. Unsubscribe anytime.</p>
        </div>
        <form onSubmit={handleSubmit} className="nl-form">
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="nl-input"
            placeholder="you@example.com"
            required
          />
          <motion.button
            type="submit"
            className="nl-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            role="dialog"
            aria-live="polite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,.6)",
              backdropFilter: "blur(6px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              style={{
                background: "var(--paper-2)",
                border: "1px solid var(--rule)",
                borderTop: "3px solid var(--signal)",
                borderRadius: 12,
                padding: "32px 28px",
                textAlign: "center",
                maxWidth: 340,
                width: "90%",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  display: "inline-flex",
                  marginBottom: 14,
                  padding: 10,
                  background: "var(--signal-tint)",
                  borderRadius: "50%",
                }}
              >
                <Rss size={22} color="var(--signal)" />
              </motion.div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  letterSpacing: ".06em",
                  color: "var(--ink)",
                  marginBottom: 8,
                }}
              >
                SUBSCRIBED
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".72rem",
                  color: "var(--ink-2)",
                }}
              >
                You're in. Expect the best from HN, delivered.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
