import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import KitapListesi from "@/components/panel/books/KitapListesi";

export default async function KitapPage() {
  const supabase = await createClient();
  const { data: books } = await supabase
    .from("books")
    .select("id, slug, title, description, sort_order")
    .order("sort_order");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let userBookIds: string[] = [];
  if (user) {
    const { data: ub } = await supabase
      .from("user_books")
      .select("book_id")
      .eq("user_id", user.id);
    userBookIds = (ub ?? []).map((r) => r.book_id);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
        Eğitim Ekosistemi
      </h1>
      <p className="text-dz-grey-600 dark:text-dz-grey-400">
        AI Liderliğine giden 10 aşamalı yolu keşfet, modülleri tamamla ve yetkinliğini kanıtla.
      </p>
      <KitapListesi books={books ?? []} userBookIds={userBookIds} />
    </div>
  );
}
