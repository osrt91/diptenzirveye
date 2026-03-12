"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, ShoppingBag, Sparkles, Shield, Zap, Gift } from "lucide-react";
import { useCoins } from "@/lib/hooks/useCoins";
import { SHOP_ITEMS, type ShopCategory } from "@/lib/coins";
import { useToast } from "@/components/ui/Toast";

const CATEGORIES: { id: ShopCategory | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Tümü", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "cosmetic", label: "Görsel", icon: <Sparkles className="w-4 h-4" /> },
  { id: "boost", label: "Boost", icon: <Zap className="w-4 h-4" /> },
  { id: "feature", label: "Özellik", icon: <Gift className="w-4 h-4" /> },
  { id: "content", label: "İçerik", icon: <Shield className="w-4 h-4" /> },
];

export default function CoinShopPage() {
  const { balance, loading, spendCoins } = useCoins();
  const { addToast } = useToast();
  const [category, setCategory] = useState<ShopCategory | "all">("all");
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const filtered = category === "all"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => item.category === category);

  async function handlePurchase(itemId: string, price: number, name: string) {
    if (balance < price) {
      addToast("Yetersiz DZ Coin bakiyesi!", "error");
      return;
    }
    setPurchasing(itemId);
    const success = await spendCoins(price, itemId);
    setPurchasing(null);
    if (success) {
      addToast(`${name} satın alındı!`, "success");
    } else {
      addToast("Satın alma başarısız oldu.", "error");
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black text-dz-black dark:text-dz-white">
            DZ Coin Mağazası
          </h1>
          <p className="text-dz-grey-500 text-sm mt-1">Coinlerini harca, özel avantajlar kazan</p>
        </div>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3 bg-gradient-to-r from-dz-amber-500/10 to-dz-orange-500/10 border border-dz-amber-500/30 px-5 py-3 rounded-2xl"
        >
          <Coins className="w-6 h-6 text-dz-amber-500" />
          <div>
            <p className="font-mono text-xs text-dz-grey-500 uppercase tracking-wider">Bakiye</p>
            <p className="font-display text-2xl font-black text-dz-amber-500">
              {loading ? "—" : balance}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              category === cat.id
                ? "bg-dz-orange-500 text-white shadow-lg shadow-dz-orange-500/25"
                : "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-300 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => {
            const canAfford = balance >= item.price;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-5 flex flex-col hover:border-dz-orange-500/40 hover:shadow-lg hover:shadow-dz-orange-500/10 transition-all group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-dz-black dark:text-dz-white mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-dz-grey-500 mb-4 flex-1">{item.description}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-dz-grey-200 dark:border-dz-grey-800">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-dz-amber-500" />
                    <span className="font-display font-black text-dz-amber-500">{item.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePurchase(item.id, item.price, item.name)}
                    disabled={!canAfford || purchasing === item.id}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      canAfford
                        ? "bg-dz-orange-500 hover:bg-dz-orange-600 text-white shadow-sm shadow-dz-orange-500/20"
                        : "bg-dz-grey-200 dark:bg-dz-grey-700 text-dz-grey-400 cursor-not-allowed"
                    }`}
                  >
                    {purchasing === item.id ? "..." : canAfford ? "Satın Al" : "Yetersiz"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Earning Guide */}
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-50 dark:bg-dz-grey-900 p-6">
        <h3 className="font-display font-bold text-lg text-dz-black dark:text-dz-white mb-4">
          DZ Coin Nasıl Kazanılır?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { action: "Kitap Tamamla", coins: 20, icon: "📚" },
            { action: "Quiz %100", coins: 15, icon: "🧠" },
            { action: "7 Gün Streak", coins: 10, icon: "🔥" },
            { action: "30 Gün Streak", coins: 50, icon: "⚡" },
            { action: "Günlük Challenge", coins: 5, icon: "🎯" },
            { action: "Arkadaş Davet", coins: 25, icon: "👥" },
            { action: "Rozet Kazan", coins: 5, icon: "🏆" },
            { action: "50 Pomodoro", coins: 20, icon: "⏱" },
          ].map((item) => (
            <div
              key={item.action}
              className="flex items-center gap-3 bg-dz-white dark:bg-dz-grey-800 rounded-xl px-4 py-3 border border-dz-grey-200 dark:border-dz-grey-700"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 text-sm text-dz-grey-600 dark:text-dz-grey-300">
                {item.action}
              </span>
              <span className="flex items-center gap-1 font-display font-bold text-dz-amber-500">
                +{item.coins} <Coins className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
