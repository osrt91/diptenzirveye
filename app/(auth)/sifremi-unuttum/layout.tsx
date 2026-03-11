import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
  description: "DiptenZirveye hesap şifreni sıfırla. E-posta adresine şifre sıfırlama bağlantısı gönderilecek.",
};

export default function SifremiUnuttumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
