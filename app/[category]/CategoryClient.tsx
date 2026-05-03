"use client";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Flame, MessageSquare, User, Tag } from "lucide-react";

type Hit = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};
const cardAnim: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" },
  },
};

export default function CategoryClient({
  category,
  results,
}: {
  category: string;
  results: Hit[];
}) {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="page"
    >
      {/* Header */}
      <div className="page-header">
        <div>
          <p
            className="page-eyebrow"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Tag size={10} /> Category
          </p>
          <h1 className="page-title" aria-label={`News category: ${category}`}>
            {category.toUpperCase()}
          </h1>
        </div>
        <div className="page-count">
          <span style={{ color: "var(--signal)" }}>{results.length}</span>
          <div>results</div>
        </div>
      </div>

      {results.length === 0 ? (
        <p
          role="status"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: ".78rem",
            color: "var(--ink-3)",
          }}
        >
          No results found for this category.
        </p>
      ) : (
        <motion.div
          className="story-grid"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {results.map((item, i) => (
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
    </motion.main>
  );
}
