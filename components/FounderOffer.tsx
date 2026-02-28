"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FounderOffer() {
  return (
    <section className="px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto rounded-3xl border-2 border-dz-orange-400 dark:border-dz-orange-600 bg-gradient-to-br from-dz-orange-50 via-dz-white to-dz-amber-100/30 dark:from-dz-orange-100 dark:via-dz-grey-800 dark:to-dz-grey-900 p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-dz-orange-500/20 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-dz-amber-400/15 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dz-orange-500/30 bg-dz-orange-500/10 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dz-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-dz-orange-500" />
            </span>
            <span className="font-mono text-xs tracking-widest text-dz-orange-600 dark:text-dz-orange-400 font-bold uppercase">
              Kurucu Katilimci
            </span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-black text-dz-black dark:text-dz-white mb-4 tracking-tight">
            Özel Erken Erişim
          </h2>
          <p className="text-dz-grey-600 dark:text-dz-grey-400 mb-8 max-w-sm mx-auto leading-relaxed">
            14 kişiyle sınırlı. Önce sen başla, paneli ilk sen deneyimle.
          </p>
          <Link
            href="/kayit-ol"
            className="inline-flex items-center gap-2 rounded-2xl bg-dz-orange-500 px-10 py-4 font-display font-bold text-white text-lg hover:bg-dz-orange-600 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] hover:scale-[1.03] transform"
          >
            Şimdi Kayıt Ol
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
