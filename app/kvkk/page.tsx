import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | DiptenZirveye",
    description: "DiptenZirveye KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
};

export default function KVKKPage() {
    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white">
            <Navbar />
            <div className="max-w-3xl mx-auto pt-32 pb-20 px-4">
                <h1 className="font-display text-4xl font-bold mb-8 tracking-tight">KVKK Aydınlatma Metni</h1>
                <p className="text-dz-grey-500 text-sm mb-12">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>

                <div className="space-y-8 text-dz-grey-700 dark:text-dz-grey-400 leading-relaxed">
                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">Veri Sorumlusu</h2>
                        <p>DiptenZirveye platformu olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi işlemekteyiz.</p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">İşlenen Kişisel Veriler</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm mt-3">
                                <thead>
                                    <tr className="border-b border-dz-grey-200 dark:border-dz-grey-300">
                                        <th className="text-left py-3 pr-4 font-bold text-dz-black dark:text-dz-white">Veri Kategorisi</th>
                                        <th className="text-left py-3 font-bold text-dz-black dark:text-dz-white">Örnek Veriler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dz-grey-200 dark:divide-dz-grey-300">
                                    <tr><td className="py-3 pr-4">Kimlik Bilgileri</td><td className="py-3">Ad, soyad</td></tr>
                                    <tr><td className="py-3 pr-4">İletişim Bilgileri</td><td className="py-3">E-posta adresi</td></tr>
                                    <tr><td className="py-3 pr-4">Kullanım Verileri</td><td className="py-3">İlerleme, XP, rozet</td></tr>
                                    <tr><td className="py-3 pr-4">İşlem Güvenliği</td><td className="py-3">Oturum bilgileri, IP adresi</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">İşleme Amaçları</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Eğitim hizmetlerinin sunulması ve kişiselleştirilmesi</li>
                            <li>Kullanıcı deneyiminin geliştirilmesi</li>
                            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                            <li>Bilgi güvenliği süreçlerinin yürütülmesi</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">Haklarınız (KVKK m.11)</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                            <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                            <li>Aktarıldığı üçüncü kişileri bilme</li>
                            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                            <li>KVKK m.7 kapsamında silinmesini veya yok edilmesini isteme</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">Başvuru</h2>
                        <p>Haklarınızı kullanmak için <a href="/iletisim" className="text-dz-orange-500 hover:underline">iletişim sayfamız</a> üzerinden bize ulaşabilirsiniz.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
