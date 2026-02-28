import Link from "next/link";
import Navbar from "@/components/Navbar";
import PanelPreview from "@/components/PanelPreview";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Akademi Önizleme | DiptenZirveye",
  description: "DiptenZirveye panel arayüzünü keşfedin. Giriş yaparak kitaplara, çalışma kağıtlarına ve daha fazlasına erişin.",
};

export default function PanelOnizlemePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PanelPreview />
      <section className="px-4 py-12 text-center border-t border-dz-grey-200 dark:border-dz-grey-800">
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mb-4">
          Akademiye giriş yaparak tüm özelliklere erişebilirsin.
        </p>
        <Link
          href="/giris"
          className="inline-flex items-center justify-center gap-2 bg-dz-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-dz-orange-600 transition-colors shadow-lg shadow-dz-orange-500/20"
        >
          Giriş Yap
        </Link>
      </section>
      <Footer />
    </main>
  );
}
