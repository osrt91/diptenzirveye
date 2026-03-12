import { createClient } from "@/lib/supabase/server";
import NotDefteriListe from "@/components/panel/notebook/NotDefteriListe";

export default async function NotDefteriPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Tüm notları çek
  const { data: notes } = await supabase
    .from("notes")
    .select("id, title, content, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  // Kullanıcının sahip olduğu kitapları/modülleri çek
  const { data: userBooksRes } = await supabase
    .from("user_books")
    .select("book_id, book:books(title)")
    .eq("user_id", user.id);

  const userBooks = (userBooksRes ?? []).map(ub => {
    const bookObj = ub.book as { title?: string } | { title?: string }[] | null;
    const title = Array.isArray(bookObj) ? bookObj[0]?.title : bookObj?.title;
    return {
      id: ub.book_id,
      title: title || "Bilinmeyen Modül"
    };
  });

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[600px] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white flex items-center gap-3">
          Akıllı Not Defteri
          <span className="px-2.5 py-1 text-[10px] uppercase font-black tracking-widest bg-gradient-to-r from-dz-orange-500 to-amber-500 text-white rounded-md shadow-sm">AI Destekli</span>
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-2 text-sm md:text-base max-w-2xl">
          Tüm notların yapay zeka tarafından analiz edilir ve otomatik olarak okuduğun kitapların/modüllerin bağlamına göre kategorize edilir.
        </p>
      </div>

      <NotDefteriListe notes={notes ?? []} userId={user.id} userBooks={userBooks} />
    </div>
  );
}
