"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Kayıt ol ve profil oluştur",
    desc: "Kısa kayıt formunu doldur, AI ustalık yolculuğuna ilk adımını at. Senin için kişiselleştirilmiş bir plan hazırlayalım.",
  },
  {
    step: "02",
    title: "Kitapları oku, uygulamaya dök",
    desc: "10 kitaplık seriyi kendi hızında oku. Her bölümde öğrendiklerini hemen uygulayacağın görevler ve projeler seni bekliyor.",
  },
  {
    step: "03",
    title: "İlerlemeni takip et ve zirveye çık",
    desc: "XP kazan, rozetler topla, liderlik tablosunda yüksel. Toplulukla birlikte öğren ve başarılarını paylaş.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-dz-black dark:text-dz-white text-center mb-4"
        >
          Nasıl çalışıyor?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-dz-grey-600 dark:text-dz-grey-400 mb-12"
        >
          AI ustalığına giden yol üç basit adımla başlar.
        </motion.p>
        <div className="relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-dz-orange-500/40 via-dz-amber-400/40 to-dz-orange-500/40" />
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center font-display text-xl font-bold text-white shadow-lg shadow-dz-orange-500/20 relative z-10"
                style={{
                  background: "linear-gradient(135deg, var(--dz-orange-500), var(--dz-amber-400))",
                }}
              >
                {s.step}
              </div>
              <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
