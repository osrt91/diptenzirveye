"use client";

import { motion } from "framer-motion";

type Row = {
  rank: number;
  user_id: string;
  display_name: string;
  total_xp: number;
  level: number;
};

export default function SiralamaListe({
  list,
  currentUserId,
}: {
  list: Row[];
  currentUserId: string;
}) {
  if (list.length === 0) {
    return (
      <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 text-center text-dz-grey-500">
        Henüz sıralama verisi yok. İlk XP’ni kazan, listede yerini al.
      </div>
    );
  }

  return (
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
          <tbody>
            {list.map((row, i) => {
              const isCurrentUser = row.user_id === currentUserId;
              return (
                <motion.tr
                  key={row.user_id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`border-b border-dz-grey-100 dark:border-dz-grey-800 ${
                    isCurrentUser ? "bg-dz-orange-50 dark:bg-dz-orange-900/20" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-dz-grey-600 dark:text-dz-grey-400">
                    {row.rank >= 1 && row.rank <= 3 ? ["🥇", "🥈", "🥉"][row.rank - 1] : row.rank}
                  </td>
                  <td className="px-4 py-3 font-medium text-dz-black dark:text-dz-white">
                    {row.display_name}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs text-dz-orange-600 dark:text-dz-orange-400">
                        (sen)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-dz-orange-500">
                    {row.total_xp} XP
                  </td>
                  <td className="px-4 py-3 text-dz-grey-600 dark:text-dz-grey-400">
                    {row.level}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
