"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type CalendarDay = {
  date: string;
  active: boolean;
};

export default function DashboardStreakCalendar({
  days,
  currentStreak,
}: {
  days: CalendarDay[];
  currentStreak: number;
}) {
  const weeks = useMemo(() => {
    const result: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  const today = new Date().toISOString().slice(0, 10);
  const activeDaysCount = days.filter(d => d.active).length;
  const dayLabels = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  return (
    <div className="rounded-3xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-background shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-dz-black dark:text-dz-white text-lg">
            Aktivite Takvimi
          </h3>
          <p className="text-xs text-dz-grey-500 mt-1">
            Son 14 hafta · <span className="text-dz-orange-500 font-bold">{activeDaysCount}</span> aktif gün
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-dz-amber-500/10 px-3 py-1.5 rounded-xl border border-dz-amber-500/20">
            <span className="text-dz-amber-500 font-display font-bold text-xl leading-none">
              🔥 {currentStreak}
            </span>
            <span className="text-xs font-bold text-dz-amber-600 dark:text-dz-amber-400 uppercase tracking-wider">Gün Seri</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-dz-grey-400">
            <span>{activeDaysCount}/{days.length} gün</span>
            <span>({Math.round((activeDaysCount / Math.max(days.length, 1)) * 100)}%)</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1.5 pt-0.5">
          {dayLabels.map((label) => (
            <div key={label} className="w-4 h-4 flex items-center">
              <span className="text-[8px] font-bold text-dz-grey-400 leading-none">{label[0]}</span>
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => {
              const isToday = day.date === today;
              return (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (wi * 7 + di) * 0.008 }}
                  title={`${new Date(day.date).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" })}${day.active ? " — Aktif" : ""}`}
                  className={`w-4 h-4 rounded-md transition-colors cursor-default ${day.active
                      ? "bg-gradient-to-br from-dz-orange-400 to-dz-amber-500 shadow-sm shadow-dz-orange-500/20"
                      : "bg-dz-grey-100 dark:bg-dz-white/5"
                    } ${isToday ? "ring-2 ring-dz-orange-500 ring-offset-2 ring-offset-dz-white dark:ring-offset-[#0a0a0a]" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2 text-xs text-dz-grey-500">
          <span>Az</span>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm bg-dz-grey-100 dark:bg-dz-white/5" />
            <div className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-dz-orange-400 to-dz-amber-500 opacity-50" />
            <div className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-dz-orange-400 to-dz-amber-500" />
          </div>
          <span>Çok</span>
        </div>
        <div className="h-1.5 w-24 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((activeDaysCount / Math.max(days.length, 1)) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
