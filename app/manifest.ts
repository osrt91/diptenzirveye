import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DiptenZirveye — AI Ustalık Serisi",
    short_name: "DiptenZirveye",
    description:
      "10 kitap. 1 platform. Sıfırdan liderliğe. Yapay zekayı sistematik kullanan kazanır.",
    start_url: "/panel",
    display: "standalone",
    background_color: "#fdfaf7",
    theme_color: "#f97316",
    orientation: "portrait-primary",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
