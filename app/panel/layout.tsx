import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import PanelShell from "@/components/panel/core/PanelShell";
import PageTransition from "@/components/PageTransition";
import { getTrackingScripts } from "@/lib/site-settings";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const admin = await isAdmin();
  if (admin) redirect("/admin");

  const tracking = await getTrackingScripts();
  const chatbotConfig = {
    chatbotEnabled: tracking.chatbotEnabled,
    welcomeMessage: tracking.chatbotWelcomeMessage,
  };

  return <PanelShell user={user} chatbotConfig={chatbotConfig}><PageTransition>{children}</PageTransition></PanelShell>;
}
