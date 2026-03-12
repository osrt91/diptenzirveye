import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { xpToLevel, xpProgressInLevel } from "@/lib/xp";
import DashboardXP from "@/components/panel/dashboard/DashboardXP";
import DashboardStreak from "@/components/panel/dashboard/DashboardStreak";
import DashboardActiveBook from "@/components/panel/dashboard/DashboardActiveBook";
import DashboardDailyTasks from "@/components/panel/dashboard/DashboardDailyTasks";
import DashboardWeeklyChart from "@/components/panel/dashboard/DashboardWeeklyChart";
import DashboardStreakCalendar from "@/components/panel/dashboard/DashboardStreakCalendar";
import DashboardCoins from "@/components/panel/dashboard/DashboardCoins";
import DashboardQuickAccess from "@/components/panel/dashboard/DashboardQuickAccess";
import DashboardWelcome from "@/components/panel/dashboard/DashboardWelcome";
import DailyPromptChallenge from "@/components/panel/dashboard/DailyPromptChallenge";
import BookEcosystem from "@/components/panel/dashboard/BookEcosystem";
import { CardSkeleton, Skeleton } from "@/components/ui/Skeleton";

async function StatsCards({ userId }: { userId: string }) {
  const supabase = await createClient();

  const [progressRes, userBooksRes] = await Promise.all([
    supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single(),
    supabase
      .from("user_books")
      .select("*, book:books(*)")
      .eq("user_id", userId)
      .is("completed_at", null)
      .order("updated_at", { ascending: false })
      .limit(1),
  ]);

  const progress = progressRes.data;
  const activeUserBook = userBooksRes.data?.[0];
  const totalXp = progress?.total_xp ?? 0;
  const level = xpToLevel(totalXp);
  const progressPct = xpProgressInLevel(totalXp);
  const streak = progress?.current_streak_days ?? 0;

  return (
    <>
      <DashboardXP totalXp={totalXp} level={level} progressPct={progressPct} />
      <DashboardStreak streak={streak} />
      <DashboardActiveBook userBook={activeUserBook} />
    </>
  );
}

async function WeeklyChartSection({ userId }: { userId: string }) {
  const supabase = await createClient();

  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  const { data: tasks } = await supabase
    .from("daily_tasks")
    .select("task_date, completed, xp_reward")
    .eq("user_id", userId)
    .in("task_date", days);

  const dayMap = new Map(days.map((d) => [d, { date: d, xp: 0, tasks_completed: 0 }]));
  (tasks ?? []).forEach((t) => {
    const entry = dayMap.get(t.task_date);
    if (entry && t.completed) {
      entry.xp += t.xp_reward ?? 0;
      entry.tasks_completed += 1;
    }
  });

  return <DashboardWeeklyChart days={Array.from(dayMap.values())} />;
}

async function StreakCalendarSection({ userId }: { userId: string }) {
  const supabase = await createClient();

  const calendarDays = [];
  const today = new Date();
  for (let i = 139; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    calendarDays.push(d.toISOString().slice(0, 10));
  }

  const { data: tasks } = await supabase
    .from("daily_tasks")
    .select("task_date, completed")
    .eq("user_id", userId)
    .eq("completed", true)
    .in("task_date", calendarDays);

  const activeDates = new Set((tasks ?? []).map((t) => t.task_date));

  const progressRes = await supabase
    .from("user_progress")
    .select("current_streak_days")
    .eq("user_id", userId)
    .single();

  return (
    <DashboardStreakCalendar
      days={calendarDays.map((date) => ({ date, active: activeDates.has(date) }))}
      currentStreak={progressRes.data?.current_streak_days ?? 0}
    />
  );
}

async function DailyTasksSection({ userId }: { userId: string }) {
  const supabase = await createClient();

  const taskDate = new Date().toISOString().slice(0, 10);

  let { data: tasks } = await supabase
    .from("daily_tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("task_date", taskDate)
    .order("created_at", { ascending: true });

  if (!tasks || tasks.length === 0) {
    const { data: activeBookData } = await supabase
      .from("user_books")
      .select("book:books(title, content_url)")
      .eq("user_id", userId)
      .is("completed_at", null)
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    const bookObj = activeBookData?.book as { title: string } | { title: string }[] | null;
    const bookTitle = Array.isArray(bookObj) ? bookObj[0]?.title : bookObj?.title;

    // Yüklenecek varsayılan görevler
    const defaultTasksStr = bookTitle
      ? [
        { title: `${bookTitle} kitabından 1 bölüm oku`, xp_reward: 20 },
        { title: "Öğrendiklerinle 1 adet Prompt oluştur", xp_reward: 15 },
        { title: "Not defterine özet çıkar", xp_reward: 10 }
      ]
      : [
        { title: "Akademiye giriş yap ve bir kitap seç", xp_reward: 10 },
        { title: "Zihin motoru ile 20 dk odaklan", xp_reward: 15 },
        { title: "Toplulukla etkileşime geç (Prompt Hub)", xp_reward: 10 }
      ];

    const tasksToInsert = defaultTasksStr.map(t => ({
      user_id: userId,
      title: t.title,
      task_date: taskDate,
      xp_reward: t.xp_reward,
    }));

    await supabase.from("daily_tasks").insert(tasksToInsert);

    const { data: newTasks } = await supabase
      .from("daily_tasks")
      .select("*")
      .eq("user_id", userId)
      .eq("task_date", taskDate)
      .order("created_at", { ascending: true });

    tasks = newTasks;
  }

  return (
    <DashboardDailyTasks
      initialTasks={tasks ?? []}
      userId={userId}
      taskDate={taskDate}
    />
  );
}

async function BookEcosystemSection({ userId }: { userId: string }) {
  const supabase = await createClient();

  const [booksRes, userBooksRes] = await Promise.all([
    supabase
      .from("books")
      .select("id, slug, title, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("user_books")
      .select("book_id, current_chapter, completed_at")
      .eq("user_id", userId),
  ]);

  const userBookMap = new Map(
    (userBooksRes.data ?? []).map((ub: { book_id: string; current_chapter: number; completed_at: string | null }) => [ub.book_id, ub])
  );

  const books = (booksRes.data ?? []).map((book: { id: string; slug: string; title: string; sort_order: number }) => {
    const ub = userBookMap.get(book.id);
    return {
      id: book.id,
      slug: book.slug,
      title: book.title,
      sort_order: book.sort_order,
      current_chapter: ub?.current_chapter ?? 0,
      total_chapters: 10,
      completed: ub?.completed_at != null,
      started: ub != null,
    };
  });

  return <BookEcosystem books={books} />;
}

async function PromptChallengeSection({ userId }: { userId: string }) {
  const supabase = await createClient();

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const challengeDay = dayOfYear % 14;

  const { data: submission } = await supabase
    .from("prompt_challenge_submissions")
    .select("content")
    .eq("user_id", userId)
    .eq("challenge_day", challengeDay)
    .maybeSingle();

  return (
    <DailyPromptChallenge
      userId={userId}
      initialSubmission={submission?.content ?? null}
    />
  );
}

export default async function PanelDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (profile && !profile.onboarding_completed) {
    redirect("/panel/onboarding");
  }

  const userId = user.id;
  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Zirveci";

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
        Gösterge Paneli
      </h1>

      <DashboardWelcome userName={userName} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense
          fallback={
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          }
        >
          <StatsCards userId={userId} />
          <DashboardCoins />
        </Suspense>
      </div>

      <DashboardQuickAccess />

      <Suspense
        fallback={
          <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-20 w-full" />
          </div>
        }
      >
        <BookEcosystemSection userId={userId} />
      </Suspense>

      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-32 w-full" />
            </div>
          }
        >
          <WeeklyChartSection userId={userId} />
        </Suspense>
        <Suspense
          fallback={
            <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-24 w-full" />
            </div>
          }
        >
          <StreakCalendarSection userId={userId} />
        </Suspense>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col">
          <h2 className="font-display text-lg font-semibold mb-4 text-dz-black dark:text-dz-white">
            Günlük Görevler
          </h2>
          <Suspense
            fallback={
              <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 flex-1">
                <div className="animate-pulse space-y-3">
                  <div className="h-10 rounded-lg bg-dz-grey-200 dark:bg-dz-grey-800" />
                  <div className="h-8 w-3/4 rounded-lg bg-dz-grey-200 dark:bg-dz-grey-800" />
                </div>
              </div>
            }
          >
            <DailyTasksSection userId={userId} />
          </Suspense>
        </section>

        <section className="flex flex-col">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-24 w-full" />
              </div>
            }
          >
            <PromptChallengeSection userId={userId} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
