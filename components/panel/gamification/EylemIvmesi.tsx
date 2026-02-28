"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, CalendarDays, Target } from "lucide-react";

interface StreakDay {
  date: string;
  xp_earned: number;
  tasks_completed: number;
}

interface EylemIvmesiProps {
  days: StreakDay[];
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
}

type ActivityLevel = "none" | "low" | "medium" | "high";

const TOTAL_DAYS = 90;
const GRID_COLS = 13;

const MONTHS_TR = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
];

function getActivityLevel(day: StreakDay | undefined): ActivityLevel {
  if (!day || (day.xp_earned === 0 && day.tasks_completed === 0)) return "none";
  if (day.tasks_completed >= 5 || day.xp_earned >= 50) return "high";
  if (day.tasks_completed >= 3 || day.xp_earned >= 20) return "medium";
  return "low";
}

const CELL_COLORS: Record<ActivityLevel, string> = {
  none: "bg-dz-grey-100 dark:bg-dz-grey-800",
  low: "bg-dz-orange-200 dark:bg-dz-orange-800",
  medium: "bg-dz-orange-400 dark:bg-dz-orange-600",
  high: "bg-dz-orange-500 dark:bg-dz-orange-500",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EylemIvmesi({
  days,
  currentStreak,
  longestStreak,
  totalActiveDays,
}: EylemIvmesiProps) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const { grid, monthLabels } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayMap = new Map<string, StreakDay>();
    for (const d of days) {
      dayMap.set(d.date, d);
    }

    const gridData: Array<{
      date: string;
      data: StreakDay | undefined;
      level: ActivityLevel;
    }> = [];

    for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const iso = date.toISOString().split("T")[0];
      const data = dayMap.get(iso);
      gridData.push({ date: iso, data, level: getActivityLevel(data) });
    }

    const labels: Array<{ label: string; col: number }> = [];
    let lastMonth = -1;
    for (let i = 0; i < gridData.length; i++) {
      const month = new Date(gridData[i].date).getMonth();
      if (month !== lastMonth) {
        const col = i % GRID_COLS;
        labels.push({ label: MONTHS_TR[month], col: Math.floor(i / 7) });
        lastMonth = month;
      }
    }

    return { grid: gridData, monthLabels: labels };
  }, [days]);

  const completionPct = Math.round((totalActiveDays / 90) * 100);

  const stats = [
    {
      label: "Mevcut Seri",
      value: `${currentStreak} gün`,
      icon: Flame,
      color: "text-dz-orange-500",
      bg: "bg-dz-orange-500/10",
    },
    {
      label: "En Uzun Seri",
      value: `${longestStreak} gün`,
      icon: Trophy,
      color: "text-dz-amber-500",
      bg: "bg-dz-amber-500/10",
    },
    {
      label: "Aktif Gün",
      value: `${totalActiveDays}/90`,
      icon: CalendarDays,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Tamamlanma",
      value: `${completionPct}%`,
      icon: Target,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6">
      <h2 className="font-display font-black text-lg text-dz-black dark:text-white mb-5">
        90 Günlük Eylem İvmesi
      </h2>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl bg-dz-grey-50 dark:bg-dz-grey-800/50 p-3 flex items-center gap-3"
          >
            <div className={`${stat.bg} ${stat.color} rounded-lg p-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-dz-grey-500 dark:text-dz-grey-400 uppercase tracking-wide truncate">
                {stat.label}
              </p>
              <p className="font-display font-black text-sm text-dz-black dark:text-white">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 90-Day Grid */}
      <div className="relative">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
        >
          {grid.map((cell, i) => (
            <div key={cell.date} className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.005, type: "spring", stiffness: 300, damping: 20 }}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-dz-orange-400/50 ${CELL_COLORS[cell.level]}`}
                onMouseEnter={() => setHoveredDay(i)}
                onMouseLeave={() => setHoveredDay(null)}
              />

              {hoveredDay === i && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-lg bg-dz-black text-white text-xs px-3 py-2 shadow-lg z-50 whitespace-nowrap pointer-events-none">
                  <p className="font-semibold">{formatDate(cell.date)}</p>
                  <p className="text-dz-grey-300 mt-0.5">
                    {cell.data
                      ? `${cell.data.xp_earned} XP · ${cell.data.tasks_completed} görev`
                      : "Aktivite yok"}
                  </p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dz-black" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Month Labels */}
        <div
          className="grid gap-1 mt-2"
          style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: GRID_COLS }).map((_, colIdx) => {
            const label = monthLabels.find((m) => m.col === colIdx);
            return (
              <span
                key={colIdx}
                className="text-[10px] font-medium text-dz-grey-400 dark:text-dz-grey-500 truncate"
              >
                {label?.label ?? ""}
              </span>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-[11px] font-medium text-dz-grey-500 dark:text-dz-grey-400">
          Az Aktivite
        </span>
        <div className="flex gap-1">
          {(["none", "low", "medium", "high"] as ActivityLevel[]).map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${CELL_COLORS[level]}`} />
          ))}
        </div>
        <span className="text-[11px] font-medium text-dz-grey-500 dark:text-dz-grey-400">
          Çok Aktivite
        </span>
      </div>
    </div>
  );
}
