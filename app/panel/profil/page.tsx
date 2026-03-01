import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfilClient from "@/components/panel/profile/ProfilClient";
import ReferralCard from "@/components/panel/profile/ReferralCard";
import TestimonialForm from "@/components/panel/profile/TestimonialForm";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Kullanıcı";

  const [progressRes, booksRes, pomodoroRes, notesRes, sheetsRes, badgesRes] =
    await Promise.all([
      supabase
        .from("user_progress")
        .select("total_xp, current_streak_days")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("user_books")
        .select("id")
        .eq("user_id", user.id)
        .not("completed_at", "is", null),
      supabase
        .from("pomodoro_sessions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true),
      supabase
        .from("notes")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("study_sheets")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("user_badges")
        .select("badge_id, badges(slug)")
        .eq("user_id", user.id),
    ]);

  const stats = {
    total_xp: progressRes.data?.total_xp ?? 0,
    current_streak_days: progressRes.data?.current_streak_days ?? 0,
    completed_books: booksRes.data?.length ?? 0,
    completed_pomodoros: pomodoroRes.count ?? 0,
    total_notes: notesRes.count ?? 0,
    total_sheets: sheetsRes.count ?? 0,
    member_since: user.created_at,
  };

  type UserBadgeRow = {
    badge_id: string;
    badges: { slug: string } | null;
  };

  const earnedBadgeSlugs = (badgesRes.data ?? [])
    .map((b: UserBadgeRow) => b.badges?.slug)
    .filter(Boolean) as string[];

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
        Profil
      </h1>
      <ProfilClient
        displayName={displayName}
        email={user.email ?? ""}
        stats={stats}
        earnedBadgeSlugs={earnedBadgeSlugs}
        avatarUrl={user.user_metadata?.avatar_url ?? null}
      />
      <ReferralCard userId={user.id} />
      <TestimonialForm userName={displayName} />
    </div>
  );
}

