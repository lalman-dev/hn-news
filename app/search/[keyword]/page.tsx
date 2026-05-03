"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchHN } from "@/app/lib/hnApi";
import SkeletonCard from "@/app/components/SkeletonCard";
import { Flame, MessageSquare, User, Search } from "lucide-react";

type Story = {
  objectID: string;
  title: string;
  url?: string;
  points?: number;
  author?: string;
  num_comments?: number;
};
type HNResp<T> = { hits: T[] };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>();
  const [results, setResults] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword) return;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const d = await fetchHN<HNResp<Story>>(
          `https://hn.algolia.com/api/v1/search?query=${keyword}&tags=story`,
        );
        setResults(d.hits || []);
      } catch {
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [keyword]);

  const decoded = decodeURIComponent(keyword);

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="page"
    >
      <div className="page-header">
        <div>
          <p
            className="page-eyebrow"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Search size={10} /> Search results
          </p>
          <h1
            className="page-title"
            aria-label={`Search results for ${decoded}`}
            style={{ fontSize: decoded.length > 12 ? "1.8rem" : undefined }}
          >
            {decoded.toUpperCase()}
          </h1>
        </div>
        {!loading && results.length > 0 && (
          <div className="page-count">
            <span style={{ color: "var(--signal)" }}>{results.length}</span>
            <div>results</div>
          </div>
        )}
      </div>

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-label={`Loading results for ${decoded}`}
          className="story-grid"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p
          role="alert"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: ".78rem",
            color: "#c0392b",
          }}
        >
          {error}
        </p>
      ) : results.length === 0 ? (
        <p
          role="alert"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: ".78rem",
            color: "var(--ink-3)",
          }}
        >
          No results found for "{decoded}".
        </p>
      ) : (
        <motion.div
          className="story-grid"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {results.map((hit, i) => (
            <motion.article
              key={hit.objectID}
              variants={cardAnim}
              className="card"
            >
              <span className="card-index">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <Link href={`/item/${hit.objectID}`} className="card-title">
                {hit.title}
              </Link>
              <div className="card-meta">
                <span className="badge badge-pts">
                  <Flame size={9} /> {hit.points ?? 0}
                </span>
                <span className="badge badge-cmt">
                  <MessageSquare size={9} /> {hit.num_comments ?? 0}
                </span>
                <span className="badge badge-auth">
                  <User size={9} /> {hit.author}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}
