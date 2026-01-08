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
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        alt="background-image"
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full"
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
