import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CalismaKagidiEditor from "@/components/panel/worksheets/CalismaKagidiEditor";

export default async function CalismaKagidiPage({
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

  const { data: sheet } = await supabase
    .from("study_sheets")
    .select("id, title, content")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!sheet) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <CalismaKagidiEditor
        id={sheet.id}
        initialTitle={sheet.title}
        initialContent={sheet.content ?? ""}
      />
    </div>
  );
}
