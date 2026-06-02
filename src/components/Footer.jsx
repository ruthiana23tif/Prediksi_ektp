import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "32px 24px",
      marginTop: 80,
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          <span style={{ fontWeight: 600, color: "var(--text)" }}>eKTPChecker</span>
          {" "}· Hasil prediksi AI bukan keputusan hukum resmi.
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--hint)" }}>
          <Link to="/tentang" style={{ color: "inherit", textDecoration: "none" }}>Tentang</Link>
          <span>·</span>
          <span>TensorFlow.js + MobileNetV2</span>
        </div>
      </div>
    </footer>
  );
}