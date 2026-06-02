import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        background: "#fff",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 24px 32px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 40,
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                margin: 0,
                marginBottom: 12,
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              eKTPChecker
            </h3>

            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: 340,
                fontSize: 14,
              }}
            >
              Sistem prediksi keaslian e-KTP berbasis machine learning untuk
              membantu proses identifikasi awal dokumen secara cepat dan mudah.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4
              style={{
                marginTop: 0,
                marginBottom: 14,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Navigasi
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Link
                to="/"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                Beranda
              </Link>

              <Link
                to="/check"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                Prediksi
              </Link>

              <Link
                to="/tentang"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                Tentang
              </Link>
            </div>
          </div>

          {/* Informasi */}
          <div>
            <h4
              style={{
                marginTop: 0,
                marginBottom: 14,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Informasi
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                color: "var(--muted)",
                fontSize: 14,
              }}
            >
              <span>Kelompok MMR</span>
              <span>D4 Teknik Informatika</span>
              <span>Politeknik Caltex Riau</span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            color: "var(--hint)",
            fontSize: 13,
          }}
        >
          <span>© 2026 eKTPChecker</span>
          <span>Dikembangkan oleh Kelompok MMR · Politeknik Caltex Riau</span>
        </div>
      </div>
    </footer>
  );
}