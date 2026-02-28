import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PanelShell from "@/components/panel/core/PanelShell";
import PageTransition from "@/components/PageTransition";

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

  return <PanelShell user={user}><PageTransition>{children}</PageTransition></PanelShell>;
}
