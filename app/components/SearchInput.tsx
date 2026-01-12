"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchHN } from "@/app/lib/hnApi";

/* ---------- Types ---------- */

type Story = {
  objectID: string;
  title: string;
};

type HNSearchResponse<T> = {
  hits: T[];
};

type DropdownItem = {
  id: string;
  label: string;
};

/* ---------- Component ---------- */

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const listboxId = "search-suggestions";

  /* ---------- Dropdown Data ---------- */

  const dropdownItems: DropdownItem[] =
    query.length >= 3
      ? suggestions.map((s) => ({
          id: s.objectID,
          label: s.title,
        }))
      : isFocused
      ? history.map((h) => ({
          id: h,
          label: h,
        }))
      : [];

  /* ---------- Debounced Fetch ---------- */

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

  /* ---------- Selection ---------- */

  const handleSelect = (value: string) => {
    setHistory((h) => [...new Set([value, ...h])]);
    setActiveIndex(-1);
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  return (
    <div className="relative w-full max-w-xl">
      <motion.input
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={dropdownItems.length > 0}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0
            ? `${listboxId}-${dropdownItems[activeIndex].id}`
            : undefined
        }
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={(e) => {
          if (!dropdownItems.length) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
              prev < dropdownItems.length - 1 ? prev + 1 : 0
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : dropdownItems.length - 1
            );
          }

          if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            handleSelect(dropdownItems[activeIndex].label);
          }

          if (e.key === "Escape") {
            setActiveIndex(-1);
            setSuggestions([]);
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setActiveIndex(-1);
        }}
        placeholder="Search Hacker News"
        className="w-full rounded-xl px-5 py-3 border border-gray-500 dark:border-gray-700 bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-orange-500"
      />

      {/* ---------- Dropdown ---------- */}
      <div
        id={listboxId}
        role="listbox"
        className="absolute z-10 mt-2 w-full rounded-lg bg-gray-200 dark:bg-gray-800 shadow-lg"
      >
        {loading ? (
          <p
            role="status"
            aria-live="polite"
            className="px-4 py-3 text-sm text-gray-500 text-center"
          >
            Loading suggestions…
          </p>
        ) : dropdownItems.length > 0 ? (
          dropdownItems.map((item, index) => (
            <button
              key={item.id}
              id={`${listboxId}-${item.id}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleSelect(item.label)}
              className={`block w-full px-4 py-2 text-left transition ${
                index === activeIndex
                  ? "bg-orange-300 dark:bg-orange-600"
                  : "hover:bg-orange-200 dark:hover:bg-orange-700"
              }`}
            >
              {item.label}
            </button>
          ))
        ) : isFocused && query.length < 3 ? (
          <p className="px-4 py-3 text-sm text-gray-500">
            No search history yet
          </p>
        ) : null}
      </div>
    </div>
  );
}
