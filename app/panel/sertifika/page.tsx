import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { xpToLevel } from "@/lib/xp";
import CertificateClient from "@/components/panel/certificate/CertificateClient";

export const metadata = {
  title: "Sertifikalarım | DiptenZirveye",
};

export default async function SertifikaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Zirveci";

  const [progressRes, completedBooksRes] = await Promise.all([
    supabase
      .from("user_progress")
      .select("total_xp")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("user_books")
      .select("book_id, completed_at, book:books(id, title)")
      .eq("user_id", user.id)
      .not("completed_at", "is", null)
      .order("completed_at", { ascending: false }),
  ]);

  const totalXp = progressRes.data?.total_xp ?? 0;
  const level = xpToLevel(totalXp);

  type UserBookRow = {
    book_id: string;
    completed_at: string;
    book: { id: string; title: string } | { id: string; title: string }[] | null;
  };

  const completedBooks = (completedBooksRes.data ?? []).map((item: UserBookRow) => {
    const book = Array.isArray(item.book) ? item.book[0] : item.book;
    return {
      id: book?.id ?? item.book_id,
      title: book?.title ?? "Bilinmeyen Kitap",
      completed_at: item.completed_at,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Sertifikalarım
        </h1>
      </div>
      <CertificateClient
        userName={userName}
        userId={user.id}
        completedBooks={completedBooks}
        totalXp={totalXp}
        level={level}
      />
    </div>
  );
}
