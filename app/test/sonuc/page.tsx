"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, MessageCircle, Send, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function TestSonucPage() {
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [coachQuestion, setCoachQuestion] = useState("");
    const [coachResponse, setCoachResponse] = useState<string | null>(null);
    const [coachLoading, setCoachLoading] = useState(false);
    const [showCoach, setShowCoach] = useState(true);

    useEffect(() => {
        const storedAnalysis = sessionStorage.getItem("ai_analysis");
        if (storedAnalysis) {
            setAiAnalysis(storedAnalysis);
        }
    }, []);

    const askCoach = async () => {
        if (!coachQuestion.trim() || coachLoading) return;
        setCoachLoading(true);
        setCoachResponse(null);
        try {
            const res = await fetch("/api/coach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: coachQuestion }),
            });
            const data = await res.json();
            setCoachResponse(data.response);
        } catch {
            setCoachResponse(
                "Şu an koçuna ulaşılamıyor. Panelden Zihin Motoru seansını başlatarak bugünkü hedefine odaklanabilirsin!"
            );
        } finally {
            setCoachLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white flex items-center justify-center py-12 px-4 selection:bg-dz-orange-500/30 selection:text-dz-orange-500">
            <div className="w-full max-w-2xl mx-auto space-y-6">
                <div className="bg-dz-grey-50 dark:bg-dz-grey-900 border border-dz-orange-200 dark:border-dz-orange-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden text-center shadow-2xl shadow-dz-orange-500/5">
                    {/* Arka plan parlama efekti */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] max-w-lg h-32 bg-dz-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

                    {/* İkon */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-20 h-20 mx-auto bg-gradient-to-br from-dz-orange-100 dark:from-dz-orange-500/20 to-dz-white dark:to-dz-black border border-dz-orange-200 dark:border-dz-orange-500/30 rounded-full flex items-center justify-center mb-6 relative z-10"
                    >
                        <TrendingUp className="w-10 h-10 text-dz-orange-500" />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-dz-black dark:text-white mb-4">
                            Özel Planın Hazır!
                        </h1>
                        <p className="text-lg text-dz-grey-700 dark:text-dz-grey-300 mb-8 max-w-md mx-auto">
                            Verdiğin yanıtlara göre, sana özel{" "}
                            <strong>kişiselleştirilmiş gelişim stratejini</strong>{" "}
                            belirledik.
                        </p>

                        {/* AI Analiz Sonucu */}
                        {aiAnalysis && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-dz-orange-500/10 dark:bg-dz-orange-500/5 rounded-xl p-6 border border-dz-orange-200 dark:border-dz-orange-500/20 text-left mb-8 space-y-3"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dz-orange-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-dz-orange-500" />
                                    </span>
                                    <span className="text-sm font-bold text-dz-orange-600 dark:text-dz-orange-500 uppercase tracking-wider">
                                        AI Koçun Diyor Ki:
                                    </span>
                                </div>
                                <div className="text-dz-grey-800 dark:text-dz-grey-300 leading-relaxed font-medium whitespace-pre-wrap text-sm md:text-base">
                                    {aiAnalysis}
                                </div>
                            </motion.div>
                        )}

                        {/* Analiz yükleniyorsa skeleton */}
                        {!aiAnalysis && (
                            <div className="bg-dz-grey-100 dark:bg-dz-grey-800/40 rounded-xl p-6 mb-8 animate-pulse space-y-3">
                                <div className="h-4 bg-dz-grey-200 dark:bg-dz-grey-700 rounded w-2/5" />
                                <div className="h-3 bg-dz-grey-200 dark:bg-dz-grey-700 rounded w-full" />
                                <div className="h-3 bg-dz-grey-200 dark:bg-dz-grey-700 rounded w-4/5" />
                                <div className="h-3 bg-dz-grey-200 dark:bg-dz-grey-700 rounded w-3/5" />
                            </div>
                        )}

                        {/* Özellik Listesi */}
                        <div className="bg-dz-grey-100 dark:bg-dz-black/40 rounded-xl p-6 border border-dz-grey-200 dark:border-dz-white/5 text-left mb-8 space-y-4">
                            <h3 className="text-dz-black dark:text-white font-medium mb-2 border-b border-dz-grey-300 dark:border-dz-white/10 pb-2">
                                Planda Neler Var?
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-dz-orange-500 shrink-0" />
                                    <span className="text-dz-grey-700 dark:text-dz-white/90">
                                        Sana özel filtrelenmiş içerik ve özet serisi
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-dz-orange-500 shrink-0" />
                                    <span className="text-dz-grey-700 dark:text-dz-white/90">
                                        Eyleme dönüştürülebilir interaktif çalışma kağıtları
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-dz-orange-500 shrink-0" />
                                    <span className="text-dz-grey-700 dark:text-dz-white/90">
                                        Günlük odaklanma & erteleme modülleri
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-dz-orange-500 shrink-0" />
                                    <span className="text-dz-grey-700 dark:text-dz-white/90">
                                        AI araç rozetleri ve sertifikasyonlar
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Buton */}
                        <div className="space-y-4">
                            <Link
                                href="/kayit-ol"
                                className="group relative w-full flex items-center justify-center gap-3 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Ücretsiz Hesabını Oluştur ve Akademiye Geç <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-dz-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                            </Link>
                            <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400">
                                AI Koçun ve kişiselleştirilmiş kaynakların içeride seni bekliyor.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Koçuna Sor Bölümü */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-dz-grey-50 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl p-6 shadow-lg"
                >
                    <button
                        onClick={() => setShowCoach(!showCoach)}
                        className="w-full flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-display font-bold text-dz-black dark:text-white text-sm">
                                    Koçuna Sor
                                </h3>
                                <p className="text-xs text-dz-grey-500">
                                    AI koçundan kişisel tavsiye al
                                </p>
                            </div>
                        </div>
                        <Sparkles className="w-5 h-5 text-purple-500" />
                    </button>

                    {showCoach && (
                        <div className="mt-4 space-y-3">

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={coachQuestion}
                                    onChange={(e) => setCoachQuestion(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && askCoach()}
                                    placeholder="Örn: Erteleme alışkanlığımı nasıl yenebilirim?"
                                    className="flex-1 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-white dark:bg-dz-grey-900 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                                />
                                <button
                                    onClick={askCoach}
                                    disabled={coachLoading || !coachQuestion.trim()}
                                    className="px-4 py-2.5 rounded-lg bg-purple-500 text-white font-medium text-sm hover:bg-purple-600 disabled:opacity-40 transition-colors flex items-center gap-1"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>

                            {coachLoading && (
                                <div className="flex items-center gap-2 text-sm text-dz-grey-500">
                                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                    Koçun düşünüyor...
                                </div>
                            )}

                            {coachResponse && (
                                <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-lg p-4">
                                    <p className="text-sm text-dz-grey-800 dark:text-dz-grey-200 leading-relaxed">
                                        {coachResponse}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}

