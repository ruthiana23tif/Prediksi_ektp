import { useNavigate } from "react-router-dom";

const steps = [
  { color: "var(--rose-bg)", border: "var(--rose)", icon: "📎", title: "Upload foto eKTP", desc: "Seret atau pilih foto eKTP yang ingin diperiksa keasliannya." },
  { color: "var(--lav-bg)", border: "var(--lavender)", icon: "🔍", title: "AI menganalisis", desc: "Model MobileNetV2 memindai pola visual eKTP secara otomatis." },
  { color: "var(--sage-bg)", border: "var(--sage)", icon: "✅", title: "Lihat hasilnya", desc: "Dapatkan hasil Asli atau Palsu beserta tingkat kepercayaan." },
];

const features = [
  { bg: "var(--blue-bg)", border: "var(--blue)", icon: "🔒", title: "Privasi terjaga", desc: "Gambar diproses langsung di browsermu, tidak dikirim ke server manapun." },
  { bg: "var(--peach-bg)", border: "var(--peach)", icon: "⚡", title: "Cepat & gratis", desc: "Tidak perlu daftar akun. Hasil analisis dalam hitungan detik." },
  { bg: "var(--lav-bg)", border: "var(--lavender)", icon: "📱", title: "Ramah mobile", desc: "Bisa dipakai dari HP maupun laptop, tampilan menyesuaikan otomatis." },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "72px 24px 64px" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <span className="tag" style={{ background: "var(--rose-bg)", color: "var(--rose-dark)", border: "1px solid var(--rose)", marginBottom: 20, display: "inline-block" }}>
            Berbasis Deep Learning
          </span>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 18, letterSpacing: "-0.02em" }}>
            Periksa keaslian eKTP<br />
            <span style={{ color: "var(--accent)" }}>hanya dalam satu klik</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Upload foto eKTP dan biarkan AI mendeteksi apakah dokumen tersebut asli atau palsu. Cepat, gratis, dan privasi terjaga.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => navigate("/cek")} style={{ fontSize: 15, padding: "13px 28px" }}>
              Mulai Periksa eKTP
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/tentang")}>
              Pelajari cara kerja
            </button>
          </div>
        </div>
      </div>

      {/* Cara kerja */}
      <div style={{ padding: "64px 24px" }}>
        <div className="section">
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Cara kerja</h2>
          <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: 40 }}>Tiga langkah mudah, tidak perlu keahlian teknis</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: "var(--radius)", padding: "28px 24px" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--hint)", letterSpacing: "0.1em", marginBottom: 6 }}>LANGKAH {i + 1}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{s.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fitur */}
      <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "64px 24px" }}>
        <div className="section">
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Mengapa eKTPChecker?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA bawah */}
      <div style={{ padding: "64px 24px", textAlign: "center" }}>
        <div className="section">
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>Siap memeriksa eKTP?</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Tidak perlu daftar. Langsung pakai, sepenuhnya gratis.</p>
          <button className="btn btn-primary" onClick={() => navigate("/cek")} style={{ fontSize: 15, padding: "13px 28px" }}>
            Cek eKTP Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}