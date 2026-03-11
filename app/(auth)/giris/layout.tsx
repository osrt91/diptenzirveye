import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "DiptenZirveye hesabına giriş yap. AI Ustalık Serisi platformuna erişmek için e-posta ve şifrenle giriş yap.",
};

export default function GirisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
