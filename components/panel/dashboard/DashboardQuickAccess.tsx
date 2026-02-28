"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Lightbulb,
  Clock,
  Coins,
  BarChart3,
} from "lucide-react";

const SHORTCUTS = [
  {
    href: "/panel/kitap",
    label: "Kütüphane",
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-dz-orange-500 to-dz-orange-600",
    desc: "Kitap oku",
  },
  {
    href: "/panel/sohbet",
    label: "AI Koç",
    icon: <Brain className="w-5 h-5" />,
    color: "from-purple-500 to-purple-600",
    desc: "Soru sor",
  },
  {
    href: "/panel/prompt-hub",
    label: "Prompt Hub",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "from-dz-amber-500 to-dz-amber-600",
    desc: "Prompt keşfet",
  },
  {
    href: "/panel/pomodoro",
    label: "Odaklan",
    icon: <Clock className="w-5 h-5" />,
    color: "from-green-500 to-green-600",
    desc: "Pomodoro başlat",
  },
  {
    href: "/panel/coin-shop",
    label: "Mağaza",
    icon: <Coins className="w-5 h-5" />,
    color: "from-yellow-500 to-yellow-600",
    desc: "Coin harca",
  },
  {
    href: "/panel/siralama",
    label: "Sıralama",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "from-blue-500 to-blue-600",
    desc: "Liderlik tablosu",
  },
];

export default function DashboardQuickAccess() {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold mb-4 text-dz-black dark:text-dz-white">
        Hızlı Erişim
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {SHORTCUTS.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 hover:border-dz-orange-500/40 hover:shadow-lg hover:shadow-dz-orange-500/10 transition-all group"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <span className="text-xs font-bold text-dz-black dark:text-dz-white text-center">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
