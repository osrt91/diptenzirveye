"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useXP } from "@/lib/hooks/useXP";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { Play, Pause, Square, Volume2, VolumeX, List, Activity } from "lucide-react";

type Preset = { label: string; work: number; break_: number };
type HistoryItem = {
  id: string;
  duration_minutes: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};

const PRESETS: Preset[] = [
  { label: "Kısa", work: 15, break_: 3 },
  { label: "Klasik", work: 25, break_: 5 },
  { label: "Uzun", work: 45, break_: 10 },
  { label: "Maraton", work: 60, break_: 15 },
  { label: "Özel", work: 0, break_: 5 },
];

async function requestNotificationPermission(): Promise<NotificationPermission | null> {
  if (!("Notification" in window)) return null;
  if (Notification.permission !== "default") return Notification.permission;
  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

function sendBrowserNotification(title: string, body: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/icons/icon-192.svg",
      badge: "/icons/icon-192.svg",
    });
  }
}

function playNotificationSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);

    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;
    notes.forEach((freq, i) => {
      osc.frequency.setValueAtTime(freq, now + i * 0.15);
    });
    gain.gain.exponentialRampToValueAtTime(0.001, now + notes.length * 0.15 + 0.3);

    osc.start(now);
    osc.stop(now + notes.length * 0.15 + 0.4);
  } catch {
    /* AudioContext not available */
  }
}

function CircularProgress({
  progress,
  isBreak,
  size = 220,
  strokeWidth = 8,
}: {
  progress: number;
  isBreak: boolean;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="mx-auto -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-dz-grey-200 dark:text-dz-grey-800"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={isBreak ? "text-dz-amber-400" : "text-dz-orange-500"}
        stroke="currentColor"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function PomodoroTimer() {
  const [presetIdx, setPresetIdx] = useState(1);
  const preset = PRESETS[presetIdx];

  const [remaining, setRemaining] = useState(preset.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [topic, setTopic] = useState("");
  const [phase, setPhase] = useState("");
  const [customMinutes, setCustomMinutes] = useState(30);
  const [customBreakMinutes, setCustomBreakMinutes] = useState(5);
  const isCustom = presetIdx === PRESETS.length - 1;

  type TaskItem = { id: string; text: string; done: boolean };
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTask, setNewTask] = useState("");
  const [showTasks, setShowTasks] = useState(false);

  const completedTaskCount = tasks.filter(t => t.done).length;
  const currentPhaseNum = Math.floor(completedTaskCount / 2) + 1;

  function addTask() {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), text: newTask.trim(), done: false }]);
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const supabase = useSupabase();
  const { awardXP } = useXP();
  const { addToast } = useToast();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const actualWorkMins = isCustom ? customMinutes : preset.work;
  const actualBreakMins = isCustom ? customBreakMinutes : preset.break_;
  const workSecs = actualWorkMins * 60;
  const breakSecs = actualBreakMins * 60;
  const totalDuration = isBreak ? breakSecs : workSecs;
  const progress = remaining / totalDuration;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const loadHistory = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("pomodoro_sessions")
      .select("id, duration_minutes, completed, completed_at, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);
    if (data) setHistory(data);
  }, [supabase]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const startSession = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("pomodoro_sessions")
      .insert({
        user_id: user.id,
        duration_minutes: actualWorkMins,
        completed: false,
      })
      .select("id")
      .single();
    if (data) setSessionId(data.id);
  }, [supabase, preset.work]);

  const completeSession = useCallback(async () => {
    if (sessionId) {
      await supabase
        .from("pomodoro_sessions")
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq("id", sessionId);
      setSessionId(null);
      loadHistory();
    }
  }, [sessionId, supabase, loadHistory]);

  useEffect(() => {
    if (!isRunning || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          const id = intervalRef.current;
          if (id) clearInterval(id);
          setIsRunning(false);
          setIsPaused(false);
          if (soundEnabled) playNotificationSound();
          if (!isBreak) {
            completeSession();
            const xpAmount = Math.min(actualWorkMins * 4, 500);
            awardXP(xpAmount, `${actualWorkMins} dk odaklanma`);
            const sessionName = topic ? `${topic} ${phase ? `(${phase})` : ""}` : "Çalışma";
            const msg = `${sessionName} icin ${actualWorkMins} dk zihin motoru oturumu tamamlandi! +${xpAmount} XP`;

            addToast(msg, "xp");
            sendBrowserNotification("Zihin Motoru Tamamlandi!", msg);
            setIsBreak(true);
            return breakSecs;
          } else {
            const msg = "Mola bitti! Yeni oturuma başlayabilirsin.";
            addToast(msg, "info");
            sendBrowserNotification("Mola Bitti! ⏱️", msg);
            setIsBreak(false);
            return actualWorkMins * 60; // Use actualWorkMins here
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isPaused, isBreak, completeSession, soundEnabled, workSecs, breakSecs]);

  function handleStart() {
    if (!isRunning && !sessionId && !isBreak) startSession();
    setIsRunning(true);
    setIsPaused(false);
  }

  function handlePause() {
    setIsPaused(true);
  }

  function handleResume() {
    setIsPaused(false);
  }

  function handleStop() {
    setIsRunning(false);
    setIsPaused(false);
    if (!isBreak) completeSession();
    setIsBreak(false);
    setRemaining(workSecs);
  }

  function changePreset(idx: number) {
    if (isRunning) return;
    setPresetIdx(idx);
    setIsBreak(false);
    setRemaining(isCustom ? customMinutes * 60 : PRESETS[idx].work * 60);
  }

  function formatHistoryTime(iso: string) {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-100/50 dark:bg-dz-grey-900/50 p-8 text-center"
      >
        {/* Preset selector */}
        <div className="flex justify-center gap-2 mb-6">
          {PRESETS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => changePreset(i)}
              disabled={isRunning}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${presetIdx === i
                ? "bg-dz-orange-500 text-white"
                : "border border-dz-grey-300 dark:border-dz-grey-600 text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 disabled:opacity-40"
                }`}
            >
              {p.label} ({p.work}dk)
            </button>
          ))}
        </div>

        {/* Custom duration sliders - shown only when "Özel" is selected */}
        {isCustom && !isRunning && (
          <div className="mb-6 px-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400">
                  Özel Çalışma Süresi
                </label>
                <span className="font-mono text-lg font-bold text-dz-orange-500">
                  {customMinutes} dk
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={customMinutes}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomMinutes(val);
                  if (!isBreak) setRemaining(val * 60);
                }}
                className="w-full accent-dz-orange-500"
              />
              <div className="flex justify-between text-xs text-dz-grey-500 mt-1">
                <span>5 dk</span>
                <span>120 dk</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400">
                  Özel Mola Süresi
                </label>
                <span className="font-mono text-lg font-bold text-dz-amber-500">
                  {customBreakMinutes} dk
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={customBreakMinutes}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomBreakMinutes(val);
                  if (isBreak) setRemaining(val * 60);
                }}
                className="w-full accent-dz-amber-400"
              />
              <div className="flex justify-between text-xs text-dz-grey-500 mt-1">
                <span>1 dk</span>
                <span>30 dk</span>
              </div>
            </div>
          </div>
        )}

        {/* Topic & Phase Inputs */}
        {!isRunning && (
          <div className="mb-6 px-4 space-y-3">
            <p className="text-sm font-bold text-dz-grey-600 dark:text-dz-grey-400 text-left">
              Ne Üzerinde Çalışacaksın?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Konu (ör: Kariyer Planı, Kitap Okuma)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={100}
                className="flex-1 rounded-xl border-2 border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-800 px-4 py-3.5 text-sm font-medium text-dz-black dark:text-dz-white placeholder:text-dz-grey-400 dark:placeholder:text-dz-grey-600 outline-none focus:border-dz-orange-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Aşama (ör: Faz 1)"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                maxLength={50}
                className="w-full sm:w-1/3 rounded-xl border-2 border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-800 px-4 py-3.5 text-sm font-medium text-dz-black dark:text-dz-white placeholder:text-dz-grey-400 dark:placeholder:text-dz-grey-600 outline-none focus:border-dz-orange-500 transition-colors"
              />
            </div>
            {topic && (
              <p className="text-xs text-dz-orange-500 font-medium text-left">
                Odak: {topic} {phase && `[${phase}]`} {tasks.length > 0 && `• Faz ${currentPhaseNum}`}
              </p>
            )}

            {/* Task List */}
            <button
              type="button"
              onClick={() => setShowTasks(!showTasks)}
              className="flex items-center gap-2 text-sm font-bold text-dz-grey-500 hover:text-dz-orange-500 transition-colors"
            >
              <List className="w-4 h-4" />
              Görevler {tasks.length > 0 && `(${completedTaskCount}/${tasks.length})`}
            </button>

            <AnimatePresence>
              {showTasks && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 p-4 space-y-3">
                    {tasks.length > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1.5 bg-dz-grey-200 dark:bg-dz-grey-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400 rounded-full transition-all duration-500"
                            style={{ width: tasks.length > 0 ? `${(completedTaskCount / tasks.length) * 100}%` : "0%" }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-dz-orange-500 font-bold">Faz {currentPhaseNum}</span>
                      </div>
                    )}

                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                            task.done
                              ? "bg-dz-orange-500 border-dz-orange-500 text-white"
                              : "border-dz-grey-300 dark:border-dz-grey-600 hover:border-dz-orange-400"
                          }`}
                        >
                          {task.done && <Activity className="w-3 h-3" />}
                        </button>
                        <span className={`flex-1 text-sm ${task.done ? "line-through text-dz-grey-400" : "text-dz-black dark:text-dz-white"}`}>
                          {task.text}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeTask(task.id)}
                          className="text-dz-grey-400 hover:text-red-500 text-xs transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        placeholder="Yeni görev ekle..."
                        className="flex-1 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-800 px-3 py-2 text-sm outline-none focus:border-dz-orange-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={addTask}
                        disabled={!newTask.trim()}
                        className="px-3 py-2 rounded-lg bg-dz-orange-500 text-white text-sm font-bold disabled:opacity-50 hover:bg-dz-orange-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Circular progress */}
        <div className="relative inline-block">
          <CircularProgress progress={progress} isBreak={isBreak} />
          <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
            <p className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400">
              {isBreak ? "Mola" : "Odaklan"}
            </p>
            {(topic || phase) && !isBreak && (
              <p className="text-xs text-dz-orange-400 font-medium max-w-[140px] truncate mt-1">
                {topic} {phase && <span className="text-dz-grey-500">[{phase}]</span>}
              </p>
            )}
            <p
              className="font-mono text-4xl font-bold text-dz-orange-500 tabular-nums"
              role="timer"
              aria-live="off"
              aria-label={`${mins} dakika ${secs} saniye kaldı`}
            >
              {display}
            </p>
            {isPaused && (
              <p className="text-xs text-dz-amber-500 mt-1 font-medium">Duraklatıldı</p>
            )}
          </div>
        </div>

        {/* Time Adjustments */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setRemaining((prev) => Math.max(60, prev - 300))}
            className="rounded-full bg-dz-grey-200/50 hover:bg-dz-grey-200 dark:bg-dz-grey-800/50 dark:hover:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 font-bold px-4 py-1.5 text-xs transition-colors"
          >
            -5 dk
          </button>
          <button
            type="button"
            onClick={() => setRemaining((prev) => prev + 300)}
            className="rounded-full bg-dz-grey-200/50 hover:bg-dz-grey-200 dark:bg-dz-grey-800/50 dark:hover:bg-dz-grey-800 text-dz-orange-500 font-bold px-4 py-1.5 text-xs transition-colors"
          >
            +5 dk
          </button>
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center gap-4">
          {!isRunning ? (
            <button
              type="button"
              onClick={handleStart}
              className="flex items-center gap-2 rounded-xl bg-dz-orange-500 px-8 py-3.5 font-bold text-white hover:bg-dz-orange-600 transition-all hover:scale-105 shadow-lg shadow-dz-orange-500/25 disabled:opacity-50"
            >
              <Play className="w-5 h-5 fill-current" />
              Başla
            </button>
          ) : isPaused ? (
            <button
              type="button"
              onClick={handleResume}
              className="flex items-center gap-2 rounded-xl bg-dz-orange-500 px-8 py-3.5 font-bold text-white hover:bg-dz-orange-600 transition-all shadow-lg shadow-dz-orange-500/25"
            >
              <Play className="w-5 h-5 fill-current" />
              Devam et
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="flex items-center gap-2 rounded-xl bg-dz-amber-400 px-8 py-3.5 font-bold text-dz-black hover:bg-dz-amber-500 transition-all shadow-lg shadow-dz-amber-400/25"
            >
              <Pause className="w-5 h-5 fill-current" />
              Duraklat
            </button>
          )}

          <button
            type="button"
            onClick={handleStop}
            disabled={!isRunning && !isPaused}
            className="flex items-center gap-2 rounded-xl bg-dz-grey-200 dark:bg-dz-grey-800 text-dz-black dark:text-white px-6 py-3.5 font-bold disabled:opacity-40 transition-all hover:bg-dz-grey-300 dark:hover:bg-dz-grey-700"
          >
            <Square className="w-4 h-4 fill-current opacity-80" />
            Sıfırla
          </button>
        </div>

        {/* Sound & Notification Controls */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled((v) => !v)}
            className="flex items-center gap-2 text-xs font-medium text-dz-grey-500 hover:text-dz-black dark:hover:text-white transition-colors bg-dz-white dark:bg-dz-black px-4 py-2 rounded-full border border-dz-grey-200 dark:border-dz-grey-800"
          >
            {soundEnabled ? (
              <><Volume2 className="w-3.5 h-3.5" /> Ses: Açık</>
            ) : (
              <><VolumeX className="w-3.5 h-3.5 opacity-50" /> Ses: Kapalı</>
            )}
          </button>
          <button
            type="button"
            onClick={() => { playNotificationSound(); }}
            className="flex items-center gap-2 text-xs font-medium text-dz-orange-500 hover:text-dz-orange-600 transition-colors bg-dz-orange-500/10 px-4 py-2 rounded-full border border-dz-orange-500/20"
          >
            <Activity className="w-3.5 h-3.5" /> Ses Testi
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!("Notification" in window)) {
                addToast("Bu tarayıcı bildirimleri desteklemiyor.", "error");
                return;
              }
              try {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                  addToast("Bildirimler etkinleştirildi!", "success");
                  new Notification("DiptenZirveye", {
                    body: "Bildirimler başarıyla etkinleştirildi!",
                    icon: "/icons/icon-192.svg",
                  });
                } else if (permission === "denied") {
                  addToast("Bildirim izni engellendi. Tarayıcı ayarlarından etkinleştirin.", "error");
                } else {
                  addToast("Bildirim izni bekleniyor.", "info");
                }
              } catch {
                addToast("Bildirim izni alınamadı.", "error");
              }
            }}
            className="flex items-center gap-2 text-xs font-medium text-dz-grey-500 hover:text-dz-black dark:hover:text-white transition-colors bg-dz-white dark:bg-dz-black px-4 py-2 rounded-full border border-dz-grey-200 dark:border-dz-grey-800"
          >
            🔔 Bildirim İzni
          </button>
        </div>
      </motion.div>

      {/* Session history */}
      <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-100/50 dark:bg-dz-grey-900/50 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowHistory((v) => !v)}
          aria-expanded={showHistory}
          className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-dz-black dark:text-white hover:bg-dz-grey-200/50 dark:hover:bg-dz-grey-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-dz-orange-500" />
            <span>Oturum Geçmişi ({history.length})</span>
          </div>
          <span className={`transition-transform duration-300 text-dz-grey-400 ${showHistory ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {history.length === 0 ? (
                <p className="px-5 pb-4 text-sm text-dz-grey-500">
                  Henüz tamamlanmış oturum yok.
                </p>
              ) : (
                <ul className="px-5 pb-4 space-y-2">
                  {history.map((h) => (
                    <li
                      key={h.id}
                      className="flex items-center justify-between text-sm border-b border-dz-grey-200/50 dark:border-dz-grey-800/50 pb-2 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${h.completed ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-dz-grey-400"
                            }`}
                        />
                        <span className="text-dz-black dark:text-white font-medium">
                          {h.duration_minutes} dk {h.completed ? "Odaklanma" : "İptal Edildi"}
                        </span>
                      </div>
                      <span className="text-xs text-dz-grey-500">
                        {formatHistoryTime(h.created_at)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
