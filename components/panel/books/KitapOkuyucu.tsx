"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useXP } from "@/lib/hooks/useXP";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle2, ChevronDown, PlayCircle, Download, Clock, BookOpen } from "lucide-react";

// Geçici Veri (Gerçekte DB'den gelecek)
const FAKE_MÜFREDAT = [
  {
    ay: "1. Aşama: Hazırlık",
    bolumler: [
      { id: 1, baslik: "Zihin Yapısını Değiştirmek", sure: "10 dk" },
      { id: 2, baslik: "Hedef Geometrisi Nasıl Çizilir?", sure: "15 dk" },
      { id: 3, baslik: "İlk Karar ve Uygulama", sure: "20 dk" },
    ]
  },
  {
    ay: "2. Aşama: Eylem Planı",
    bolumler: [
      { id: 4, baslik: "Ertelemeyi Parçalara Ayırmak", sure: "15 dk" },
      { id: 5, baslik: "2 Dakika Kuralı Pratiği", sure: "12 dk" },
      { id: 6, baslik: "Odaklanma Testi ve Sonuçlar", sure: "25 dk" },
    ]
  },
  {
    ay: "3. Aşama: Zirve Yolculuğu",
    bolumler: [
      { id: 7, baslik: "Hızlanma ve Momentum", sure: "20 dk" },
      { id: 8, baslik: "Kriz Anlarını Yönetmek", sure: "15 dk" },
      { id: 9, baslik: "Sistemi Otomatize Etmek", sure: "15 dk" },
      { id: 10, baslik: "Sonuç: Yeni Kimliğin", sure: "30 dk" },
    ]
  }
];

export default function KitapOkuyucu({
  bookId,
  bookSlug,
  title,
  currentChapter,
  userId,
}: {
  bookId: string;
  bookSlug: string;
  title: string;
  currentChapter: number;
  userId: string;
}) {
  const [activeChapter, setActiveChapter] = useState(currentChapter);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<number>(0); // İlk aşama açık başlasın
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = useSupabase();
  const { awardXP } = useXP();
  const { addToast } = useToast();

  // İlerleyişi simüle etmek için completedChapters dizisini currentChapter'dan türetiyoruz
  useEffect(() => {
    setActiveChapter(currentChapter);
    const completed = [];
    for (let i = 1; i < currentChapter; i++) {
      completed.push(i);
    }
    setCompletedChapters(completed);

    // Açık olan aşamayı (accordion) bul
    const phaseIndex = FAKE_MÜFREDAT.findIndex(phase => phase.bolumler.some(b => b.id === currentChapter));
    if (phaseIndex !== -1) setExpandedPhase(phaseIndex);

  }, [currentChapter]);

  // Bölümü Tamamlama İşlemi
  async function completeChapter(chapterId: number) {
    if (saving || completedChapters.includes(chapterId)) return;
    setSaving(true);

    // Bir sonraki bölümü hedefine al, yoksa aynı kalsın (bitti demek)
    const nextChapter = chapterId < 10 ? chapterId + 1 : chapterId;

    const { error } = await supabase
      .from("user_books")
      .update({
        current_chapter: nextChapter,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("book_id", bookId);

    if (error) {
      addToast("İlerleme kaydedilemedi.", "error");
    } else {
      setCompletedChapters(prev => [...prev, chapterId]);
      setActiveChapter(nextChapter);
      const isLastChapter = chapterId >= 10;
      const xpAmount = isLastChapter ? 500 : 50;
      await awardXP(xpAmount, isLastChapter ? "Kitap tamamlandı!" : "Bölüm tamamlandı");
      addToast(`Harika! +${xpAmount} XP kazandın!`, "xp");

      // Eğer yeni bölüm başka bir aşamadaysa onu aç
      const newPhaseIndex = FAKE_MÜFREDAT.findIndex(phase => phase.bolumler.some(b => b.id === nextChapter));
      if (newPhaseIndex !== -1 && newPhaseIndex !== expandedPhase) {
        setExpandedPhase(newPhaseIndex);
      }
      router.refresh();
    }
    setSaving(false);
  }

  // Aktif bölüm nesnesini bul
  const activeChapterData = FAKE_MÜFREDAT.flatMap(p => p.bolumler).find(b => b.id === activeChapter) || FAKE_MÜFREDAT[0].bolumler[0];
  const isChapterCompleted = completedChapters.includes(activeChapter);

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-120px)] relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sol Panel: Müfredat (Accordion Liste) */}
      <div className="w-full lg:w-[350px] shrink-0 space-y-4 relative z-10">
        <Link href="/panel/kitap" className="inline-block text-dz-grey-500 dark:text-dz-grey-400 hover:text-dz-black dark:hover:text-dz-white transition-colors mb-4 text-sm font-medium">
          &larr; Kütüphaneye Dön
        </Link>

        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white leading-tight mb-8 hidden lg:block">
          {title}
        </h1>

        <div className="bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl overflow-hidden shadow-xl shadow-black/5">
          {FAKE_MÜFREDAT.map((phase, pIndex) => (
            <div key={pIndex} className="border-b border-dz-grey-200 dark:border-dz-grey-800 last:border-0">

              {/* Accordion Başlığı */}
              <button
                onClick={() => setExpandedPhase(expandedPhase === pIndex ? -1 : pIndex)}
                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${expandedPhase === pIndex ? 'bg-dz-grey-200 dark:bg-dz-grey-800' : 'hover:bg-dz-grey-200 dark:hover:bg-dz-grey-800'}`}
              >
                <span className="font-display font-bold text-dz-black dark:text-dz-white">{phase.ay}</span>
                <ChevronDown className={`w-3 h-3 text-dz-grey-500 dark:text-dz-grey-400 transition-transform duration-300 ${expandedPhase === pIndex ? 'rotate-180' : ''}`} />
              </button>

              {/* Accordion İçeriği (Bölümler) */}
              <AnimatePresence initial={false}>
                {expandedPhase === pIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-dz-white dark:bg-dz-grey-900"
                  >
                    <div className="p-2 space-y-1 py-3">
                      {phase.bolumler.map((bolum) => {
                        const completed = completedChapters.includes(bolum.id);
                        const isActive = bolum.id === activeChapter;

                        return (
                          <button
                            key={bolum.id}
                            onClick={() => setActiveChapter(bolum.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group
                               ${isActive ? 'bg-dz-orange-50 dark:bg-dz-orange-500/10 border border-dz-orange-200 dark:border-dz-orange-500/20' : 'hover:bg-dz-grey-100 dark:hover:bg-dz-white/5 border border-transparent'}
                             `}
                          >
                            {/* Checkmark */}
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors
                               ${completed ? 'bg-dz-orange-500 border-dz-orange-500 text-white' : isActive ? 'border-dz-orange-500/50 text-transparent' : 'border-dz-grey-300 dark:border-dz-white/20 text-transparent group-hover:border-dz-grey-400 dark:group-hover:border-dz-white/50'}
                             `}>
                              {completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>

                            <div className="flex-grow">
                              <h4 className={`text-sm font-medium ${isActive ? 'text-dz-black dark:text-white' : completed ? 'text-dz-grey-500 dark:text-dz-grey-500 line-through' : 'text-dz-grey-700 dark:text-dz-grey-300'} transition-colors`}>
                                {bolum.baslik}
                              </h4>
                              <p className="text-[10px] text-dz-grey-500 dark:text-dz-grey-500 mt-0.5">{bolum.sure}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel: Okuma ve İçerik Alanı (Flyout/Reader) */}
      <div className="flex-grow bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 lg:rounded-3xl rounded-none -mx-4 lg:mx-0 p-6 md:p-12 shadow-sm dark:shadow-2xl relative z-10 overflow-hidden">

        {/* Dekoratif Işık */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-dz-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >

            {/* Üst Bilgi */}
            <div className="flex items-center gap-3 text-sm text-dz-orange-600 dark:text-dz-orange-500 font-medium mb-6 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><BookOpen /> Bölüm {activeChapter}</span>
              <span className="text-dz-grey-300 dark:text-dz-white/20">•</span>
              <span className="flex items-center gap-1.5 text-dz-grey-500 dark:text-dz-grey-500"><Clock /> {activeChapterData.sure} Süre</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-dz-black dark:text-white mb-8 leading-tight">
              {activeChapterData.baslik}
            </h2>

            {/* Zengin İçerik (Örnek Markdown Render Alanı) */}
            <div className="prose prose-dz dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-dz-black dark:prose-headings:text-white prose-p:text-dz-grey-700 dark:prose-p:text-dz-grey-300 prose-li:text-dz-grey-700 dark:prose-li:text-dz-grey-300 mb-12">
              <p className="lead text-xl text-dz-black/90 dark:text-white/90">
                Hoş geldin! Bu bölümde {activeChapterData.baslik.toLowerCase()} üzerine yoğunlaşacağız. Buradaki görevleri adım adım uygulamadan bir sonraki güne geçme.
              </p>

              <div className="bg-dz-orange-50 border border-dz-orange-200 dark:bg-dz-orange-500/10 dark:border-dz-orange-500/20 p-6 rounded-2xl my-8">
                <h4 className="flex items-center gap-2 text-dz-orange-600 dark:text-dz-orange-500 mt-0 font-bold"><PlayCircle className="w-5 h-5" /> Günün Odak Mesajı</h4>
                <p className="mb-0 text-dz-orange-900 dark:text-white/80 text-base">"Başarı, her gün tekrarlanan küçük disiplinlerin toplamıdır. Sihirli değnek yok, sadece sistem var."</p>
              </div>

              <h3>Neden Buradasın?</h3>
              <p>Çoğumuz büyük hedefler koyarız ama ertesi gün sabah uyandığımızda o hedefler imkansız görünür. Çünkü hedefler büyüktür, adımlar değil. Bugün hedefini öyle küçük parçalara ayıracaksın ki, başarısız olmak imkansız hale gelecek.</p>

              <ul>
                <li>Hedefini 3 ana faza böl.</li>
                <li>Her fazı 10 günlük sprintlere ayır.</li>
                <li>Sadece önündeki 24 saati düşün.</li>
              </ul>

              <h3>Günün Görevi</h3>
              <p>Aşağıdaki çalışma kağıdını indir ve <strong>sadece ilk soruyu</strong> yanıtla. Hemen şimdi.</p>
            </div>

            {/* Ekstra Materyaller */}
            <div className="bg-dz-grey-50 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl p-6 flex items-center justify-between mb-12 hover:border-dz-orange-300 dark:hover:border-dz-white/20 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dz-grey-200 dark:bg-dz-white/5 rounded-xl flex items-center justify-center text-dz-grey-500 dark:text-dz-white/50 group-hover:text-dz-orange-500 transition-colors">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-dz-black dark:text-white font-medium">Bölüm {activeChapter} Çalışma Kağıdı</h5>
                  <span className="text-xs text-dz-grey-500 dark:text-dz-grey-500">PDF • 1.2 MB</span>
                </div>
              </div>
              <span className="text-dz-orange-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                İndir
              </span>
            </div>

            {/* Tamamlama Butonu */}
            <div className="border-t border-dz-grey-200 dark:border-dz-white/10 pt-8 mt-12">
              {isChapterCompleted ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-green-600 dark:text-green-500 font-medium">
                    <CheckCircle2 className="w-6 h-6" /> Bu bölümü tamamladın!
                  </div>
                  {activeChapter < 10 && (
                    <button
                      onClick={() => setActiveChapter(activeChapter + 1)}
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-dz-grey-100 dark:bg-dz-white/5 hover:bg-dz-grey-200 dark:hover:bg-dz-white/10 text-dz-black dark:text-white font-medium transition-colors border border-dz-grey-200 dark:border-transparent"
                    >
                      Sonraki Bölüme Geç &rarr;
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => completeChapter(activeChapter)}
                  disabled={saving}
                  className="w-full py-4 rounded-xl bg-dz-orange-500 text-white font-bold text-lg hover:bg-dz-orange-600 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-50"
                >
                  {saving ? "Kaydediliyor..." : "Dersi Tamamla ve İlerle"}
                </button>
              )}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

