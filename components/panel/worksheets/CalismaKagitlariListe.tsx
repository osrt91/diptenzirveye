"use client";

import { useState } from "react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

type Sheet = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  book_id: string | null;
};

export default function CalismaKagitlariListe({
  sheets,
  booksMap,
  userId,
}: {
  sheets: Sheet[];
  booksMap: Map<string, string>;
  userId: string;
}) {
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = useSupabase();
  const { addToast } = useToast();

  async function createSheet() {
    const title = newTitle.trim();
    if (!title || loading) return;
    setLoading(true);
    const { error } = await supabase.from("study_sheets").insert({
      user_id: userId,
      title,
      content: "",
    });
    setLoading(false);
    if (error) {
      addToast("Çalışma kağıdı oluşturulamadı. Lütfen tekrar deneyin.", "error");
      return;
    }
    setNewTitle("");
    router.refresh();
  }

  async function deleteSheet(id: string) {
    const { error } = await supabase.from("study_sheets").delete().eq("id", id);
    if (error) {
      addToast("Çalışma kağıdı silinemedi. Lütfen tekrar deneyin.", "error");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createSheet()}
          placeholder="Yeni çalışma kağıdı başlığı"
          className="flex-1 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-background px-3 py-2"
        />
        <button
          type="button"
          onClick={createSheet}
          disabled={loading || !newTitle.trim()}
          className="rounded-lg bg-dz-orange-500 px-4 py-2 font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50"
        >
          Ekle
        </button>
      </div>
      <ul className="space-y-3">
        <AnimatePresence mode="popLayout">
          {sheets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 px-4 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white/50 dark:bg-dz-black/30 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center mb-4 rotate-3">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-dz-black dark:text-white mb-2">İlk Çalışma Kağıdını Oluştur</h3>
              <p className="text-dz-grey-500 text-sm mb-6 max-w-sm">
                Burada kendini test etmek veya özet notlar çıkarmak için yepyeni bir sayfa başlatabilirsin!
              </p>
              <button
                onClick={() => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus()}
                className="text-purple-600 dark:text-purple-400 font-medium text-sm flex items-center gap-2 hover:underline"
              >
                <Plus className="w-4 h-4" /> Yeni bir yaprak ekle
              </button>
            </motion.div>
          ) : (
            sheets.map((sheet) => (
              <motion.li
                key={sheet.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 p-4 bg-dz-white dark:bg-dz-black hover:border-purple-500/50 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/panel/calisma-kagitlari/${sheet.id}`}
                      className="font-medium text-dz-black dark:text-dz-white hover:text-purple-500 transition-colors block truncate"
                    >
                      {sheet.title}
                    </Link>
                    {sheet.book_id && booksMap.get(sheet.book_id) && (
                      <p className="text-xs text-dz-grey-500 mt-0.5 truncate">
                        {booksMap.get(sheet.book_id)}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteSheet(sheet.id)}
                    className="text-sm px-3 py-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                  >
                    Sil
                  </button>
                </div>
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}
