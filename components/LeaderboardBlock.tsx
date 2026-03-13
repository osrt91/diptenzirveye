import { getSupabase } from "@/lib/supabase";
import Link from "next/link";

const TOP = 5;

const MEDALS = ["🥇", "🥈", "🥉"];

type LeaderboardRow = {
  rank: number;
  display_name: string;
  total_xp: number;
  level: number;
};

const DEMO_USERS: LeaderboardRow[] = [
  { rank: 1, display_name: "Ahmet K.", total_xp: 4_820, level: 48 },
  { rank: 2, display_name: "Zeynep T.", total_xp: 3_650, level: 36 },
  { rank: 3, display_name: "Emre D.", total_xp: 2_980, level: 29 },
  { rank: 4, display_name: "Elif S.", total_xp: 2_340, level: 23 },
  { rank: 5, display_name: "Burak M.", total_xp: 1_750, level: 17 },
];

export default async function LeaderboardBlock() {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: rows } = await supabase.rpc("get_leaderboard", { lim: TOP });
  const real = (rows ?? []) as LeaderboardRow[];

  // Fill with demo users when real data is sparse
  const list: LeaderboardRow[] = [];
  for (let i = 0; i < TOP; i++) {
    if (i < real.length && real[i].total_xp > 0) {
      list.push({ ...real[i], rank: i + 1 });
    } else {
      list.push(DEMO_USERS[i]);
    }
  }

  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dz-orange-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/20 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6">
          Canlı Sıralama
        </div>

        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-dz-black dark:text-dz-white mb-4 tracking-tight">
          Liderlik <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">Tablosu</span>
        </h2>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mb-10 text-lg max-w-xl mx-auto">
          Kitapları bitir, görevleri tamamla, XP kazan ve zirveye tırman. İlk sıra seni bekliyor.
        </p>

        {list.length > 0 ? (
          <div className="space-y-3 mb-10">
            {list.map((row) => {
              const isMedal = row.rank <= 3;
              return (
                <div
                  key={row.rank}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    isMedal
                      ? "bg-dz-white dark:bg-dz-white/[0.05] border border-dz-orange-300/50 dark:border-dz-orange-500/20 shadow-lg shadow-dz-orange-500/5"
                      : "bg-dz-grey-100/80 dark:bg-dz-grey-900/50 border border-dz-grey-200 dark:border-dz-white/5"
                  }`}
                >
                  <span className={`text-2xl w-10 text-center ${isMedal ? "" : "font-mono text-dz-grey-400 text-base"}`}>
                    {isMedal ? MEDALS[row.rank - 1] : `${row.rank}.`}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 flex items-center justify-center shadow-md shrink-0">
                    <span className="font-display font-bold text-white text-xs">
                      {row.display_name?.slice(0, 2)?.toUpperCase() ?? "??"}
                    </span>
                  </div>

                  <div className="flex-1 text-left">
                    <p className="font-semibold text-dz-black dark:text-dz-white">{row.display_name}</p>
                    <p className="text-xs text-dz-grey-500">Seviye {row.level}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-display font-bold text-dz-orange-500 text-lg">{row.total_xp.toLocaleString("tr-TR")}</p>
                    <p className="text-[10px] text-dz-grey-500 uppercase tracking-wider font-bold">XP</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-dz-grey-100/80 dark:bg-dz-grey-900/50 border border-dashed border-dz-grey-300 dark:border-dz-grey-700 rounded-2xl p-10 mb-10">
            <p className="text-dz-grey-500 text-lg font-medium mb-2">Henüz kimse sıralamada değil.</p>
            <p className="text-dz-grey-400 text-sm">İlk sırayı sen alabilirsin!</p>
          </div>
        )}

        <Link
          href="/kayit-ol"
          className="inline-flex items-center gap-2 rounded-2xl bg-dz-orange-500 px-8 py-4 font-bold text-white text-lg hover:bg-dz-orange-600 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] hover:scale-[1.03] transform"
        >
          Hemen Katıl ve XP Topla
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
