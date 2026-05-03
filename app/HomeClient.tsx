"use client";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import NewsLetter from "./components/Newsletter";
import SearchInput from "./components/SearchInput";
import { TrendingUp, Flame, MessageSquare, User } from "lucide-react";

type Story = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};
const cardAnim: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function HomeClient({ stories }: { stories: Story[] }) {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="page"
    >
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Live Feed</p>
          <h1 className="page-title">
            FRONT
            <br />
            PAGE
          </h1>
        </div>
        <div className="page-count">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              justifyContent: "flex-end",
            }}
          >
            <Flame size={12} color="var(--signal)" />
            <span style={{ color: "var(--signal)" }}>{stories.length}</span>
          </div>
          <div>stories today</div>
        </div>
      </div>

      {/* ── Search ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        style={{ marginBottom: 24 }}
      >
        <SearchInput />
      </motion.div>

      {/* ── Trending section label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <TrendingUp size={13} color="var(--ink-3)" />
        <span className="page-eyebrow" style={{ color: "var(--ink-3)" }}>
          Trending now
        </span>
      </div>

      {/* ── Grid ── */}
      {stories.length === 0 ? (
        <p
          role="status"
          aria-live="polite"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: ".78rem",
            color: "var(--ink-3)",
          }}
        >
          No trending stories available.
        </p>
      ) : (
        <motion.div
          className="story-grid"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {stories.map((item, i) => (
            <motion.article
              key={item.objectID}
              variants={cardAnim}
              className="card"
            >
              <span className="card-index">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <Link href={`/item/${item.objectID}`} className="card-title">
                {item.title}
              </Link>
              <div className="card-meta">
                <span className="badge badge-pts">
                  <Flame size={9} /> {item.points ?? 0}
                </span>
                <span className="badge badge-cmt">
                  <MessageSquare size={9} /> {item.num_comments ?? 0}
                </span>
                <span className="badge badge-auth">
                  <User size={9} /> {item.author}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* ── Newsletter ── */}
      <div style={{ marginTop: 36 }}>
        <NewsLetter />
      </div>
    </motion.main>
  );
}
