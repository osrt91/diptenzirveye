import { createClient } from "@/lib/supabase/server";
import AdminPromptsClient from "@/components/admin/AdminPromptsClient";

export default async function AdminPromptsPage() {
    const supabase = await createClient();

    const { data: prompts } = await supabase
        .from("prompts")
        .select(`
      id,
      title,
      content,
      category,
      upvote_count,
      created_at,
      user_id,
      profiles:user_id(display_name)
    `)
        .order("created_at", { ascending: false })
        .limit(100);

    return <AdminPromptsClient initialPrompts={prompts ?? []} />;
}
