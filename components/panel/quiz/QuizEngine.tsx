"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown,
  Trophy,
  RotateCcw,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useXP } from "@/lib/hooks/useXP";
import { triggerHaptic, triggerNotificationHaptic } from "@/lib/capacitor";

export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "ordering" | "fill_blank";
  question: string;
  options?: string[];
  correctIndex?: number;
  items?: string[];
  correctOrder?: number[];
  blankedText?: string;
  blanks?: { position: number; answer: string; alternatives?: string[] }[];
  xp: number;
}

export interface QuizEngineProps {
  title: string;
  questions: QuizQuestion[];
  userId: string;
  quizId: string;
  onComplete?: (score: number, total: number) => void;
}

export default function QuizEngine({
  title,
  questions,
  userId,
  quizId,
  onComplete,
}: QuizEngineProps) {
  const { awardXP } = useXP();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [orderState, setOrderState] = useState<number[]>([]);
  const [blankValues, setBlankValues] = useState<Record<number, string>>({});
  const [blankResults, setBlankResults] = useState<Record<number, boolean>>({});

  const total = questions.length;
  const progress = ((currentIndex + (checked ? 1 : 0)) / total) * 100;
  const current = questions[currentIndex];

  const totalXP = questions.reduce((sum, q) => {
    const a = answers[q.id];
    if (a?.correct) return sum + q.xp;
    return sum;
  }, 0);

  const initQuestion = useCallback(
    (idx: number) => {
      const q = questions[idx];
      setChecked(false);
      setIsCorrect(false);
      setShowResult(false);
      setBlankValues({});
      setBlankResults({});
      if (q.type === "ordering" && q.items) {
        setOrderState(q.items.map((_, i) => i));
      }
    },
    [questions]
  );

  const advance = useCallback(async () => {
    if (currentIndex < total - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      initQuestion(next);
    } else {
      setFinished(true);
      const finalScore = Object.values(answers).filter((a) => a?.correct).length + (isCorrect ? 1 : 0);
      const earnedXP = questions.reduce((sum, q) => {
        const a = answers[q.id];
        if (a?.correct) return sum + q.xp;
        return sum;
      }, 0) + (isCorrect ? current.xp : 0);

      if (earnedXP > 0) {
        await awardXP(earnedXP, `Quiz: ${title}`);
        triggerNotificationHaptic().catch(() => {});
      }
      onComplete?.(finalScore, total);
    }
  }, [currentIndex, total, answers, isCorrect, questions, current, awardXP, title, onComplete, initQuestion]);

  const handleMultipleChoice = (optionIdx: number) => {
    if (checked) return;
    const correct = optionIdx === current.correctIndex;
    setChecked(true);
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      triggerHaptic("light").catch(() => {});
    } else {
      triggerHaptic("heavy").catch(() => {});
    }
    setAnswers((prev) => ({ ...prev, [current.id]: { selected: optionIdx, correct } }));
    setTimeout(advance, 1000);
  };

  const moveItem = (fromIdx: number, direction: "up" | "down") => {
    if (checked) return;
    const toIdx = direction === "up" ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= orderState.length) return;
    setOrderState((prev) => {
      const next = [...prev];
      [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
      return next;
    });
  };

  const checkOrdering = () => {
    if (!current.correctOrder) return;
    const correct = orderState.every((val, idx) => val === current.correctOrder![idx]);
    setChecked(true);
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
    triggerHaptic(correct ? "light" : "heavy").catch(() => {});
    setAnswers((prev) => ({ ...prev, [current.id]: { order: orderState, correct } }));
    setTimeout(advance, 1500);
  };

  const handleBlankChange = (position: number, value: string) => {
    setBlankValues((prev) => ({ ...prev, [position]: value }));
  };

  const checkBlanks = () => {
    if (!current.blanks) return;
    const results: Record<number, boolean> = {};
    let allCorrect = true;

    current.blanks.forEach((blank) => {
      const userVal = (blankValues[blank.position] ?? "").trim().toLowerCase();
      const expected = blank.answer.trim().toLowerCase();
      const alts = blank.alternatives?.map((a) => a.trim().toLowerCase()) ?? [];
      const match = userVal === expected || alts.includes(userVal);
      results[blank.position] = match;
      if (!match) allCorrect = false;
    });

    setBlankResults(results);
    setChecked(true);
    setIsCorrect(allCorrect);
    if (allCorrect) setScore((s) => s + 1);
    triggerHaptic(allCorrect ? "light" : "heavy").catch(() => {});
    setAnswers((prev) => ({ ...prev, [current.id]: { values: blankValues, correct: allCorrect } }));
    setTimeout(advance, 1500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setChecked(false);
    setIsCorrect(false);
    setScore(0);
    setFinished(false);
    initQuestion(0);
  };

  if (finished) {
    const correctCount = Object.values(answers).filter((a) => a?.correct).length;
    const wrongCount = total - correctCount;
    const earnedXP = questions.reduce((sum, q) => {
      const a = answers[q.id];
      if (a?.correct) return sum + q.xp;
      return sum;
    }, 0);

    return (
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6 md:p-8 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-dz-orange-500/10 blur-[64px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10 flex flex-col items-center text-center py-8"
        >
          <div className="w-20 h-20 rounded-full bg-dz-orange-500/10 flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-dz-orange-500" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-dz-black dark:text-white mb-2">
            {correctCount}/{total} Doğru
          </h2>

          <div className="flex items-center gap-4 mt-3 mb-6">
            <span className="flex items-center gap-1.5 text-green-500 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" /> {correctCount} doğru
            </span>
            <span className="flex items-center gap-1.5 text-red-500 font-semibold text-sm">
              <XCircle className="w-4 h-4" /> {wrongCount} yanlış
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-2xl font-bold text-dz-orange-500 mb-8"
          >
            <Sparkles className="w-6 h-6" />
            +{earnedXP} XP
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 text-dz-grey-700 dark:text-dz-grey-300 font-semibold text-sm hover:bg-dz-grey-50 dark:hover:bg-dz-grey-800 transition-colors w-full"
            >
              <RotateCcw className="w-4 h-4" />
              Tekrar Dene
            </button>
            <a
              href="/panel"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dz-orange-500 text-white font-semibold text-sm hover:bg-dz-orange-600 transition-colors w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard&apos;a Dön
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6 md:p-8 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-dz-orange-500/10 blur-[64px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold tracking-widest text-dz-orange-600 dark:text-dz-orange-500 uppercase">
            {title}
          </h3>
          <span className="text-xs font-bold tracking-widest text-dz-orange-600 dark:text-dz-orange-500 uppercase bg-dz-orange-50 dark:bg-dz-orange-500/10 px-3 py-1 rounded-full border border-dz-orange-200 dark:border-transparent">
            Soru {currentIndex + 1}/{total}
          </span>
        </div>

        <div className="w-full h-1.5 bg-dz-grey-200 dark:bg-dz-white/10 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-dz-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-dz-black dark:text-white mb-6">
              {current.question}
            </h2>

            {current.type === "multiple_choice" && (
              <MultipleChoiceView
                options={current.options ?? []}
                correctIndex={current.correctIndex ?? 0}
                checked={checked}
                isCorrect={isCorrect}
                selectedIndex={answers[current.id]?.selected ?? -1}
                onSelect={handleMultipleChoice}
              />
            )}

            {current.type === "ordering" && (
              <OrderingView
                items={current.items ?? []}
                orderState={orderState}
                correctOrder={current.correctOrder ?? []}
                checked={checked}
                onMove={moveItem}
                onCheck={checkOrdering}
              />
            )}

            {current.type === "fill_blank" && (
              <FillBlankView
                blankedText={current.blankedText ?? ""}
                blanks={current.blanks ?? []}
                values={blankValues}
                results={blankResults}
                checked={checked}
                onChange={handleBlankChange}
                onCheck={checkBlanks}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MultipleChoiceView({
  options,
  correctIndex,
  checked,
  isCorrect,
  selectedIndex,
  onSelect,
}: {
  options: string[];
  correctIndex: number;
  checked: boolean;
  isCorrect: boolean;
  selectedIndex: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt, idx) => {
        let borderClass = "border-dz-grey-200 dark:border-dz-white/10";
        let bgClass = "bg-dz-white dark:bg-dz-grey-900 hover:border-dz-orange-300 dark:hover:border-dz-white/20";

        if (checked && idx === correctIndex) {
          borderClass = "border-green-500";
          bgClass = "bg-green-50 dark:bg-green-500/10";
        } else if (checked && idx === selectedIndex && !isCorrect) {
          borderClass = "border-red-500";
          bgClass = "bg-red-50 dark:bg-red-500/10";
        } else if (!checked && idx === selectedIndex) {
          borderClass = "border-dz-orange-500";
          bgClass = "bg-dz-orange-50 dark:bg-dz-orange-500/10";
        }

        return (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            disabled={checked}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${borderClass} ${bgClass} disabled:cursor-default`}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-dz-grey-100 dark:bg-dz-grey-800 flex items-center justify-center text-sm font-bold text-dz-grey-600 dark:text-dz-grey-300">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-base font-medium text-dz-grey-800 dark:text-dz-white/90">
              {opt}
            </span>
            {checked && idx === correctIndex && (
              <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
            )}
            {checked && idx === selectedIndex && idx !== correctIndex && (
              <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function OrderingView({
  items,
  orderState,
  correctOrder,
  checked,
  onMove,
  onCheck,
}: {
  items: string[];
  orderState: number[];
  correctOrder: number[];
  checked: boolean;
  onMove: (fromIdx: number, direction: "up" | "down") => void;
  onCheck: () => void;
}) {
  return (
    <div className="space-y-3">
      {orderState.map((itemIdx, posIdx) => {
        let indicator = "";
        let borderClass = "border-dz-grey-200 dark:border-dz-white/10";

        if (checked) {
          const isRight = itemIdx === correctOrder[posIdx];
          borderClass = isRight ? "border-green-500" : "border-red-500";
          indicator = isRight ? "bg-green-500" : "bg-red-500";
        }

        return (
          <div
            key={itemIdx}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${borderClass} bg-dz-white dark:bg-dz-grey-900`}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-dz-grey-100 dark:bg-dz-grey-800 flex items-center justify-center text-sm font-bold text-dz-grey-600 dark:text-dz-grey-300">
              {posIdx + 1}
            </span>

            {checked && (
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${indicator}`} />
            )}

            <span className="text-base font-medium text-dz-grey-800 dark:text-dz-white/90 flex-1">
              {items[itemIdx]}
            </span>

            {!checked && (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => onMove(posIdx, "up")}
                  disabled={posIdx === 0}
                  className="p-1 rounded hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 disabled:opacity-30 transition-colors"
                >
                  <ChevronUp className="w-4 h-4 text-dz-grey-500" />
                </button>
                <button
                  onClick={() => onMove(posIdx, "down")}
                  disabled={posIdx === orderState.length - 1}
                  className="p-1 rounded hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 disabled:opacity-30 transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-dz-grey-500" />
                </button>
              </div>
            )}
          </div>
        );
      })}

      {!checked && (
        <button
          onClick={onCheck}
          className="mt-4 w-full py-3 rounded-xl bg-dz-orange-500 text-white font-semibold text-sm hover:bg-dz-orange-600 transition-colors"
        >
          Kontrol Et
        </button>
      )}
    </div>
  );
}

function FillBlankView({
  blankedText,
  blanks,
  values,
  results,
  checked,
  onChange,
  onCheck,
}: {
  blankedText: string;
  blanks: { position: number; answer: string; alternatives?: string[] }[];
  values: Record<number, string>;
  results: Record<number, boolean>;
  checked: boolean;
  onChange: (position: number, value: string) => void;
  onCheck: () => void;
}) {
  const segments = blankedText.split("___");
  const blanksByIndex = blanks.reduce<Record<number, (typeof blanks)[number]>>((acc, b) => {
    acc[b.position] = b;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <p className="text-base md:text-lg leading-relaxed text-dz-grey-800 dark:text-dz-white/90 font-medium">
        {segments.map((seg, idx) => (
          <span key={idx}>
            {seg}
            {idx < segments.length - 1 && blanksByIndex[idx] && (
              <>
                <input
                  type="text"
                  value={values[idx] ?? ""}
                  onChange={(e) => onChange(idx, e.target.value)}
                  disabled={checked}
                  className={`inline-block border-b-2 bg-transparent text-center font-bold w-24 outline-none mx-1 transition-colors ${
                    checked
                      ? results[idx]
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-red-500 text-red-600 dark:text-red-400"
                      : "border-dz-orange-500 text-dz-black dark:text-white"
                  }`}
                />
                {checked && !results[idx] && (
                  <span className="text-xs text-green-600 dark:text-green-400 ml-1">
                    ({blanksByIndex[idx].answer})
                  </span>
                )}
              </>
            )}
          </span>
        ))}
      </p>

      {!checked && (
        <button
          onClick={onCheck}
          className="w-full py-3 rounded-xl bg-dz-orange-500 text-white font-semibold text-sm hover:bg-dz-orange-600 transition-colors"
        >
          Kontrol Et
        </button>
      )}
    </div>
  );
}
