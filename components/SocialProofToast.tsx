"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, Award, BookOpen, TrendingUp, Star, Zap, BarChart3 } from "lucide-react";

const NAMES = [
  "Ahmet", "Mehmet", "Zeynep", "Elif", "Emre", "Selin", "Burak", "Kaan",
  "Defne", "Ali", "Fatma", "Can", "Deniz", "Ece", "Mert", "Ayşe",
  "Yusuf", "Hakan", "Berk", "Gizem", "Onur", "Seda", "Barış", "Nisa",
];

const SURNAMES = [
  "K.", "T.", "A.", "D.", "Y.", "B.", "Ç.", "E.", "G.", "M.", "S.", "Ö.", "İ.", "U.", "H.",
];

const CITIES = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Adana", "Trabzon",
  "Gaziantep", "Kayseri", "Eskişehir", "Mersin", "Samsun", "Diyarbakır",
];

const BOOKS = [
  "AI Devrimini Anlamak", "Prompt Mühendisliği", "AI Araçları Rehberi",
  "Ertelemeden Çıkış", "AI ile İlk Gelir", "İçerik İmparatorluğu",
  "Otomasyon Mimari", "AI ile Ölçek", "AI Liderliği", "Zirve Protokolü",
];

const BADGES = [
  "Hızlı Başlangıç", "AI Meraklısı", "Prompt Ustası", "Veri Savaşçısı",
  "Zirve Avcısı", "Hafta Yıldızı", "Süper Öğrenci", "Liderlik Rozeti",
];

const XP_AMOUNTS = [25, 50, 75, 100, 150, 200, 250, 300];

type ToastMessage = {
  type: "user_action" | "stat" | "badge" | "book" | "xp_gain" | "completion";
  text: string;
  subtext: string;
  initials: string;
  icon: "users" | "award" | "book" | "trending" | "star" | "zap" | "chart";
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMessage(): ToastMessage {
  const type = pick([
    "xp_gain", "xp_gain", "xp_gain",
    "completion", "completion",
    "user_action", "user_action",
    "badge",
    "book",
    "stat",
  ] as const);

  const name = pick(NAMES);
  const surname = pick(SURNAMES);
  const initials = name[0] + surname[0];
  const mins = randInt(1, 30);

  switch (type) {
    case "xp_gain": {
      const xp = pick(XP_AMOUNTS);
      const variants = [
        { text: `${name} ${surname} +${xp} XP kazandı`, sub: `${mins} dk önce` },
        { text: `${name} ${surname} Seviye ${randInt(2, 15)}'e yükseldi!`, sub: "Az önce" },
        { text: `${name} ${surname} ${randInt(3, 30)} günlük seri ile bonus XP`, sub: `${mins} dk önce` },
        { text: `${name} ${surname} günlük görevi tamamladı (+${xp} XP)`, sub: "Şimdi" },
      ];
      const v = pick(variants);
      return { type, text: v.text, subtext: v.sub, initials, icon: "zap" };
    }
    case "completion": {
      const pct = randInt(40, 95);
      const variants = [
        { text: `Proje Planlayıcı bu hafta %${pct} doluluk`, sub: "Haftalık rapor" },
        { text: `${randInt(10, 50)} öğrenci bu hafta kitap tamamladı`, sub: "Canlı" },
        { text: `AI Koç bu hafta ${randInt(100, 500)} soru cevapladı`, sub: "Platform aktivitesi" },
        { text: `Prompt Challenge %${pct} tamamlanma oranı`, sub: "Bu hafta" },
      ];
      const v = pick(variants);
      return { type, text: v.text, subtext: v.sub, initials: "DZ", icon: "chart" };
    }
    case "user_action": {
      const city = pick(CITIES);
      const actions = [
        { text: `${name} ${surname} Zirve Masterclass'a katıldı`, sub: `${mins} dakika önce` },
        { text: `${city}'dan bir kullanıcı teste başladı`, sub: `${mins} dk önce` },
        { text: `${name} ${surname} eğitim planını oluşturdu`, sub: "Şimdi" },
      ];
      const a = pick(actions);
      return { type, text: a.text, subtext: a.sub, initials, icon: "users" };
    }
    case "stat": {
      const stats = [
        { text: `Son 24 saatte ${randInt(8, 25)} yeni üye katıldı`, sub: "Bugün" },
        { text: `Bu hafta ${randInt(40, 120)} test tamamlandı`, sub: "Haftalık rapor" },
        { text: `Toplam ${randInt(2, 8)}.${randInt(1, 9)}00+ XP kazanıldı bugün`, sub: "Canlı" },
      ];
      const s = pick(stats);
      return { type, text: s.text, subtext: s.sub, initials: "DZ", icon: "star" };
    }
    case "badge": {
      const badge = pick(BADGES);
      return {
        type,
        text: `${name} ${surname} "${badge}" rozetini kazandı`,
        subtext: `${mins} dk önce`,
        initials,
        icon: "award",
      };
    }
    case "book": {
      const book = pick(BOOKS);
      return {
        type,
        text: `${name} ${surname} "${book}" kitabını tamamladı`,
        subtext: `${mins} dakika önce · Rozet kazandı 🎉`,
        initials,
        icon: "book",
      };
    }
  }
}

const ICON_MAP = {
  users: Users,
  award: Award,
  book: BookOpen,
  trending: TrendingUp,
  star: Star,
  zap: Zap,
  chart: BarChart3,
};

const ICON_COLORS: Record<ToastMessage["type"], string> = {
  xp_gain: "from-yellow-500 to-amber-400",
  completion: "from-cyan-500 to-blue-400",
  user_action: "from-dz-orange-500 to-dz-amber-400",
  stat: "from-emerald-500 to-green-400",
  badge: "from-purple-500 to-violet-400",
  book: "from-dz-orange-500 to-yellow-400",
};

export default function SocialProofToast() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [msg, setMsg] = useState<ToastMessage | null>(null);

  const showToast = useCallback(() => {
    const newMsg = generateMessage();
    setMsg(newMsg);
    setShow(true);
    setTimeout(() => setShow(false), 6000);
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const initialDelay = setTimeout(showToast, 6000);
    const interval = setInterval(showToast, randInt(15000, 20000));

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [dismissed, showToast]);

  if (dismissed || !msg) return null;

  const IconComponent = ICON_MAP[msg.icon];
  const gradientClass = ICON_COLORS[msg.type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -80, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="fixed bottom-6 left-6 z-50 max-w-[340px]"
        >
          <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl px-4 py-3.5 shadow-2xl shadow-dz-black/10 dark:shadow-dz-black/40 flex items-start gap-3 backdrop-blur-sm">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-md`}
            >
              {msg.type === "stat" || msg.type === "completion" ? (
                <IconComponent className="w-4.5 h-4.5" />
              ) : (
                <span className="text-[11px] font-semibold tracking-tight">{msg.initials}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-dz-black dark:text-dz-white leading-snug">
                {msg.text}
              </p>
              <p className="text-[11px] text-dz-grey-500 mt-0.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {msg.subtext}
              </p>
            </div>
            <button
              onClick={() => {
                setShow(false);
                setDismissed(true);
              }}
              className="text-dz-grey-400 hover:text-dz-grey-600 dark:hover:text-dz-grey-300 shrink-0 mt-0.5 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
