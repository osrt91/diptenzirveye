import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | DiptenZirveye",
    description: "DiptenZirveye gizlilik politikası ve kişisel verilerin korunması hakkında bilgi.",
};

export default function GizlilikPage() {
    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white">
            <Navbar />
            <div className="max-w-3xl mx-auto pt-32 pb-20 px-4">
                <h1 className="font-display text-4xl font-bold mb-8 tracking-tight">Gizlilik Politikası</h1>
                <p className="text-dz-grey-500 text-sm mb-12">Son güncelleme: Şubat 2026</p>

                <div className="space-y-8 text-dz-grey-700 dark:text-dz-grey-400 leading-relaxed">
                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">1. Toplanan Veriler</h2>
                        <p>DiptenZirveye platformuna kayıt olduğunuzda aşağıdaki bilgiler toplanabilir:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Ad, soyad ve e-posta adresi</li>
                            <li>Profil bilgileri ve tercihler</li>
                            <li>Platform kullanım verileri (ilerleme, tamamlanan dersler)</li>
                            <li>Çerez ve oturum bilgileri</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">2. Verilerin Kullanımı</h2>
                        <p>Toplanan veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Kişiselleştirilmiş öğrenme deneyimi sunma</li>
                            <li>Platform performansını iyileştirme</li>
                            <li>Güvenlik ve dolandırıcılık önleme</li>
                            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">3. Veri Güvenliği</h2>
                        <p>Verileriniz endüstri standardı güvenlik protokolleri ile korunmaktadır. SSL şifreleme, güvenli sunucu altyapısı ve düzenli güvenlik denetimleri uygulanmaktadır.</p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">4. Üçüncü Taraflarla Paylaşım</h2>
                        <p>Kişisel verileriniz, yasal zorunluluklar dışında hiçbir üçüncü tarafla paylaşılmaz veya satılmaz.</p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">5. Haklarınız</h2>
                        <p>KVKK kapsamında verilerinize erişim, düzeltme ve silme talebinde bulunabilirsiniz. Talepleriniz için <a href="/iletisim" className="text-dz-orange-500 hover:underline">iletişim sayfamızı</a> kullanabilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-3">6. Dijital Ürün İade Politikası</h2>
                        <p>6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15/g maddesi gereği, anında ifa edilen dijital içerik ve hizmetlerde cayma hakkı bulunmamaktadır.</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Platformumuzda sunulan tüm dijital içerikler (e-kitaplar, eğitim materyalleri, promptlar ve çalışma dokümanları) anında erişime açılan dijital ürünlerdir.</li>
                            <li>Satın alma işlemi tamamlandığında dijital içeriğe erişim anında sağlanır; bu nedenle cayma hakkı kullanılamaz ve iade yapılmaz.</li>
                            <li>Kullanıcı, satın alma işlemini gerçekleştirerek dijital içeriğin anında ifa edilmesine onay verdiğini ve cayma hakkından feragat ettiğini kabul eder.</li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
