import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-posta Onayı Bekleniyor",
  robots: { index: false, follow: false },
};

export default function OnayBekliyorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
