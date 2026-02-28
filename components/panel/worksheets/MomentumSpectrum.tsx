"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle, Gauge } from "lucide-react";

type Dimension = {
    key: string;
    label: string;
    icon: string;
    color: string;
};

const dimensions: Dimension[] = [
    { key: "energy", label: "Enerji", icon: "⚡", color: "#f97316" },
    { key: "focus", label: "Odak", icon: "🎯", color: "#8b5cf6" },
    { key: "motivation", label: "Motivasyon", icon: "🔥", color: "#ef4444" },
    { key: "timeManagement", label: "Zaman Yönetimi", icon: "⏰", color: "#06b6d4" },
    { key: "goalClarity", label: "Hedef Netliği", icon: "💎", color: "#10b981" },
    { key: "knowledgeLevel", label: "Bilgi Seviyesi", icon: "📚", color: "#3b82f6" },
];

function RadarChart({ values }: { values: Record<string, number> }) {
    const size = 260;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 100;
    const levels = [20, 40, 60, 80, 100];
    const n = dimensions.length;
    const angleStep = (2 * Math.PI) / n;

    const getPoint = (index: number, value: number) => {
        const angle = angleStep * index - Math.PI / 2;
        const r = (value / 100) * maxR;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    const gridPaths = levels.map((level) => {
        const pts = dimensions.map((_, i) => getPoint(i, level));
        return pts.map((p) => `${p.x},${p.y}`).join(" ");
    });

    const dataPoints = dimensions.map((d, i) => getPoint(i, values[d.key] || 0));
    const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
            {gridPaths.map((pts, i) => (
                <polygon
                    key={i}
                    points={pts}
                    fill="none"
                    stroke="currentColor"
                    className="text-dz-grey-200 dark:text-dz-grey-700"
                    strokeWidth="0.5"
                />
            ))}
            {dimensions.map((_, i) => {
                const far = getPoint(i, 100);
                return (
                    <line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={far.x}
                        y2={far.y}
                        stroke="currentColor"
                        className="text-dz-grey-200 dark:text-dz-grey-700"
                        strokeWidth="0.5"
                    />
                );
            })}
            <motion.polygon
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                points={dataPath}
                fill="url(#radarGrad)"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            {dataPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill={dimensions[i].color} stroke="white" strokeWidth="1.5" />
            ))}
            {dimensions.map((d, i) => {
                const pos = getPoint(i, 120);
                return (
                    <text
                        key={d.key}
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-dz-grey-600 dark:fill-dz-grey-400 text-[9px] font-medium"
                    >
                        {d.icon} {d.label}
                    </text>
                );
            })}
            <defs>
                <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function MomentumSpectrum({
    onBack,
    onSave,
}: {
    onBack: () => void;
    onSave: (data: Record<string, number>) => void;
}) {
    const [values, setValues] = useState<Record<string, number>>(
        Object.fromEntries(dimensions.map((d) => [d.key, 50]))
    );
    const [saved, setSaved] = useState(false);

    const updateDimension = (key: string, val: number) => {
        setValues((prev) => ({ ...prev, [key]: val }));
    };

    const avgScore = Math.round(
        Object.values(values).reduce((a, b) => a + b, 0) / dimensions.length
    );

    const handleSave = () => {
        onSave(values);
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
                        <Gauge className="w-6 h-6 text-purple-500" />
                        Momentum Spectrum — Performans Kalibrasyon Çarkı
                    </h2>
                    <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 mt-1">
                        6 boyutta kendini değerlendir. Güçlü ve zayıf yönlerini görselleştir.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="bg-white dark:bg-dz-grey-900 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6">
                    <RadarChart values={values} />
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="text-6xl font-black bg-gradient-to-br from-dz-orange-500 to-purple-500 bg-clip-text text-transparent">
                        {avgScore}
                    </div>
                    <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 font-medium">
                        Genel Performans Skoru
                    </p>
                    <div className="text-xs px-3 py-1 rounded-full bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 font-semibold">
                        {avgScore >= 80 ? "🔥 Olağanüstü" : avgScore >= 60 ? "⚡ İyi" : avgScore >= 40 ? "📈 Gelişiyor" : "🌱 Başlangıç"}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {dimensions.map((d, i) => (
                    <motion.div
                        key={d.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-white dark:bg-dz-grey-900 p-4 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm text-dz-black dark:text-white">
                                {d.icon} {d.label}
                            </span>
                            <span
                                className="text-sm font-bold min-w-[3ch] text-right"
                                style={{ color: d.color }}
                            >
                                {values[d.key]}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={values[d.key]}
                            onChange={(e) => updateDimension(d.key, parseInt(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-dz-orange-500 bg-dz-grey-200 dark:bg-dz-grey-700"
                        />
                        <div className="flex justify-between text-[10px] text-dz-grey-400 mt-1">
                            <span>Düşük</span>
                            <span>Yüksek</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-end pt-2">
                <button
                    onClick={handleSave}
                    className="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    {saved ? (
                        <>
                            <CheckCircle className="w-4 h-4" /> Kaydedildi!
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" /> Kalibrasyon Raporunu Kaydet
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
