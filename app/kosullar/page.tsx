import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Kullanım Koşulları | DiptenZirveye",
    description: "DiptenZirveye platformu kullanım koşulları ve şartları.",
};

export default function KosullarPage() {
    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white">
            <Navbar />
            <div className="max-w-3xl mx-auto pt-32 pb-20 px-4">
                <h1 className="font-display text-4xl font-bold mb-8 tracking-tight">Kullanım Koşulları</h1>
                <p className="text-dz-grey-500 text-sm mb-12">Son güncelleme: Şubat 2026</p>

                <div className="space-y-8 text-dz-grey-700 dark:text-dz-grey-400 leading-relaxed">
                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">1. Genel Koşullar</h2>
                        <p>DiptenZirveye platformuna erişerek ve kullanarak bu kullanım koşullarını kabul etmiş sayılırsınız. Platform, kişisel gelişim ve yapay zeka eğitimi amaçlı tasarlanmıştır.</p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">2. Üyelik ve Hesap</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Kayıt sırasında doğru bilgi vermekle yükümlüsünüz</li>
                            <li>Hesap güvenliğinizden siz sorumlusunuz</li>
                            <li>18 yaşından küçükler veli izniyle kayıt olabilir</li>
                            <li>Hesabınız devredilemez</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">3. İçerik ve Fikri Mülkiyet</h2>
                        <p>Platformdaki tüm içerikler (kitaplar, promptlar, çalışma materyalleri) DiptenZirveye&apos;nin fikri mülkiyetidir. İçeriklerin izinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.</p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">4. Ödeme ve İade</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Ücretli içerikler için online ödeme sistemi kullanılır</li>
                            <li>Fiyatlar önceden haber verilmeden değiştirilebilir</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">5. Dijital Ürün İade Politikası</h2>
                        <p>6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15/g maddesi gereği, anında ifa edilen dijital içerik ve hizmetlerde cayma hakkı bulunmamaktadır.</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Platformumuzda sunulan tüm dijital içerikler (e-kitaplar, eğitim materyalleri, promptlar ve çalışma dokümanları) anında erişime açılan dijital ürünlerdir.</li>
                            <li>Satın alma işlemi tamamlandığında dijital içeriğe erişim anında sağlanır; bu nedenle cayma hakkı kullanılamaz ve iade yapılmaz.</li>
                            <li>Kullanıcı, satın alma işlemini gerçekleştirerek dijital içeriğin anında ifa edilmesine onay verdiğini ve cayma hakkından feragat ettiğini kabul eder.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">6. Sorumluluk Sınırı</h2>
                        <p>Platform &quot;olduğu gibi&quot; sunulur. Belirli bir sonuç garantisi verilmez. Kullanıcının platformu kullanarak elde ettiği sonuçlardan DiptenZirveye sorumlu tutulamaz.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
