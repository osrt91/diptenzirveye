import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import NotEditor from "@/components/panel/notebook/NotEditor";

export default async function NotDefteriDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: note } = await supabase
    .from("notes")
    .select("id, title, content")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!note) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <NotEditor
        id={note.id}
        initialTitle={note.title}
        initialContent={note.content ?? ""}
      />
    </div>
  );
}
