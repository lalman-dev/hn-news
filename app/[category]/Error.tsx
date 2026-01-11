"use client";

import Background from "../components/Background";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ reset }: Props) {
  return (
    <main
      className="relative mx-auto max-w-3xl px-6 py-10"
      role="alert"
      aria-live="assertive"
    >
      {/* Background */}
      <Background />

      <h1 className="text-2xl font-bold text-red-500">
        Failed to load category
      </h1>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-orange-400 px-5 py-2 text-white hover:bg-orange-500"
      >
        Retry
      </button>
    </main>
  );
}
