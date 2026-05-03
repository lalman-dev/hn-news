export default function SkeletonCard() {
  return (
    <div
      className="card"
      aria-hidden="true"
      style={{ cursor: "default", pointerEvents: "none" }}
    >
      <div className="skel" style={{ height: 13, width: "75%" }} />
      <div
        className="skel"
        style={{ height: 13, width: "60%", marginTop: 4 }}
      />
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        <div
          className="skel"
          style={{ height: 18, width: 56, borderRadius: 3 }}
        />
        <div
          className="skel"
          style={{ height: 18, width: 64, borderRadius: 3 }}
        />
        <div
          className="skel"
          style={{ height: 18, width: 88, borderRadius: 3 }}
        />
      </div>
    </div>
  );
}
