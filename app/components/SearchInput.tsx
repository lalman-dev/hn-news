"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchHN } from "@/app/lib/hnApi";
import { Search, Loader2, Clock, ArrowRight } from "lucide-react";

type Story = { objectID: string; title: string };
type HNResp<T> = { hits: T[] };
type Item = { id: string; label: string; isHistory?: boolean };

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);

  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lid = "ss";

  const items: Item[] =
    query.length >= 3
      ? suggestions.map((s) => ({ id: s.objectID, label: s.title }))
      : focused
        ? history.map((h) => ({ id: h, label: h, isHistory: true }))
        : [];

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      setLoading(false);
      abortRef.current?.abort();
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setLoading(true);
      try {
        const d = await fetchHN<HNResp<Story>>(
          `https://hn.algolia.com/api/v1/search?query=${query}&tags=story`,
          { signal: abortRef.current.signal },
        );
        setSuggestions(d.hits.slice(0, 6));
      } catch (e: any) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const pick = (val: string) => {
    setHistory((h) => [...new Set([val, ...h])].slice(0, 8));
    setActive(-1);
    router.push(`/search/${encodeURIComponent(val)}`);
  };

  const showDrop =
    focused &&
    (loading || items.length > 0 || (query.length < 3 && history.length === 0));

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div className="search-bar">
        <Search size={13} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
        <input
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={items.length > 0}
          aria-controls={lid}
          aria-activedescendant={
            active >= 0 ? `${lid}-${items[active]?.id}` : undefined
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (!items.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((p) => (p < items.length - 1 ? p + 1 : 0));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((p) => (p > 0 ? p - 1 : items.length - 1));
            }
            if (e.key === "Enter" && active >= 0) {
              e.preventDefault();
              pick(items[active].label);
            }
            if (e.key === "Escape") {
              setActive(-1);
              setSuggestions([]);
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocused(false);
              setActive(-1);
            }, 150)
          }
          placeholder="Search Hacker News…"
          className="search-input"
        />
        {loading ? (
          <Loader2
            size={13}
            style={{ color: "var(--signal)", flexShrink: 0 }}
            className="spin"
          />
        ) : (
          query.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => pick(query)}
              style={{
                background: "var(--signal)",
                border: "none",
                borderRadius: 4,
                padding: "3px 7px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Search"
            >
              <ArrowRight size={12} color="#fff" />
            </motion.button>
          )
        )}
      </div>

      {showDrop && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="search-drop"
          id={lid}
          role="listbox"
        >
          {loading ? (
            <p
              role="status"
              aria-live="polite"
              style={{
                padding: "10px 14px",
                fontSize: ".72rem",
                color: "var(--ink-3)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Searching…
            </p>
          ) : items.length > 0 ? (
            items.map((it, i) => (
              <button
                key={it.id}
                id={`${lid}-${it.id}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(it.label)}
                className={`search-opt${i === active ? " active" : ""}`}
              >
                {it.isHistory ? (
                  <Clock
                    size={11}
                    style={{ color: "var(--ink-3)", flexShrink: 0 }}
                  />
                ) : (
                  <Search
                    size={11}
                    style={{ color: "var(--ink-4)", flexShrink: 0 }}
                  />
                )}
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {it.label}
                </span>
              </button>
            ))
          ) : (
            <p
              style={{
                padding: "10px 14px",
                fontSize: ".7rem",
                color: "var(--ink-3)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Type 3+ characters to search
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
