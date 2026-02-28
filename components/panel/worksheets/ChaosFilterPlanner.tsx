"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle, Zap, Trash2, Plus } from "lucide-react";

type Task = {
    id: string;
    text: string;
    quadrant: "do" | "schedule" | "delegate" | "eliminate" | null;
};

const quadrants = [
    {
        key: "do" as const,
        label: "⚡ Hemen Yap",
        subtitle: "Acil + Önemli",
        color: "border-red-400 bg-red-50 dark:bg-red-500/10",
        accent: "text-red-600 dark:text-red-400",
        badge: "bg-red-500",
    },
    {
        key: "schedule" as const,
        label: "📅 Planla",
        subtitle: "Önemli ama Acil Değil",
        color: "border-blue-400 bg-blue-50 dark:bg-blue-500/10",
        accent: "text-blue-600 dark:text-blue-400",
        badge: "bg-blue-500",
    },
    {
        key: "delegate" as const,
        label: "🤝 Devret / Otomatize Et",
        subtitle: "Acil ama Önemsiz",
        color: "border-amber-400 bg-amber-50 dark:bg-amber-500/10",
        accent: "text-amber-600 dark:text-amber-400",
        badge: "bg-amber-500",
    },
    {
        key: "eliminate" as const,
        label: "🗑️ Eleme",
        subtitle: "Ne Acil Ne Önemli",
        color: "border-dz-grey-300 bg-dz-grey-50 dark:bg-dz-grey-800/50",
        accent: "text-dz-grey-500",
        badge: "bg-dz-grey-400",
    },
];

export default function ChaosFilterPlanner({
    onBack,
    onSave,
}: {
    onBack: () => void;
    onSave: (data: { tasks: Task[] }) => void;
}) {
    const [inputText, setInputText] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [saved, setSaved] = useState(false);

    const addTask = () => {
        const text = inputText.trim();
        if (!text) return;
        setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, quadrant: null }]);
        setInputText("");
    };

    const assignQuadrant = (taskId: string, quadrant: Task["quadrant"]) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, quadrant } : t))
        );
    };

    const removeTask = (taskId: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
    };

    const unassigned = tasks.filter((t) => !t.quadrant);
    const assigned = (q: string) => tasks.filter((t) => t.quadrant === q);

    const handleSave = () => {
        onSave({ tasks });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="p-2 rounded-lg hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-dz-grey-600 dark:text-dz-grey-400" />
                </button>
                <div className="flex-1">
                    <h2 className="text-xl font-bold font-display text-dz-black dark:text-white flex items-center gap-2">
                        <Zap className="w-6 h-6 text-amber-500" />
                        Chaos Filter — Hiper-Odak Planlayıcı
                    </h2>
                    <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 mt-1">
                        Kafandaki tüm görevleri döküp Eisenhower Matrisine yerleştir. Kaos → Netlik.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border-2 border-dashed border-dz-orange-300 dark:border-dz-orange-500/30 bg-dz-orange-50/50 dark:bg-dz-orange-500/5 p-5 space-y-3">
                <h3 className="font-bold text-sm text-dz-orange-600 dark:text-dz-orange-400 flex items-center gap-2">
                    🧠 Brain Dump — Aklındaki Her Şeyi Yaz
                </h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        placeholder="Bir görev yaz... (örn: E-posta taslağını bitir)"
                        className="flex-1 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-white dark:bg-dz-grey-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                    />
                    <button
                        onClick={addTask}
                        disabled={!inputText.trim()}
                        className="px-4 py-2.5 rounded-lg bg-dz-orange-500 text-white font-medium text-sm hover:bg-dz-orange-600 disabled:opacity-40 transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Ekle
                    </button>
                </div>

                <AnimatePresence>
                    {unassigned.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-2 pt-2"
                        >
                            <p className="text-xs text-dz-grey-500 font-medium">
                                Sıralanmamış görevler — aşağıdaki kutucuklara tıklayarak yerleştir:
                            </p>
                            {unassigned.map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-2 bg-white dark:bg-dz-grey-900 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 p-3"
                                >
                                    <span className="flex-1 text-sm text-dz-black dark:text-white font-medium">
                                        {task.text}
                                    </span>
                                    <div className="flex gap-1">
                                        {quadrants.map((q) => (
                                            <button
                                                key={q.key}
                                                onClick={() => assignQuadrant(task.id, q.key)}
                                                title={q.label}
                                                className={`w-7 h-7 rounded-md ${q.badge} text-white text-[10px] font-black flex items-center justify-center hover:scale-110 transition-transform`}
                                            >
                                                {q.key === "do" ? "Y" : q.key === "schedule" ? "P" : q.key === "delegate" ? "D" : "E"}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="p-1 text-dz-grey-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quadrants.map((q) => {
                    const items = assigned(q.key);
                    return (
                        <div
                            key={q.key}
                            className={`rounded-xl border-2 ${q.color} p-4 min-h-[140px] transition-all`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className={`font-bold text-sm ${q.accent}`}>{q.label}</h4>
                                    <p className="text-[11px] text-dz-grey-500">{q.subtitle}</p>
                                </div>
                                <span className={`${q.badge} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                                    {items.length}
                                </span>
                            </div>
                            <AnimatePresence>
                                {items.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center gap-2 bg-white/80 dark:bg-dz-grey-900/80 rounded-lg px-3 py-2 mb-2 text-sm"
                                    >
                                        <span className="flex-1 text-dz-black dark:text-white">{task.text}</span>
                                        <button
                                            onClick={() => assignQuadrant(task.id, null)}
                                            className="text-[10px] text-dz-grey-400 hover:text-dz-orange-500 font-medium"
                                        >
                                            Geri al
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {items.length === 0 && (
                                <p className="text-xs text-dz-grey-400 italic text-center mt-4">
                                    Görev sürükle veya yukarıdan ata
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end pt-2">
                <button
                    onClick={handleSave}
                    disabled={tasks.length === 0}
                    className="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    {saved ? (
                        <>
                            <CheckCircle className="w-4 h-4" /> Kaydedildi!
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" /> Filtre Raporunu Kaydet
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
