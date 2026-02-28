"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

type UserBook = {
  id: string;
  current_chapter: number;
  book?: { id: string; slug: string; title: string } | null;
};

export default function DashboardActiveBook({
  userBook,
}: {
  userBook: UserBook | null;
}) {
  if (!userBook?.book) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-dashed border-dz-grey-300 dark:border-dz-grey-700 bg-dz-white/80 dark:bg-dz-white/[0.03] backdrop-blur-xl p-6 flex flex-col items-center text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-dz-grey-100 dark:bg-dz-grey-800 flex items-center justify-center mb-4">
          <BookOpen className="w-6 h-6 text-dz-grey-400" />
        </div>
        <p className="text-sm text-dz-grey-500 mb-3">Henüz aktif bir yolculuğun yok.</p>
        <Link
          href="/panel/kitap"
          className="inline-flex items-center gap-2 text-sm font-semibold text-dz-orange-500 hover:text-dz-orange-600 transition-colors"
        >
          Kütüphaneyi Keşfet <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white/80 dark:bg-dz-white/[0.03] backdrop-blur-xl p-6 relative overflow-hidden group hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-20 h-20 bg-dz-orange-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 flex items-center justify-center shadow-lg shadow-dz-orange-500/20 shrink-0">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-dz-grey-500 mb-0.5">Aktif Kitap</p>
          <p className="font-semibold text-dz-black dark:text-dz-white truncate">{userBook.book.title}</p>
          <p className="text-xs text-dz-grey-400 mt-0.5">Bölüm {userBook.current_chapter}</p>
        </div>
      </div>

      <Link
        href={`/panel/kitap/oku?book=${userBook.book.slug}`}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-dz-orange-500 bg-dz-orange-500/10 hover:bg-dz-orange-500/20 py-2.5 rounded-xl transition-colors"
      >
        Okumaya Devam <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}
