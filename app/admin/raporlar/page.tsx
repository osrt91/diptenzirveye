import { createClient } from "@/lib/supabase/server";
import AdminReportsClient from "@/components/admin/AdminReportsClient";

export default async function AdminReportsPage() {
    const supabase = await createClient();
    const { data: reports } = await supabase.rpc("admin_list_reports", { lim: 50 });

    return <AdminReportsClient initialReports={reports ?? []} />;
}
