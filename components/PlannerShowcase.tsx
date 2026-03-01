"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, CheckCircle2, ArrowRight, Code2, Wrench, BarChart3, FileText } from "lucide-react";

const features = [
  { icon: <Rocket className="w-5 h-5" />, title: "Yeni Proje Başlat", desc: "Sıfırdan plan oluştur, tech stack seç, mimari belirle", accent: "bg-dz-orange-500", num: "01" },
  { icon: <Wrench className="w-5 h-5" />, title: "Mevcut Projeyi Analiz Et", desc: "Sorunları tespit et, çözüm önerileri al", accent: "bg-blue-500", num: "02" },
  { icon: <Code2 className="w-5 h-5" />, title: "KULLAN / KULLANMA Raporu", desc: "Seviyene göre kişiselleştirilmiş araç önerileri", accent: "bg-green-500", num: "03" },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Kontrol Listesi", desc: "Deploy öncesi her adımı kontrol et", accent: "bg-purple-500", num: "04" },
];

const mockSteps = [
  { tag: "01", title: "Senin Seviyen", done: true, active: false },
  { tag: "02", title: "Proje Vizyonu", done: true, active: false },
  { tag: "03", title: "Hedef Kitle", done: true, active: true },
  { tag: "04", title: "Özellikler", done: false, active: false },
  { tag: "05", title: "Tech Stack", done: false, active: false },
  { tag: "06", title: "Zirve Raporu", done: false, active: false },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full rounded-2xl md:rounded-[2rem] border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-background p-4 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] dark:hover:shadow-[0_20px_60px_rgba(249,115,22,0.12)] transition-shadow duration-500"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-dz-grey-200 dark:border-dz-white/10 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="mx-auto text-xs font-mono text-dz-grey-500">proje-planlayici</span>
            </div>

            <div className="flex gap-3 flex-1">
              <div className="w-44 shrink-0 bg-dz-grey-900 dark:bg-dz-grey-900 rounded-xl p-3 flex flex-col justify-between">
                <div className="space-y-0.5">
                  {mockSteps.map((s) => (
                    <div
                      key={s.tag}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all cursor-default ${
                        s.active
                          ? "bg-dz-orange-500/15 text-dz-orange-400 border-l-2 border-dz-orange-500"
                          : s.done
                            ? "text-green-500 hover:bg-dz-grey-800/60"
                            : "text-dz-grey-600 hover:bg-dz-grey-800/40"
                      }`}
                    >
                      <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold shrink-0 ${
                        s.active
                          ? "bg-dz-orange-500 text-white"
                          : s.done
                            ? "bg-green-500/20 text-green-400"
                            : "bg-dz-grey-800 text-dz-grey-500"
                      }`}>
                        {s.done ? "✓" : s.tag}
                      </span>
                      <span className="font-medium truncate">{s.title}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-dz-grey-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] font-mono tracking-widest uppercase text-dz-grey-500">ilerleme</div>
                    <div className="text-[10px] text-dz-orange-500 font-mono font-bold">3/6</div>
                  </div>
                  <div className="h-1.5 bg-dz-grey-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full"
                    />
                  </div>
                  <div className="text-right text-[10px] text-dz-orange-500 font-mono font-bold mt-1.5">50%</div>
                </div>
              </div>

              <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs font-mono text-dz-orange-500 tracking-widest uppercase">Adım 03</div>
                  <div className="h-px flex-1 bg-dz-grey-200 dark:bg-dz-grey-800" />
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold uppercase">Aktif</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-dz-black dark:text-white mb-3">Hedef Kitle</h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["B2C", "B2B", "Dahili", "Geliştirici"].map((t, i) => (
                    <div key={t} className={`px-3 py-2.5 rounded-lg text-xs font-medium text-center transition-all cursor-default ${i === 0 ? "bg-dz-orange-500 text-white shadow-sm shadow-dz-orange-500/30" : "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-500 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700"}`}>
                      {t}
                    </div>
                  ))}
                </div>

                <div className="h-1.5 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden mb-5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full"
                  />
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-mono text-dz-grey-500 tracking-widest uppercase">Tech Stack Önizleme</div>
                    <div className="h-px flex-1 bg-dz-grey-200 dark:bg-dz-grey-800" />
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { label: "Frontend", value: "Next.js 14" },
                      { label: "Backend", value: "Supabase" },
                      { label: "Styling", value: "Tailwind CSS" },
                    ].map((t) => (
                      <div key={t.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-dz-grey-100 dark:bg-dz-grey-800 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700 transition-colors cursor-default">
                        <span className="text-[11px] font-medium text-dz-grey-500">{t.label}</span>
                        <span className="text-[11px] font-bold text-dz-black dark:text-white">{t.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <div className="flex-1 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2.5 text-center hover:bg-green-500/15 transition-colors cursor-default">
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">6</div>
                      <div className="text-[9px] font-mono text-green-600/70 dark:text-green-400/70 uppercase tracking-wide">Kullan</div>
                    </div>
                    <div className="flex-1 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-center hover:bg-red-500/15 transition-colors cursor-default">
                      <div className="text-sm font-bold text-red-500 dark:text-red-400">3</div>
                      <div className="text-[9px] font-mono text-red-500/70 dark:text-red-400/70 uppercase tracking-wide">Kullanma</div>
                    </div>
                    <div className="flex-1 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5 text-center hover:bg-amber-500/15 transition-colors cursor-default">
                      <div className="text-sm font-bold text-amber-600 dark:text-amber-400">1</div>
                      <div className="text-[9px] font-mono text-amber-600/70 dark:text-amber-400/70 uppercase tracking-wide">Dikkat</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-white dark:bg-dz-grey-900/50 p-3 space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[10px] font-mono text-dz-grey-500 tracking-widest uppercase">Zirve Raporu Önizleme</div>
                      <div className="text-[9px] px-1.5 py-0.5 rounded bg-dz-orange-500/10 text-dz-orange-500 font-mono font-bold">PDF</div>
                    </div>
                    {[
                      { tool: "React", verdict: "Kullan", color: "text-green-500", dot: "bg-green-500" },
                      { tool: "jQuery", verdict: "Kullanma", color: "text-red-500", dot: "bg-red-500" },
                      { tool: "TypeScript", verdict: "Kullan", color: "text-green-500", dot: "bg-green-500" },
                      { tool: "Webpack", verdict: "Dikkat", color: "text-amber-500", dot: "bg-amber-500" },
                    ].map((item) => (
                      <div key={item.tool} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-dz-grey-50 dark:bg-dz-grey-800/50 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors cursor-default">
                        <span className="text-[11px] font-medium text-dz-black dark:text-dz-grey-300">{item.tool}</span>
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold ${item.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                          {item.verdict}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="h-full flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dz-grey-50 dark:bg-dz-white/[0.03] border border-dz-grey-200 dark:border-dz-white/10 rounded-xl p-5 pl-6 group hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5 transition-all relative overflow-hidden"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${f.accent} rounded-l-xl`} />
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-dz-orange-500/10 flex items-center justify-center text-dz-orange-500 group-hover:bg-dz-orange-500 group-hover:text-white transition-colors">
                      {f.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-dz-grey-300 dark:text-dz-grey-700">{f.num}</span>
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

            <div className="bg-dz-grey-50 dark:bg-dz-white/[0.03] border border-dz-grey-200 dark:border-dz-white/10 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-dz-black dark:text-dz-white">Proje Analiz Çıktıları</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-lg font-black text-green-600 dark:text-green-400">12</div>
                  <div className="text-[9px] font-mono text-green-600/70 uppercase tracking-wider mt-1">Kullan</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-lg font-black text-red-500 dark:text-red-400">5</div>
                  <div className="text-[9px] font-mono text-red-500/70 uppercase tracking-wider mt-1">Kullanma</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-lg font-black text-amber-600 dark:text-amber-400">3</div>
                  <div className="text-[9px] font-mono text-amber-600/70 uppercase tracking-wider mt-1">Dikkat</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-dz-grey-500">Proje Uyum Skoru</span>
                  <span className="font-bold text-green-500">%87</span>
                </div>
                <div className="h-2 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-dz-grey-600 dark:text-dz-grey-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-dz-orange-500 shrink-0" />
                  AI destekli araç önerileri ve alternatifler
                </div>
                <div className="flex items-center gap-2 text-xs text-dz-grey-600 dark:text-dz-grey-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-dz-orange-500 shrink-0" />
                  Detaylı mimari diyagram ve akış şeması
                </div>
                <div className="flex items-center gap-2 text-xs text-dz-grey-600 dark:text-dz-grey-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-dz-orange-500 shrink-0" />
                  Deploy öncesi güvenlik ve performans raporu
                </div>
                <div className="flex items-center gap-2 text-xs text-dz-grey-600 dark:text-dz-grey-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-dz-orange-500 shrink-0" />
                  Kişiselleştirilmiş öğrenme yolu haritası
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-auto"
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
