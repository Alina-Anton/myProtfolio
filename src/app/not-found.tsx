import Link from "next/link";

export default function NotFound() {
  return (
    <div className="work-section" style={{ textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--fg-muted)" }}>
        That project or page isn’t in this portfolio.
      </p>
      <Link href="/" className="btn-primary" style={{ marginTop: "1.25rem" }}>
        Back home
      </Link>
    </div>
  );
}
