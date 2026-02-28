import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/server";
import CalismaKagitlariListe from "@/components/panel/worksheets/CalismaKagitlariListe";

const InteraktifSablon = dynamic(
  () => import("@/components/panel/worksheets/InteraktifSablon"),
  {
    loading: () => (
      <div className="animate-pulse grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800" />
        <div className="h-40 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800" />
        <div className="h-40 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800" />
      </div>
    ),
  }
);

export default async function CalismaKagitlariPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: sheets } = await supabase
    .from("study_sheets")
    .select("id, title, content, created_at, book_id")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const bookIds = [...new Set((sheets ?? []).map((s) => s.book_id).filter(Boolean))] as string[];
  let booksMap = new Map<string, string>();
  if (bookIds.length > 0) {
    const { data: books } = await supabase.from("books").select("id, title").in("id", bookIds);
    booksMap = new Map((books ?? []).map((b) => [b.id, b.title]));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Performans Kalibrasyon Merkezi
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-1">
          Nexus Protocol, Momentum Spectrum ve Chaos Filter şablonlarıyla stratejilerini oluştur.
        </p>
      </div>

      {/* İnteraktif Şablonlar */}
      <InteraktifSablon />

      {/* Mevcut Çalışma Kağıtları */}
      <div className="border-t border-dz-grey-200 dark:border-dz-grey-800 pt-6">
        <div className="mb-4">
          <h3 className="font-display font-bold text-dz-black dark:text-dz-white">
            📝 Serbest Çalışma Kağıtları
          </h3>
          <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 mt-1">
            Öğrendiklerini pekiştirmek, serbest notlar almak veya kendi çalışma yapını kurmak için boş sayfalar oluştur.
          </p>
        </div>
        <CalismaKagitlariListe
          sheets={sheets ?? []}
          booksMap={booksMap}
          userId={user.id}
        />
      </div>
    </div>
  );
}
