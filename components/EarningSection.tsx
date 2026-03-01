"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Banknote, PenTool, Settings, TrendingUp, Globe, Bot } from "lucide-react";

const earningPaths = [
  { icon: <Bot className="w-6 h-6" />, title: "Prompt Mühendisliği", range: "₺5.000 – ₺25.000/ay", desc: "Şirketlere özel AI prompt setleri hazırla." },
  { icon: <PenTool className="w-6 h-6" />, title: "AI İçerik Üretimi", range: "₺3.000 – ₺15.000/ay", desc: "Blog, sosyal medya ve video içerikleri otomatize et." },
  { icon: <Settings className="w-6 h-6" />, title: "Otomasyon Danışmanlığı", range: "₺10.000 – ₺50.000/ay", desc: "İşletmelere AI otomasyon sistemleri kur." },
  { icon: <Globe className="w-6 h-6" />, title: "SaaS & Dijital Ürün", range: "₺5.000 – ₺100.000+/ay", desc: "AI destekli dijital ürün veya SaaS platformu oluştur." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Freelance AI Uzmanı", range: "₺8.000 – ₺30.000/ay", desc: "Upwork, Fiverr gibi platformlarda AI hizmetleri sat." },
  { icon: <Banknote className="w-6 h-6" />, title: "Eğitim & Mentorluk", range: "₺4.000 – ₺20.000/ay", desc: "Öğrendiklerini başkalarına öğreterek kazan." },
];

export default function EarningSection() {
  return (
    <section className="px-4 py-20 md:py-28 bg-dz-grey-100 dark:bg-dz-grey-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dz-orange-500/20 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/30 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          >
            <Banknote className="w-4 h-4" /> Gelir Kapıları
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-black text-dz-black dark:text-dz-white mb-6 tracking-tight"
          >
            Öğren. Uygula. <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">Kazan.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed max-w-2xl mx-auto text-lg"
          >
            Kitaplar sadece bilgi vermez; gelir kanallarına giden yolu açar. İşte AI ile kazanabileceğin gerçek dünya gelir modelleri:
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {earningPaths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-dz-white dark:bg-dz-white/[0.03] border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-6 group hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-dz-orange-500/10 dark:bg-dz-orange-500/5 flex items-center justify-center text-dz-orange-500 mb-4 group-hover:bg-dz-orange-500 group-hover:text-white transition-colors">
                {path.icon}
              </div>
              <h3 className="font-display font-bold text-dz-black dark:text-dz-white mb-1">{path.title}</h3>
              <p className="text-dz-orange-500 font-bold text-sm mb-2">{path.range}</p>
              <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400">{path.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/test"
            className="inline-flex items-center gap-2 bg-dz-orange-500 text-white font-bold py-4 px-10 rounded-2xl hover:bg-dz-orange-600 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.03] transform text-lg"
          >
            Hangi Gelir Kapısı Sana Uygun? Teste Başla
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
