"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 py-20 overflow-hidden bg-dz-white dark:bg-dz-black">

      {/* --- BACKGROUND EFFECTS --- */}
      {/* 1. Deep Radial Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-dz-orange-500/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 2. Neural Net / Grid Illusion (CSS Pattern) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--dz-grey-400) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-dz-white/50 dark:via-dz-black/50 to-dz-white dark:to-dz-black pointer-events-none" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-12">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-dz-orange-500/20 bg-dz-orange-500/5 mb-8 backdrop-blur-md max-w-full"
        >
          <span className="flex h-2 w-2 shrink-0 rounded-full bg-dz-orange-500 animate-pulse"></span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-dz-orange-600 dark:text-dz-orange-400 uppercase font-bold text-center min-w-0 break-words">
            AI İvme Modeli — 90 Günde Dijital Varlık Üretimi
          </span>
        </motion.div>

        {/* MAIN TITLE */}
        <motion.h1
          className="font-display text-[2rem] sm:text-7xl md:text-8xl font-black tracking-tighter text-dz-black dark:text-dz-white mb-6 leading-[1.1]"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            10 KİTAP.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-600 via-dz-orange-400 to-dz-amber-400 pb-2"
          >
            1 PLATFORM.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            SIFIRDAN LİDERLİĞE.
          </motion.span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-lg sm:text-2xl text-dz-grey-600 dark:text-dz-grey-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Yapay zekayı kullanan herkes değil, <strong className="text-dz-black dark:text-dz-white font-semibold">sistematik kullanarak değer üretenler kazanır.</strong> Gerçek dünya testli 500+ Altın Prompt Mimarlığı ile kendi dijital gelir motorunu inşa et.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 200 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/kayit-ol"
            className="group relative flex items-center justify-center gap-3 bg-dz-orange-500 text-white font-bold text-base sm:text-lg min-h-[44px] py-4 sm:py-5 px-8 sm:px-10 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ücretsiz Analiz Testine Başla
              <svg className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>

          <Link
            href="/panel-onizleme"
            className="group flex items-center justify-center gap-3 px-8 sm:px-10 min-h-[44px] py-4 sm:py-5 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 text-dz-black dark:text-dz-white font-semibold text-base sm:text-lg hover:bg-dz-grey-200 dark:hover:bg-dz-grey-800 hover:border-dz-grey-300 dark:hover:border-dz-grey-600 transition-all duration-300 w-full sm:w-auto"
          >
            Akademiye Giriş
          </Link>
        </motion.div>

        {/* TRUST/META INFO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-dz-grey-500 font-medium"
        >
          <span className="flex items-center gap-2 min-w-0">
            <svg className="w-5 h-5 shrink-0 text-dz-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            100+ Yeni Nesil Gelir Kapısı
          </span>
          <span className="w-1 h-1 rounded-full bg-dz-grey-300 dark:bg-dz-grey-700"></span>
          <span>10 Masterclass E-Kitap</span>
          <span className="w-1 h-1 rounded-full bg-dz-grey-300 dark:bg-dz-grey-700"></span>
          <span>Sürekli Güncelleme</span>
          <span className="w-1 h-1 rounded-full bg-dz-grey-300 dark:bg-dz-grey-700"></span>
          <span>500+ Altın Prompt</span>
        </motion.div>

      </div>

      {/* --- 3D FLOATING ELEMENTS --- */}
      <motion.div
        animate={{ y: [0, -20, 0], rotateX: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] hidden lg:block opacity-20 dark:opacity-40 blur-[2px]"
      >
        <div className="w-32 h-40 bg-gradient-to-br from-dz-grey-200 dark:from-dz-grey-800 to-dz-grey-100 dark:to-dz-black border border-dz-grey-300 dark:border-dz-white/10 rounded-lg shadow-2xl -rotate-12 transform perspective-1000"></div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotateY: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[5%] hidden lg:block opacity-15 dark:opacity-30 blur-[4px]"
      >
        <div className="w-40 h-56 bg-gradient-to-tr from-dz-orange-100 dark:from-dz-orange-900 to-dz-grey-100 dark:to-dz-black border border-dz-orange-200 dark:border-dz-orange-500/20 rounded-lg shadow-2xl rotate-12 transform perspective-1000"></div>
      </motion.div>

    </section>
  );
}
