import { ImageResponse } from "next/og";

export const alt = "DiptenZirveye — AI Ustalık Serisi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #2a1a0a 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "linear-gradient(135deg, #f97316, #ea6c00)",
            marginBottom: 40,
            boxShadow: "0 20px 60px rgba(249, 115, 22, 0.3)",
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 900, color: "white" }}>DZ</span>
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            margin: 0,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          DiptenZirveye
        </h1>

        <p
          style={{
            fontSize: 28,
            color: "#f97316",
            fontWeight: 700,
            marginTop: 12,
            marginBottom: 0,
          }}
        >
          AI Ustalık Serisi
        </p>

        <p
          style={{
            fontSize: 22,
            color: "#9a9590",
            marginTop: 20,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          10 kitap. 1 platform. Sıfırdan liderliğe.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["Kitap Oku", "XP Kazan", "Rozet Topla", "Liderlik Tablosu"].map((text) => (
            <span
              key={text}
              style={{
                padding: "8px 20px",
                borderRadius: 12,
                background: "rgba(249, 115, 22, 0.15)",
                color: "#fb923c",
                fontSize: 16,
                fontWeight: 600,
                border: "1px solid rgba(249, 115, 22, 0.2)",
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
