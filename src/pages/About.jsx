const team = [
  {
    name: "Thiana",
    image: "👩🏻‍💻",
  },
  {
    name: "Nama Anggota 2",
    image: "👩🏻‍🎨",
  },
  {
    name: "Nama Anggota 3",
    image: "👩🏻‍💻",
  },
];

export default function About() {
  return (
    <div
      className="page-enter"
      style={{
        padding: "55px 24px",
      }}
    >

      <div
        style={{
          maxWidth: 850,
          margin: "0 auto",
        }}
      >

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 35,
          }}
        >
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Tentang Sistem
          </h1>

          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Informasi singkat mengenai project dan tim pengembang eKTPChecker.
          </p>
        </div>



        {/* Project */}
        <div
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: "30px",
            marginBottom: 45,
            boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
          }}
        >

          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            eKTPChecker
          </h2>


          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              lineHeight: 1.8,
              marginBottom: 22,
            }}
          >
            eKTPChecker merupakan aplikasi berbasis Artificial Intelligence
            yang dibuat untuk membantu melakukan pemeriksaan awal keaslian
            e-KTP melalui analisis gambar digital. Sistem ini menggunakan
            teknologi Deep Learning dengan model MobileNetV2 serta React.js
            sebagai antarmuka web.
          </p>


          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {[
              "React.js",
              "TensorFlow.js",
              "MobileNetV2",
              "Deep Learning",
            ].map((item) => (
              <span
                key={item}
                style={{
                  padding: "8px 16px",
                  borderRadius: 50,
                  background: "var(--peach-bg)",
                  border: "1px solid var(--peach)",
                  color: "var(--accent)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            ))}
          </div>

        </div>




        {/* Team */}
        <h2
          style={{
            textAlign: "center",
            fontFamily: "var(--serif)",
            fontSize: "1.6rem",
            marginBottom: 25,
          }}
        >
          Meet Our Team
        </h2>



        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(210px,1fr))",
            gap: 20,
          }}
        >

          {team.map((member, index) => (
            <div
              key={index}
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 22,
                padding: "25px 15px",
                textAlign: "center",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.06)",
                transition: "0.3s",
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.12)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.06)";
              }}
            >

              <div
                style={{
                  width: 90,
                  height: 90,
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#ffdce5,#dcecff)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 48,
                  animation:
                    "float 3s ease-in-out infinite",
                }}
              >
                {member.image}
              </div>


              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {member.name}
              </h3>


              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                }}
              >
                
              </p>

            </div>
          ))}

        </div>

      </div>



      <style>
        {`
          @keyframes float {
            0%,100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-7px);
            }
          }
        `}
      </style>

    </div>
  );
}