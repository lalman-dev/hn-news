"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function SearchError({ reset }: Props) {
  return (
    <main
      role="alert"
      aria-live="assertive"
      className="mx-auto max-w-3xl px-6 py-10 text-center"
    >
      <h1 className="text-2xl font-bold text-red-500">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        We couldn't load the search results. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-orange-400 px-5 py-2 text-white hover:bg-orange-500 transition"
      >
        Retry
      </button>
    </main>
  );
}
