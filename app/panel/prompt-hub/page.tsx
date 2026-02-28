import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const PromptHub = dynamic(
  () => import("@/components/panel/chat/PromptHub"),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-40 rounded-3xl bg-dz-grey-200 dark:bg-dz-grey-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="h-48 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900" />
          <div className="h-48 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900" />
        </div>
      </div>
    ),
  }
);

export default async function PromptHubPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/giris");

    const [promptsRes, votesRes] = await Promise.all([
        supabase
            .from("prompts")
            .select("id, title, content, category, upvote_count, created_at")
            .order("upvote_count", { ascending: false })
            .limit(100),
        supabase
            .from("prompt_votes")
            .select("prompt_id")
            .eq("user_id", user.id),
    ]);

    const prompts = promptsRes.data ?? [];
    const userVotedIds = (votesRes.data ?? []).map((v) => v.prompt_id);

    return (
        <PromptHub
            initialPrompts={prompts}
            userVotedIds={userVotedIds}
            userId={user.id}
        />
    );
}
