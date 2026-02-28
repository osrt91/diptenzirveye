import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SiralamaListe from "@/components/panel/gamification/SiralamaListe";

const LIMIT = 50;

export default async function SiralamaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: rows, error } = await supabase.rpc("get_leaderboard", { lim: LIMIT });

  if (error) {
    return (
      <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 text-center text-dz-grey-600 dark:text-dz-grey-400">
        Sıralama yüklenemedi. Supabase’de supabase-leaderboard-chat-extras.sql çalıştırıldı mı?
      </div>
    );
  }

  const list = (rows ?? []) as { rank: number; user_id: string; display_name: string; total_xp: number; level: number }[];
  const currentUserId = user.id;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
        Liderlik Tablosu
      </h1>
      <p className="text-dz-grey-600 dark:text-dz-grey-400">
        En çok XP toplayan öğrenciler. Motive ol, kitapları bitir, görevleri tamamla.
      </p>
      <SiralamaListe list={list} currentUserId={currentUserId} />
    </div>
  );
}
