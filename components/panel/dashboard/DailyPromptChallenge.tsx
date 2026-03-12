"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Lightbulb, Send, CheckCircle2, Sparkles } from "lucide-react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useXP } from "@/lib/hooks/useXP";
import { triggerNotificationHaptic } from "@/lib/capacitor";

const CHALLENGES = [
  {
    id: 1,
    title: "SEO Uzmanı Promptu",
    description:
      "Bir web sitesinin organik trafiğini artırmak için SEO stratejisi oluşturacak bir prompt yaz.",
    hint: "İpucu: Hedef kitle, anahtar kelimeler ve içerik planı gibi değişkenler ekle.",
    category: "icerik",
    xp: 25,
  },
  {
    id: 2,
    title: "Kod İnceleyici AI",
    description:
      "Bir kod parçasını analiz edip iyileştirme önerileri sunacak bir prompt oluştur.",
    hint: "İpucu: Programlama dili, güvenlik ve performans kriterlerini belirt.",
    category: "genel",
    xp: 25,
  },
  {
    id: 3,
    title: "Sosyal Medya Stratejisti",
    description:
      "Bir marka için 1 haftalık sosyal medya içerik planı hazırlayacak bir prompt yaz.",
    hint: "İpucu: Platform, hedef kitle ve marka tonu gibi parametreler kullan.",
    category: "icerik",
    xp: 30,
  },
  {
    id: 4,
    title: "Veri Analiz Asistanı",
    description:
      "Ham veriyi anlamlı içgörülere dönüştürecek bir analiz promptu oluştur.",
    hint: "İpucu: Veri tipi, analiz hedefi ve çıktı formatını belirle.",
    category: "veri",
    xp: 30,
  },
  {
    id: 5,
    title: "Ürün Açıklaması Yazarı",
    description:
      "E-ticaret ürünleri için ikna edici açıklamalar yazacak bir prompt hazırla.",
    hint: "İpucu: Hedef kitle, ürün özellikleri ve ton parametreleri ekle.",
    category: "freelance",
    xp: 25,
  },
  {
    id: 6,
    title: "Öğrenme Planı Oluşturucu",
    description:
      "Herhangi bir konu için kişiselleştirilmiş öğrenme yol haritası çıkaracak bir prompt yaz.",
    hint: "İpucu: Mevcut seviye, hedef ve zaman kısıtlarını değişken olarak kullan.",
    category: "genel",
    xp: 25,
  },
  {
    id: 7,
    title: "E-posta Kampanyası",
    description:
      "Dönüşüm odaklı bir e-posta dizisi oluşturacak bir prompt hazırla.",
    hint: "İpucu: Funnel aşaması, hedef aksiyon ve konu satırı stratejisini dahil et.",
    category: "freelance",
    xp: 30,
  },
  {
    id: 8,
    title: "API Dokümantasyonu",
    description:
      "Bir API'nin kullanım kılavuzunu otomatik oluşturacak bir prompt yaz.",
    hint: "İpucu: Endpoint yapısı, parametreler ve örnek yanıtlar için şablon belirle.",
    category: "saas",
    xp: 30,
  },
  {
    id: 9,
    title: "Müşteri Geri Bildirim Analizi",
    description:
      "Müşteri yorumlarını kategorize edip duygu analizi yapacak bir prompt oluştur.",
    hint: "İpucu: Duygu skalası, kategori etiketleri ve önceliklendirme kriterleri tanımla.",
    category: "veri",
    xp: 25,
  },
  {
    id: 10,
    title: "Startup Pitch Deck",
    description:
      "Bir startup için yatırımcı sunumu içeriği oluşturacak bir prompt hazırla.",
    hint: "İpucu: Problem, çözüm, pazar büyüklüğü ve iş modeli bölümlerini dahil et.",
    category: "freelance",
    xp: 30,
  },
  {
    id: 11,
    title: "Hata Ayıklama Uzmanı",
    description:
      "Kod hatalarını sistematik olarak tespit edip çözüm sunacak bir prompt yaz.",
    hint: "İpucu: Hata mesajı, beklenen davranış ve ortam bilgisini parametre olarak al.",
    category: "genel",
    xp: 25,
  },
  {
    id: 12,
    title: "Blog İçerik Planı",
    description:
      "SEO uyumlu ve okuyucu çeken blog yazıları planlamak için bir prompt oluştur.",
    hint: "İpucu: Niş alan, hedef anahtar kelimeler ve yayın takvimini belirle.",
    category: "icerik",
    xp: 25,
  },
  {
    id: 13,
    title: "Veritabanı Tasarımcısı",
    description:
      "Uygulama gereksinimlerinden veritabanı şeması oluşturacak bir prompt yaz.",
    hint: "İpucu: Varlıklar, ilişkiler ve normalizasyon kurallarını tanımla.",
    category: "saas",
    xp: 30,
  },
  {
    id: 14,
    title: "Mülakat Koçu",
    description:
      "İş mülakatlarına hazırlık için soru-cevap simülasyonu yapacak bir prompt oluştur.",
    hint: "İpucu: Pozisyon, sektör ve deneyim seviyesini değişken olarak kullan.",
    category: "genel",
    xp: 25,
  },
];

const CATEGORY_STYLES: Record<string, string> = {
  icerik:
    "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  genel:
    "bg-dz-orange-500/10 text-dz-orange-500 border border-dz-orange-500/20",
  veri:
    "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  freelance:
    "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  saas:
    "bg-pink-500/10 text-pink-500 border border-pink-500/20",
};

const CATEGORY_LABELS: Record<string, string> = {
  icerik: "İçerik",
  genel: "Genel",
  veri: "Veri",
  freelance: "Freelance",
  saas: "SaaS",
};

interface DailyPromptChallengeProps {
  userId: string;
  initialSubmission: string | null;
}

export default function DailyPromptChallenge({
  userId,
  initialSubmission,
}: DailyPromptChallengeProps) {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const challenge = CHALLENGES[dayOfYear % CHALLENGES.length];

  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(initialSubmission !== null);
  const [submitting, setSubmitting] = useState(false);

  const supabase = useSupabase();
  const { awardXP } = useXP();

  async function handleSubmit() {
    if (content.trim().length < 20 || submitting) return;
    setSubmitting(true);

    try {
      await supabase.from("prompt_challenge_submissions").insert({
        user_id: userId,
        challenge_day: dayOfYear % CHALLENGES.length,
        content: content.trim(),
      });

      await supabase.from("prompts").insert({
        user_id: userId,
        title: `[Challenge] ${challenge.title}`,
        content: content.trim(),
        category: challenge.category,
      });

      await awardXP(challenge.xp, `Challenge: ${challenge.title}`);
      triggerNotificationHaptic().catch(() => {});
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const displayedContent = submitted
    ? initialSubmission ?? content.trim()
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-dz-orange-500" />
            <span className="font-display text-sm font-bold text-dz-black dark:text-dz-white">
              Günlük Prompt Challenge
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${CATEGORY_STYLES[challenge.category] ?? ""}`}
            >
              {CATEGORY_LABELS[challenge.category] ?? challenge.category}
            </span>
            <span className="text-xs font-bold text-dz-amber-500 bg-dz-amber-500/10 px-2 py-0.5 rounded-full">
              +{challenge.xp} XP
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-display text-lg font-bold text-dz-black dark:text-dz-white mb-1">
            {challenge.title}
          </h3>
          <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Hint */}
        <div className="rounded-xl bg-dz-orange-500/5 border border-dz-orange-500/10 p-3 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-dz-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-dz-orange-600 dark:text-dz-orange-400 leading-relaxed">
            {challenge.hint}
          </p>
        </div>

        {/* Input / Submitted */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Promptunu buraya yaz..."
                className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-50 dark:bg-dz-grey-800/50 text-sm text-dz-black dark:text-dz-white resize-none focus:border-dz-orange-500 focus:ring-2 focus:ring-dz-orange-500/20 outline-none transition-all placeholder:text-dz-grey-400"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-dz-grey-500">
                  {content.trim().length} / 20 min karakter
                </span>
                <button
                  onClick={handleSubmit}
                  disabled={content.trim().length < 20 || submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 hover:from-dz-orange-600 hover:to-dz-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-dz-orange-500/20"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Gönderiliyor..." : "Gönder"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <p className="text-sm text-dz-black dark:text-dz-white whitespace-pre-wrap leading-relaxed">
                  {displayedContent}
                </p>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-bold">
                  Tebrikler! +{challenge.xp} XP kazandın
                </span>
                <Sparkles className="w-4 h-4 text-dz-amber-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
