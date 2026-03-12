"use client";

import { motion } from "framer-motion";
import { Book, CheckCircle2, Flame, Trophy, Lock, Clock, StickyNote, MessageSquare } from "lucide-react";

export default function PanelPreview() {
  return (
    <section className="px-4 py-24 md:py-32 bg-dz-white dark:bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-dz-orange-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-dz-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/20 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6"
          >
            İçeriden Bir Bakış
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dz-black dark:text-dz-white tracking-tight"
          >
            ÖĞRENMENİN <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">YENİ BOYUTU</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-center text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto text-lg/relaxed"
          >
            Gereksiz teori yok. Sadece seni harekete geçirecek, odaklanmanı sağlayacak ve doğrudan sonuç almanı hedefleyen premium bir akademi arayüzü.
          </motion.p>
        </div>

        {/* Dashboard UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-5xl rounded-2xl md:rounded-[2rem] border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-background p-2 md:p-4 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Mac window controls simulation */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-dz-grey-200 dark:border-dz-white/10 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            <div className="mx-auto text-xs font-mono text-dz-grey-500 dark:text-dz-grey-600 flex items-center gap-2">
              <Lock className="w-3 h-3" /> diptenzirveye.com
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 h-[350px] sm:h-[420px] md:h-[500px] overflow-hidden rounded-xl">
            {/* Sidebar (gorsel onizleme - tiklanamaz) */}
            <div className="hidden md:flex flex-col w-64 border-r border-dz-grey-200 dark:border-dz-white/5 pr-4 py-4 space-y-2">
              <div className="h-10 rounded-lg bg-dz-orange-500/10 border border-dz-orange-500/20 flex items-center px-4 gap-3 text-dz-orange-500 font-bold text-sm">
                <Book className="w-4 h-4" /> Kütüphane
              </div>
              <div className="h-10 rounded-lg flex items-center px-4 gap-3 text-dz-grey-500 dark:text-dz-grey-400 font-medium text-sm">
                <StickyNote className="w-4 h-4 opacity-70" /> Serbest Çalışma
              </div>
              <div className="h-10 rounded-lg flex items-center px-4 gap-3 text-dz-grey-500 dark:text-dz-grey-400 font-medium text-sm">
                <Trophy className="w-4 h-4 opacity-70" /> Rozetler & Liderlik
              </div>
              <div className="h-10 rounded-lg flex items-center px-4 gap-3 text-dz-grey-500 dark:text-dz-grey-400 font-medium text-sm">
                <MessageSquare className="w-4 h-4 opacity-70" /> Prompt Hub
              </div>
              <div className="h-10 rounded-lg flex items-center px-4 gap-3 text-dz-grey-500 dark:text-dz-grey-400 font-medium text-sm">
                <Clock className="w-4 h-4 opacity-70" /> Zihin Motoru
              </div>

              <div className="mt-auto pt-4 border-t border-dz-grey-200 dark:border-dz-white/5">
                <div className="p-3 rounded-xl bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-dz-orange-500 to-dz-amber-400 flex items-center justify-center text-white font-bold text-xs">SB</div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-dz-black dark:text-white">Semih B.</div>
                      <div className="text-[10px] text-dz-orange-500">Seviye 4 Lider</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-dz-orange-500 w-[65%]" />
                  </div>
                  <div className="text-[10px] text-dz-grey-500 mt-1 text-right">650 / 1000 XP</div>
                </div>
              </div>
            </div>

            {/* Main Content Mock */}
            <div className="flex-1 p-2 md:p-6 overflow-hidden flex flex-col gap-6">

              {/* Header Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl border border-dz-grey-200 dark:border-dz-white/5 bg-dz-white dark:bg-dz-grey-900 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex flex-col items-center justify-center text-orange-500">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-dz-black dark:text-white leading-none">12</div>
                    <div className="text-[10px] text-dz-grey-500 uppercase font-bold mt-1">GÜN SERİ</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-dz-grey-200 dark:border-dz-white/5 bg-dz-white dark:bg-dz-grey-900 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex flex-col items-center justify-center text-amber-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-dz-black dark:text-white leading-none">3</div>
                    <div className="text-[10px] text-dz-grey-500 uppercase font-bold mt-1">BİTEN KİTAP</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-dz-orange-500/30 bg-gradient-to-br from-dz-orange-500/10 to-transparent shadow-sm flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute right-[-10px] bottom-[-20px] text-orange-500/10">
                    <Trophy className="w-24 h-24" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-dz-orange-500 flex flex-col items-center justify-center text-white relative z-10 shadow-lg shadow-dz-orange-500/30">
                    <span className="font-bold">#4</span>
                  </div>
                  <div className="relative z-10">
                    <div className="text-xl font-black text-dz-orange-500 leading-none">LİDERLİK</div>
                    <div className="text-[10px] text-dz-grey-600 dark:text-dz-grey-400 font-bold mt-1">+45 XP öndesin</div>
                  </div>
                </div>
              </div>

              {/* Active Book Mock */}
              <div className="flex-1 rounded-2xl border border-dz-grey-200 dark:border-dz-white/5 bg-dz-white dark:bg-dz-grey-900 shadow-sm p-6 overflow-hidden relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs font-bold text-dz-orange-500 uppercase tracking-widest mb-1">ŞU AN OKUNUYOR</div>
                    <h3 className="text-2xl font-display font-bold text-dz-black dark:text-white">Modül 04: Odaklanırsın</h3>
                    <p className="text-sm text-dz-grey-500 mt-1">Eylem İvmesi Serisi - Sayfa 42/105</p>
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-dz-black dark:bg-dz-white text-white dark:text-dz-black font-bold text-sm shadow-xl flex items-center gap-2 hover:scale-[1.02] transition-transform">
                    Okumaya Devam Et
                  </button>
                </div>

                <div className="w-full h-3 bg-dz-grey-100 dark:bg-dz-grey-800 rounded-full overflow-hidden mb-8">
                  <div className="w-[40%] h-full bg-gradient-to-r from-dz-orange-600 to-dz-amber-400 rounded-full relative">
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30" />
                  </div>
                </div>

                <div className="text-sm font-bold text-dz-black dark:text-white mb-4">GÜNLÜK HEDEFLER:</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-dz-grey-200 dark:border-dz-white/5 bg-dz-grey-50 dark:bg-dz-black/50 opacity-60">
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    <span className="text-sm font-medium line-through">Odaklanma Egzersizi: Pomodoro Tamamla</span>
                    <span className="ml-auto text-xs font-bold text-dz-orange-500">+15 XP</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-dz-orange-500/20 bg-dz-orange-500/5">
                    <div className="w-5 h-5 rounded-full border-2 border-dz-orange-500" />
                    <span className="text-sm font-medium text-dz-black dark:text-white">Bölüm 4'ü Oku ve Not Al</span>
                    <span className="ml-auto text-xs font-bold text-dz-orange-500">+25 XP</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
