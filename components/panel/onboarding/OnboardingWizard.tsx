"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Hourglass,
  Brain,
  Flame,
  Banknote,
  BookOpen,
  Trophy,
  Sparkles,
  Rocket,
  Mountain,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface OnboardingWizardProps {
  userId: string;
  userName: string;
  userEmail: string;
}

const GOALS = [
  {
    id: "erteleme",
    title: "Erteleme Alışkanlığını Yenmek",
    icon: Hourglass,
    color: "bg-purple-500",
  },
  {
    id: "odak",
    title: "Odaklanma ve Derin Çalışma",
    icon: Brain,
    color: "bg-blue-500",
  },
  {
    id: "motivasyon",
    title: "Sürekli Motivasyon Kazanmak",
    icon: Flame,
    color: "bg-dz-orange-500",
  },
  {
    id: "gelir",
    title: "AI ile Gelir Elde Etmek",
    icon: Banknote,
    color: "bg-green-500",
  },
] as const;

const FEATURES = [
  { title: "10 Kitap Ekosistemi", icon: BookOpen },
  { title: "AI Destekli Öğrenme", icon: Brain },
  { title: "Rozet ve XP Sistemi", icon: Trophy },
];

export default function OnboardingWizard({
  userId,
  userName,
  userEmail,
}: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [displayName, setDisplayName] = useState(userName);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const progressPercent = ((step + 1) / 3) * 100;

  function toggleGoal(id: string) {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  async function handleNext() {
    const supabase = createClient();
    setLoading(true);

    try {
      if (step === 0) {
        if (displayName.trim() && displayName.trim() !== userName) {
          await supabase.auth.updateUser({
            data: { full_name: displayName.trim() },
          });
          const { error } = await supabase
            .from("profiles")
            .update({ display_name: displayName.trim() })
            .eq("id", userId);
          if (error) console.error("Onboarding step 0 error:", error);
        }
        setDirection(1);
        setStep(1);
      } else if (step === 1) {
        const { error } = await supabase
          .from("profiles")
          .update({ onboarding_goals: selectedGoals })
          .eq("id", userId);
        if (error) console.error("Onboarding step 1 error:", error);
        setDirection(1);
        setStep(2);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function handleFinish() {
    const supabase = createClient();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", userId);

      if (error) {
        console.error("Onboarding finish error:", error);
        // Fallback: API route ile dene
        await fetch("/api/onboarding-complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }

      router.push("/panel");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1 h-2 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-dz-grey-500 tabular-nums">
            {step + 1}/3
          </span>
        </div>

        <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-dz-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">
                    <Mountain className="w-12 h-12 mx-auto text-dz-orange-500" />
                    <Rocket className="w-8 h-8 mx-auto -mt-2 text-dz-amber-500" />
                  </div>
                  <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white mb-2">
                    Hoşgeldin, Zirveci!
                  </h1>
                  <p className="text-sm text-dz-grey-500 leading-relaxed">
                    <span className="font-display"><span className="font-black">Dipten</span><span className="font-normal">Zirveye</span></span>&apos;de seni görmek harika! Kişisel gelişim
                    yolculuğunda AI destekli bir rehberle ilerleyeceksin.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-1.5">
                      Görünen İsmin
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Adını gir..."
                      className="w-full px-4 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 text-dz-black dark:text-dz-white focus:border-dz-orange-500 focus:ring-2 focus:ring-dz-orange-500/20 outline-none transition-all font-medium"
                    />
                    <p className="mt-1.5 text-xs text-dz-grey-400">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!displayName.trim() || loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-dz-orange-500/30 hover:shadow-xl hover:shadow-dz-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Kaydediliyor..." : "Devam Et"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-center mb-6">
                  <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white mb-2">
                    Hedefini Belirle
                  </h1>
                  <p className="text-sm text-dz-grey-500">
                    Bu yolculukta ana hedefin ne?
                  </p>
                  <p className="text-xs text-dz-grey-400 mt-1">
                    Sana özel bir deneyim hazırlamamıza yardımcı olur.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOALS.map((goal) => {
                    const Icon = goal.icon;
                    const selected = selectedGoals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          selected
                            ? "border-dz-orange-500 bg-dz-orange-500/5 dark:bg-dz-orange-500/10"
                            : "border-dz-grey-200 dark:border-dz-grey-800 hover:border-dz-grey-300 dark:hover:border-dz-grey-700"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${goal.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-dz-black dark:text-dz-white">
                          {goal.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 text-dz-grey-500 hover:text-dz-black dark:hover:text-dz-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Geri
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={selectedGoals.length === 0 || loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-dz-orange-500/30 hover:shadow-xl hover:shadow-dz-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Kaydediliyor..." : "Devam Et"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <Sparkles className="w-14 h-14 mx-auto text-dz-orange-500 mb-3" />
                  </motion.div>

                  <ConfettiDots />

                  <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white mb-2">
                    Yolculuğun Başlıyor!
                  </h1>
                  <p className="text-sm text-dz-grey-500">
                    Her şey hazır. Zirveye birlikte çıkıyoruz.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {selectedGoals.map((goalId) => {
                    const goal = GOALS.find((g) => g.id === goalId);
                    if (!goal) return null;
                    const Icon = goal.icon;
                    return (
                      <span
                        key={goalId}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dz-orange-500/10 text-dz-orange-500 text-xs font-bold"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {goal.title}
                      </span>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {FEATURES.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-50 dark:bg-dz-grey-800/50"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 flex items-center justify-center text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-dz-black dark:text-dz-white text-center leading-tight">
                          {feature.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 text-dz-grey-500 hover:text-dz-black dark:hover:text-dz-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Geri
                  </button>
                  <button
                    onClick={handleFinish}
                    disabled={loading}
                    className="flex items-center gap-2 bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-dz-orange-500/30 hover:shadow-xl hover:shadow-dz-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Yönlendiriliyor..." : "Panele Git"}
                    {!loading && <Rocket className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ConfettiDots() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 200 - 100,
    y: Math.random() * -120 - 20,
    delay: Math.random() * 0.4,
    color:
      ["bg-dz-orange-500", "bg-dz-amber-500", "bg-purple-500", "bg-green-500"][
        i % 4
      ],
  }));

  return (
    <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none overflow-hidden h-32">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${dot.color}`}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: dot.y,
            x: dot.x,
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            delay: dot.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
