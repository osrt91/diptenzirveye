import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Panel | DiptenZirveye",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdmin();
  if (!admin) redirect("/panel");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  return <AdminShell user={user}>{children}</AdminShell>;
}
