"use client";

import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { BookOpen, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import PaywallModal from "@/components/panel/core/PaywallModal";

type Book = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
};

// Kitaplara özel geçici renk/gradient şablonları
const coverGradients = [
  "from-dz-orange-600 to-dz-orange-900",
  "from-dz-grey-800 to-dz-black",
  "from-dz-orange-500/80 to-dz-black",
  "from-dz-grey-600 to-dz-black",
  "from-dz-orange-600 to-dz-orange-800"
];

export default function KitapListesi({
  books,
  userBookIds,
}: {
  books: Book[];
  userBookIds: string[];
}) {
  const router = useRouter();
  const supabase = useSupabase();
  const { addToast } = useToast();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");

  async function startBook(bookId: string, slug: string, sortOrder: number, title: string) {
    // Premium Bariyeri (Yalnızca Modül 1 ücretsiz)
    if (sortOrder > 1) {
      setSelectedBookTitle(title);
      setPaywallOpen(true);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("user_books").upsert(
      {
        user_id: user.id,
        book_id: bookId,
        current_chapter: 1,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,book_id" }
    );
    if (error) {
      void error;
      addToast("Kitap başlatılırken bir hata oluştu.", "error");
      return;
    }
    router.push(`/panel/kitap/oku?book=${slug}`);
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
      {books.map((book, index) => {
        const isStarted = userBookIds.includes(book.id);
        const gradient = coverGradients[index % coverGradients.length];
        const progress = isStarted ? Math.floor(Math.random() * 60) + 10 : 0;

        return (
          <div
            key={book.id}
            className="group relative flex flex-col perspective-1000"
          >
            {/* 3D Kitap Yapısı */}
            <div className="relative h-[22rem] w-full transform-style-3d transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-y-[-5deg] shadow-[-10px_10px_20px_rgba(0,0,0,0.2)] dark:shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] rounded-r-xl rounded-l-md bg-dz-white dark:bg-dz-grey-900 flex flex-col z-10">

              {/* Kitap Kapağı */}
              <div className={`absolute inset-0 z-10 rounded-r-xl rounded-l-md bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between overflow-hidden shadow-inner`}>

                {/* Gerçekçi Book Spine (Sırt) Hissiyatı */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 via-black/10 to-transparent border-r border-white/10 mix-blend-overlay" />
                <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/20" />
                <div className="absolute left-6 top-0 bottom-0 w-px bg-black/20" />

                {/* Kitap Kıvrım / Parlama Efekti */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Yıpranmış / Vintage Doku (Noise) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                <div className="relative z-20 flex justify-between items-start pl-4">
                  <span className="text-white/80 font-mono text-xs font-black tracking-widest uppercase">VOL {book.sort_order}</span>
                  {isStarted ? (
                    <span className="bg-dz-black/40 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-black tracking-widest text-white flex items-center gap-1.5 border border-white/20 shadow-lg">
                      <BookOpen className="text-dz-orange-400" /> OKUNUYOR
                    </span>
                  ) : (
                    <span className="bg-dz-black/40 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-black tracking-widest text-white/50 flex items-center gap-1.5 border border-white/10">
                      <Lock /> KİLİTLİ
                    </span>
                  )}
                </div>

                <div className="relative z-20 pl-4 mt-auto">
                  <div className="w-8 h-1 bg-dz-orange-500 mb-4 rounded-full" />
                  <h3 className="font-display font-black text-2xl text-white leading-tight drop-shadow-lg tracking-tight">
                    {book.title}
                  </h3>
                </div>
              </div>

              {/* Kitap Sayfaları Efekti (Sağ ve Alt Kenar) */}
              <div className="absolute -right-2 top-2 bottom-2 w-2 bg-gradient-to-b from-dz-grey-200 via-white to-dz-grey-300 dark:from-dz-grey-700 dark:via-dz-grey-500 dark:to-dz-grey-800 rounded-r-md border-y border-r border-dz-grey-300 dark:border-dz-grey-600 transform origin-left skew-y-12 z-0 hidden lg:block" />
            </div>

            {/* Alt Detaylar */}
            <div className="mt-4 flex flex-col flex-1">
              {book.description && (
                <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 line-clamp-2 mb-4 font-medium flex-1">
                  {book.description}
                </p>
              )}

              {/* Progress Bar & Actions */}
              <div className="mt-auto">
                {isStarted ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-dz-orange-500">İlerleme</span>
                        <span className="text-xs font-bold text-dz-black dark:text-white">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/panel/kitap/oku?book=${book.slug}`)}
                      className="w-full py-3 rounded-xl border-2 border-dz-orange-500 text-dz-orange-600 dark:text-dz-orange-500 text-sm font-black hover:bg-dz-orange-500 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                    >
                      Devam Et
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startBook(book.id, book.slug, book.sort_order, book.title)}
                    className={`w-full py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${book.sort_order === 1
                      ? 'bg-dz-orange-500 text-white hover:bg-dz-orange-600 shadow-lg shadow-dz-orange-500/20'
                      : 'bg-dz-grey-200 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-300 dark:hover:bg-dz-grey-700'
                      }`}
                  >
                    {book.sort_order === 1 ? "Ücretsiz Başla" : (
                      <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Premium Kilidi Aç</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Premium Paywall Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title={selectedBookTitle}
      />
    </div>
  );
}

