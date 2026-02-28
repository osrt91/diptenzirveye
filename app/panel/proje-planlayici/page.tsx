import type { Metadata } from "next";
import ProjePlanlayici from "@/components/panel/tools/ProjePlanlayici";

export const metadata: Metadata = {
  title: "Proje Planlayıcı | DiptenZirveye",
  description: "Yeni projen veya mevcut projen için akıllı analiz ve öneriler al.",
};

export default function ProjePlanlayiciPage() {
  return <ProjePlanlayici />;
}
