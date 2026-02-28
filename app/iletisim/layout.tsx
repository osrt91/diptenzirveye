import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | DiptenZirveye",
  description:
    "DiptenZirveye ile iletişime geçin. Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.",
  alternates: {
    canonical: "/iletisim",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
