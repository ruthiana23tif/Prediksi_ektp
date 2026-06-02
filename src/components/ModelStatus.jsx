import { useModel } from "../hooks/useModel.jsx";

export default function ModelStatus() {
  const { status } = useModel();
  if (status === "ready") return null;

  const cfg = {
    loading: { bg: "var(--peach-bg)", color: "var(--peach-dark)", border: "var(--peach)", text: "Memuat model AI, harap tunggu sebentar..." },
    error:   { bg: "var(--rose-bg)", color: "var(--rose-dark)", border: "var(--rose)", text: 'Model tidak ditemukan. Pastikan file ada di public/model/model.json' },
  }[status];

  return (
    <div style={{
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      borderRadius: "var(--radius-sm)",
      padding: "12px 16px", fontSize: 13,
      marginBottom: 20, display: "flex", alignItems: "center", gap: 8,
    }}>
      {status === "loading" && <span className="spinner" style={{ borderColor: "rgba(0,0,0,0.15)", borderTopColor: cfg.color }} />}
      {cfg.text}
    </div>
  );
}