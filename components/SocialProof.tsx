"use client";

import { motion } from "framer-motion";
import { Code2, Workflow, BrainCircuit, Sparkles, Banknote } from "lucide-react";

const stats = [
  { value: "10", label: "Kitap Serisi" },
  { value: "300+", label: "Test Edilmiş Prompt" },
  { value: "100+", label: "Bölüm ve Pratik Görev" },
  { value: "7/24", label: "AI Koçu Erişimi" },
];

export default function SocialProof() {
  return (
    <section className="px-4 py-16 bg-dz-orange-500 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(var(--dz-white) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Animated Curriculum Topics */}
        <div className="text-center mb-12 px-4">
          <p className="text-white/80 font-medium text-sm tracking-widest uppercase mb-10">Öğrenilecek Müfredat ve Sağlanacak Yetkinlikler</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-90">

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-3 text-white font-bold transition-all cursor-default group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dz-orange-500 transition-colors">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <span className="text-sm tracking-wide">Prompt<br />Mühendisliği</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-3 text-white font-bold transition-all cursor-default group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dz-orange-500 transition-colors">
                <Code2 className="w-7 h-7" />
              </div>
              <span className="text-sm tracking-wide">AI Destekli<br />Yazılım</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-3 text-white font-bold transition-all cursor-default group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dz-orange-500 transition-colors">
                <Workflow className="w-7 h-7" />
              </div>
              <span className="text-sm tracking-wide">n8n &<br />Otomasyon</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="flex flex-col items-center gap-3 text-white font-bold transition-all cursor-default group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dz-orange-500 transition-colors">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-sm tracking-wide">Dijital Varlık<br />Üretimi</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-3 text-white font-bold transition-all cursor-default group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dz-orange-500 transition-colors">
                <Banknote className="w-7 h-7" />
              </div>
              <span className="text-sm tracking-wide">Yeni Nesil<br />Gelir Kapıları</span>
            </motion.div>

          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-display text-4xl sm:text-5xl font-black text-white outline-white tracking-tight">
                {s.value}
              </p>
              <p className="text-sm font-medium text-white/80 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
