"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa";

type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ahmet K.",
    role: "Yazılım Geliştirici",
    text: "DiptenZirveye benim için bir dönüşüm noktası oldu. AI araçlarını rastgele denemekten kurtulup sistematik bir şekilde öğrenmeye başladım. Artık prompt yazma becerim çok farklı bir yerde.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Zeynep T.",
    role: "İçerik Üreticisi",
    text: "10 kitaplık seriyi takip ederek adım adım ilerledim. XP sistemi ve rozetler motivasyonumu hep yüksek tuttu. Sıralama tablosunda yükselmenin heyecanı başka!",
    rating: 5,
    avatar: "ZT",
  },
  {
    name: "Emre D.",
    role: "Üniversite Öğrencisi",
    text: "Pomodoro ve günlük görev sistemi sayesinde odaklanma sorunumu aştım. Her gün biraz daha ilerlemek ve bunu görebilmek inanılmaz. Toplulukla paylaşım da çok değerli.",
    rating: 4,
    avatar: "ED",
  },
  {
    name: "Elif S.",
    role: "Freelancer",
    text: "AI ile içerik üretimi kitabı hayatımı değiştirdi. Şimdi kendi içerik kanalımı yönetiyorum ve gelir elde ediyorum. Uygulama odaklı yaklaşım gerçekten fark yaratıyor.",
    rating: 5,
    avatar: "ES",
  },
  {
    name: "Burak M.",
    role: "Dijital Pazarlamacı",
    text: "Erteleme sorunu yaşıyordum. Eylem İvmesi Serisi ile 90 günlük programı takip ettim ve hayatım değişti. Artık günlük rutinlerim var ve üretkenliğim 3 katına çıktı.",
    rating: 4,
    avatar: "BM",
  },
  {
    name: "Selin A.",
    role: "Grafik Tasarımcı",
    text: "Midjourney ve Cursor AI sertifikaları özgeçmişimde gerçekten fark yarattı. İş görüşmelerinde bu becerileri gösterince tepkiler inanılmazdı. Artık AI destekli tasarım yapıyorum.",
    rating: 5,
    avatar: "SA",
  },
  {
    name: "Kaan Y.",
    role: "Girişimci",
    text: "Otomasyon Mimari kitabı sayesinde işimi %70 otomatize ettim. Zapier ve AI araçlarıyla kurduğun sistemler sana zaman kazandırıyor. Platform tek başına yatırım.",
    rating: 5,
    avatar: "KY",
  },
  {
    name: "Defne O.",
    role: "Öğretmen",
    text: "Öğrencilerime AI araçları öğretmek için DiptenZirveye'yi kaynak olarak kullanıyorum. Müfredat haritası çok iyi düşünülmüş. Her kitap bir öncekinin üzerine inşa ediyor.",
    rating: 4,
    avatar: "DO",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-dz-amber-400 fill-dz-amber-400" : "text-dz-grey-300 dark:text-dz-grey-700"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/20 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6">
            Kullanıcı Yorumları
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dz-black dark:text-dz-white mb-4">
            Dönüşümünü Başlatanların Hikayeleri
          </h2>
          <p className="text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto">
            <span className="font-display"><span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span></span> ile hayatını değiştiren kullanıcıların gerçek deneyimleri.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-5 hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 transition-all duration-300 hover:shadow-lg group"
            >
              <FaQuoteLeft className="w-5 h-5 text-dz-orange-500/20 mb-3" />

              <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all min-w-0 break-words">
                {t.text}
              </p>

              <Stars count={t.rating} />

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-dz-grey-100 dark:border-dz-grey-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 flex items-center justify-center shadow-sm">
                  <span className="font-display font-bold text-white text-xs">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-dz-black dark:text-dz-white">{t.name}</p>
                  <p className="text-[11px] text-dz-grey-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
