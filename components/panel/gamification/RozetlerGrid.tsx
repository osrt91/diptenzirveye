"use client";

import { motion } from "framer-motion";
import { getAIToolIcon } from "../chat/ai-tool-badges";
import { Lock, Award } from "lucide-react";
import { triggerHaptic } from "@/lib/capacitor";

type Badge = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_emoji: string;
  xp_required: number;
  category?: string;
};

export default function RozetlerGrid({
  badges,
  earnedIds,
  activeCategory,
}: {
  badges: Badge[];
  earnedIds: Set<string>;
  activeCategory?: string;
}) {
  const filtered = activeCategory
    ? badges.filter((b) => {
      if (activeCategory === "ai-tool") return b.slug.endsWith("-kullanici");
      if (activeCategory === "xp") return b.slug.match(/^\d+-xp$/);
      if (activeCategory === "streak") return b.slug.startsWith("streak-");
      if (activeCategory === "book") return b.slug.startsWith("book-");
      if (activeCategory === "community") return b.slug.match(/^(ilk-|10-|pomodoro-|note-)/);
      return true;
    })
    : badges;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((badge, i) => {
        const earned = earnedIds.has(badge.id);
        const AiIcon = getAIToolIcon(badge.slug);

        return (
          <motion.li
            key={badge.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              if (earned) triggerHaptic("light").catch(() => {});
            }}
            className={`group relative rounded-3xl border p-6 transition-all duration-300 overflow-hidden ${earned
              ? "border-dz-amber-400/60 bg-gradient-to-br from-dz-amber-400/10 via-white/80 to-dz-orange-500/10 dark:from-dz-amber-500/20 dark:via-dz-grey-900/90 dark:to-dz-orange-500/20 shadow-lg shadow-dz-amber-500/10 hover:shadow-xl hover:-translate-y-1 hover:border-dz-amber-400"
              : "border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-50/50 dark:bg-dz-grey-900/50 hover:bg-dz-white dark:hover:bg-dz-grey-800 opacity-80 hover:opacity-100 hover:border-dz-grey-300 dark:hover:border-dz-grey-600"
              }`}
          >
            {/* Glossy overlay for earned badges */}
            {earned && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full pointer-events-none" />
            )}

            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${earned ? "bg-dz-amber-400/30 opacity-100 group-hover:opacity-60" : "bg-dz-grey-400/10 opacity-0 group-hover:opacity-50"}`} />

            <div className="relative z-10 flex flex-col items-center text-center gap-5">
              {/* Icon */}
              <div
                className={`relative shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${earned
                  ? "bg-gradient-to-br from-dz-amber-400/30 to-dz-orange-500/20 dark:from-dz-amber-500/30 dark:to-dz-orange-500/20 ring-2 ring-dz-amber-400/50 shadow-inner"
                  : "bg-dz-grey-200/50 dark:bg-dz-grey-800/50 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 duration-300"
                  }`}
              >
                {AiIcon ? (
                  <AiIcon className="w-10 h-10 text-dz-black dark:text-dz-white drop-shadow-md" />
                ) : (
                  <span className="text-4xl drop-shadow-md" role="img" aria-hidden>
                    {badge.icon_emoji}
                  </span>
                )}
                {earned && (
                  <div className="absolute -bottom-2 -right-2 bg-dz-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-dz-grey-900 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <Award className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 w-full space-y-2.5">
                <h3 className={`font-display font-black text-lg leading-tight tracking-tight ${earned ? "text-dz-black dark:text-white" : "text-dz-grey-500 dark:text-dz-grey-400 group-hover:text-dz-black dark:group-hover:text-white transition-colors"}`}>
                  {badge.name}
                </h3>
                {badge.description && (
                  <p className={`text-xs leading-relaxed font-medium ${earned ? "text-dz-grey-600 dark:text-dz-grey-300" : "text-dz-grey-400 dark:text-dz-grey-500"}`}>
                    {badge.description}
                  </p>
                )}
                <div className="pt-3">
                  {earned ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-dz-amber-600 dark:text-dz-amber-400 bg-dz-amber-100/50 dark:bg-dz-amber-500/10 px-3 py-1.5 rounded-xl border border-dz-amber-200 dark:border-dz-amber-500/20 shadow-sm">
                      Kazanıldı
                    </span>
                  ) : badge.xp_required > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-dz-grey-500 bg-dz-grey-100 dark:bg-dz-grey-800 px-3 py-1.5 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700">
                      <Lock className="w-3 h-3" /> {badge.xp_required} XP
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-dz-grey-500 bg-dz-grey-100 dark:bg-dz-grey-800 px-3 py-1.5 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700">
                      <Lock className="w-3 h-3" /> Kilitli
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}

