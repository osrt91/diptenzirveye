"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, ArrowLeft, Sparkles } from "lucide-react";

type SmartField = {
    key: string;
    label: string;
    labelEn: string;
    placeholder: string;
    icon: string;
    color: string;
};

const smartFields: SmartField[] = [
    {
        key: "specific",
        label: "Belirli (Specific)",
        labelEn: "S",
        placeholder: "Tam olarak ne başarmak istiyorsun? Örn: 'Günde 3 AI prompt yazabilmek'",
        icon: "🎯",
        color: "from-rose-500 to-pink-500",
    },
    {
        key: "measurable",
        label: "Ölçülebilir (Measurable)",
        labelEn: "M",
        placeholder: "Başarını nasıl ölçeceksin? Örn: 'Haftada 21 prompt tamamlamak'",
        icon: "📊",
        color: "from-amber-500 to-orange-500",
    },
    {
        key: "achievable",
        label: "Ulaşılabilir (Achievable)",
        labelEn: "A",
        placeholder: "Bu hedefe ulaşmak için neye sahipsin? Örn: 'Günde 1 saat ayırabilirim'",
        icon: "🚀",
        color: "from-emerald-500 to-green-500",
    },
    {
        key: "relevant",
        label: "İlgili (Relevant)",
        labelEn: "R",
        placeholder: "Bu hedef hayatını nasıl değiştirecek? Örn: 'Freelance gelir elde edebilirim'",
        icon: "💎",
        color: "from-blue-500 to-cyan-500",
    },
    {
        key: "timeBound",
        label: "Zamanlı (Time-bound)",
        labelEn: "T",
        placeholder: "Hedefin için son tarihin ne? Örn: '30 gün içinde'",
        icon: "⏰",
        color: "from-violet-500 to-purple-500",
    },
];

export default function NexusProtocol({
    onBack,
    onSave,
}: {
    onBack: () => void;
    onSave: (data: Record<string, string>) => void;
}) {
    const [values, setValues] = useState<Record<string, string>>({});
    const [progress, setProgress] = useState(0);
    const [saved, setSaved] = useState(false);

    const updateField = (key: string, value: string) => {
        const next = { ...values, [key]: value };
        setValues(next);
        const filled = Object.values(next).filter((v) => v.trim().length > 0).length;
        setProgress(Math.round((filled / smartFields.length) * 100));
    };

    const handleSave = () => {
        onSave(values);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const allFilled = Object.values(values).filter((v) => v.trim().length > 0).length === smartFields.length;

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
                        <Target className="w-6 h-6 text-dz-orange-500" />
                        Nexus Protocol — Lazer Odaklı Hedef Matrisi
                    </h2>
                    <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 mt-1">
                        SMART metodolojisini AI çağına uyarla. Her alanı doldur, stratejik yol haritanı oluştur.
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="font-medium text-dz-grey-600 dark:text-dz-grey-400">Tamamlanma</span>
                    <span className="font-bold text-dz-orange-500">{progress}%</span>
                </div>
                <div className="h-2 bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-dz-orange-500 to-amber-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {smartFields.map((field, i) => (
                    <motion.div
                        key={field.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="group"
                    >
                        <div className="relative rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-white dark:bg-dz-grey-900 p-4 hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${field.color} flex items-center justify-center text-white text-sm font-black shadow-sm`}
                                >
                                    {field.labelEn}
                                </div>
                                <label className="font-semibold text-dz-black dark:text-white text-sm">
                                    {field.icon} {field.label}
                                </label>
                                {values[field.key]?.trim() && (
                                    <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto" />
                                )}
                            </div>
                            <textarea
                                value={values[field.key] || ""}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                rows={2}
                                className="w-full bg-dz-grey-50 dark:bg-dz-grey-800/50 rounded-lg px-3 py-2.5 text-sm text-dz-black dark:text-white placeholder:text-dz-grey-400 dark:placeholder:text-dz-grey-500 border-0 focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 resize-none"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={handleSave}
                    disabled={!allFilled}
                    className="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-dz-orange-500 to-amber-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-dz-orange-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    {saved ? (
                        <>
                            <CheckCircle className="w-4 h-4" /> Kaydedildi!
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" /> Hedef Matrisini Kaydet
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
