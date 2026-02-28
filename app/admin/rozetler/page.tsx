import { createClient } from "@/lib/supabase/server";
import AdminBadgesClient from "@/components/admin/AdminBadgesClient";

export default async function AdminBadgesPage() {
    const supabase = await createClient();

    const { data: badges } = await supabase
        .from("badges")
        .select("*")
        .order("xp_required", { ascending: true });

    return <AdminBadgesClient initialBadges={badges ?? []} />;
}
