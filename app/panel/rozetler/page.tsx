import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/server";

const RozetlerPageClient = dynamic(
  () => import("./RozetlerPageClient"),
  {
    loading: () => (
      <div className="animate-pulse space-y-8">
        <div className="h-40 rounded-3xl bg-dz-grey-200 dark:bg-dz-grey-800" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900" />
          ))}
        </div>
      </div>
    ),
  }
);

export default async function RozetlerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [badgesRes, userBadgesRes] = await Promise.all([
    supabase.from("badges").select("id, slug, name, description, icon_emoji, xp_required").order("xp_required"),
    supabase.from("user_badges").select("badge_id").eq("user_id", user.id),
  ]);

  const badges = badgesRes.data ?? [];
  const earnedBadgeIds = (userBadgesRes.data ?? []).map((r) => r.badge_id);

  return <RozetlerPageClient badges={badges} earnedBadgeIds={earnedBadgeIds} />;
}

