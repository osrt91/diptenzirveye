"use client";

import { motion } from "framer-motion";
import { Brain, Search, UserCircle, Wand2, BookOpen, Zap } from "lucide-react";

const FaArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const features = [
  {
    title: "Akıllı Özetleme",
    desc: "Uzun metinleri ve karmaşık kitap detaylarını saniyeler içinde damıtarak ana fikri sunar. %85 zaman tasarrufu.",
    icon: <Brain className="w-8 h-8" />,
    color: "from-dz-orange-500 to-dz-orange-700",
    illustration: (
      <div className="relative w-full h-32 flex items-center justify-center mt-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-dz-orange-500/20 rounded-full blur-2xl"
        />
        <div className="relative z-10 flex items-center gap-4">
          <BookOpen className="w-12 h-12 text-dz-grey-300 dark:text-dz-white/20" />
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <FaArrowRight className="w-6 h-6 text-dz-orange-500" />
          </motion.div>
          <Zap className="w-12 h-12 text-dz-orange-400" />
        </div>
      </div>
    )
  },
  {
    title: "Derinlemesine Arama",
    desc: "Sadece kelimeleri değil, bağlamı da anlayan arama altyapısı ile aradığın bilgiye anında ulaş.",
    icon: <Search className="w-8 h-8" />,
    color: "from-dz-grey-400 dark:from-dz-grey-600 to-dz-grey-600 dark:to-dz-grey-800",
    illustration: (
      <div className="relative w-full h-32 flex items-center justify-center mt-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 border border-dz-grey-300 dark:border-dz-grey-500/30 rounded-full border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 border border-dz-grey-200 dark:border-dz-grey-600/20 rounded-full border-dashed"
        />
        <Wand2 className="w-10 h-10 text-dz-grey-700 dark:text-dz-white/80 relative z-10" />
      </div>
    )
  },
  {
    title: "Kişiselleştirilmiş Akış",
    desc: "Senin öğrenme hızına, hedeflerine ve eksiklerine göre şekillenen dinamik müfredat deneyimi.",
    icon: <UserCircle className="w-8 h-8" />,
    color: "from-dz-orange-600 to-dz-amber-500",
    illustration: (
      <div className="relative w-full h-32 flex items-center justify-center mt-6">
        <motion.div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-dz-orange-500/20 to-dz-grey-200/50 dark:to-dz-white/5 border border-dz-grey-200 dark:border-dz-white/10"
            />
          ))}
        </motion.div>
      </div>
    )
  },
];

export default function ProblemSection() {
  return (
    <section className="px-4 py-24 md:py-32 bg-dz-grey-50 dark:bg-background relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dz-grey-300 dark:via-dz-grey-800 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dz-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-white/5 text-dz-grey-600 dark:text-dz-grey-300 text-sm font-medium tracking-wide uppercase mb-6 backdrop-blur-md"
          >
            AI Destekli Öğrenme
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-dz-black dark:text-white mb-6"
          >
            Öğrenmeyi Hızlandıran <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">AI Gücü</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto text-lg"
          >
            Geleneksel okuma bitti. Sen içeriği tüketirken, sistem senin için en önemli noktaları yakalar ve sana özel bir ağ kurar.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dz-orange-500/5 dark:from-dz-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Glass Card */}
              <div
                className="h-full flex flex-col justify-between rounded-3xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-white/[0.02] backdrop-blur-md p-8 shadow-lg dark:shadow-2xl transition-transform duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-6 shadow-lg relative z-10`}>
                    {f.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dz-black dark:text-white mb-3 relative z-10">
                    {f.title}
                  </h3>
                  <p className="text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed relative z-10">
                    {f.desc}
                  </p>
                </div>

                {/* Custom Illustration per Card */}
                <div className="mt-8 border-t border-dz-grey-200 dark:border-dz-white/5 pt-6 relative z-10">
                  {f.illustration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
