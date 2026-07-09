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

const statusLabel = { ready: "System ready", loading: "Loading model", error: "Model error" };

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

  function validateAspectRatio(img) {
    const ratio = img.naturalWidth / img.naturalHeight;
    const MIN_RATIO = 1.2;
    const MAX_RATIO = 2.2;
    return ratio >= MIN_RATIO && ratio <= MAX_RATIO;
  }

  async function classify() {
    if (!model || !imgRef.current) return;

    if (!validateAspectRatio(imgRef.current)) {
      setResult({
        label: "BUKAN_KTP",
        message: "Gambar tidak terdeteksi sebagai eKTP. Pastikan foto menampilkan seluruh bagian kartu secara utuh.",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const tensor = tf.browser.fromPixels(imgRef.current)
          .resizeBilinear([224, 224])
          .toFloat()
          .div(127.5).sub(1.0)
          .expandDims(0);
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
  const isBukanKtp = result?.label === "BUKAN_KTP";
  const dotClass = status === "ready" ? "ready" : status === "error" ? "error" : "loading";
  const asliCount = history.filter((h) => h.label === "ASLI").length;

  return (
    <main className="page-main">
      <div className="page-inner">
          {/* Hero */}
          <div className="hero-row">
            <div className="hero-text">
              {/* <div className="eyebrow">AI Document Verification</div> */}
              <h1>Periksa keaslian eKTP</h1>
              <p>Unggah foto eKTP dan sistem akan menganalisis keasliannya secara otomatis dalam hitungan detik</p>
            </div>
            <div className="hero-stats">
              <div className="stat-tile">
                <span className={`status-dot ${dotClass}`} />
                <div>
                  <div className="stat-value">{statusLabel[status] || "Memuat"}</div>
                  <div className="stat-label">Status model</div>
                </div>
              </div>
              <div className="stat-tile">
                <div className="stat-value mono">{history.length}</div>
                <div className="stat-label">Total pemeriksaan</div>
              </div>
              <div className="stat-tile">
                <div className="stat-value mono">{asliCount}</div>
                <div className="stat-label">Terdeteksi asli</div>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="layout-grid">
            {/* Main column */}
            <div className="col-main">
              {/* Upload area */}
              <div className="card" style={{ marginBottom: 20, position: "relative" }}>
                {loading && <div className="scanline" />}

                {!preview ? (
                  <div
                    className={`dropzone${dragOver ? " drag-over" : ""}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  >
                    <div className="icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                      </svg>
                    </div>
                    <p className="title">Upload eKTP</p>
                    <p className="subtitle">Drag &amp; drop atau klik untuk memilih gambar</p>
                    <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
                  </div>
                ) : (
                  <div>
                    <img
                      ref={imgRef}
                      src={preview}
                      alt="Preview"
                      crossOrigin="anonymous"
                      style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border)", maxHeight: 380, objectFit: "cover", display: "block", marginBottom: 16 }}
                    />
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn btn-outline" onClick={reset} style={{ flex: "none" }}>Ganti Foto</button>
                      <button className="btn btn-primary" onClick={classify} disabled={loading || status !== "ready"} style={{ flex: 1, justifyContent: "center" }}>
                        {loading && <span className="spinner" />}
                        {loading ? "Menganalisis..." : "Mulai Prediksi"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hasil: Bukan eKTP */}
              {isBukanKtp && (
                <div className="card fade-up" style={{ marginBottom: 20, borderColor: "var(--peach)", background: "var(--peach-bg)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="result-badge" style={{ background: "rgba(201,138,44,0.16)" }}>⚠</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--peach-dark)" }}>Bukan eKTP</div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>{result.message}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hasil: Asli / Palsu */}
              {result && !isBukanKtp && (
                <div
                  className="card fade-up"
                  style={{
                    marginBottom: 20,
                    borderColor: isAsli ? "var(--sage)" : "var(--rose)",
                    background: isAsli ? "var(--sage-bg)" : "var(--rose-bg)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div
                      className="result-badge"
                      style={{ background: isAsli ? "rgba(30,138,95,0.14)" : "rgba(196,69,61,0.14)" }}
                    >
                      {isAsli ? "✓" : "✕"}
                    </div>
                    <div>
                      <div className="mono" style={{ fontWeight: 700, fontSize: 20, letterSpacing: "0.02em", color: isAsli ? "var(--sage-dark)" : "var(--rose-dark)" }}>
                        {result.label}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>
                        {isAsli ? "eKTP terdeteksi asli" : "eKTP terdeteksi mencurigakan"}
                      </div>
                    </div>
                  </div>

                  {[["Asli", result.probAsli, "var(--sage)"], ["Palsu", result.probPalsu, "var(--rose)"]].map(([label, pct, color]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "48px 1fr 52px", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <span className="mono" style={{ fontSize: 12.5, color: "var(--muted)", textAlign: "right" }}>{pct}%</span>
                    </div>
                  ))}

                  <p style={{ fontSize: 12, color: "var(--hint)", marginTop: 12, fontStyle: "italic" }}>
                    * Hasil prediksi AI, bukan keputusan hukum resmi. Verifikasi lebih lanjut ke instansi terkait.
                  </p>
                </div>
              )}

              {!result && (
                <div className="card" style={{ background: "var(--bg)", border: "1px dashed var(--border)" }}>
                  <p style={{ fontSize: 13, color: "var(--hint)", margin: 0, textAlign: "center" }}>
                    Hasil pemeriksaan akan muncul di sini setelah kamu mengunggah dan memproses foto eKTP.
                  </p>
                </div>
              )}
            </div>

            {/* Side column */}
            <div className="col-side">
              <div className="card" style={{ marginBottom: 20 }}>
                <ModelStatus />
              </div>

              {/* Tips */}
              <div className="card tips-card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, marginBottom: 14, color: "var(--navy-800)" }}>Tips foto yang baik</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0 }}>
                  {tips.map((t, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--navy-800)", alignItems: "flex-start" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--blue-600)", flexShrink: 0, marginTop: 7 }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Riwayat */}
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5 }}>Riwayat pemeriksaan</h3>
                  {history.length > 0 && (
                    <button
                      onClick={() => { setHistory([]); localStorage.removeItem("ektp_history"); }}
                      style={{ fontSize: 12, color: "var(--hint)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Hapus semua
                    </button>
                  )}
                </div>
                {history.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {history.map((h, i) => (
                      <div key={i} className="history-row">
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span className="mono" style={{ fontWeight: 700, color: h.label === "ASLI" ? "var(--sage-dark)" : "var(--rose-dark)", fontSize: 13.5 }}>
                            {h.label}
                          </span>
                          <span style={{ fontSize: 12, color: "var(--muted)" }}>
                            Asli {h.probAsli}% · Palsu {h.probPalsu}%
                          </span>
                        </div>
                        <span className="mono" style={{ fontSize: 11.5, color: "var(--hint)" }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "var(--hint)", margin: 0 }}>Belum ada riwayat pemeriksaan.</p>
                )}
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
