"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, BookOpen, Trophy, Zap, Target, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Kütüphaneden başla",
    desc: "İlk kitabını seç ve okumaya başla",
    href: "/panel/kitap",
    color: "bg-dz-orange-500",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Seviye testini çöz",
    desc: "AI yetkinlik seviyeni öğren",
    href: "/panel/test",
    color: "bg-purple-500",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Zihin Motorunu dene",
    desc: "Pomodoro ile odaklanmaya başla",
    href: "/panel/pomodoro",
    color: "bg-green-500",
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Rozetlerini keşfet",
    desc: "Kazanabileceğin 45+ rozet",
    href: "/panel/rozetler",
    color: "bg-dz-amber-500",
  },
];

export default function DashboardWelcome({ userName }: { userName: string }) {
  const [dismissed, setDismissed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("dz-welcome-dismissed");
    if (stored === "1") setDismissed(true);
    const steps = localStorage.getItem("dz-welcome-steps");
    if (steps) setCompletedSteps(new Set(JSON.parse(steps)));
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem("dz-welcome-dismissed", "1");
  }

  function completeStep(idx: number) {
    const next = new Set(completedSteps);
    next.add(idx);
    setCompletedSteps(next);
    localStorage.setItem("dz-welcome-steps", JSON.stringify([...next]));
  }

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="relative rounded-2xl border border-dz-orange-500/30 bg-gradient-to-r from-dz-orange-500/5 via-dz-amber-500/5 to-dz-orange-500/5 p-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-dz-orange-500/10 blur-[60px] rounded-full pointer-events-none" />

        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-dz-grey-400 hover:text-dz-black dark:hover:text-dz-white hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          <h2 className="font-display text-xl font-bold text-dz-black dark:text-dz-white mb-1">
            Hoş geldin, {userName}!
          </h2>
          <p className="text-sm text-dz-grey-500 mb-5">
            İlk adımlarını tamamla ve XP kazanmaya başla
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((step, idx) => {
              const done = completedSteps.has(idx);
              return (
                <Link
                  key={idx}
                  href={step.href}
                  onClick={() => completeStep(idx)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all group ${
                    done
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 hover:border-dz-orange-500/40 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 ${
                      done ? "bg-green-500" : step.color
                    }`}
                  >
                    {done ? "✓" : step.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold ${done ? "text-green-600 dark:text-green-400 line-through" : "text-dz-black dark:text-dz-white"}`}>
                      {step.title}
                    </p>
                    <p className="text-[10px] text-dz-grey-500 truncate">{step.desc}</p>
                  </div>
                  {!done && (
                    <ArrowRight className="w-3.5 h-3.5 text-dz-grey-400 group-hover:text-dz-orange-500 transition-colors shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full"
                animate={{ width: `${(completedSteps.size / STEPS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-[10px] font-bold text-dz-grey-500">
              {completedSteps.size}/{STEPS.length}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
