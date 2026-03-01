"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Gauge, Zap, Sparkles } from "lucide-react";
import NexusProtocol from "./NexusProtocol";
import MomentumSpectrum from "./MomentumSpectrum";
import ChaosFilterPlanner from "./ChaosFilterPlanner";

type TemplateKey = "nexus" | "momentum" | "chaos" | null;

const templates = [
    {
        key: "nexus" as const,
        title: "Nexus Protocol",
        subtitle: "Lazer Odaklı Hedef Matrisi",
        description: "SMART hedeflerini AI çağına uyarlayarak stratejik yol haritanı oluştur.",
        icon: Target,
        gradient: "from-rose-500 via-orange-500 to-amber-500",
        bg: "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-500/10 dark:to-orange-500/5",
        border: "hover:border-orange-400 dark:hover:border-orange-500/40",
    },
    {
        key: "momentum" as const,
        title: "Momentum Spectrum",
        subtitle: "Performans Kalibrasyon Çarkı",
        description: "6 boyutta kendini değerlendir, güçlü ve zayıf noktalarını keşfet.",
        icon: Gauge,
        gradient: "from-violet-500 via-purple-500 to-blue-500",
        bg: "bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-500/10 dark:to-blue-500/5",
        border: "hover:border-purple-400 dark:hover:border-purple-500/40",
    },
    {
        key: "chaos" as const,
        title: "Chaos Filter",
        subtitle: "Hiper-Odak Planlayıcı",
        description: "Kafandaki kaosu Eisenhower Matrisine dökerek net bir aksiyon planına dönüştür.",
        icon: Zap,
        gradient: "from-amber-500 via-yellow-500 to-lime-500",
        bg: "bg-gradient-to-br from-amber-50 to-lime-50 dark:from-amber-500/10 dark:to-lime-500/5",
        border: "hover:border-amber-400 dark:hover:border-amber-500/40",
    },
];

export default function InteraktifSablon() {
    const [active, setActive] = useState<TemplateKey>(null);

    const handleSave = (_data: unknown) => {
        // TODO: Supabase'e kaydet
    };

    if (active === "nexus") {
        return <NexusProtocol onBack={() => setActive(null)} onSave={handleSave} />;
    }
    if (active === "momentum") {
        return (
            <MomentumSpectrum
                onBack={() => setActive(null)}
                onSave={handleSave}
            />
        );
    }
    if (active === "chaos") {
        return (
            <ChaosFilterPlanner onBack={() => setActive(null)} onSave={handleSave} />
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-dz-orange-500" />
                <h3 className="font-display font-bold text-dz-black dark:text-white">
                    İnteraktif Şablonlar
                </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((t, i) => {
                    const Icon = t.icon;
                    return (
                        <motion.button
                            key={t.key}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setActive(t.key)}
                            className={`group relative text-left rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 ${t.bg} ${t.border} p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] overflow-hidden`}
                        >
                            {/* Glow */}
                            <div
                                className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${t.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                            />
                            <div className="relative z-10">
                                <div
                                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-4 shadow-sm`}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-display font-bold text-dz-black dark:text-white text-base">
                                    {t.title}
                                </h4>
                                <p className="text-xs font-semibold text-dz-orange-600 dark:text-dz-orange-400 mt-0.5">
                                    {t.subtitle}
                                </p>
                                <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 mt-2 leading-relaxed">
                                    {t.description}
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
