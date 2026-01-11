import Background from "../components/Background";
import SkeletonCard from "../components/SkeletonCard";

export default function Loading() {
  return (
    <main
      className="relative mx-auto max-w-3xl px-6 py-10"
      role="status"
      aria-live="polite"
      aria-label="Loading category news"
    >
      {/* Background */}
      <Background />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
