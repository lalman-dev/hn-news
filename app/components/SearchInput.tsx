"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchHN } from "@/app/lib/hnApi";

type Story = {
  objectID: string;
  title: string;
};
type HNSearchResponse<T> = {
  hits: T[];
};

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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
        const data = await fetchHN<HNSearchResponse<Story>>(
          `https://hn.algolia.com/api/v1/search?query=${query}&tags=story`,
          { signal: abortRef.current.signal }
        );

        setSuggestions(data.hits.slice(0, 5));
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

  const handleSelect = (value: string) => {
    setHistory((h) => [...new Set([value, ...h])]);
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  return (
    <div className="relative w-full max-w-xl">
      <motion.input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search Hacker News"
        className="w-full rounded-xl px-5 py-3 border ..."
      />

      {/* Status */}
      {/* Dropdown */}
      <div className="absolute z-10 mt-2 w-full rounded-lg bg-gray-200 dark:bg-gray-800 shadow-lg">
        {loading ? (
          <p className="px-4 py-3 text-sm text-gray-500 text-center">
            Loading suggestions…
          </p>
        ) : query.length >= 3 ? (
          suggestions.map((s) => (
            <button
              key={s.objectID}
              onClick={() => handleSelect(s.title)}
              className="block w-full px-4 py-2 text-left hover:bg-orange-200 dark:hover:bg-orange-700"
            >
              {s.title}
            </button>
          ))
        ) : isFocused ? (
          history.length > 0 ? (
            history.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className="block w-full px-4 py-2 text-left hover:bg-orange-200 dark:hover:bg-orange-700"
              >
                {item}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              No search history yet
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}
