export default function About() {
  return (
    <div className="page-enter" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Tentang Sistem
        </h1>

        <p style={{ color: "var(--muted)", marginBottom: 40 }}>
          Informasi mengenai tujuan, cara penggunaan, serta batasan sistem
          prediksi keaslian e-KTP.
        </p>

        {/* Deskripsi */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>
            Apa itu eKTPChecker?
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.8,
            }}
          >
            eKTPChecker merupakan aplikasi berbasis web yang dirancang untuk
            membantu melakukan identifikasi awal terhadap keaslian kartu e-KTP
            melalui analisis gambar. Sistem akan memproses foto e-KTP yang
            diunggah pengguna dan menampilkan hasil prediksi berdasarkan pola
            yang telah dipelajari oleh model kecerdasan buatan.
          </p>
        </div>

        {/* Tujuan */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>
            Tujuan Pengembangan
          </h2>

          <ul
            style={{
              paddingLeft: 20,
              color: "var(--muted)",
              lineHeight: 2,
              fontSize: 14,
            }}
          >
            <li>Membantu proses pemeriksaan awal dokumen e-KTP.</li>
            <li>Memberikan hasil analisis secara cepat dan mudah diakses.</li>
            <li>
              Menerapkan teknologi kecerdasan buatan pada pengolahan citra
              digital.
            </li>
            <li>
              Menjadi media pembelajaran mengenai pemanfaatan machine learning
              dalam verifikasi dokumen.
            </li>
          </ul>
        </div>

        {/* Cara penggunaan */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>
            Cara Penggunaan
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "Unggah foto e-KTP yang ingin diperiksa.",
              "Pastikan gambar terlihat jelas dan tidak buram.",
              "Tunggu proses analisis berlangsung.",
              "Lihat hasil prediksi yang ditampilkan sistem.",
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--lav-bg)",
                    border: "1px solid var(--lavender)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                  }}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manfaat */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>
            Manfaat Sistem
          </h2>

          <ul
            style={{
              paddingLeft: 20,
              color: "var(--muted)",
              lineHeight: 2,
              fontSize: 14,
            }}
          >
            <li>Membantu pengguna melakukan pengecekan awal e-KTP.</li>
            <li>Menghemat waktu pemeriksaan secara manual.</li>
            <li>
              Menyediakan akses mudah melalui browser tanpa instalasi tambahan.
            </li>
            <li>
              Memberikan contoh penerapan kecerdasan buatan dalam kehidupan
              sehari-hari.
            </li>
          </ul>
        </div>

        {/* Batasan */}
        <div
          className="card"
          style={{
            background: "var(--rose-bg)",
            borderColor: "var(--rose)",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              marginBottom: 10,
              fontSize: 15,
              color: "var(--rose-dark)",
            }}
          >
            Batasan Sistem
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "var(--rose-dark)",
              lineHeight: 1.8,
            }}
          >
            Hasil yang diberikan merupakan prediksi berdasarkan model yang telah
            dilatih menggunakan dataset tertentu. Tingkat akurasi dapat
            dipengaruhi oleh kualitas gambar, pencahayaan, sudut pengambilan
            foto, serta kondisi fisik e-KTP. Oleh karena itu, hasil prediksi
            tidak dapat dijadikan dasar keputusan hukum maupun administrasi
            resmi dan hanya digunakan sebagai informasi pendukung.
          </p>
        </div>
      </div>
    </div>
  );
}