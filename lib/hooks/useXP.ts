"use client";

import { useCallback } from "react";
import { useSupabase } from "./useSupabase";
import { useXPAnimation } from "@/components/gamification/XPAnimation";
import { xpToLevel } from "@/lib/xp";

export function useXP() {
  const supabase = useSupabase();
  const { trigger: showXPAnimation } = useXPAnimation();

  const awardXP = useCallback(
    async (amount: number, label?: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || amount <= 0) return;

      const { data: progress } = await supabase
        .from("user_progress")
        .select("total_xp, current_streak_days, last_activity_date")
        .eq("user_id", user.id)
        .single();

      const currentXp = progress?.total_xp ?? 0;
      const newXp = currentXp + amount;
      const newLevel = xpToLevel(newXp);

      const today = new Date().toISOString().slice(0, 10);
      const lastDate = progress?.last_activity_date;
      let streak = progress?.current_streak_days ?? 0;

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        streak = lastDate === yesterdayStr ? streak + 1 : 1;
      }

      await supabase
        .from("user_progress")
        .update({
          total_xp: newXp,
          level: newLevel,
          current_streak_days: streak,
          last_activity_date: today,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      showXPAnimation(amount, label);
    },
    [supabase, showXPAnimation]
  );

  return { awardXP };
}
