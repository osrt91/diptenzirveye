"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, CheckCircle2, Lock, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const QUOTES = [
  "Sıradan şeyler yapıp olağanüstü sonuçlar bekleyemezsin.",
  "Büyük hayaller kur, ama küçük adımlarla başla.",
  "Zorluklar, başarıya giden yolun kendisidir.",
  "Yarın daha iyi olmak istiyorsan, bugün dünden farklı davran.",
  "Gelecek, bugün ne yaptığına bağlı olarak şekillenir.",
  "Başarı bir maraton, sprint değil. Her gün bir adım at.",
  "Erteleme senin düşmanların en sessizi ve en tehlikelisidir.",
  "AI çağında en büyük avantaj: öğrenmeyi öğrenmek.",
  "Mükemmellik değil, ilerleme. Bitiş çizgisi değil, yolculuk.",
  "Küçükler büyük işleri başaramaz diyenler, büyük işlere başlamayanlardır.",
  "Odaklanma bir kas gibidir: çalıştıkça güçlenir.",
  "Yapay zekâyı bilmek yetmez, ustalaşmak gerekir.",
  "Her gün 1% daha iyi ol. Yıl sonunda 37 kat daha iyi olursun.",
  "Momentum her şeyi değiştirir. Sadece başla.",
  "Disiplin, motivasyon bittikten sonra devreye girer.",
  "Başarılı insanlar istemeyince de çalışır.",
  "Zamanını yönetemeyen, hayatını yönetemez.",
  "En iyi yatırım kendine yaptığın yatırımdır.",
  "Günün en zor görevi, başlamaktır.",
  "Küçük adımlar, büyük değişimler yaratır.",
  "Hedefsiz çalışma, pusulasız yolculuk gibidir.",
  "Her usta bir zamanlar öğrenciydi.",
  "Bilgi güçtür, ama uygulanan bilgi süper güçtür.",
  "Rahat bölge dışında büyüme başlar.",
  "Bugün yapmak, yarın yapmaktan her zaman iyidir.",
  "Başarısızlık yoktur, sadece öğrenme vardır.",
  "Planla, odaklan, uygula, tekrarla.",
  "Dünya değişiyor. Sen de değişmezsen geride kalırsın.",
  "Her günden bir şey öğren, her hafta bir şey üret.",
  "Kendinle yarışmak en asil rekabettir.",
];

function getDaysBetween(start: Date, end: Date): number {
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function MotivasyonPage() {
  const startDate = useMemo(() => new Date(2026, 0, 1), []);
  const today = useMemo(() => new Date(), []);
  const currentDayNumber = getDaysBetween(startDate, today) + 1;

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [completedDays, setCompletedDays] = useState<Set<number>>(() => new Set());
  const [selectedDayNum, setSelectedDayNum] = useState<number | null>(null);
  const [showFullYear, setShowFullYear] = useState(false);

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const daysInMonth = new Date(2026, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(2026, selectedMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  function getDayNumberInYear(month: number, day: number): number {
    const d = new Date(2026, month, day);
    return getDaysBetween(startDate, d) + 1;
  }

  function toggleDay(dayNum: number) {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayNum)) next.delete(dayNum);
      else next.add(dayNum);
      return next;
    });
  }

  const todayQuote = QUOTES[(currentDayNumber - 1) % QUOTES.length];
  const completedThisMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    .filter((d) => completedDays.has(getDayNumberInYear(selectedMonth, d))).length;
  const selectedQuote = selectedDayNum != null ? QUOTES[(selectedDayNum - 1) % QUOTES.length] : null;

  function renderMiniMonth(monthIdx: number) {
    const days = new Date(2026, monthIdx + 1, 0).getDate();
    const firstDay = new Date(2026, monthIdx, 1).getDay();
    const adj = firstDay === 0 ? 6 : firstDay - 1;
    const completedCount = Array.from({ length: days }, (_, i) => i + 1)
      .filter((d) => completedDays.has(getDayNumberInYear(monthIdx, d))).length;
    const isCurrentMonth = monthIdx === today.getMonth();

    return (
      <button
        key={monthIdx}
        onClick={() => { setSelectedMonth(monthIdx); setShowFullYear(false); }}
        className={`rounded-xl border p-3 text-left transition-all hover:shadow-md ${
          isCurrentMonth
            ? "border-dz-orange-500/50 bg-dz-orange-500/5 dark:bg-dz-orange-500/10"
            : "border-dz-grey-200 dark:border-dz-grey-800 hover:border-dz-orange-400"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`font-display text-sm font-bold ${isCurrentMonth ? "text-dz-orange-500" : "text-dz-black dark:text-dz-white"}`}>
            {monthNames[monthIdx]}
          </span>
          <span className="font-mono text-[10px] text-dz-grey-400">{completedCount}/{days}</span>
        </div>
        <div className="grid grid-cols-7 gap-px">
          {Array.from({ length: adj }).map((_, i) => <div key={`e-${i}`} className="w-3 h-3" />)}
          {Array.from({ length: days }, (_, i) => {
            const dn = getDayNumberInYear(monthIdx, i + 1);
            const done = completedDays.has(dn);
            const isT = dn === currentDayNumber;
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  done ? "bg-dz-orange-500" : isT ? "bg-dz-orange-500/40 ring-1 ring-dz-orange-500" : dn < currentDayNumber ? "bg-dz-grey-200 dark:bg-dz-grey-700" : "bg-dz-grey-100 dark:bg-dz-grey-800"
                }`}
              />
            );
          })}
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Günlük Motivasyon
        </h1>
        <p className="text-dz-grey-500 font-medium">Her gün bir adım. 365 gün boyunca.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Modal: Günün sözünü oku + Okudum işaretle */}
      <AnimatePresence>
        {selectedDayNum != null && selectedQuote != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedDayNum(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-700 shadow-2xl p-8 text-center"
            >
              <button
                type="button"
                onClick={() => setSelectedDayNum(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-dz-grey-400 hover:text-dz-black dark:hover:text-dz-white hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-2 bg-dz-orange-500/10 text-dz-orange-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                <Flame className="w-3 h-3" /> GÜN {selectedDayNum} / 365
              </div>
              <p className="font-display text-xl md:text-2xl font-bold leading-relaxed text-dz-black dark:text-dz-white mb-8">
                &ldquo;{selectedQuote}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  toggleDay(selectedDayNum);
                  setSelectedDayNum(null);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-dz-orange-500 text-white font-bold hover:bg-dz-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Okudum, işaretle
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote - Right (2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Today's Quote Card */}
        <motion.div
          key={currentDayNumber}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 rounded-3xl p-8 text-white text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6">
              <Flame className="w-3 h-3" /> GÜN {currentDayNumber} / 365
            </div>
            <p className="font-display text-xl md:text-2xl font-bold leading-relaxed max-w-lg mx-auto">
              &ldquo;{todayQuote}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Full Year View */}
        <AnimatePresence>
          {showFullYear && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
                {monthNames.map((_, idx) => renderMiniMonth(idx))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Calendar - Left (1 col, rendered first on desktop via order) */}
      <div className="lg:col-span-1 lg:order-first space-y-4">
        <button
          type="button"
          onClick={() => setShowFullYear(!showFullYear)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 text-sm font-bold text-dz-grey-600 dark:text-dz-grey-300 hover:border-dz-orange-400 hover:text-dz-orange-500 transition-all lg:hidden"
        >
          <Calendar className="w-4 h-4" />
          {showFullYear ? "Takvimi Kapat" : "2026 Tam Yıl Takvimi"}
          {showFullYear ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => setShowFullYear(!showFullYear)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dz-orange-500/30 bg-dz-orange-500/5 text-sm font-bold text-dz-orange-500 hover:bg-dz-orange-500/10 transition-all mb-4"
          >
            <Calendar className="w-4 h-4" />
            {showFullYear ? "Kapat" : "Tam Yıl Görünümü"}
          </button>
        </div>

        <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setSelectedMonth((m) => Math.max(0, m - 1))}
            disabled={selectedMonth === 0}
            aria-label="Önceki ay"
            className="p-2 rounded-lg hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-dz-grey-600 dark:text-dz-grey-400" />
          </button>
          <div className="text-center">
            <h3 className="font-display font-bold text-lg text-dz-black dark:text-dz-white">
              {monthNames[selectedMonth]} 2026
            </h3>
            <p className="text-xs text-dz-grey-500">
              {completedThisMonth}/{daysInMonth} gün tamamlandı
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedMonth((m) => Math.min(11, m + 1))}
            disabled={selectedMonth === 11}
            aria-label="Sonraki ay"
            className="p-2 rounded-lg hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-dz-grey-600 dark:text-dz-grey-400" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
            <div key={d} className="text-center text-[10px] font-bold text-dz-grey-400 uppercase py-1">{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: adjustedFirstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayNum = getDayNumberInYear(selectedMonth, day);
            const isToday = dayNum === currentDayNumber;
            const isPast = dayNum < currentDayNumber;
            const isFuture = dayNum > currentDayNumber;
            const isCompleted = completedDays.has(dayNum);

            return (
              <button
                key={day}
                onClick={() => !isFuture && setSelectedDayNum(dayNum)}
                disabled={isFuture}
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all duration-200
                  ${isCompleted
                    ? "bg-dz-orange-500 text-white shadow-sm shadow-dz-orange-500/30"
                    : isToday
                      ? "bg-dz-orange-500/10 text-dz-orange-500 border-2 border-dz-orange-500 ring-2 ring-dz-orange-500/20"
                      : isPast
                        ? "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-500 hover:bg-dz-orange-500/10 hover:text-dz-orange-500"
                        : "bg-dz-grey-50 dark:bg-dz-grey-800/50 text-dz-grey-300 dark:text-dz-grey-700 cursor-not-allowed"
                  }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isFuture ? (
                  <Lock className="w-3 h-3 opacity-40" />
                ) : (
                  <span>{day}</span>
                )}
                {isToday && !isCompleted && (
                  <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-dz-orange-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-6 pt-4 border-t border-dz-grey-200 dark:border-dz-grey-800">
          <div className="flex justify-between text-xs text-dz-grey-500 mb-2">
            <span>Yıllık İlerleme</span>
            <span className="font-bold text-dz-orange-500">{completedDays.size}/365 gün</span>
          </div>
          <div className="h-2 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(completedDays.size / 365) * 100}%` }}
            />
          </div>
        </div>
        </div>
      </div>

      </div>
    </div>
  );
}
