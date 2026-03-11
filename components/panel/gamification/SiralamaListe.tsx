"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

type Row = {
  rank: number;
  user_id: string;
  display_name: string;
  total_xp: number;
  level: number;
};

const REFRESH_INTERVAL_MS = 60_000;

export default function SiralamaListe({
  list: initialList,
  currentUserId,
}: {
  list: Row[];
  currentUserId: string;
}) {
  const [list, setList] = useState<Row[]>(initialList);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previousRanks, setPreviousRanks] = useState<Map<string, number>>(
    () => new Map(initialList.map((r) => [r.user_id, r.rank]))
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("get_leaderboard", {
        lim: 50,
      });
      if (!error && data) {
        const newList = data as Row[];
        setPreviousRanks(new Map(list.map((r) => [r.user_id, r.rank])));
        setList(newList);
        setLastUpdated(new Date());
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [list]);

  useEffect(() => {
    const supabase = createClient();

    // Realtime subscription to user_progress table
    const channel = supabase
      .channel("leaderboard-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_progress" },
        () => {
          fetchLeaderboard();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "user_progress" },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    // Polling fallback every 60 seconds
    intervalRef.current = setInterval(fetchLeaderboard, REFRESH_INTERVAL_MS);

    return () => {
      supabase.removeChannel(channel);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchLeaderboard]);

  const getRankChange = (userId: string, currentRank: number) => {
    const prev = previousRanks.get(userId);
    if (prev === undefined) return "new";
    if (prev > currentRank) return "up";
    if (prev < currentRank) return "down";
    return "same";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Find current user's row if they are outside visible range
  const currentUserRow = list.find((r) => r.user_id === currentUserId);

  if (list.length === 0) {
    return (
      <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 text-center text-dz-grey-500">
        Henüz sıralama verisi yok. İlk XP'ni kazan, listede yerini al.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Current user rank highlight card */}
      {currentUserRow && (
        <div className="rounded-xl border-2 border-dz-orange-400 dark:border-dz-orange-600 bg-dz-orange-50 dark:bg-dz-orange-900/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dz-orange-500 text-white font-display font-bold text-lg">
              {currentUserRow.rank}
            </span>
            <div>
              <p className="font-display font-semibold text-dz-black dark:text-dz-white">
                Senin Sıran
              </p>
              <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400">
                {currentUserRow.total_xp} XP &middot; Seviye{" "}
                {currentUserRow.level}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-2xl text-dz-orange-500">
              #{currentUserRow.rank}
            </p>
            <p className="text-xs text-dz-grey-500">/ {list.length}</p>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-dz-grey-500 dark:text-dz-grey-400 px-1">
        <span>
          Son güncelleme: {formatTime(lastUpdated)}
        </span>
        <span className="flex items-center gap-1.5">
          {isRefreshing ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin text-dz-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Güncelleniyor...</span>
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              <span>Canlı</span>
            </>
          )}
        </span>
      </div>

      {/* Leaderboard table */}
      <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-100/50 dark:bg-dz-grey-900/50">
                <th className="px-4 py-3 font-display font-semibold text-dz-black dark:text-dz-white w-16">
                  #
                </th>
                <th className="px-4 py-3 font-display font-semibold text-dz-black dark:text-dz-white">
                  İsim
                </th>
                <th className="px-4 py-3 font-display font-semibold text-dz-orange-500">
                  XP
                </th>
                <th className="px-4 py-3 font-display font-semibold text-dz-grey-600 dark:text-dz-grey-400">
                  Seviye
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="popLayout">
              <tbody>
                {list.map((row, i) => {
                  const isCurrentUser = row.user_id === currentUserId;
                  const rankChange = getRankChange(row.user_id, row.rank);
                  return (
                    <motion.tr
                      key={row.user_id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ delay: i * 0.02, layout: { duration: 0.3 } }}
                      className={`border-b border-dz-grey-100 dark:border-dz-grey-800 transition-colors duration-300 ${
                        isCurrentUser
                          ? "bg-dz-orange-50 dark:bg-dz-orange-900/20 ring-1 ring-inset ring-dz-orange-300 dark:ring-dz-orange-700"
                          : "hover:bg-dz-grey-50 dark:hover:bg-dz-grey-900/30"
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-dz-grey-600 dark:text-dz-grey-400">
                        <span className="inline-flex items-center gap-1">
                          {row.rank >= 1 && row.rank <= 3
                            ? ["🥇", "🥈", "🥉"][row.rank - 1]
                            : row.rank}
                          {rankChange === "up" && (
                            <span
                              className="text-green-500 text-xs"
                              title="Sıralama yükseldi"
                              aria-label="Sıralama yükseldi"
                            >
                              ▲
                            </span>
                          )}
                          {rankChange === "down" && (
                            <span
                              className="text-red-500 text-xs"
                              title="Sıralama düştü"
                              aria-label="Sıralama düştü"
                            >
                              ▼
                            </span>
                          )}
                          {rankChange === "new" && (
                            <span
                              className="text-dz-orange-500 text-xs font-bold"
                              title="Yeni giriş"
                              aria-label="Yeni giriş"
                            >
                              ★
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-dz-black dark:text-dz-white">
                        {row.display_name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs font-semibold text-dz-orange-600 dark:text-dz-orange-400 bg-dz-orange-100 dark:bg-dz-orange-900/40 px-1.5 py-0.5 rounded-full">
                            sen
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-dz-orange-500">
                        <motion.span
                          key={row.total_xp}
                          initial={{ scale: 1.2, color: "#f97316" }}
                          animate={{ scale: 1, color: undefined }}
                          transition={{ duration: 0.4 }}
                        >
                          {row.total_xp.toLocaleString("tr-TR")} XP
                        </motion.span>
                      </td>
                      <td className="px-4 py-3 text-dz-grey-600 dark:text-dz-grey-400">
                        {row.level}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </div>
  );
}
