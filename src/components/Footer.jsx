export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "35px 24px",
          textAlign: "center",
        }}
      >

        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🪪
          </div>


          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            eKTP
            <span style={{ color: "var(--accent)" }}>
              Checker
            </span>
          </h3>

        </div>


  


        <div
          style={{
            color: "var(--hint)",
            fontSize: 13,
          }}
        >
          Kelompok MMR - 23 TI F
          <br />
          Politeknik Caltex Riau
        </div>


        <div
          style={{
            marginTop: 25,
            paddingTop: 18,
            borderTop: "1px solid var(--border)",
            color: "var(--hint)",
            fontSize: 12,
          }}
        >
          © 2026
        </div>


      </div>
    </footer>
  );
}