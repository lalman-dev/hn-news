"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "../../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fetchHN } from "@/app/lib/hnApi";

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

    const fetchItem = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchHN<Item>(
          `https://hn.algolia.com/api/v1/items/${id}`
        );
        setItem(data);
      } catch {
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl px-6 py-10"
    >
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : item ? (
        <>
          {/* Title */}
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-100 mb-4"
          >
            {item.title}
          </motion.h1>

          {/* Metadata */}
          <p className="text-sm text-gray-400 mb-6">
            {item.points ?? 0} points • {item.num_comments ?? 0} comments • by{" "}
            {item.author}
          </p>

          {/* Link */}
          {item.url && (
            <Link
              href={item.url}
              target="_blank"
              className="text-orange-400 hover:underline mb-8 block"
            >
              Read original article
            </Link>
          )}

          {/* Comments */}
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Comments</h2>
          <CommentTree comments={item.children || []} />
        </>
      ) : null}
    </motion.main>
  );
}

/* -------------------------------
   Comment Tree Component
--------------------------------- */
function CommentTree({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentNode key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentNode({ comment }: { comment: Comment }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-l border-gray-700 pl-4"
    >
      {/* Comment header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">{comment.author}</span>:{" "}
          <span dangerouslySetInnerHTML={{ __html: comment.text }} />
        </p>
        {comment.children && comment.children.length > 0 && (
          <button
            onClick={() => setOpen(!open)}
            className="text-xs text-orange-400 hover:underline ml-2"
          >
            {open ? "Hide replies" : "Show replies"}
          </button>
        )}
      </div>

      {/* Nested comments */}
      <AnimatePresence>
        {open && comment.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-2"
          >
            {comment.children.map((child) => (
              <CommentNode key={child.id} comment={child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
