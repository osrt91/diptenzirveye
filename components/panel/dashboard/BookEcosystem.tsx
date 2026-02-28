"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, Lock } from "lucide-react";

interface BookProgress {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  current_chapter: number;
  total_chapters: number;
  completed: boolean;
  started: boolean;
}

interface BookEcosystemProps {
  books: BookProgress[];
}

function ProgressRing({ progress, size = 64 }: { progress: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className="absolute inset-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        className="text-dz-orange-500"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function BookNode({ book, index }: { book: BookProgress; index: number }) {
  const progress = book.total_chapters > 0 ? book.current_chapter / book.total_chapters : 0;

  const nodeContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 20 }}
      className="flex flex-col items-center shrink-0 w-20 md:w-24"
    >
      <div className="relative">
        {book.completed ? (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 text-white flex items-center justify-center shadow-lg shadow-dz-orange-500/25">
            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
          </div>
        ) : book.started ? (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-dz-white dark:bg-dz-grey-900 border-2 border-dz-orange-500 flex items-center justify-center relative">
            <span className="md:hidden"><ProgressRing progress={progress} size={56} /></span>
            <span className="hidden md:block"><ProgressRing progress={progress} size={64} /></span>
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-dz-orange-500 relative z-10" />
          </div>
        ) : (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-400 border border-dz-grey-200 dark:border-dz-grey-700 flex items-center justify-center">
            <Lock className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        )}
      </div>

      <div className="mt-2.5 text-center">
        <span className="text-[10px] font-bold text-dz-grey-400 block">
          {book.sort_order}. Kitap
        </span>
        <span className="text-xs font-bold text-dz-black dark:text-dz-white line-clamp-2 leading-tight mt-0.5 block">
          {book.title}
        </span>
        {book.started && !book.completed && (
          <span className="text-[10px] text-dz-grey-500 mt-0.5 block">
            {book.current_chapter}/{book.total_chapters} bölüm
          </span>
        )}
        {book.completed && (
          <span className="text-[10px] text-dz-orange-500 font-semibold mt-0.5 block">
            Tamamlandı
          </span>
        )}
      </div>
    </motion.div>
  );

  if (book.completed || book.started) {
    return (
      <Link href="/panel/kitap" className="outline-none">
        {nodeContent}
      </Link>
    );
  }

  return nodeContent;
}

function ConnectionLine({ completed }: { completed: boolean }) {
  return (
    <div className="flex items-center shrink-0 -mx-1 self-start mt-7 md:mt-8">
      <div
        className={`w-6 md:w-10 h-0.5 ${
          completed
            ? "bg-gradient-to-r from-dz-orange-500 to-dz-amber-500"
            : "bg-dz-grey-200 dark:bg-dz-grey-800"
        }`}
      />
    </div>
  );
}

export default function BookEcosystem({ books }: BookEcosystemProps) {
  const sorted = [...books].sort((a, b) => a.sort_order - b.sort_order);
  const completedCount = sorted.filter((b) => b.completed).length;
  const overallProgress = sorted.length > 0 ? completedCount / sorted.length : 0;

  return (
    <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">
          10 Kitaplık Ekosistem
        </h3>
        <span className="text-sm font-bold text-dz-orange-500">
          %{Math.round(overallProgress * 100)}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full bg-dz-grey-100 dark:bg-dz-grey-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress * 100}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400"
          />
        </div>
        <span className="text-xs font-medium text-dz-grey-500 shrink-0">
          {completedCount}/10 Kitap
        </span>
      </div>

      <div className="overflow-x-auto -mx-2 px-2 pb-2 scrollbar-thin scrollbar-thumb-dz-grey-300 dark:scrollbar-thumb-dz-grey-700">
        <div className="flex items-start w-max gap-0">
          {sorted.map((book, i) => (
            <div key={book.id} className="flex items-start">
              <BookNode book={book} index={i} />
              {i < sorted.length - 1 && (
                <ConnectionLine completed={book.completed && sorted[i + 1]?.started} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
