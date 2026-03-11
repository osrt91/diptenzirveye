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
        src: "/icons/icon-48.webp",
        sizes: "48x48",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-72.webp",
        sizes: "72x72",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-96.webp",
        sizes: "96x96",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-128.webp",
        sizes: "128x128",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-256.webp",
        sizes: "256x256",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
