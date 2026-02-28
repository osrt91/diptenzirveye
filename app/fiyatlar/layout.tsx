import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiyatlar | DiptenZirveye — AI Ustalık Serisi",
  description:
    "DiptenZirveye Zirve Masterclass 3 aylık eğitim programı. 10 masterclass kitap, 500+ prompt, AI koçu ve daha fazlası.",
  alternates: {
    canonical: "/fiyatlar",
  },
};

export default function FiyatlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
