const faqs = [
  { q: "Apakah foto saya dikirim ke server?", a: "Tidak sama sekali. Gambar diproses langsung di browser menggunakan TensorFlow.js. Tidak ada data yang meninggalkan perangkatmu." },
  { q: "Seberapa akurat hasilnya?", a: "Akurasi bergantung pada kualitas data training. Gunakan sebagai alat bantu awal, bukan keputusan akhir." },
  { q: "Foto seperti apa yang paling cocok?", a: "Foto langsung dari kamera dengan pencahayaan baik, seluruh bagian eKTP terlihat jelas, tanpa kilas / flash berlebihan." },
  { q: "Bisakah dipakai untuk dokumen lain?", a: "Model ini dilatih khusus untuk eKTP Indonesia. Untuk dokumen lain hasilnya tidak dapat diandalkan." },
];

export default function About() {
  return (
    <div className="page-enter" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700, marginBottom: 6 }}>Tentang eKTPChecker</h1>
        <p style={{ color: "var(--muted)", marginBottom: 40 }}>Cara kerja, teknologi, dan batasan sistem ini.</p>

        {/* Teknologi */}
        <div className="card" style={{ marginBottom: 20, background: "var(--lav-bg)", borderColor: "var(--lavender)" }}>
          <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: 16, color: "var(--lav-dark)" }}>Teknologi yang digunakan</h2>
          {[
            ["MobileNetV2", "Model deep learning ringan yang dilatih ulang (transfer learning) untuk mengenali pola visual eKTP asli vs palsu."],
            ["TensorFlow.js", "Library yang memungkinkan model AI berjalan langsung di browser, tanpa perlu server."],
            ["React + Vite", "Framework frontend modern untuk tampilan yang cepat dan responsif."],
            ["Vercel", "Platform hosting gratis untuk deploy aplikasi web statis."],
          ].map(([nama, desc]) => (
            <div key={nama} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{nama}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Alur kerja */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>Alur analisis</h2>
          {[
            ["1", "var(--rose-bg)", "var(--rose)", "Foto di-load ke browser", "File gambar dibaca langsung di memori browser."],
            ["2", "var(--peach-bg)", "var(--peach)", "Preprocessing", "Gambar di-resize ke 224×224 piksel dan dinormalisasi ke rentang 0–1."],
            ["3", "var(--lav-bg)", "var(--lavender)", "Inferensi model", "MobileNetV2 memproses gambar dan menghasilkan skor probabilitas."],
            ["4", "var(--sage-bg)", "var(--sage)", "Hasil ditampilkan", "Skor dikonversi ke persentase dan ditampilkan sebagai Asli / Palsu."],
          ].map(([num, bg, border, title, desc]) => (
            <div key={num} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", background: bg,
                border: `1.5px solid ${border}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0,
              }}>{num}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 18, fontSize: 16 }}>Pertanyaan umum</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 5 }}>{q}</div>
                <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card" style={{ background: "var(--rose-bg)", borderColor: "var(--rose)" }}>
          <h2 style={{ fontWeight: 700, marginBottom: 10, fontSize: 15, color: "var(--rose-dark)" }}>Disclaimer penting</h2>
          <p style={{ fontSize: 14, color: "var(--rose-dark)", lineHeight: 1.7 }}>
            eKTPChecker adalah alat bantu berbasis AI dan <strong>bukan merupakan keputusan hukum resmi</strong>. Hasil prediksi dapat tidak akurat tergantung kualitas foto dan kondisi eKTP. Untuk verifikasi resmi, hubungi Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) setempat.
          </p>
        </div>
      </div>
    </div>
  );
}