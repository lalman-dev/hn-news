import SkeletonCard from "../components/SkeletonCard";

export default function Loading() {
  return (
    <main
      className="page"
      role="status"
      aria-live="polite"
      aria-label="Loading category news"
    >
      <div
        style={{
          paddingBottom: 16,
          borderBottom: "1px solid var(--rule)",
          marginBottom: 24,
        }}
      >
        <div
          className="skel"
          style={{ height: 11, width: 70, marginBottom: 8 }}
        />
        <div className="skel" style={{ height: 44, width: 180 }} />
      </div>
      <div className="story-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
