"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fetchHN } from "@/app/lib/hnApi";
import {
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Flame,
  MessageSquare,
  User,
  ArrowLeft,
} from "lucide-react";

type Comment = {
  id: number;
  author: string;
  text: string;
  children?: Comment[];
};
type Item = {
  id: number;
  title: string;
  url?: string;
  points?: number;
  author?: string;
  num_comments?: number;
  children?: Comment[];
};

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const d = await fetchHN<Item>(
          `https://hn.algolia.com/api/v1/items/${id}`,
        );
        setItem(d);
      } catch {
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="page"
      style={{ maxWidth: 820 }}
    >
      {/* Back */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "var(--font-mono)",
          fontSize: ".65rem",
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          textDecoration: "none",
          marginBottom: 20,
          transition: "color .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--signal)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
      >
        <ArrowLeft size={11} /> Back to front page
      </Link>

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading article and comments"
        >
          <div className="item-hero" style={{ marginBottom: 24 }}>
            <div
              className="skel"
              style={{ height: 20, width: "80%", marginBottom: 12 }}
            />
            <div className="skel" style={{ height: 14, width: "50%" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {[60, 72, 96].map((w, i) => (
                <div
                  key={i}
                  className="skel"
                  style={{ height: 24, width: w, borderRadius: 3 }}
                />
              ))}
            </div>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="comment"
              style={{ marginTop: i === 1 ? 0 : undefined }}
            >
              <div
                className="skel"
                style={{ height: 11, width: 80, marginBottom: 8 }}
              />
              <div
                className="skel"
                style={{ height: 11, width: "100%", marginBottom: 5 }}
              />
              <div className="skel" style={{ height: 11, width: "70%" }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="error-panel">
          <p className="error-title">Error</p>
          <p className="error-msg">{error}</p>
        </div>
      ) : item ? (
        <>
          {/* Hero */}
          <div className="item-hero">
            <h1 className="item-hero-title">{item.title}</h1>
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: item.url ? 0 : undefined,
              }}
            >
              <span className="badge badge-pts">
                <Flame size={9} /> {item.points ?? 0} pts
              </span>
              <span className="badge badge-cmt">
                <MessageSquare size={9} /> {item.num_comments ?? 0} comments
              </span>
              <span className="badge badge-auth">
                <User size={9} /> {item.author}
              </span>
            </div>
            {item.url && (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="item-readlink"
                aria-label="Read original article (opens in new tab)"
              >
                <ExternalLink size={11} /> Read original article
              </Link>
            )}
          </div>

          {/* Comments */}
          <div>
            <h2 className="comments-header">
              DISCUSSION
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".65rem",
                  color: "var(--ink-3)",
                  marginLeft: 10,
                  verticalAlign: "middle",
                }}
              >
                {item.num_comments ?? 0}
              </span>
            </h2>
            <CommentTree comments={item.children || []} />
          </div>
        </>
      ) : null}
    </motion.main>
  );
}

function CommentTree({ comments }: { comments: Comment[] }) {
  return (
    <div>
      {comments.map((c) => (
        <CommentNode key={c.id} comment={c} />
      ))}
    </div>
  );
}

function CommentNode({
  comment,
  depth = 0,
}: {
  comment: Comment;
  depth?: number;
}) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="comment"
    >
      <p className="comment-author">{comment.author}</p>
      <div
        className="comment-body"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />
      {hasChildren && (
        <button
          aria-expanded={open}
          aria-controls={`cc-${comment.id}`}
          onClick={() => setOpen(!open)}
          className="comment-toggle"
        >
          {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          {open ? "Hide" : `${comment.children!.length}`}{" "}
          {open ? "replies" : "replies"}
        </button>
      )}
      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            id={`cc-${comment.id}`}
            role="region"
            aria-label={`Replies to ${comment.author}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {comment.children!.map((child) => (
              <CommentNode key={child.id} comment={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
