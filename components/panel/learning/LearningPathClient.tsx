"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Calendar, Lightbulb, RefreshCw,
  ChevronRight, Clock, Flame,
} from "lucide-react";

interface NextStep {
  title: string;
  description: string;
  action: string;
  link: string;
  priority: "high" | "medium" | "low";
}

interface WeeklyPlanItem {
  day: string;
  task: string;
  duration: string;
}

interface LearningPath {
  summary: string;
  nextSteps: NextStep[];
  weeklyPlan: WeeklyPlanItem[];
  tips: string[];
}

export default function LearningPathClient() {
  const [path, setPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchPath() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/learning-path", { method: "POST" });
      const data = await res.json();
      setPath(data.path);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPath();
  }, []);

  const priorityStyles = {
    high: "border-dz-orange-500/30 bg-dz-orange-500/5",
    medium: "border-dz-amber-500/30 bg-dz-amber-500/5",
    low: "border-dz-grey-300/30 bg-dz-grey-50 dark:bg-dz-grey-800/30",
  };

  const priorityLabels = {
    high: { text: "Öncelikli", color: "text-dz-orange-500 bg-dz-orange-500/10" },
    medium: { text: "Önerilen", color: "text-dz-amber-500 bg-dz-amber-500/10" },
    low: { text: "İsteğe Bağlı", color: "text-dz-grey-500 bg-dz-grey-100 dark:bg-dz-grey-800" },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-12 h-12 mx-auto mb-4"
          >
            <Sparkles className="w-12 h-12 text-dz-orange-500" />
          </motion.div>
          <p className="font-display text-lg font-bold text-dz-black dark:text-dz-white">
            AI Öğrenme Yolun Hazırlanıyor...
          </p>
          <p className="text-sm text-dz-grey-500 mt-1">
            Hedeflerine ve ilerlemene göre kişisel plan oluşturuluyor
          </p>
        </div>
      </div>
    );
  }

  if (error || !path) {
    return (
      <div className="rounded-2xl border border-red-200 dark:border-red-900/30 p-8 text-center">
        <p className="text-red-500 mb-4">Öğrenme yolu yüklenemedi.</p>
        <button onClick={fetchPath} className="text-sm text-dz-orange-500 hover:underline">
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-dz-orange-500/30 bg-gradient-to-r from-dz-orange-500/5 via-dz-amber-500/5 to-dz-orange-500/5 p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-dz-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-bold text-dz-black dark:text-dz-white mb-1">
              Senin İçin AI Öğrenme Yolu
            </h2>
            <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">
              {path.summary}
            </p>
          </div>
          <button
            onClick={fetchPath}
            className="p-2 rounded-lg text-dz-grey-400 hover:text-dz-orange-500 hover:bg-dz-orange-500/10 transition-all shrink-0"
            title="Yenile"
            aria-label="Öğrenme yolunu yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Next Steps */}
      <div>
        <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white mb-4">
          Sıradaki Adımlar
        </h3>
        <div className="space-y-3">
          {path.nextSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={step.link}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md group ${priorityStyles[step.priority]}`}
              >
                <div className="w-8 h-8 rounded-lg bg-dz-orange-500/10 flex items-center justify-center text-dz-orange-500 font-display font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-sm text-dz-black dark:text-dz-white truncate">
                      {step.title}
                    </p>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${priorityLabels[step.priority].color}`}>
                      {priorityLabels[step.priority].text}
                    </span>
                  </div>
                  <p className="text-xs text-dz-grey-500 truncate">{step.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-dz-grey-400 group-hover:text-dz-orange-500 transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Plan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-dz-orange-500" />
          <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">
            Haftalık Plan
          </h3>
        </div>
        <div className="space-y-2">
          {path.weeklyPlan.map((item, idx) => {
            const isToday = new Date().toLocaleDateString("tr-TR", { weekday: "long" }).toLowerCase() === item.day.toLowerCase();
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isToday
                    ? "bg-dz-orange-500/5 border border-dz-orange-500/20"
                    : "bg-dz-grey-50 dark:bg-dz-grey-800/50"
                }`}
              >
                <span className={`text-xs font-bold w-20 shrink-0 ${isToday ? "text-dz-orange-500" : "text-dz-grey-500"}`}>
                  {item.day}
                  {isToday && <Flame className="w-3 h-3 inline ml-1" />}
                </span>
                <span className="text-sm text-dz-black dark:text-dz-white flex-1">
                  {item.task}
                </span>
                <span className="flex items-center gap-1 text-xs text-dz-grey-400 shrink-0">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-dz-amber-500" />
          <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">
            AI Koçundan İpuçları
          </h3>
        </div>
        <div className="space-y-3">
          {path.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-dz-amber-500/5 border border-dz-amber-500/10">
              <span className="text-dz-amber-500 font-bold text-sm shrink-0 mt-0.5">
                {idx + 1}.
              </span>
              <p className="text-sm text-dz-grey-700 dark:text-dz-grey-300 leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
