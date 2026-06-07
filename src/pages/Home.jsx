import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: "📎",
    title: "Upload eKTP",
    desc: "Masukkan gambar eKTP yang ingin diperiksa.",
  },
  {
    icon: "🧠",
    title: "AI Memproses",
    desc: "Sistem menganalisis pola gambar dengan AI.",
  },
  {
    icon: "✅",
    title: "Hasil Analisis",
    desc: "Lihat prediksi asli atau palsu.",
  },
];

const features = [
  {
    icon: "🔐",
    title: "Privasi Aman",
    desc: "Gambar tidak disimpan.",
  },
  {
    icon: "⚡",
    title: "Cepat",
    desc: "Hasil dalam hitungan detik.",
  },
  {
    icon: "📱",
    title: "Fleksibel",
    desc: "Bisa dari perangkat apa saja.",
  },
];


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-enter">


      {/* HERO */}
      <section
        style={{
          padding:"80px 24px 70px",
          background:
          "linear-gradient(135deg,var(--bg2),var(--peach-bg))",
          overflow:"hidden",
        }}
      >

        <div
          className="section"
          style={{
            textAlign:"center",
            position:"relative",
          }}
        >

          <div
            style={{
              fontSize:50,
              marginBottom:15,
              animation:"float 3s infinite",
            }}
          >
            🪪
          </div>


          <span
            className="tag"
            style={{
              background:"white",
              border:"1px solid var(--border)",
            }}
          >
            AI Based System
          </span>


          <h1
            style={{
              fontFamily:"var(--serif)",
              fontSize:"clamp(2.2rem,5vw,3.4rem)",
              lineHeight:1.15,
              margin:"20px 0",
            }}
          >
            Cek keaslian eKTP
            <br/>
            <span style={{
              color:"var(--accent)"
            }}>
              lebih mudah
            </span>
          </h1>


          <p
            style={{
              color:"var(--muted)",
              maxWidth:500,
              margin:"auto",
              lineHeight:1.7,
            }}
          >
            Sistem berbasis deep learning yang membantu
            melakukan pemeriksaan awal eKTP melalui gambar.
          </p>


          {/* <button
            className="btn btn-primary"
            onClick={()=>navigate("/cek")}
            style={{
              marginTop:30,
              padding:"14px 32px",
              borderRadius:50,
            }}
          >
            Cek Sekarang
          </button> */}


        </div>

      </section>





      {/* STEPS */}
      <section
        style={{
          padding:"65px 24px",
        }}
      >

        <div className="section">


          <h2
            style={{
              textAlign:"center",
              fontFamily:"var(--serif)",
            }}
          >
            Cara Kerja
          </h2>


          <p
            style={{
              textAlign:"center",
              color:"var(--muted)",
              marginBottom:35,
            }}
          >
            Proses sederhana dengan bantuan AI
          </p>


          <div
            style={{
              display:"grid",
              gridTemplateColumns:
              "repeat(auto-fit,minmax(230px,1fr))",
              gap:25,
            }}
          >

          {steps.map((item,index)=>(
            <div
              key={index}
              style={{
                background:"white",
                border:"1px solid var(--border)",
                borderRadius:28,
                padding:"30px 20px",
                textAlign:"center",
                boxShadow:
                "0 15px 35px rgba(0,0,0,0.06)",
                position:"relative",
              }}
            >

              <div
                style={{
                  position:"absolute",
                  top:15,
                  right:20,
                  fontSize:13,
                  color:"var(--muted)",
                }}
              >
                0{index+1}
              </div>


              <div
                style={{
                  fontSize:42,
                  marginBottom:15,
                }}
              >
                {item.icon}
              </div>


              <h3>{item.title}</h3>

              <p
                style={{
                  color:"var(--muted)",
                  fontSize:14,
                  lineHeight:1.6,
                }}
              >
                {item.desc}
              </p>

            </div>
          ))}

          </div>

        </div>

      </section>





      {/* FEATURES */}
      <section
        style={{
          padding:"60px 24px",
          borderTop:"1px solid var(--border)",
        }}
      >

        <div className="section">

          <h2
            style={{
              textAlign:"center",
              fontFamily:"var(--serif)",
              marginBottom:30,
            }}
          >
            Keunggulan
          </h2>


          <div
            style={{
              display:"grid",
              gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
              gap:18,
            }}
          >

          {features.map((f,i)=>(
            <div
              key={i}
              className="card"
              style={{
                textAlign:"center",
                background:"white",
                border:"1px solid var(--border)",
                borderRadius:24,
                padding:"25px 20px",
                boxShadow:"0 12px 30px rgba(0,0,0,0.05)",
              }}
            >

              <div
                style={{
                  fontSize:32,
                  marginBottom:12,
                }}
              >
                {f.icon}
              </div>


              <h3
                style={{
                  fontSize:16,
                  marginBottom:8,
                }}
              >
                {f.title}
              </h3>


              <p
                style={{
                  color:"var(--muted)",
                  fontSize:13,
                  lineHeight:1.5,
                }}
              >
                {f.desc}
              </p>

            </div>
          ))}

          </div>

        </div>

      </section>


      <style>
      {`
        @keyframes float {
          50% {
            transform:translateY(-8px);
          }
        }
      `}
      </style>

    </div>
  );
}