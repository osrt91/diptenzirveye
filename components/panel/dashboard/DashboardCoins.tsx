"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Coins, ShoppingBag } from "lucide-react";
import { useCoins } from "@/lib/hooks/useCoins";

export default function DashboardCoins() {
  const { balance, loading } = useCoins();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white/80 dark:bg-dz-white/[0.03] backdrop-blur-xl p-6 relative overflow-hidden group hover:border-dz-amber-300 dark:hover:border-dz-amber-500/30 transition-all duration-300"
    >
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-dz-amber-500/10 blur-[30px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-dz-grey-500 mb-1">DZ Coin</p>
          <motion.p
            key={balance}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-3xl font-black text-dz-amber-500"
          >
            {loading ? "—" : balance}
          </motion.p>
          <p className="text-xs text-dz-grey-400 mt-1">
            {balance === 0 ? "İlk coinlerini kazan!" : "Mağazada harca"}
          </p>
        </div>
        <Link
          href="/panel/coin-shop"
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-dz-amber-400 to-dz-orange-500 flex items-center justify-center text-white shadow-lg shadow-dz-amber-500/30 hover:scale-105 transition-transform"
        >
          <ShoppingBag className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
}
