import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";

export const metadata: Metadata = {
  title: "Fiyatlar | DiptenZirveye — AI Ustalık Serisi",
  description:
    "DiptenZirveye Zirve Masterclass 3 aylık eğitim programı. 10 masterclass kitap, 500+ prompt, AI koçu ve daha fazlası.",
  alternates: {
    canonical: "/fiyatlar",
  },
  openGraph: {
    title: "Fiyatlar | DiptenZirveye — AI Ustalık Serisi",
    description:
      "DiptenZirveye Zirve Masterclass 3 aylık eğitim programı. 10 masterclass kitap, 500+ prompt, AI koçu ve daha fazlası.",
    url: `${siteUrl}/fiyatlar`,
    siteName: "DiptenZirveye",
    type: "website",
  },
};

export default function FiyatlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
