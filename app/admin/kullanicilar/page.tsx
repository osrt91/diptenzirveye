import { createClient } from "@/lib/supabase/server";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
    const supabase = await createClient();
    const { data: usersData } = await supabase.rpc("admin_list_users", {
        lim: 50,
        off: 0,
        search: "",
    });

    return <AdminUsersClient initialUsers={usersData ?? []} />;
}
