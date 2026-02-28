"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Zap, CheckCircle2, Calendar } from "lucide-react";

type DayData = {
  date: string;
  xp: number;
  tasks_completed: number;
};

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function DashboardWeeklyChart({ days }: { days: DayData[] }) {
  const { maxXp, totalXp, totalTasks, activeDays } = useMemo(() => ({
    maxXp: Math.max(...days.map((d) => d.xp), 1),
    totalXp: days.reduce((sum, d) => sum + d.xp, 0),
    totalTasks: days.reduce((sum, d) => sum + d.tasks_completed, 0),
    activeDays: days.filter((d) => d.xp > 0).length,
  }), [days]);

  return (
    <div className="rounded-3xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-white/[0.03] backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-dz-orange-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-dz-orange-500" />
          </div>
          <div>
            <h3 className="font-display font-bold text-dz-black dark:text-dz-white">
              Haftalık İlerleme
            </h3>
            <p className="text-xs text-dz-grey-500">{activeDays}/7 gün aktif</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-dz-orange-500/5 dark:bg-dz-orange-500/10 rounded-xl p-3 text-center border border-dz-orange-500/10">
          <Zap className="w-4 h-4 text-dz-orange-500 mx-auto mb-1" />
          <p className="font-display font-black text-lg text-dz-orange-500">{totalXp}</p>
          <p className="text-[10px] text-dz-grey-500 font-bold uppercase">XP</p>
        </div>
        <div className="bg-green-500/5 dark:bg-green-500/10 rounded-xl p-3 text-center border border-green-500/10">
          <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mb-1" />
          <p className="font-display font-black text-lg text-green-500">{totalTasks}</p>
          <p className="text-[10px] text-dz-grey-500 font-bold uppercase">Görev</p>
        </div>
        <div className="bg-dz-amber-500/5 dark:bg-dz-amber-500/10 rounded-xl p-3 text-center border border-dz-amber-500/10">
          <Calendar className="w-4 h-4 text-dz-amber-500 mx-auto mb-1" />
          <p className="font-display font-black text-lg text-dz-amber-500">{activeDays}</p>
          <p className="text-[10px] text-dz-grey-500 font-bold uppercase">Aktif Gün</p>
        </div>
      </div>

      <div className="flex items-end gap-3 h-36">
        {days.map((day, i) => {
          const heightPct = maxXp > 0 ? (day.xp / maxXp) * 100 : 0;
          const dayOfWeek = new Date(day.date).getDay();
          const label = DAY_LABELS[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
          const isToday = day.date === new Date().toISOString().slice(0, 10);

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              {day.xp > 0 && (
                <span className="text-[10px] font-bold text-dz-orange-500 tabular-nums">
                  +{day.xp}
                </span>
              )}
              <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(heightPct, day.xp > 0 ? 12 : 4)}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                  className={`w-full rounded-xl transition-colors ${
                    isToday
                      ? "bg-gradient-to-t from-dz-orange-600 to-dz-orange-400 shadow-lg shadow-dz-orange-500/30"
                      : day.xp > 0
                        ? "bg-gradient-to-t from-dz-orange-400/60 to-dz-orange-300/40 dark:from-dz-orange-600/40 dark:to-dz-orange-500/20"
                        : "bg-dz-grey-200 dark:bg-dz-grey-800"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-bold ${
                  isToday
                    ? "text-dz-orange-500"
                    : day.xp > 0
                      ? "text-dz-grey-600 dark:text-dz-grey-400"
                      : "text-dz-grey-400 dark:text-dz-grey-600"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
