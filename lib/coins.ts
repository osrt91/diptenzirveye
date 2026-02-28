export const COIN_REWARDS = {
  book_complete: 20,
  quiz_perfect: 15,
  streak_7_days: 10,
  streak_30_days: 50,
  daily_challenge: 5,
  referral: 25,
  pomodoro_milestone_10: 5,
  pomodoro_milestone_50: 20,
  badge_earned: 5,
  community_helpful: 5,
} as const;

export type CoinAction = keyof typeof COIN_REWARDS;

export const SHOP_ITEMS = [
  {
    id: "avatar-frame-gold",
    name: "Altın Avatar Çerçevesi",
    description: "Profilinde altın rengi çerçeve",
    price: 50,
    category: "cosmetic" as const,
    icon: "👑",
  },
  {
    id: "avatar-frame-flame",
    name: "Ateş Avatar Çerçevesi",
    description: "Ateş efektli profil çerçevesi",
    price: 75,
    category: "cosmetic" as const,
    icon: "🔥",
  },
  {
    id: "username-orange",
    name: "Turuncu Kullanıcı Adı",
    description: "Sıralama ve sohbette turuncu isim rengi",
    price: 100,
    category: "cosmetic" as const,
    icon: "🎨",
  },
  {
    id: "streak-shield",
    name: "Streak Koruma Kalkanı",
    description: "1 gün boyunca streak kırılmasını engeller",
    price: 15,
    category: "boost" as const,
    icon: "🛡️",
  },
  {
    id: "xp-boost-24h",
    name: "XP Boost (%25)",
    description: "24 saat boyunca %25 fazla XP kazan",
    price: 50,
    category: "boost" as const,
    icon: "⚡",
  },
  {
    id: "ai-coach-extra-10",
    name: "AI Koç Ekstra Soru (10)",
    description: "AI Koça 10 ekstra soru hakkı",
    price: 20,
    category: "feature" as const,
    icon: "🤖",
  },
  {
    id: "bonus-prompts",
    name: "Bonus Prompt Paketi",
    description: "10 adet özel prompt'a erişim",
    price: 30,
    category: "content" as const,
    icon: "💡",
  },
  {
    id: "exclusive-worksheet",
    name: "Özel Çalışma Kağıdı",
    description: "Premium çalışma kağıtlarına erişim",
    price: 40,
    category: "content" as const,
    icon: "📝",
  },
] as const;

export type ShopItem = (typeof SHOP_ITEMS)[number];
export type ShopCategory = ShopItem["category"];

export function getCoinReward(action: CoinAction): number {
  return COIN_REWARDS[action];
}
