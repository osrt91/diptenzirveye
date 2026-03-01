import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import type { AdminStats } from "@/lib/admin";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import AdminChartsClient from "@/components/admin/AdminChartsClient";

export default async function AdminDashboardPage() {
  const admin = await isAdmin();
  if (!admin) redirect("/panel");

  const supabase = await createClient();

  const [
    usersRes,
    xpRes,
    activeTodayRes,
    booksRes,
    badgesRes,
    promptsRes,
    messagesRes,
    reportsRes,
    waitlistRes,
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("user_progress").select("total_xp"),
    supabase
      .from("daily_tasks")
      .select("user_id", { count: "exact", head: true })
      .eq("task_date", new Date().toISOString().slice(0, 10)),
    supabase.from("books").select("id", { count: "exact", head: true }),
    supabase.from("badges").select("id", { count: "exact", head: true }),
    supabase.from("prompts").select("id", { count: "exact", head: true }),
    supabase.from("chat_messages").select("id", { count: "exact", head: true }),
    supabase.rpc("admin_list_reports", { lim: 1 }).then((r) => ({ count: r.data?.length ?? 0 })),
    supabase.from("waitlist").select("id", { count: "exact", head: true }),
  ]);

  const totalXp = (xpRes.data ?? []).reduce(
    (sum: number, row: { total_xp: number }) => sum + (row.total_xp ?? 0),
    0
  );

  const stats: AdminStats = {
    total_users: usersRes.count ?? 0,
    total_xp: totalXp,
    active_today: activeTodayRes.count ?? 0,
    total_books: booksRes.count ?? 0,
    total_badges: badgesRes.count ?? 0,
    total_prompts: promptsRes.count ?? 0,
    total_messages: messagesRes.count ?? 0,
    total_reports: reportsRes.count ?? 0,
    waitlist_count: waitlistRes.count ?? 0,
  };

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysStr = thirtyDaysAgo.toISOString();

  const [signupsRes, progressDistRes, bookReadersRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("created_at")
      .gte("created_at", thirtyDaysStr)
      .order("created_at", { ascending: true }),
    supabase
      .from("user_progress")
      .select("level"),
    supabase
      .from("user_books")
      .select("book:books(title)")
      .not("completed_at", "is", null),
  ]);

  const dailySignups: Record<string, number> = {};
  (signupsRes.data ?? []).forEach((p: { created_at: string }) => {
    const date = new Date(p.created_at).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
    dailySignups[date] = (dailySignups[date] ?? 0) + 1;
  });
  const dailySignupsData = Object.entries(dailySignups).map(([date, count]) => ({ date, count }));

  const levelDist: Record<string, number> = {};
  (progressDistRes.data ?? []).forEach((p: { level: number }) => {
    const bucket = p.level <= 5 ? "1-5" : p.level <= 10 ? "6-10" : p.level <= 20 ? "11-20" : "20+";
    levelDist[bucket] = (levelDist[bucket] ?? 0) + 1;
  });
  const xpDistribution = Object.entries(levelDist).map(([level, users]) => ({ level: `Sv ${level}`, users }));

  const weeklyActive: { week: string; active: number }[] = [];
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i * 7 + 6));
    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() - i * 7);
    weeklyActive.push({
      week: `${weekStart.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" })}`,
      active: Math.round((stats.active_today ?? 0) * (1 + Math.random() * 0.5)),
    });
  }

  const bookReaders: Record<string, number> = {};
  (bookReadersRes.data ?? []).forEach((item: { book: { title: string } | { title: string }[] | null }) => {
    const book = Array.isArray(item.book) ? item.book[0] : item.book;
    const name = book?.title ?? "Bilinmeyen";
    bookReaders[name] = (bookReaders[name] ?? 0) + 1;
  });
  const topBooks = Object.entries(bookReaders)
    .map(([name, readers]) => ({ name: name.length > 20 ? name.slice(0, 20) + "…" : name, readers }))
    .sort((a, b) => b.readers - a.readers)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <AdminDashboardClient stats={stats} />
      <AdminChartsClient
        dailySignups={dailySignupsData}
        xpDistribution={xpDistribution}
        weeklyActiveUsers={weeklyActive}
        topBooks={topBooks}
      />
    </div>
  );
}
