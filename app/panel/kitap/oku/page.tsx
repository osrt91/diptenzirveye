import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ContentProtection from "@/components/panel/core/ContentProtection";

const KitapOkuyucu = dynamic(
  () => import("@/components/panel/books/KitapOkuyucu"),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-lg bg-dz-grey-200 dark:bg-dz-grey-800" />
        <div className="h-[60vh] rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-100/50 dark:bg-dz-grey-900/50" />
      </div>
    ),
  }
);

export default async function KitapOkuPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string }>;
}) {
  const { book: slug } = await searchParams;
  if (!slug) redirect("/panel/kitap");

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books")
    .select("id, slug, title")
    .eq("slug", slug)
    .single();
  if (!book) redirect("/panel/kitap");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: userBook } = await supabase
    .from("user_books")
    .select("current_chapter")
    .eq("user_id", user.id)
    .eq("book_id", book.id)
    .single();

  const chapter = userBook?.current_chapter ?? 1;

  return (
    <div className="max-w-3xl mx-auto">
      <ContentProtection>
        <KitapOkuyucu
          bookId={book.id}
          bookSlug={book.slug}
          title={book.title}
          currentChapter={chapter}
          userId={user.id}
        />
      </ContentProtection>
    </div>
  );
}
