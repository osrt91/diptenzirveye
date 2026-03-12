"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle2, Flame, BookOpen, Clock } from "lucide-react";
import { useState } from "react";

function CircularXP({ progressPct, level, size = 90 }: { progressPct: number; level: number; size?: number }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progressPct);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-dz-grey-200 dark:text-dz-grey-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-dz-orange-500"
          stroke="currentColor"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] text-dz-grey-500 font-bold uppercase tracking-widest mt-1">LVL</span>
        <span className="font-display text-2xl font-black text-dz-orange-500 leading-none">{level}</span>
      </div>
    </div>
  );
}

export default function DashboardXP({
  totalXp,
  level,
  progressPct,
}: {
  totalXp: number;
  level: number;
  progressPct: number;
}) {
  const [showHowToEarn, setShowHowToEarn] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white/80 dark:bg-dz-white/[0.03] backdrop-blur-xl p-6 relative group transition-all duration-300 flex flex-col justify-between h-full hover:border-dz-orange-200 dark:hover:border-dz-orange-500/20"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-dz-orange-500/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full mb-4">
        <CircularXP progressPct={progressPct} level={level} size={100} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-dz-grey-500 mb-1">Toplam XP</p>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-display text-3xl font-black text-dz-orange-500"
          >
            {totalXp.toLocaleString("tr-TR")}
          </motion.p>
          <div className="mt-3 h-2 w-full rounded-full bg-dz-grey-200 dark:bg-dz-grey-800 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
            </motion.div>
          </div>
          <p className="text-xs font-bold text-dz-orange-500 dark:text-orange-400 mt-2 tracking-wide uppercase">
            Sonraki aşamaya: %{Math.round(progressPct * 100)}
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-dz-grey-100 dark:border-dz-white/5 pt-4 mt-2">
        <button
          onClick={() => setShowHowToEarn(!showHowToEarn)}
          className="flex items-center justify-between w-full text-xs font-bold text-dz-grey-600 dark:text-dz-grey-400 hover:text-dz-orange-500 dark:hover:text-dz-orange-400 transition-colors"
        >
          <span className="flex items-center gap-1.5"><Info className="w-4 h-4" />Nasıl XP Kazanırsın?</span>
          <span>{showHowToEarn ? "Gizle" : "Göster"}</span>
        </button>

        <AnimatePresence>
          {showHowToEarn && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-medium">
                <div className="bg-dz-orange-500/10 dark:bg-dz-orange-500/5 text-dz-orange-700 dark:text-dz-orange-300 p-3 rounded-xl border border-dz-orange-500/20">
                  <Flame className="w-4 h-4 mb-2 text-dz-orange-500" />
                  Günlük Giriş & Seri Yakalama <span className="block mt-1 text-dz-orange-500 font-bold">+50 XP</span>
                </div>
                <div className="bg-dz-orange-500/10 dark:bg-dz-orange-500/5 text-dz-orange-700 dark:text-dz-orange-300 p-3 rounded-xl border border-dz-orange-500/20">
                  <Clock className="w-4 h-4 mb-2 text-dz-amber-500" />
                  Zihin Motoru Oturumu <span className="block mt-1 text-dz-orange-500 font-bold">+100 XP</span>
                </div>
                <div className="col-span-2 bg-dz-orange-500/10 dark:bg-dz-orange-500/5 text-dz-orange-700 dark:text-dz-orange-300 p-3 rounded-xl border border-dz-orange-500/20 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    Kitap Modülü Bitirme
                  </div>
                  <span className="text-dz-orange-500 font-bold">+500 XP</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
