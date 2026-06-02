import { Link, NavLink, useNavigate } from "react-router-dom";
import { useModel } from "../hooks/useModel.jsx";

export default function Navbar() {
  const { status } = useModel();
  const navigate = useNavigate();

  const dot = {
    loading: { color: "#e8b88a", label: "Memuat model..." },
    ready:   { color: "#8fb89a", label: "Model siap" },
    error:   { color: "#e8a4a4", label: "Model tidak ditemukan" },
  }[status];

  return (
    <header style={{
      background: "rgba(250,248,245,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "0 24px",
        height: 60, display: "flex", alignItems: "center", gap: 24,
      }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "var(--accent)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <circle cx="8" cy="12" r="2.5"/>
              <path d="M13 9h5M13 12h5M13 15h3"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>eKTP<span style={{ color: "var(--accent)" }}>Checker</span></span>
        </Link>

        <nav style={{ display: "flex", gap: 4, marginLeft: 8 }}>
          {[{ to: "/", label: "Beranda" }, { to: "/cek", label: "Cek eKTP" }, { to: "/tentang", label: "Tentang" }].map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} style={({ isActive }) => ({
              textDecoration: "none", padding: "5px 12px", borderRadius: 50,
              fontSize: 14, fontWeight: 500,
              color: isActive ? "var(--accent)" : "var(--muted)",
              background: isActive ? "var(--peach-bg)" : "transparent",
              transition: "all 0.15s",
            })}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--muted)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot.color, display: "inline-block" }} />
            <span style={{ display: "none" }}>{dot.label}</span>
          </div>
          <button className="btn btn-primary" style={{ padding: "8px 18px", fontSize: 13 }} onClick={() => navigate("/cek")}>
            Cek Sekarang
          </button>
        </div>
      </div>
    </header>
  );
}