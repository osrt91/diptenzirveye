import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import EylemIvmesi from "@/components/panel/gamification/EylemIvmesi";
import { Skeleton } from "@/components/ui/Skeleton";

const ErtelemeModulu = dynamic(
  () => import("@/components/panel/tools/ErtelemeModulu"),
  {
    loading: () => (
      <div className="animate-pulse rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-100/50 dark:bg-dz-grey-900/50 p-8 min-h-[300px]" />
    ),
  }
);

async function StreakSection() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const [historyRes, progressRes] = await Promise.all([
    supabase
      .from("streak_history")
      .select("activity_date, xp_earned, tasks_completed")
      .eq("user_id", user.id)
      .gte("activity_date", ninetyDaysAgo.toISOString().slice(0, 10))
      .order("activity_date", { ascending: true }),
    supabase
      .from("user_progress")
      .select("current_streak_days")
      .eq("user_id", user.id)
      .single(),
  ]);

  const days = (historyRes.data ?? []).map((d: any) => ({
    date: d.activity_date,
    xp_earned: d.xp_earned ?? 0,
    tasks_completed: d.tasks_completed ?? 0,
  }));

  const currentStreak = progressRes.data?.current_streak_days ?? 0;
  const totalActiveDays = days.filter((d: any) => d.xp_earned > 0 || d.tasks_completed > 0).length;

  let longestStreak = 0;
  let tempStreak = 0;
  const allDays = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    allDays.push(d.toISOString().slice(0, 10));
  }
  const activeSet = new Set(days.filter((d: any) => d.xp_earned > 0 || d.tasks_completed > 0).map((d: any) => d.date));
  for (const day of allDays) {
    if (activeSet.has(day)) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return (
    <EylemIvmesi
      days={days}
      currentStreak={currentStreak}
      longestStreak={longestStreak}
      totalActiveDays={totalActiveDays}
    />
  );
}

export default function ErtelemePlaniPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Eylem İvmesi (Action Momentum) Serisi
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-1">
          90 günlük momentum takibi ve erteleme kırma araçları
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        }
      >
        <StreakSection />
      </Suspense>

      <div className="max-w-2xl mx-auto">
        <ErtelemeModulu />
      </div>
    </div>
  );
}
