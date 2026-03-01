"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Bot, Filter, Hourglass, Banknote, PenTool, Settings, TrendingUp, Crown, Globe, Lock, FileText, Target, Zap } from "lucide-react";

type BookStep = { n: string; verb: string; title: string; desc: string; icon: any; color: string; free?: boolean; pages: string; prompts: string; cover: string };

const books: BookStep[] = [
  { n: "01", verb: "Anlarsın", title: "AI Devrimini Anlamak", desc: "Yapay zekanın temellerini ve dünyayı nasıl değiştirdiğini kavramak.", icon: <Brain />, color: "from-dz-orange-600 to-dz-orange-900", free: true, pages: "85 Sayfa", prompts: "15+ Prompt", cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" },
  { n: "02", verb: "Konuşursun", title: "Prompt Mühendisliği", desc: "AI ile doğru iletişim kurma sanatını ustalıkla öğrenmek.", icon: <Bot />, color: "from-dz-grey-600 dark:from-dz-grey-800 to-dz-grey-800 dark:to-dz-black", pages: "110 Sayfa", prompts: "40+ Prompt", cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop" },
  { n: "03", verb: "Seçersin", title: "AI Araçları Rehberi", desc: "Binlerce araç arasından sana en uygun olanları filtrelemek.", icon: <Filter />, color: "from-dz-orange-600 to-dz-orange-800", pages: "95 Sayfa", prompts: "Özel Araç Listesi", cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
  { n: "04", verb: "Odaklanırsın", title: "Eylem İvmesi Serisi", desc: "Dikkat dağıtıcıları yenip derin çalışma (deep work) moduna geçmek.", icon: <Hourglass />, color: "from-dz-grey-700 dark:from-dz-grey-900 to-dz-grey-900 dark:to-dz-black", pages: "105 Sayfa", prompts: "20+ Prompt", cover: "https://images.unsplash.com/photo-1506784693919-ef06d93c28d2?q=80&w=600&auto=format&fit=crop" },
  { n: "05", verb: "Kazanırsın", title: "AI ile İlk Gelirim", desc: "Öğrendiklerini paraya çevirmenin en pratik ve hızlı yolları.", icon: <Banknote />, color: "from-dz-orange-500/80 to-dz-orange-800", pages: "130 Sayfa", prompts: "50+ Prompt", cover: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=600&auto=format&fit=crop" },
  { n: "06", verb: "Üretirsin", title: "İçerik İmparatorluğu", desc: "Durmadan, yorulmadan kaliteli dijital varlıklar üretmek.", icon: <PenTool />, color: "from-dz-grey-600 dark:from-dz-grey-800 to-dz-grey-800 dark:to-dz-black", pages: "90 Sayfa", prompts: "75+ Prompt", cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop" },
  { n: "07", verb: "Otomatize edersin", title: "Otomasyon Mimarı", desc: "Sen uyurken senin için çalışan sistemler inşa etmek.", icon: <Settings />, color: "from-dz-orange-600 to-dz-orange-900", pages: "100 Sayfa", prompts: "30+ Workflow", cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" },
  { n: "08", verb: "Ölçeklersin", title: "AI ile Ölçek", desc: "Küçük başarıları devasa sistemlere dönüştürmek.", icon: <TrendingUp />, color: "from-dz-grey-600 dark:from-dz-grey-800 to-dz-grey-800 dark:to-dz-black", pages: "100 Sayfa", prompts: "45+ Prompt", cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" },
  { n: "09", verb: "Liderlik edersin", title: "AI Liderliği", desc: "Kendi alanında AI destekli otorite konumuna yükselmek.", icon: <Crown />, color: "from-dz-orange-500/80 to-dz-orange-800", pages: "90 Sayfa", prompts: "Vizyon & Strateji", cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" },
  { n: "10", verb: "Çağı yönetirsin", title: "AI Çağının Mimarı", desc: "Artık bir tüketici değil, geleceği inşa eden bir üreticisin.", icon: <Globe />, color: "from-dz-grey-700 dark:from-dz-grey-900 to-dz-grey-900 dark:to-dz-black", pages: "110 Sayfa", prompts: "Master Framework", cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" },
];

export default function BookRoadmap() {
  return (
    <section className="py-24 md:py-32 bg-dz-white dark:bg-dz-black relative">

      {/* Background Deep Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-dz-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-100 dark:bg-dz-white/5 text-dz-grey-600 dark:text-dz-grey-300 text-sm font-medium tracking-wide uppercase mb-6 backdrop-blur-md"
          >
            Müfredat Haritası
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dz-black dark:text-dz-white mb-6 tracking-tight uppercase"
          >
            10 KİTAPLIK <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">EKOSİSTEM</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto text-lg/relaxed"
          >
            Senin için tasarlanmış 10 özgün masterclass. İlk kitap tamamen ücretsiz — dene, içerikleri keşfet, kendini test et. Sonrasında tüm premium kilitleri aç.
          </motion.p>
        </div>
      </div>

      {/* Centered Grid Layout */}
      <div className="relative z-10 max-w-[100rem] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {books.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative group"
            >
              {/* Free or Premium Badge */}
              {b.free ? (
                <div className="absolute -top-3 left-4 z-20 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                  Ücretsiz Önizle
                </div>
              ) : (
                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-dz-black dark:bg-dz-white/10 border border-dz-white/10 text-dz-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider backdrop-blur-md">
                  <Lock className="w-3 h-3 text-dz-orange-500" /> Premium
                </div>
              )}

              <div className={`relative h-full rounded-2xl transition-transform duration-500 group-hover:-translate-y-2 ${!b.free ? 'opacity-90 grayscale-[10%] group-hover:grayscale-0' : ''}`}>
                <div className="bg-dz-white dark:bg-dz-white/[0.03] backdrop-blur-xl border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl flex flex-col z-10 overflow-hidden shadow-lg dark:shadow-[10px_10px_30px_rgba(0,0,0,0.4)] group-hover:shadow-2xl group-hover:border-dz-orange-300 dark:group-hover:border-dz-orange-500/30 transition-all duration-500">

                  {/* Cover Image */}
                  <div className="relative w-full h-[160px] overflow-hidden rounded-t-2xl shrink-0">
                    <Image
                      src={b.cover}
                      alt={b.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dz-white dark:from-[#0a0a0a] via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-col p-6 flex-1 relative">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-dz-orange-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Chapter / Icon */}
                    <div className="flex justify-between items-start mb-auto relative z-10">
                      <span className="font-mono text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-dz-grey-300 dark:from-dz-white/20 to-transparent">
                        {b.n}
                      </span>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white text-lg shadow-lg`}>
                        {b.icon}
                      </div>
                    </div>

                    {/* Meta Data */}
                    <div className="relative z-10 mb-auto mt-2">
                    <div className="text-dz-orange-500 text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center justify-between">
                      {b.verb}
                    </div>
                    <h3 className="text-lg font-display font-bold text-dz-black dark:text-white leading-tight mb-2">
                      {b.title}
                    </h3>
                    <p className="text-xs text-dz-grey-500 dark:text-dz-grey-400 line-clamp-2 leading-relaxed mb-3">
                      {b.desc}
                    </p>

                    {/* Kitap Detayları (Sayfa / Prompt) */}
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="grid grid-cols-2 gap-2 text-[9px] sm:text-[10px] font-bold text-dz-grey-600 dark:text-dz-grey-400 tracking-wider uppercase">
                        <div className="bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/5 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 overflow-hidden">
                          <FileText className="w-3.5 h-3.5 text-dz-orange-500 shrink-0" />
                          <span className="truncate">{b.pages}</span>
                        </div>
                        <div className="bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/5 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 overflow-hidden">
                          <Target className="w-3.5 h-3.5 text-dz-orange-500 shrink-0" />
                          <span className="truncate">{b.prompts}</span>
                        </div>
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-dz-grey-600 dark:text-dz-grey-400 tracking-wider uppercase bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/5 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 overflow-hidden">
                        <Zap className="w-3.5 h-3.5 text-dz-orange-500 shrink-0" />
                        <span className="truncate">Sınırsız Panelden Erişim</span>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 text-center relative z-10 px-4"
      >
        <Link
          href="/giris"
          className="group relative inline-flex items-center justify-center gap-3 bg-dz-black dark:bg-dz-white text-dz-white dark:text-dz-black font-bold text-lg py-5 px-10 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.03] shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            Eğitime Katıl ve Önizle
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <p className="mt-4 text-dz-grey-500 font-medium text-sm">İlk kitap tamamen ücretsiz deneme sürümünde.</p>
      </motion.div>

    </section>
  );
}
