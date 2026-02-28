"use client";

import { useState } from "react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, Plus, Folder, BookOpen, Search, Star, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

type Note = {
  id: string;
  title: string;
  content: string | null;
  updated_at: string;
};

type UserBook = {
  id: string;
  title: string;
};

export default function NotDefteriListe({
  notes,
  userId,
  userBooks,
}: {
  notes: Note[];
  userId: string;
  userBooks: UserBook[];
}) {
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | string>("all");

  const router = useRouter();
  const supabase = useSupabase();
  const { addToast } = useToast();

  // Basit yapay zeka filtrelemesi simülasyonu. 
  // Normalde DB'de "book_id" sütunu eklenebilir. 
  // Şimdilik sadece not başlıklarında kitap adları geçiyorsa eşleştiriyoruz.
  const filteredNotes = notes.filter((n) => {
    // 1. Arama filtresi
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    // 2. Tab filtresi
    if (activeTab === "all") return true;
    if (activeTab === "favorites") return n.title.includes("★"); // Basit favori simülasyonu

    // Eğer bir "Kitap/Modül" tabı seçiliyse
    const selectedBook = userBooks.find(b => b.id === activeTab);
    if (!selectedBook) return true;

    // AI'ın sözde gruplaması (Eğer başlıkta modül adı geçiyorsa veya [Modül] tagı varsa o nota dahil et)
    return n.title.toLowerCase().includes(selectedBook.title.toLowerCase().substring(0, 10)); // ilk 10 karakter yeterli
  });

  async function createNote() {
    let title = newTitle.trim() || "Yeni Not";

    // Eğer spesifik bir modül/kitap içinde yeni not oluşturuluyorsa, AI Context'i ekle
    if (activeTab !== "all" && activeTab !== "favorites") {
      const selectedBook = userBooks.find(b => b.id === activeTab);
      if (selectedBook) {
        title = `[${selectedBook.title}] ${title}`;
      }
    }

    if (loading) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: userId, title, content: "" })
      .select("id")
      .single();
    setLoading(false);
    if (error) {
      addToast("Not oluşturulamadı. Lütfen tekrar deneyin.", "error");
      return;
    }
    setNewTitle("");
    if (data) router.push(`/panel/not-defteri/${data.id}`);
    else router.refresh();
  }

  async function deleteNote(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      addToast("Not silinemedi. Lütfen tekrar deneyin.", "error");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex-1 flex gap-6 mt-4 h-full">
      {/* --- SOL SIDEBAR (KLASÖRLER) --- */}
      <div className="hidden md:flex flex-col w-64 shrink-0 border-r border-dz-grey-200 dark:border-dz-white/10 pr-4">
        <h3 className="text-xs font-bold text-dz-grey-500 uppercase tracking-wider mb-3 px-2">Koleksiyonlar</h3>

        <div className="space-y-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "all" ? "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400" : "hover:bg-dz-grey-100 dark:hover:bg-dz-white/5 text-dz-grey-700 dark:text-gray-300"
              }`}
          >
            <Folder className="w-4 h-4" />
            Tüm Notlar
            <span className="ml-auto text-xs bg-dz-grey-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{notes.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "favorites" ? "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400" : "hover:bg-dz-grey-100 dark:hover:bg-dz-white/5 text-dz-grey-700 dark:text-gray-300"
              }`}
          >
            <Star className="w-4 h-4" />
            Önemli Notlar
          </button>
        </div>

        <h3 className="text-xs font-bold text-dz-grey-500 uppercase tracking-wider mt-8 mb-3 px-2 flex items-center justify-between">
          <span>AI Modül Bağlamı</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="AI devrede"></span>
        </h3>

        <div className="space-y-1 overflow-y-auto flex-1 pb-4" style={{ scrollbarWidth: 'none' }}>
          {userBooks.map(book => (
            <button
              key={book.id}
              onClick={() => setActiveTab(book.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${activeTab === book.id ? "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 border border-dz-orange-500/20 shadow-sm" : "hover:bg-dz-grey-100 dark:hover:bg-dz-white/5 text-dz-grey-600 dark:text-gray-400"
                }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="truncate">{book.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- SAĞ TARAF (NOT LİSTESİ) --- */}
      <div className="flex-1 flex flex-col min-w-0 bg-dz-white dark:bg-background rounded-3xl border border-dz-grey-200 dark:border-dz-white/5 shadow-sm overflow-hidden">

        {/* Araç Çubuğu */}
        <div className="p-4 border-b border-dz-grey-200 dark:border-dz-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-dz-grey-50/50 dark:bg-transparent">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dz-grey-400" />
            <input
              type="text"
              placeholder="Notlarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 text-sm focus:outline-none focus:border-dz-orange-500 transition-colors text-dz-black dark:text-white"
            />
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createNote()}
              placeholder="Yeni not başlığı"
              className="flex-1 sm:w-48 rounded-xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-grey-900 px-3 py-2 text-sm focus:outline-none focus:border-dz-orange-500 transition-colors text-dz-black dark:text-white"
            />
            <button
              type="button"
              onClick={createNote}
              disabled={loading}
              className="shrink-0 flex items-center justify-center gap-1.5 rounded-xl bg-dz-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-dz-orange-600 disabled:opacity-50 shadow-md shadow-dz-orange-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Ekle</span>
            </button>
          </div>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ scrollbarWidth: 'none' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredNotes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-16 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-dz-grey-200 dark:border-dz-white/10"
                >
                  <div className="w-16 h-16 bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 shadow-sm text-dz-orange-500 rounded-2xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-bold text-dz-black dark:text-white mb-2">Bu bağlamda not bulunamadı</h3>
                  <p className="text-dz-grey-500 text-sm max-w-sm">
                    Yapay Zeka bu {activeTab === "all" ? "bölümde" : "kitap modülünde"} henüz bir notunu kategorize etmedi. İlk notunu şimdi oluştur!
                  </p>
                </motion.div>
              ) : (
                filteredNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Link
                      href={`/panel/not-defteri/${note.id}`}
                      className="group block p-4 rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50/30 dark:bg-transparent hover:bg-dz-white dark:hover:bg-dz-grey-900 transition-all hover:border-dz-orange-400 dark:hover:border-dz-orange-500/50 hover:shadow-md cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-500 flex items-center justify-center shadow-sm">
                          <StickyNote className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => deleteNote(note.id, e)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg text-dz-grey-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all absolute top-4 right-4"
                        >
                          Sil
                        </button>
                      </div>
                      <h4 className="font-bold text-dz-black dark:text-white text-base leading-tight mb-1 truncate pr-8">
                        {note.title}
                      </h4>
                      <p className="text-sm text-dz-grey-500 dark:text-gray-400 mt-1 line-clamp-2 min-h-[2.5rem]">
                        {note.content || "İçerik yok..."}
                      </p>
                      <p className="text-xs text-dz-grey-400 mt-3">
                        {new Date(note.updated_at).toLocaleDateString("tr-TR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </Link>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
