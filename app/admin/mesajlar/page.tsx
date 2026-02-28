import { createClient } from "@/lib/supabase/server";
import AdminMessagesClient from "@/components/admin/AdminMessagesClient";

export default async function AdminMessagesPage() {
    const supabase = await createClient();

    const { data: messages } = await supabase
        .from("chat_messages")
        .select(`
      id,
      content,
      created_at,
      user_id,
      room_id,
      chat_rooms(name),
      profiles:user_id(display_name)
    `)
        .order("created_at", { ascending: false })
        .limit(100);

    return <AdminMessagesClient initialMessages={messages ?? []} />;
}
