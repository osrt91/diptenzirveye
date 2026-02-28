import { Outfit, DM_Sans, DM_Mono } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

export const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});
