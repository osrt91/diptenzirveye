import { createClient } from "@/lib/supabase/server";
import TestEkraniClient from "@/components/panel/test/TestEkraniClient";

export const dynamic = "force-dynamic";

export default async function TestPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const envOk =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let dbLeaderboard: "ok" | "fail" | "skip" = "skip";
  let dbChatRooms: "ok" | "fail" | "skip" = "skip";
  let dbBooks: "ok" | "fail" | "skip" = "skip";

  if (envOk) {
    const [lb, rooms, books] = await Promise.all([
      supabase.rpc("get_leaderboard", { lim: 1 }).then((r) => (r.error ? "fail" : "ok")),
      supabase.from("chat_rooms").select("id").limit(1).then((r) => (r.error ? "fail" : "ok")),
      supabase.from("books").select("id").limit(1).then((r) => (r.error ? "fail" : "ok")),
    ]);
    dbLeaderboard = lb;
    dbChatRooms = rooms;
    dbBooks = books;
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white mb-1">
          Test ekranı
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 text-sm">
          İlk proje (Faz 1 + Faz 2) tamamlandı. Aşağıdan bağlantı ve özellikleri doğrulayabilirsin.
        </p>
      </div>

      <section className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4">
        <h2 className="font-display font-semibold text-dz-black dark:text-dz-white">
          Ortam ve bağlantı
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <StatusBadge ok={envOk} />
            <span>Supabase URL ve API anahtarı tanımlı</span>
          </li>
          <li className="flex items-center gap-2">
            <StatusBadge ok={dbLeaderboard === "ok"} skip={dbLeaderboard === "skip"} />
            <span>Leaderboard (get_leaderboard)</span>
          </li>
          <li className="flex items-center gap-2">
            <StatusBadge ok={dbChatRooms === "ok"} skip={dbChatRooms === "skip"} />
            <span>Sohbet odaları (chat_rooms)</span>
          </li>
          <li className="flex items-center gap-2">
            <StatusBadge ok={dbBooks === "ok"} skip={dbBooks === "skip"} />
            <span>Kitaplar (books)</span>
          </li>
          <li className="flex items-center gap-2">
            <StatusBadge ok={!!user} />
            <span>Oturum: {user ? user.email : "Yok"}</span>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 space-y-4">
        <h2 className="font-display font-semibold text-dz-black dark:text-dz-white">
          Proje özellikleri (Faz 1 + Faz 2)
        </h2>
        <ul className="grid gap-2 text-sm">
          {[
            { label: "Landing + bekleme listesi", path: "/" },
            { label: "Kayıt / giriş / e-posta doğrulama", path: "/giris" },
            { label: "Dashboard (XP, seri, görevler)", path: "/panel" },
            { label: "Kitaplar + okuma", path: "/panel/kitap" },
            { label: "Çalışma kağıtları", path: "/panel/calisma-kagitlari" },
            { label: "Rozetler", path: "/panel/rozetler" },
            { label: "Zihin Motoru (Focus Engine)", path: "/panel/pomodoro" },
            { label: "Eylem İvmesi Serisi", path: "/panel/erteleme" },
            { label: "Not defteri", path: "/panel/not-defteri" },
            { label: "Anonim sohbet (oda seçici)", path: "/panel/sohbet" },
            { label: "Liderlik tablosu", path: "/panel/siralama" },
            { label: "Mesaj raporlama", path: "/panel/sohbet" },
            { label: "Landing sıralama bloğu", path: "/" },
          ].map(({ label, path }) => (
            <li key={path + label} className="flex items-center justify-between">
              <span className="text-dz-grey-700 dark:text-dz-grey-300">{label}</span>
              <a
                href={path}
                className="text-dz-orange-500 hover:underline shrink-0 ml-2"
              >
                Aç →
              </a>
            </li>
          ))}
        </ul>
      </section>

      <TestEkraniClient />
    </div>
  );
}

function StatusBadge({
  ok,
  skip,
}: {
  ok: boolean;
  skip?: boolean;
}) {
  if (skip) {
    return (
      <span className="rounded px-1.5 py-0.5 text-xs bg-dz-grey-200 dark:bg-dz-grey-700 text-dz-grey-500">
        —
      </span>
    );
  }
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-xs ${ok
          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
          : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
        }`}
    >
      {ok ? "OK" : "Hata"}
    </span>
  );
}
