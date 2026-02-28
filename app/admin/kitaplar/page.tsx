import { createClient } from "@/lib/supabase/server";
import AdminBooksClient from "@/components/admin/AdminBooksClient";

export default async function AdminBooksPage() {
    const supabase = await createClient();

    const { data: books } = await supabase
        .from("books")
        .select("*")
        .order("sort_order", { ascending: true });

    return <AdminBooksClient initialBooks={books ?? []} />;
}
