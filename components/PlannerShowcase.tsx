"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, CheckCircle2, ArrowRight, Code2, Wrench, BarChart3, FileText } from "lucide-react";

const features = [
  { icon: <Rocket className="w-5 h-5" />, title: "Yeni Proje Başlat", desc: "Sıfırdan plan oluştur, tech stack seç, mimari belirle" },
  { icon: <Wrench className="w-5 h-5" />, title: "Mevcut Projeyi Analiz Et", desc: "Sorunları tespit et, çözüm önerileri al" },
  { icon: <Code2 className="w-5 h-5" />, title: "KULLAN / KULLANMA Raporu", desc: "Seviyene göre kişiselleştirilmiş araç önerileri" },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Kontrol Listesi", desc: "Deploy öncesi her adımı kontrol et" },
];

const mockSteps = [
  { tag: "01", title: "Senin Seviyen", done: true },
  { tag: "02", title: "Proje Vizyonu", done: true },
  { tag: "03", title: "Hedef Kitle", done: true },
  { tag: "04", title: "Özellikler", done: false },
  { tag: "05", title: "Tech Stack", done: false },
  { tag: "06", title: "Zirve Raporu", done: false },
];

export default function PlannerShowcase() {
  return (
    <section className="px-4 py-24 md:py-32 bg-dz-white dark:bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dz-orange-500/20 to-transparent" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/20 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6"
          >
            <FileText className="w-4 h-4" /> Akıllı Araçlar
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dz-black dark:text-dz-white mb-6 tracking-tight uppercase"
          >
            PROJE <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">PLANLAYICI</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto text-lg/relaxed"
          >
            Yeni bir yazılım projesine mi başlıyorsun? Mevcut projende mi tıkandın? Seviyene göre kişiselleştirilmiş &quot;KULLAN / KULLANMA&quot; raporu al.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl md:rounded-[2rem] border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-background p-4 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-dz-grey-200 dark:border-dz-white/10 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="mx-auto text-xs font-mono text-dz-grey-500">proje-planlayici</span>
            </div>

            <div className="flex gap-3">
              <div className="w-40 shrink-0 bg-dz-grey-900 dark:bg-dz-grey-900 rounded-xl p-3 space-y-1">
                {mockSteps.map((s) => (
                  <div key={s.tag} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${s.done ? "text-green-500" : "text-dz-grey-500"}`}>
                    <span className="font-mono text-[10px] font-bold w-4">{s.done ? "✓" : s.tag}</span>
                    <span className="font-medium">{s.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 p-4">
                <div className="text-xs font-mono text-dz-orange-500 tracking-widest uppercase mb-2">Adım 03</div>
                <h3 className="font-display font-bold text-lg text-dz-black dark:text-white mb-3">Hedef Kitle</h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["B2C", "B2B", "Dahili", "Geliştirici"].map((t, i) => (
                    <div key={t} className={`px-3 py-2 rounded-lg text-xs font-medium text-center ${i === 0 ? "bg-dz-orange-500 text-white" : "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-500"}`}>
                      {t}
                    </div>
                  ))}
                </div>

                <div className="h-1 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 w-[50%] rounded-full" />
                </div>
                <div className="text-right text-[10px] text-dz-orange-500 font-mono font-bold mt-1">50%</div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dz-grey-50 dark:bg-dz-white/[0.03] border border-dz-grey-200 dark:border-dz-white/10 rounded-xl p-5 group hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-dz-orange-500/10 flex items-center justify-center text-dz-orange-500 mb-3 group-hover:bg-dz-orange-500 group-hover:text-white transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-sm text-dz-black dark:text-dz-white mb-1">{f.title}</h3>
                  <p className="text-xs text-dz-grey-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-dz-orange-500/5 border border-dz-orange-500/20 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-dz-grey-600 dark:text-dz-grey-400">Seviyene uygun tech stack önerileri</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-dz-grey-600 dark:text-dz-grey-400">14 farklı mevcut proje sorunu analizi</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-dz-grey-600 dark:text-dz-grey-400">Mimari, deploy ve güvenlik kontrol listesi</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/kayit-ol"
                className="group w-full flex items-center justify-center gap-3 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all shadow-lg shadow-dz-orange-500/20"
              >
                Planlayıcıyı Kullan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
