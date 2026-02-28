import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DailyPromptChallenge from "@/components/panel/dashboard/DailyPromptChallenge";

export const metadata = {
  title: "Günlük Prompt Challenge | DiptenZirveye",
};

export default async function PromptChallengePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const challengeDay = dayOfYear % 14;

  const { data: submission } = await supabase
    .from("prompt_challenge_submissions")
    .select("content")
    .eq("user_id", user.id)
    .eq("challenge_day", challengeDay)
    .maybeSingle();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
        Günlük Prompt Challenge
      </h1>
      <DailyPromptChallenge
        userId={user.id}
        initialSubmission={submission?.content ?? null}
      />
    </div>
  );
}
