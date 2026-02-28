"use client";

import { motion } from "framer-motion";

export default function DashboardStreak({ streak }: { streak: number }) {
  const fireScale = Math.min(streak / 10, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white/80 dark:bg-dz-white/[0.03] backdrop-blur-xl p-6 relative overflow-hidden group hover:border-dz-amber-300 dark:hover:border-dz-amber-500/30 transition-all duration-300"
    >
      {/* Fire glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-dz-amber-500/20 blur-[40px] rounded-full pointer-events-none" />

      <div className="flex items-center gap-5 relative z-10">
        {/* Animated Fire */}
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.1 + fireScale * 0.2, 1],
              opacity: streak > 0 ? [0.7, 1, 0.7] : 0.3,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            🔥
          </motion.div>
          {streak >= 7 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-xs"
            >
              ⚡
            </motion.div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-dz-grey-500 mb-1">Seri</p>
          <motion.p
            key={streak}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-3xl font-black text-dz-amber-500"
          >
            {streak} <span className="text-lg font-bold">gün</span>
          </motion.p>
          <p className="text-xs text-dz-grey-400 mt-1">
            {streak === 0 ? "Bugün başla!" : streak < 7 ? "Devam et, kaybetme!" : "Muazzam bir seri! 🎯"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
