import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://diptenzirveye.com";

export const metadata: Metadata = {
  title: "İletişim | DiptenZirveye",
  description:
    "DiptenZirveye ile iletişime geçin. Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "İletişim | DiptenZirveye",
    description:
      "DiptenZirveye ile iletişime geçin. Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.",
    url: `${siteUrl}/iletisim`,
    siteName: "DiptenZirveye",
    type: "website",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
