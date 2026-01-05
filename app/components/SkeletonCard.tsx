export default function SkeletonCard() {
  return (
    <div
      className="animate-pulse rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900 p-4"
      aria-hidden="true"
    >
      <div className="h-4 w-3/4 rounded bg-gray-400 dark:bg-gray-700" />
      <div className="mt-3 h-3 w-1/2 rounded bg-gray-400 dark:bg-gray-700" />
    </div>
  );
}
