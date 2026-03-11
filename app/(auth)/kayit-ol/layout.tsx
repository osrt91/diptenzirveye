import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "DiptenZirveye'ye ücretsiz kayıt ol. 10 kitap, AI koç, gamification ve topluluk ile yapay zeka yolculuğuna başla.",
};

export default function KayitOlLayout({ children }: { children: React.ReactNode }) {
  return children;
}
