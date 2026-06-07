import { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { useModel } from "../hooks/useModel.jsx";
import ModelStatus from "../components/ModelStatus";

const tips = [
  "Foto seluruh bagian eKTP, jangan terpotong",
  "Pencahayaan cukup, hindari kilat / flash berlebihan",
  "Pastikan tulisan dan foto KTP terlihat jelas",
  "Gunakan foto asli, bukan foto dari layar / monitor",
];

export default function Check() {
  const { model, status } = useModel();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ektp_history") || "[]"); } catch { return []; }
  });
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();
  const imgRef = useRef();

  function handleFile(file) {
    if (!file?.type.startsWith("image/")) return;
    setResult(null);
    setPreview(URL.createObjectURL(file));
  }

  async function classify() {
    if (!model || !imgRef.current) return;
    setLoading(true);
    setResult(null);
    try {
      const tensor = tf.browser.fromPixels(imgRef.current)
          .resizeBilinear([224, 224]).toFloat().div(127.5).sub(1.0).expandDims(0);
      const pred = model.predict(tensor);
      const scores = await pred.data();
      tensor.dispose(); pred.dispose();

      let probPalsu = scores[0];
      let probAsli = 1 - scores[0];

      const r = {
        label: probAsli >= 0.5 ? "ASLI" : "PALSU",
        probAsli: (probAsli * 100).toFixed(1),
        probPalsu: (probPalsu * 100).toFixed(1),
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setResult(r);

      const newHistory = [r, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem("ektp_history", JSON.stringify(newHistory));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setPreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  const isAsli = result?.label === "ASLI";

  return (
    <div className="page-enter" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700, marginBottom: 6 }}>Periksa eKTP</h1>
        <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 15 }}>Upload foto eKTP untuk memeriksa keasliannya secara otomatis.</p>

        <ModelStatus />

        {/* Upload area */}
        <div className="card" style={{ marginBottom: 20 }}>
          {!preview ? (
            <div
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              style={{
                border: `2px dashed ${dragOver ? "var(--accent)" : "var(--border2)"}`,
                borderRadius: 10, padding: "52px 24px", textAlign: "center", cursor: "pointer",
                background: dragOver ? "var(--peach-bg)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{ width: 48, height: 48, margin: "0 auto 16px", color: "var(--hint)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                </svg>
              </div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Klik atau seret foto eKTP ke sini</p>
              <p style={{ color: "var(--hint)", fontSize: 13 }}>JPG, PNG, WEBP — maksimal 10MB</p>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          ) : (
            <div>
              <img ref={imgRef} src={preview} alt="Preview" crossOrigin="anonymous"
                style={{ width: "100%", borderRadius: 10, border: "1px solid var(--border)", maxHeight: 300, objectFit: "cover", display: "block", marginBottom: 16 }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" onClick={reset} style={{ flex: "none" }}>Ganti Foto</button>
                <button className="btn btn-primary" onClick={classify} disabled={loading || status !== "ready"} style={{ flex: 1, justifyContent: "center" }}>
                  {loading && <span className="spinner" />}
                  {loading ? "Menganalisis..." : "Periksa Keaslian"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hasil */}
        {result && (
          <div className="card" style={{
            marginBottom: 20,
            borderColor: isAsli ? "var(--sage)" : "var(--rose)",
            background: isAsli ? "var(--sage-bg)" : "var(--rose-bg)",
            animation: "fadeUp 0.3s ease both",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                background: isAsli ? "rgba(143,184,154,0.25)" : "rgba(232,164,164,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>
                {isAsli ? "✓" : "✕"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 22, color: isAsli ? "var(--sage-dark)" : "var(--rose-dark)" }}>
                  {result.label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  {isAsli ? "eKTP terdeteksi asli" : "eKTP terdeteksi mencurigakan"}
                </div>
              </div>
            </div>

            {[["Asli", result.probAsli, "var(--sage)"], ["Palsu", result.probPalsu, "var(--rose)"]].map(([label, pct, color]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "44px 1fr 48px", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
                <div style={{ height: 7, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
                </div>
                <span style={{ fontSize: 13, color: "var(--muted)", textAlign: "right" }}>{pct}%</span>
              </div>
            ))}

            <p style={{ fontSize: 12, color: "var(--hint)", marginTop: 12, fontStyle: "italic" }}>
              * Hasil prediksi AI, bukan keputusan hukum resmi. Verifikasi lebih lanjut ke instansi terkait.
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="card" style={{ background: "var(--blue-bg)", borderColor: "var(--blue)", marginBottom: 20 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: "var(--blue-dark)" }}>Tips foto yang baik</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {tips.map((t, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--blue-dark)", alignItems: "flex-start" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: 7 }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Riwayat */}
        {history.length > 0 && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15 }}>Riwayat pemeriksaan</h3>
              <button onClick={() => { setHistory([]); localStorage.removeItem("ektp_history"); }}
                style={{ fontSize: 12, color: "var(--hint)", background: "none", border: "none", cursor: "pointer" }}>
                Hapus semua
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {history.map((h, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", borderRadius: 10,
                  background: h.label === "ASLI" ? "var(--sage-bg)" : "var(--rose-bg)",
                  border: `1px solid ${h.label === "ASLI" ? "var(--sage)" : "var(--rose)"}`,
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: h.label === "ASLI" ? "var(--sage-dark)" : "var(--rose-dark)", fontSize: 14 }}>
                      {h.label}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      Asli {h.probAsli}% · Palsu {h.probPalsu}%
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--hint)" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}