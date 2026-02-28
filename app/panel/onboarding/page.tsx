import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingWizard from "@/components/panel/onboarding/OnboardingWizard";

export const metadata = {
  title: "Hoş Geldin | DiptenZirveye",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/giris");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_completed) {
    redirect("/panel");
  }

  const userName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Zirveci";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <OnboardingWizard
          userId={user.id}
          userName={userName}
          userEmail={user.email || ""}
        />
      </div>
    </div>
  );
}
