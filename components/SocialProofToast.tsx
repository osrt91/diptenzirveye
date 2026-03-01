"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, Award, BookOpen, TrendingUp, Clock, Star, Zap } from "lucide-react";

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
  "Kitap 1", "Kitap 2", "Kitap 3", "Kitap 4", "Kitap 5",
  "Kitap 6", "Kitap 7", "Kitap 8", "Kitap 9", "Kitap 10",
];

const BADGES = [
  "Hızlı Başlangıç", "AI Meraklısı", "Prompt Ustası", "Veri Savaşçısı",
  "Zirve Avcısı", "Hafta Yıldızı", "Süper Öğrenci", "Liderlik Rozeti",
];

type ToastMessage = {
  type: "user_action" | "location" | "stat" | "urgency" | "badge" | "book";
  text: string;
  subtext: string;
  initials: string;
  icon: "users" | "award" | "book" | "trending" | "clock" | "star" | "zap";
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMessage(): ToastMessage {
  const type = pick([
    "user_action", "user_action", "user_action",
    "location", "location",
    "stat",
    "urgency",
    "badge",
    "book",
  ] as const);

  const name = pick(NAMES);
  const surname = pick(SURNAMES);
  const initials = name[0] + surname[0];
  const mins = randInt(1, 30);
  const city = pick(CITIES);

  switch (type) {
    case "user_action": {
      const actions = [
        { text: `${name} ${surname} Zirve Masterclass'a katıldı`, sub: `${mins} dakika önce` },
        { text: `${name} ${surname} bugün Premium üye oldu`, sub: "Az önce" },
        { text: `${name} ${surname} akademiye kayıt oldu`, sub: `${mins} dk önce` },
        { text: `${name} ${surname} teste başladı`, sub: `${mins} dakika önce` },
        { text: `${name} ${surname} eğitim planını oluşturdu`, sub: "Şimdi" },
      ];
      const a = pick(actions);
      return { type, text: a.text, subtext: a.sub, initials, icon: "users" };
    }
    case "location":
      return {
        type,
        text: `${city}'dan bir kullanıcı teste başladı`,
        subtext: `${mins} dakika önce`,
        initials: city[0] + city[1],
        icon: "trending",
      };
    case "stat": {
      const stats = [
        { text: `Son 24 saatte ${randInt(8, 25)} yeni üye katıldı`, sub: "Bugün" },
        { text: `Bu hafta ${randInt(40, 120)} test tamamlandı`, sub: "Haftalık rapor" },
        { text: `${randInt(150, 500)}+ kullanıcı şu an aktif`, sub: "Canlı" },
        { text: `Topluluk ${randInt(1, 5)}.${randInt(0, 9)}00 üyeye ulaştı!`, sub: "Yeni rekor" },
      ];
      const s = pick(stats);
      return { type, text: s.text, subtext: s.sub, initials: "DZ", icon: "star" };
    }
    case "urgency": {
      const remaining = randInt(3, 12);
      const urgencies = [
        { text: `Sınırlı kontenjan: Sadece ${remaining} koltuk kaldı!`, sub: "Acele edin" },
        { text: `Kurucu üye indirimi sona yaklaşıyor`, sub: `Son ${randInt(2, 48)} saat` },
        { text: `Premium üyelikte %${randInt(20, 40)} erken kayıt fırsatı`, sub: "Sınırlı süre" },
      ];
      const u = pick(urgencies);
      return { type, text: u.text, subtext: u.sub, initials: "⏰", icon: "clock" };
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
        text: `${name} ${surname} ${book}'ü tamamladı`,
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
  clock: Clock,
  star: Star,
  zap: Zap,
};

const ICON_COLORS: Record<ToastMessage["type"], string> = {
  user_action: "from-dz-orange-500 to-dz-amber-400",
  location: "from-blue-500 to-cyan-400",
  stat: "from-emerald-500 to-green-400",
  urgency: "from-red-500 to-rose-400",
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
              {msg.type === "urgency" ? (
                <span className="text-base">{msg.initials}</span>
              ) : msg.type === "stat" ? (
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
