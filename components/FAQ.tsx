"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

type FAQItem = { q: string; a: string; category: string };

const categories = [
  { key: "all", label: "Tümü" },
  { key: "genel", label: "Genel" },
  { key: "platform", label: "Platform" },
  { key: "icerik", label: "İçerik" },
  { key: "odeme", label: "Ödeme & Destek" },
];

const faqs: FAQItem[] = [
  {
    q: "DiptenZirveye bana nasıl para kazandıracak?",
    a: "Serideki 10 kitap ve sunduğumuz özel araçlar, teorik bilgiden ziyade pratik yeteneklere odaklanır. Prompt mühendisliği, AI ile içerik üretimi ve otomasyon stratejileriyle kendi işini kurabilir, mevcut işinde yükselip maaşını katlayabilir veya küresel pazarda yüksek ücretli bir Freelancer (serbest çalışan) olabilirsin. Yapay zekayı bir çalışan gibi nasıl yöneteceğini öğreterek sana zaman ve nakit kazandırıyoruz.",
    category: "genel",
  },
  {
    q: "Platformu kullanmak ücretsiz mi?",
    a: "Evet! Kurucu üye olarak kayıt olduğunda giriş modülü (Kitap 1), temel çalışma kağıtları ve AI odaklanma seanslarımız gibi birçok özellikten kalıcı olarak ÜCRETSİZ faydalanırsın. Amacımız senin önce değer görmeni, ardından daha derin beceriler için Premium'a geçmek istemeni sağlamaktır.",
    category: "genel",
  },
  {
    q: "Kitapların içeriğinde sadece ChatGPT mi var?",
    a: "Hayır. Midjourney ile profesyonel görsel üretimi, Claude ile yaratıcı yazarlık, Cursor/Vertex AI gibi araçlarla kodlama ve entegrasyon gibi güncel endüstri standartlarını öğreniyorsun. Serimiz, sıfırdan uzman bir AI liderine dönüşmeni sağlayacak en güncel yol haritasıdır.",
    category: "icerik",
  },
  {
    q: "XP, Rozetler ve Seviye sistemi ne işe yarıyor?",
    a: "Sadece okumanı değil, pratik yapmanı istiyoruz. Kitapları tamamladıkça, Zihin Motoru (odak) seansları yaptıkça XP ve rozetler kazanırsın. Üst seviyelere çıkarak özel çekilişlere katılma, sürpriz Premium içeriklere erişme ve gizli discord yetkileri kazanma şansı yakalarsın.",
    category: "platform",
  },
  {
    q: "Yapay zeka asistanı testlerde nasıl yardımcı oluyor?",
    a: "Modül sonu testlerinde sadece doğru/yanlış demez; nerede hata yaptığını, eksiklerini Vertex AI destekli koçumuz analiz eder. Gelişimini hızlandırmak için sana özel çalışma kağıtları hazırlar.",
    category: "platform",
  },
  {
    q: "DiptenZirveye Sertifikası özgeçmişimde (CV) işe yarar mı?",
    a: "Kesinlikle. İş gücü piyasasında en çok aranan beceri 'AI Araçlarını Etkili Kullanmak'tır. Kazanacağın dijital sertifika, LinkedIn ve CV'nde seni rakiplerinin doğrudan önüne taşıyacak, işverenlere senin geleceğe hazır bir 'AI Lideri' olduğunu kanıtlayacaktır.",
    category: "genel",
  },
  {
    q: "İçerikler güncelleniyor mu? Bir kez alınca eski mi kalacak?",
    a: "AI sürekli değişiyor, öğrenme materyalleriniz de öyle. DiptenZirveye 'Sürekli Güncellenen Kaynak' garantisi sunar. Yeni AI araçları çıktığında, mevcut prompt kütüphaneleri genişletildiğinde, tüm güncellemeleri abonelik süresince ücretsiz olarak alırsın.",
    category: "icerik",
  },
  {
    q: "Gerçekten AI ile gelir elde edebilir miyim?",
    a: "Evet, 100 farklı yeni nesil gelir kapısını kitaplarda detaylandırıyoruz. Freelance prompt mühendisliği, AI destekli içerik üretimi, otomasyon danışmanlığı, SaaS ürün geliştirme gibi kanıtlanmış modeller. Teorik değil, adım adım uygulanabilir stratejiler sunuyoruz.",
    category: "genel",
  },
  {
    q: "Erteleme sorunu yaşıyorum, bu platform bana yardımcı olabilir mi?",
    a: "Kesinlikle! Eylem İvmesi Serisi tamamen erteleme alışkanlığı üzerine tasarlandı. 90 günlük adım adım program, Pomodoro sayacı, günlük görev takibi ve AI destekli motivasyon koçu ile erteleme döngüsünü kırmanın bilimsel yollarını öğreneceksin.",
    category: "platform",
  },
  {
    q: "Mobil cihazdan kullanabilir miyim?",
    a: "Evet! DiptenZirveye tam anlamıyla mobil uyumlu bir PWA (Progressive Web App) olarak çalışıyor. Telefonunun tarayıcısından ana ekrana ekleyerek uygulama gibi kullanabilir, çevrimdışı bile erişebilirsin.",
    category: "platform",
  },
  {
    q: "Topluluk nasıl çalışıyor? Diğer kullanıcılarla iletişim kurabilir miyim?",
    a: "Sohbet bölümümüzde anonim prompt paylaşımı yapabilir, diğer kullanıcıların paylaşımlarını Prompt Hub'a kaydedebilirsin. Liderlik tablosunda diğer kullanıcılarla rekabet edebilir, rozetler kazanarak topluluktaki seviyeni yükseltebilirsin.",
    category: "platform",
  },
  {
    q: "Kitapların içeriği hangi dilde?",
    a: "Tüm içerikler Türkçe olarak hazırlanmıştır. Teknik terimler İngilizcesiyle birlikte açıklanır, böylece hem Türkçe hem de global terminolojiye hakim olursun.",
    category: "icerik",
  },
  {
    q: "Ödeme yöntemleri nelerdir?",
    a: "PayTR altyapısı ile kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsin. Tüm ödemelerin SSL ile şifrelenmiş güvenli altyapıda gerçekleşir. İlk 7 gün koşulsuz iade garantisi vardır.",
    category: "odeme",
  },
  {
    q: "Ders içerikleri ne sıklıkla güncelleniyor?",
    a: "AI dünyası hızla değişiyor ve biz de onunla birlikte ilerliyoruz. Her ay yeni prompt şablonları, araç incelemeleri ve strateji güncellemeleri ekliyoruz. Premium üyelerin abonelik süresince tüm güncellemelere tam erişimi vardır.",
    category: "icerik",
  },
  {
    q: "Destek almak için nasıl iletişime geçebilirim?",
    a: "İletişim sayfamızdan bize yazabilir veya destek@diptenzirveye.com adresine e-posta gönderebilirsin. Mesajlarına en geç 24 saat içinde dönüş yapıyoruz. Acil konular için konu başlığına [ACIL] yazabilirsin.",
    category: "odeme",
  },
  {
    q: "Üyeliğimi iptal edebilir miyim?",
    a: "Elbette. Eğer giriş paketini kullanıyorsan zaten ücretsizdir. Premium paketimiz 3 aylık kapsamlı eğitim aboneliğidir. İlk 7 gün koşulsuz iade hakkın mevcuttur, 3 aylık süre boyunca tüm içeriklere tam erişim sağlanır.",
    category: "odeme",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  const mid = Math.ceil(filtered.length / 2);
  const leftColumn = filtered.slice(0, mid);
  const rightColumn = filtered.slice(mid);

  return (
    <section id="sss" className="px-4 py-16 md:py-24 bg-dz-grey-100 dark:bg-dz-grey-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dz-orange-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dz-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/20 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6">
            <HelpCircle className="w-4 h-4" /> SSS
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dz-black dark:text-dz-white mb-4">
            Sık Sorulan Sorular
          </h2>
          <p className="text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto">
            Merak ettiğin her şeyin cevabı burada. Bulamadıysan bize yaz.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setOpenIdx(null); }}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-dz-orange-500 text-white shadow-lg shadow-dz-orange-500/20"
                  : "bg-dz-white dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 border border-dz-grey-200 dark:border-dz-grey-700 hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {[leftColumn, rightColumn].map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {column.map((faq) => {
                const realIdx = faqs.indexOf(faq);
                const isOpen = openIdx === realIdx;
                return (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.03 * column.indexOf(faq) }}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-dz-orange-500/40 bg-dz-white dark:bg-dz-grey-900 shadow-lg shadow-dz-orange-500/5"
                        : "border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-800 hover:border-dz-grey-300 dark:hover:border-dz-grey-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : realIdx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left group"
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isOpen
                          ? "bg-dz-orange-500 text-white"
                          : "bg-dz-grey-100 dark:bg-dz-grey-700 text-dz-grey-500 dark:text-dz-grey-400 group-hover:bg-dz-orange-500/10 group-hover:text-dz-orange-500"
                      }`}>
                        {String(realIdx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display font-semibold text-dz-black dark:text-dz-white flex-1 pr-2 text-[15px]">
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-5 h-5 shrink-0 text-dz-grey-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-dz-orange-500" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pl-16">
                            <div className="w-8 h-px bg-dz-orange-500/30 mb-3" />
                            <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400">
            Başka soruların mı var?{" "}
            <a href="/iletisim" className="text-dz-orange-500 font-bold hover:underline">
              Bize yaz
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
